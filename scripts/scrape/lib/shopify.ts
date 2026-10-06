import pLimit from "p-limit";
import { fetchJson, downloadImage, extFromUrl } from "./http.js";
import { htmlToText } from "./text.js";
import {
  ensureCategory,
  imageFileName,
  writeItem,
  writeIndex,
} from "./storage.js";
import type {
  CategoryIndex,
  CategoryScraper,
  ScrapedImage,
  ScrapedItem,
} from "./types.js";

interface ShopifyImage {
  id: number;
  position: number;
  src: string;
  width?: number;
  height?: number;
  alt?: string | null;
}

interface ShopifyVariant {
  id: number;
  title: string;
  sku?: string | null;
  price: string;
  compare_at_price?: string | null;
  option1?: string | null;
}

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html?: string | null;
  vendor: string;
  product_type: string;
  tags: string[];
  options: Array<{ name: string; values: string[] }>;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
}

export interface ShopifyCollectionSpec {
  site: { id: string; baseUrl: string };
  category: string;
  label: string;
  /** collection handle under baseUrl/collections/<handle> */
  collection: string;
  /** max pages to walk; each page holds up to PAGE_SIZE products */
  maxPages?: number;
}

const PAGE_SIZE = 250;

async function fetchCollectionProducts(
  baseUrl: string,
  collection: string,
  maxPages: number
): Promise<ShopifyProduct[]> {
  const all: ShopifyProduct[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const url = `${baseUrl}/collections/${collection}/products.json?limit=${PAGE_SIZE}&page=${page}`;
    const data = await fetchJson<{ products: ShopifyProduct[] }>(url);
    all.push(...data.products);
    if (data.products.length < PAGE_SIZE) break;
  }
  return all;
}

function toItem(
  siteId: string,
  category: string,
  baseUrl: string,
  p: ShopifyProduct
): ScrapedItem {
  const prices = p.variants
    .map((v) => Number(v.price))
    .filter((n) => Number.isFinite(n));

  const images: ScrapedImage[] = p.images.map((img, i) => ({
    file: imageFileName(siteId, p.handle, img.position ?? i + 1, extFromUrl(img.src)),
    url: img.src,
    position: img.position ?? i + 1,
    width: img.width,
    height: img.height,
    downloaded: false,
  }));

  return {
    site: siteId,
    category,
    id: String(p.id),
    slug: p.handle,
    title: p.title,
    url: `${baseUrl}/products/${p.handle}`,
    brand: p.vendor,
    productType: p.product_type,
    price: prices.length
      ? {
          min: Math.min(...prices),
          max: Math.max(...prices),
          currency: "GBP",
        }
      : undefined,
    description: htmlToText(p.body_html) || undefined,
    tags: p.tags,
    options: p.options,
    variants: p.variants.map((v) => ({
      title: v.title,
      sku: v.sku ?? undefined,
      price: Number(v.price),
    })),
    images,
    scrapedAt: new Date().toISOString(),
  };
}

/** factory for a Shopify "view all collection" category scraper */
export function createShopifyCollectionScraper(
  spec: ShopifyCollectionSpec
): CategoryScraper {
  const { site, category, label, collection } = spec;
  const maxPages = spec.maxPages ?? 40;

  return {
    category,
    label,
    site: site.id,
    async run(): Promise<CategoryIndex> {
      await ensureCategory(category);
      const source = `${site.baseUrl}/collections/${collection}`;

      console.log(`[${site.id}/${category}] fetching products from ${source}`);
      const products = await fetchCollectionProducts(site.baseUrl, collection, maxPages);
      console.log(`[${site.id}/${category}] ${products.length} products`);

      const items = products.map((p) => toItem(site.id, category, site.baseUrl, p));

      // metadata first so a failed image run still leaves usable data
      for (const item of items) {
        await writeItem(category, item);
      }
      console.log(`[${site.id}/${category}] wrote ${items.length} metadata files`);

      const totalImages = items.reduce((a, i) => a + i.images.length, 0);
      const jobs: Array<{ img: ScrapedImage }> = [];
      for (const item of items) {
        for (const img of item.images) {
          jobs.push({ img });
        }
      }

      const limit = pLimit(8);
      let done = 0;
      let downloaded = 0;
      let failed = 0;

      await Promise.all(
        jobs.map(({ img }) =>
          limit(async () => {
            const ok = await downloadImage(img.url, img.file);
            img.downloaded = ok;
            if (ok) downloaded++;
            else failed++;
            done++;
            if (done % 100 === 0) {
              console.log(
                `[${site.id}/${category}] images ${done}/${totalImages} (ok ${downloaded}, failed ${failed})`
              );
            }
          })
        )
      );

      // re-write metadata so image flags reflect the finished run
      for (const item of items) {
        await writeItem(category, item);
      }

      const index: CategoryIndex = {
        category,
        site: site.id,
        label,
        source,
        count: items.length,
        images: totalImages,
        scrapedAt: new Date().toISOString(),
        items: items.map((i) => ({
          slug: i.slug,
          title: i.title,
          url: i.url,
          brand: i.brand,
          price: i.price?.min,
          images: i.images.length,
        })),
      };
      await writeIndex(category, index);

      console.log(
        `[${site.id}/${category}] done: ${items.length} items, ${downloaded}/${totalImages} images downloaded`
      );
      return index;
    },
  };
}