import fs from "fs-extra";
import path from "path";

const ROOT = process.cwd();
export const IMAGES_DIR = path.join(ROOT, "data", "scraped", "images");
const METADATA_DIR = path.join(ROOT, "data", "scraped", "metadata");

export interface CatalogImage {
  file: string;
  url: string;
  position: number;
  width?: number;
  height?: number;
  downloaded: boolean;
}

export interface CatalogVariant {
  title: string;
  sku?: string;
  price: number;
}

export interface CatalogItem {
  site: string;
  category: string;
  id: string;
  slug: string;
  title: string;
  url: string;
  brand?: string;
  productType?: string;
  price?: { min: number; max: number; currency: string };
  description?: string;
  tags: string[];
  images: CatalogImage[];
  scrapedAt: string;
}

export interface IndexEntry {
  slug: string;
  title: string;
  url: string;
  brand?: string;
  price?: number;
  images: number;
}

export interface CategoryIndex {
  category: string;
  site: string;
  label: string;
  source: string;
  count: number;
  images: number;
  scrapedAt: string;
  items: IndexEntry[];
}

export interface RootIndex {
  updatedAt: string;
  categories: Array<{
    category: string;
    label: string;
    site: string;
    source?: string;
    count: number;
    images: number;
    scrapedAt?: string;
  }>;
}

export { imageSrc } from "./image";

export async function readRootIndex(): Promise<RootIndex | null> {
  try {
    return await fs.readJson(path.join(METADATA_DIR, "index.json"));
  } catch {
    return null;
  }
}

export async function readCategoryIndex(category: string): Promise<CategoryIndex | null> {
  try {
    return await fs.readJson(path.join(METADATA_DIR, category, "index.json"));
  } catch {
    return null;
  }
}

export async function readItem(category: string, slug: string): Promise<CatalogItem | null> {
  try {
    return await fs.readJson(path.join(METADATA_DIR, category, `${slug}.json`));
  } catch {
    return null;
  }
}

export function cover(item: CatalogItem): CatalogImage | undefined {
  return item.images[0];
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: "\u00a3",
  USD: "$",
  EUR: "\u20ac",
};

export function priceLabel(item: CatalogItem): string {
  if (!item.price) return "";
  const { min, max, currency } = item.price;
  const symbol = CURRENCY_SYMBOLS[currency] ?? `${currency} `;
  const format = (n: number) => `${symbol}${n.toFixed(2)}`;
  if (min === max) return format(min);
  return `${format(min)} \u2013 ${format(max)}`;
}

export const WM_SITE = "weedmaps-com";
export const WM_PREFIX = "wm-";

const WEEDMAPS_LABELS: Record<string, string> = {
  flower: "Flower",
  buds: "Buds",
  "infused-flower": "Infused Flower",
  prerolls: "Prerolls",
  "pre-rolls": "Pre-Rolls",
  concentrates: "Concentrates",
  extracts: "Extracts",
  edibles: "Edibles",
  gummies: "Gummies",
  drinks: "Drinks",
  tinctures: "Tinctures",
  topicals: "Topicals",
  capsules: "Capsules",
  vape: "Vape Pens",
  cartridges: "Cartridges",
  accessories: "Accessories",
  seeds: "Seeds",
};

export interface ShopCategory {
  slug: string;
  label: string;
  site: string;
  group: "vapestore" | "weedmaps";
  source?: string;
  count: number;
  images: number;
  coverFile?: string;
  updatedAt?: string;
}

export interface ShopVariant {
  title?: string;
  sku?: string;
  price?: number;
  available?: boolean;
}

export interface ShopOption {
  name: string;
  position: number;
  values: string[];
}

export interface ShopProduct extends CatalogItem {
  description_html?: string;
  collections?: string[];
  variants?: ShopVariant[];
  options?: ShopOption[];
}

interface WeedmapsImage {
  url: string;
  alt?: string;
  local?: string;
  webp_local?: string;
}

interface WeedmapsProduct {
  slug: string;
  name?: string;
  site?: string;
  category: string;
  price_min?: number;
  price_max?: number;
  currency?: string;
  price_range?: string;
  available?: boolean;
  vendor?: string;
  tags?: string[];
  description?: string;
  description_html?: string;
  short_description?: string;
  images?: WeedmapsImage[];
  variants?: ShopVariant[];
  collections?: string[];
  source_url?: string;
  scraped_at?: string;
}

function baseName(p: string): string {
  const i = Math.max(p.lastIndexOf("/"), p.lastIndexOf("\\"));
  return i >= 0 ? p.slice(i + 1) : p;
}

function prettyCategorySlug(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function weedmapsCategoryLabel(cat: string): string {
  return WEEDMAPS_LABELS[cat] ?? prettyCategorySlug(cat);
}

async function readWeedmapsIndex(): Promise<WeedmapsProduct[]> {
  try {
    const data = await fs.readJson(path.join(METADATA_DIR, WM_SITE, "index.json"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function normalizeWeedmaps(p: WeedmapsProduct, category: string): CatalogItem {
  const images: CatalogImage[] = (p.images ?? []).map((im, i) => ({
    file: baseName(im.webp_local ?? im.local ?? im.url),
    url: im.url,
    position: i + 1,
    downloaded: Boolean(im.webp_local ?? im.local),
  }));
  return {
    site: WM_SITE,
    category,
    id: p.slug,
    slug: p.slug,
    title: p.name ?? p.slug,
    url: p.source_url ?? `https://weedmaps.com/search?q=${encodeURIComponent(p.slug)}`,
    brand: p.vendor,
    price:
      p.price_min === undefined && p.price_max === undefined
        ? undefined
        : {
            min: p.price_min ?? p.price_max ?? 0,
            max: p.price_max ?? p.price_min ?? 0,
            currency: p.currency ?? "USD",
          },
    description: (p.description_html || p.description || "").replace(/<[^>]+>/g, ""),
    tags: p.tags ?? [],
    images,
    scrapedAt: p.scraped_at ?? "",
  };
}

function normalizeWeedmapsDetail(p: WeedmapsProduct): ShopProduct {
  const category = WM_PREFIX + (p.category || "misc");
  const base = normalizeWeedmaps(p, category);
  return {
    ...base,
    description_html: p.description_html,
    collections: p.collections,
    variants: p.variants ?? [],
  };
}

export async function getCategories(): Promise<ShopCategory[]> {
  const categories: ShopCategory[] = [];

  const root = await readRootIndex();
  for (const c of root?.categories ?? []) {
    let coverFile: string | undefined;
    try {
      const index = await readCategoryIndex(c.category);
      const first = index?.items?.[0];
      if (first) {
        const item = await readItem(c.category, first.slug);
        coverFile = item?.images?.[0]?.file;
      }
    } catch {
      coverFile = undefined;
    }
    categories.push({
      slug: c.category,
      label: c.label,
      site: c.site,
      group: "vapestore",
      source: c.source,
      count: c.count,
      images: c.images,
      coverFile,
      updatedAt: c.scrapedAt,
    });
  }

  const weedmaps = await readWeedmapsIndex();
  if (weedmaps.length) {
    const byCategory = new Map<string, WeedmapsProduct[]>();
    for (const p of weedmaps) {
      const list = byCategory.get(p.category) ?? [];
      list.push(p);
      byCategory.set(p.category, list);
    }
    for (const [cat, products] of byCategory) {
      const cover = products[0]?.images?.[0];
      categories.push({
        slug: WM_PREFIX + cat,
        label: weedmapsCategoryLabel(cat),
        site: WM_SITE,
        group: "weedmaps",
        count: products.length,
        images: products.reduce((n, p) => n + (p.images?.length ?? 0), 0),
        coverFile: cover ? baseName(cover.webp_local ?? cover.local ?? cover.url) : undefined,
        updatedAt: products[0]?.scraped_at,
      });
    }
  }

  return categories;
}

export interface CategoryPage {
  slug: string;
  label: string;
  site: string;
  group: "vapestore" | "weedmaps";
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  items: CatalogItem[];
}

export async function getCategory(
  category: string,
  page = 1,
  pageSize = 24
): Promise<CategoryPage | null> {
  const clampPage = (p: number, pages: number) => Math.min(Math.max(1, p), Math.max(1, pages));

  if (category.startsWith(WM_PREFIX)) {
    const cat = category.slice(WM_PREFIX.length);
    const products = (await readWeedmapsIndex()).filter((p) => p.category === cat);
    if (!products.length) return null;
    const total = products.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const current = clampPage(page, pages);
    const start = (current - 1) * pageSize;
    return {
      slug: category,
      label: weedmapsCategoryLabel(cat),
      site: WM_SITE,
      group: "weedmaps",
      total,
      page: current,
      pageSize,
      pages,
      items: products.slice(start, start + pageSize).map((p) => normalizeWeedmaps(p, category)),
    };
  }

  const index = await readCategoryIndex(category);
  if (!index || !index.items.length) return null;
  const total = index.items.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = clampPage(page, pages);
  const start = (current - 1) * pageSize;
  const entries = index.items.slice(start, start + pageSize);
  const items = (await Promise.all(entries.map((e) => readItem(category, e.slug)))).filter(
    (i): i is CatalogItem => Boolean(i)
  );
  return {
    slug: category,
    label: index.label,
    site: index.site,
    group: index.site === "vapestore" ? "vapestore" : "weedmaps",
    total,
    page: current,
    pageSize,
    pages,
    items,
  };
}

export async function getShopProduct(
  category: string,
  slug: string
): Promise<ShopProduct | null> {
  if (category.startsWith(WM_PREFIX)) {
    try {
      const raw = (await fs.readJson(
        path.join(METADATA_DIR, WM_SITE, "products", `${slug}.json`)
      )) as WeedmapsProduct;
      return normalizeWeedmapsDetail(raw);
    } catch {
      return null;
    }
  }
  try {
    return (await fs.readJson(path.join(METADATA_DIR, category, `${slug}.json`))) as ShopProduct;
  } catch {
    return null;
  }
}