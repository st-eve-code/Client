import path from "path";
import fs from "fs-extra";
import pLimit from "p-limit";
import { http } from "../../lib/http.js";
import { imageFileName, imagePath, imageExists } from "../../lib/storage.js";

export const site = {
  id: "shoppuff-com",
  label: "shoppuff-com",
  baseUrl: "https://k2spicesprayshop.com",
  apiBase: "https://k2spicesprayshop.com/product",
} as const;

/**
 * Maps the raw joint_products categories onto the unified catalog taxonomy.
 * Everything already exists; nothing new is created.
 */
function mapTarget(category: string, subcategory: string): string | null {
  switch (category) {
    case "FLOWER":
      return subcategory === "INFUSED_BUD" ? "infused-flower" : "buds";
    case "PRE_ROLLS":
      return "prerolls";
    case "EDIBLES":
    case "VAPORIZERS":
    case "CONCENTRATES":
    case "TOPICALS":
    case "TINCTURES":
    case "CBD":
    case "ORAL":
      return "cannabinoids";
    case "ACCESSORIES":
      return "vape-accessories";
    default:
      return null;
  }
}

function metaOne(v: unknown): unknown {
  return Array.isArray(v) ? (v.length ? v[0] : "") : v ?? "";
}

function isInStock(v: unknown): boolean {
  const value = Array.isArray(v) ? v[0] : v;
  return value === true || value === "1" || value === 1;
}

function stripStoreSuffix(slug: string): string {
  return slug.replace(/-for-sale-[a-z0-9-]+-mi$/, "").replace(/^-+|-+$/g, "");
}

function sanitizeSlug(slug: string): string {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // already plain
  }
  return (
    decoded
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || `item-${Math.random().toString(36).slice(2, 8)}`
  );
}

function parsePrice(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const m = String(v ?? "").replace(/,/g, "").match(/\d+(\.\d{1,2})?/);
  return m ? parseFloat(m[0]) : undefined;
}

function findOffers(node: unknown, out: Array<Record<string, unknown>> = []): Array<Record<string, unknown>> {
  if (Array.isArray(node)) {
    for (const item of node) findOffers(item, out);
    return out;
  }
  if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    if (o.offers !== undefined) {
      const offers = Array.isArray(o.offers) ? o.offers : [o.offers];
      for (const entry of offers) if (entry && typeof entry === "object") out.push(entry as Record<string, unknown>);
    }
    for (const value of Object.values(o)) findOffers(value, out);
  }
  return out;
}

interface FlatOffer {
  title: string;
  price?: number;
  available: boolean;
}

interface k2Product {
  slug: string;
  name: string;
  site: string;
  category: string;
  price_min?: number;
  price_max?: number;
  currency: string;
  price_range: string;
  available: boolean;
  vendor?: string;
  tags: string[];
  description: string;
  description_html: string;
  short_description: string;
  images: Array<{ url: string; alt: string; local: string }>;
  variants: FlatOffer[];
  collections: string[];
  source_url?: string;
  scraped_at: string;
}

function extractOffers(row: JointRow): {
  offers: FlatOffer[];
  currency: string;
} {
  const offers: FlatOffer[] = [];
  let currency = "USD";
  const content: string = String((row.content as Record<string, unknown>)?.["rendered"] ?? "");
  for (const match of content.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]);
      for (const offer of findOffers(parsed)) {
        const price = parsePrice(offer.price ?? offer.priceSpecification);
        if (price === undefined || price <= 0) continue;
        if (typeof offer.priceCurrency === "string" && offer.priceCurrency) currency = offer.priceCurrency;
        const title = String(offer.name ?? (offer.itemOffered as Record<string, unknown>)?.["name"] ?? offer.sku ?? "").trim();
        offers.push({
          title: title || (offer.size ? String(offer.size) : `$${price.toFixed(2)}`),
          price,
          available: true,
        });
      }
    } catch {
      // invalid JSON-LD block — ignore
    }
  }

  // dedupe by title+price
  const seen = new Set<string>();
  const unique: FlatOffer[] = [];
  for (const offer of offers) {
    const key = `${offer.title}|${offer.price ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(offer);
  }

  if (!unique.length) {
    const m = row.meta as Record<string, unknown>;
    const rawPrice = parsePrice(metaOne(m.joint_product_price));
    if (rawPrice !== undefined) unique.push({ title: "Unit", price: rawPrice, available: true });
  }

  return { offers: unique, currency };
}

function priceRange(min?: number, max?: number, currency = "USD"): string {
  if (min === undefined) return "";
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "\u20ac" : "\u00a3";
  const fmt = (n: number) => `${symbol}${n.toFixed(2)}`;
  return min === max ? fmt(min) : `${fmt(min)} \u2013 ${fmt(max ?? min)}`;
}

function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function placeholderSvg(title: string, brand: string, label: string, hue: number): string {
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  const short = title.length > 42 ? `${title.slice(0, 40)}\u2026` : title;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<rect width="600" height="600" fill="hsl(${hue} 40% 88%)"/>
<text x="300" y="270" font-family="Arial, sans-serif" font-size="22" font-weight="bold" text-anchor="middle" fill="hsl(${hue} 45% 25%)">${esc(brand || label || "Shoppuff")}</text>
<text x="300" y="320" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="hsl(${hue} 45% 35%)">${esc(short)}</text>
</svg>`;
}

function hashHue(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) % 9973;
  return h % 240;
}

const IMG_DIR = path.join("data", "scraped", "images");
const META_DIR = path.join("data", "scraped", "metadata", site.id);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** optional real-photo mode: pass DUTCHIE_COOKIE or DUTCHIE_CF_BM from the browser */
function readCookieHeader(): string | undefined {
  const full = process.env["DUTCHIE_COOKIE"];
  if (full && full.trim()) return full.trim();
  const cf = process.env["DUTCHIE_CF_BM"];
  if (cf && cf.trim()) return `__cf_bm=${cf.trim()}`;
  return undefined;
}

async function fetchRealImage(url: string, destFile: string): Promise<boolean> {
  const dest = imagePath(destFile);
  if (imageExists(destFile)) return true;
  const cookie = readCookieHeader();
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await http.get<Buffer>(url, {
        headers: cookie ? { Cookie: cookie } : {},
        responseType: "arraybuffer",
        timeout: 30_000,
      });
      const bytes = Buffer.from(res.data).length;
      const contentType = String(res.headers["content-type"] ?? "");
      if (bytes < 100 || !contentType.startsWith("image/")) return false;
      await fs.writeFile(dest, res.data);
      return true;
    } catch {
      if (attempt >= 3) return false;
      await sleep(500 * 2 ** attempt);
    }
  }
}

interface JointRow {
  slug?: unknown;
  link?: unknown;
  content?: unknown;
  meta?: Record<string, unknown>;
}

async function fetchPage(page: number): Promise<JointRow[]> {
  let attempt = 0;
  for (;;) {
    try {
      const r = await http.get(site.apiBase, {
        params: { per_page: 100, page, orderby: "id", order: "asc" },
        timeout: 90_000,
      });
      return Array.isArray(r.data) ? (r.data as JointRow[]) : [];
    } catch (e) {
      attempt++;
      if (attempt >= 5) throw e;
      console.log(`  page ${page} failed (${attempt}/5), backing off…`);
      await sleep(2_000 * 2 ** attempt + Math.random() * 1_000);
    }
  }
}

async function fetchAllProducts(): Promise<JointRow[]> {
  const rows: JointRow[] = [];
  for (let page = 1; ; page++) {
    const data = await fetchPage(page);
    if (!data.length) break;
    rows.push(...data);
    if (data.length < 100) break;
    if (page % 50 === 0) console.log(`  fetched ${rows.length} rows (page ${page})`);
    await sleep(150);
  }
  return rows;
}

export async function scrapek2(): Promise<{
  products: number;
  skipped: number;
  counts: Record<string, number>;
}> {
  console.log(`[${site.id}] scraping ${site.apiBase}`);
  const rows = await fetchAllProducts();
  console.log(`[${site.id}] raw rows: ${rows.length}`);

  const bySlug = new Map<string, { row: JointRow; category: string; inStock: boolean }>();
  let skipped = 0;
  for (const row of rows) {
    const m = (row.meta ?? {}) as Record<string, unknown>;
    const category = mapTarget(String(metaOne(m.joint_product_category) ?? ""), String(metaOne(m.joint_product_subcategory) ?? ""));
    if (!category) {
      skipped++;
      continue;
    }
    const slug = sanitizeSlug(stripStoreSuffix(String(row.slug ?? "")));
    if (!slug) {
      skipped++;
      continue;
    }
    const inStock = isInStock(m.joint_product_in_stock);
    const existing = bySlug.get(slug);
    if (!existing || (!existing.inStock && inStock)) {
      bySlug.set(slug, { row, category, inStock });
    }
  }
  console.log(`[${site.id}] unique mapped products: ${bySlug.size}, skipped: ${skipped}`);

  const limit = pLimit(20);
  const products: k2Product[] = [];
  let done = 0;

  const jobs = [...bySlug.entries()].map(([slug, entry]) =>
    limit(async () => {
      const { row, category } = entry;
      const m = (row.meta ?? {}) as Record<string, unknown>;
      const name = String(metaOne(m.joint_product_name) ?? "").trim() || slug;
      const brand = String(metaOne(m.joint_product_brand_name) ?? "").trim() || undefined;
      const { offers, currency } = extractOffers(row);
      const prices = offers.map((o) => o.price).filter((n): n is number => n !== undefined);
      const min = prices.length ? Math.min(...prices) : undefined;
      const max = prices.length ? Math.max(...prices) : undefined;

      const imgUrl = String(metaOne(m.joint_product_image_url) ?? "").split(",")[0]?.trim() ?? "";
      const file = imageFileName(site.id, slug, 1, ".svg");
      const product: k2Product = {
        slug,
        name,
        site: site.id,
        category,
        price_min: min,
        price_max: max,
        currency,
        price_range: priceRange(min, max, currency),
        available: true,
        vendor: brand,
        tags: [],
        description: stripHtml(String(metaOne(m.joint_product_description) ?? "")),
        description_html: String(metaOne(m.joint_product_description) ?? ""),
        short_description: "",
        images: [{ url: imgUrl, alt: name, local: path.join("data", "scraped", "images", file) }],
        variants: offers,
        collections: [String(metaOne(m.joint_product_category) ?? "")],
        source_url: typeof row.link === "string" ? row.link : undefined,
        scraped_at: new Date().toISOString(),
      };
      products.push(product);
      done++;
      if (done % 2000 === 0 || done === bySlug.size) console.log(`  normalized ${done}/${bySlug.size}`);
    })
  );
  await Promise.all(jobs);

  // memory: drop the raw rows edge no longer needed
  bySlug.clear();

  const counts: Record<string, number> = {};
  for (const p of products) counts[p.category] = (counts[p.category] ?? 0) + 1;
  console.log(`[${site.id}] per-target:`, JSON.stringify(counts));

  const productDir = path.join(META_DIR, "products");
  await fs.ensureDir(productDir);
  await fs.ensureDir(IMG_DIR);

  const cookie = readCookieHeader();
  const realMode = Boolean(cookie);

  const writer = pLimit(30);
  let wroteMeta = 0;
  let wroteRealImages = 0;
  await Promise.all(
    products.map((p) =>
      writer(async () => {
        const file = path.join(productDir, `${p.slug}.json`);
        const existingImg = (await fs.pathExists(file))
          ? (await fs.readJson(file))?.images?.[0]?.local
          : undefined;
        await fs.writeJson(file, p, { spaces: 2 });
        if (realMode && p.images[0].url) {
          // try to download the real image
          if (await fetchRealImage(p.images[0].url, file)) {
            wroteRealImages++;
          } else {
            // fall back to placeholder
            const hue = hashHue(p.name);
            const svg = placeholderSvg(p.name, p.vendor ?? "", p.category, hue);
            await fs.writeFile(path.join(IMG_DIR, file), svg);
          }
        } else {
          // always generate a placeholder
          const hue = hashHue(p.name);
          const svg = placeholderSvg(p.name, p.vendor ?? "", p.category, hue);
          await fs.writeFile(path.join(IMG_DIR, file), svg);
        }
        wroteMeta++;
        if (wroteMeta % 2000 === 0 || wroteMeta === products.length) console.log(`  wrote metadata files ${wroteMeta}/${products.length}`);
        
        if (existingImg && (await fs.pathExists(existingImg))) {
          // preserve existing image (e.g. from previous run)
          await fs.copy(existingImg, path.join(IMG_DIR, file));
        }
        return p;

      })
      .catch((err) => {
        console.error("Failed to process product:", err);
        throw err;
      })

    )
  );
  console.log(
    `[${site.id}] wrote ${wroteMeta} product files (${wroteRealImages} real photos, ${products.length - wroteRealImages} placeholders)`
  );

  await fs.outputJson(
    path.join(META_DIR, "index.json"),
    products.map((p) => ({
      slug: p.slug,
      name: p.name,
      site: p.site,
      category: p.category,
      price_min: p.price_min,
      price_max: p.price_max,
      currency: p.currency,
      price_range: p.price_range,
      available: p.available,
      vendor: p.vendor,
      tags: p.tags,
      images: p.images,
      variants: p.variants,
      collections: p.collections,
      source_url: p.source_url,
      scraped_at: p.scraped_at,
    })),
    { spaces: 2 }
  );
  console.log(`[${site.id}] wrote index.json (${products.length} items)`);
  console.log(`[${site.id}] done`);
  return { products: products.length, skipped, counts };
}

let isMain = false;
try {
  const arg = process.argv[1];
  if (typeof arg === "string") {
    isMain = import.meta.url.includes(arg.replace(/\\/g, "/"));
  }
} catch {
  isMain = false;
}
if (isMain) {
  scrapek2().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}