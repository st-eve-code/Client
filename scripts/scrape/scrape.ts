/**
 * UNIVERSAL E-COMMERCE SCRAPER — one file, any website.
 * Run:  npx tsx scripts/scrape/scrape.ts <domain> [category-slug...]
 *
 *   npx tsx scripts/scrape/scrape.ts https://www.vapestore.co.uk
 *   npx tsx scripts/scrape/scrape.ts https://someStore.com coils tanks
 *   npx tsx scripts/scrape/scrape.ts https://weedmaps.com flower --max=50
 *
 * Auto-detects platform in order:
 *   0. Weedmaps     → api-g.weedmaps.com discovery API + JSON-LD detail pages
 *   1. Shopify      → /collections.json + /collections/<h>/products.json
 *   2. WooCommerce  → /wp-json/wc/store/v1/products (public Store API, no auth)
 *   3. Generic HTML → sitemap/category pages + CSS selectors (Puppeteer
 *                     fallback for JS-rendered pages)
 *
 * Output (Next.js-ready):
 *   data/scraped/images/<site>__<slug>__<nnn>.<ext>
 *   data/scraped/metadata/<site>/products/<slug>.json
 *   data/scraped/metadata/<site>/index.json
 *   data/scraped/metadata/<site>/collections.json
 */
import axios from "axios";
import * as fs from "fs-extra";
import pLimit from "p-limit";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
const execFileP = promisify(execFile);

/* ---------------------------------------------------------------- */
/*  Tuning                                                          */
/* ---------------------------------------------------------------- */
const CFG = {
  pageDelayMs: 600,
  maxPages: 60,            // per collection/category
  imgConcurrency: 8,
  detailConcurrency: 4,
  timeoutMs: 30_000,
  retries: 3,
  puppeteer: true,
  ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const http = axios.create({
  timeout: CFG.timeoutMs,
  maxRedirects: 5,
  headers: { "User-Agent": CFG.ua, Accept: "*/*" },
  validateStatus: null,
});

/* ------------------------------------------------------------------ */
/*  curl transport — Weedmaps' WAF fingerprints Node's HTTP client and */
/*  answers it with 406 while always serving curl.exe.                 */
/* ------------------------------------------------------------------ */
async function curlGet(url: string, headers: Record<string, string>, maxTime = 30): Promise<{ status: number; body: string }> {
  await wmPace();
  const args = ["-sS", "-L", "--compressed", "--max-time", String(maxTime), "--retry", "1", "--retry-delay", "3", "-A", CFG.ua];
  for (const [k, v] of Object.entries(headers)) args.push("-H", `${k}: ${v}`);
  args.push("-w", "\n__STATUS__%{http_code}", url);
  try {
    const { stdout } = await execFileP("curl.exe", args, { maxBuffer: 64 * 1024 * 1024 });
    const m = stdout.match(/\n__STATUS__(\d+)\s*$/);
    const status = m ? Number(m[1]) : 200;
    const body = m ? stdout.slice(0, m.index) : stdout;
    return { status, body };
  } catch (e: any) {
    if (e.stdout) {
      const got = String(e.stdout).match(/\n__STATUS__(\d+)\s*$/);
      if (got) return { status: Number(got[1]), body: String(e.stdout).slice(0, got.index) };
    }
    return { status: 0, body: "" };
  }
}

async function curlFile(url: string, dest: string, headers: Record<string, string>, maxTime = 60): Promise<boolean> {
  await wmPace();
  const args = ["-sS", "-L", "--compressed", "--max-time", String(maxTime), "--retry", "1", "--retry-delay", "3", "-A", CFG.ua, "-o", dest];
  for (const [k, v] of Object.entries(headers)) args.push("-H", `${k}: ${v}`);
  args.push(url);
  try {
    await execFileP("curl.exe", args, { maxBuffer: 1024 * 1024 });
    return true;
  } catch { return false; }
}

/**
 * Weedmaps request with WAF-aware retries. On a WAF hit (406 / hung socket /
 * 403 / challenge) we stand down WM_COOLDOWN_MS; the pace gate turns that
 * into the wait before the next attempt.
 */
async function wmRequest(
  url: string,
  headers: Record<string, string>,
  opts: { attempts?: number; wafWaitMs?: number; maxTime?: number } = {},
): Promise<{ status: number; body: string }> {
  const attempts = opts.attempts ?? CFG.retries;
  const wafWaitMs = opts.wafWaitMs ?? WM_COOLDOWN_MS;
  for (let attempt = 0; ; attempt++) {
    const r = await curlGet(url, headers, opts.maxTime ?? 30);
    const challenge = r.status === 200 && r.body.includes("Client Challenge");
    const waf = challenge || r.status === 0 || r.status === 406 || r.status === 429 || r.status === 403;
    if (waf) {
      wmNextAt = Math.max(wmNextAt, Date.now() + wafWaitMs);   // pace gate does the waiting
      if (attempt < attempts) continue;
    } else if (r.status >= 500 && attempt < attempts) {
      await sleep(1000 * (attempt + 1));
      continue;
    }
    return challenge ? { status: 406, body: "" } : r;
  }
}

interface GetOpts {
  /** awaited before every attempt — used to pace requests to WAF'd hosts */
  pace?: () => Promise<void>;
  /** fired on every soft failure (406/403/429/challenge/network) so callers can impose a cooldown */
  onSoft?: (status: number) => void;
}

async function get<T = any>(url: string, attempt = 0, opt?: GetOpts, headers?: Record<string, string>): Promise<T> {
  if (opt?.pace) await opt.pace();
  let res: any;
  try { res = await http.get<T>(url, headers ? { headers } : undefined); }
  catch (e: any) { res = { status: 0, data: null, message: e?.message }; }
  const status: number = res.status ?? 0;
  // Weedmaps' WAF answers 406 as a *temporary* rate-limit penalty, hangs the
  // connection outright (status 0), and slips a "Client Challenge" page in
  // behind a 200 — all of them clear after a cooldown.
  const challenge = status === 200 && typeof res.data === "string" && res.data.includes("Client Challenge");
  const soft = challenge || status === 429 || status === 406 || status === 403 || status === 0;
  if (soft || status >= 500) {
    opt?.onSoft?.(status);
    if (attempt < CFG.retries) {
      const base = soft ? 4_000 : 500;
      await sleep(base * 2 ** attempt + Math.random() * 500);
      return get<T>(url, attempt + 1, opt, headers);
    }
    throw new Error(`HTTP ${challenge ? "CHALLENGE" : status}: ${url}`);
  }
  if (status !== 200) throw new Error(`HTTP ${status}: ${url}`);
  return res.data as T;
}

/* ---------------------------------------------------------------- */
/*  Robust text extraction — never crashes on odd shapes           */
/* ---------------------------------------------------------------- */
function htmlToText(input: unknown): string {
  // unwrap { rendered: "..." } (WP REST), { value: "..." }, arrays, numbers
  let html = input;
  if (html && typeof html === "object" && !Array.isArray(html)) {
    const o = html as Record<string, unknown>;
    html = ("rendered" in o ? o.rendered : "value" in o ? o.value : "");
  }
  if (Array.isArray(html)) html = html.join(" ");
  if (typeof html === "number") html = String(html);
  if (typeof html !== "string") return "";

  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ").replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function safeText(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return "";
}

function toPrice(v: unknown): number | undefined {
  if (typeof v === "number" && isFinite(v)) return v;
  const s = safeText(v).replace(/,/g, "");
  const m = s.match(/(\d+)(\.\d{1,2})?/);
  return m ? parseFloat(m[0]) : undefined;
}

const slugify = (s: string) =>
  safeText(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90)
  || `item-${Math.random().toString(36).slice(2, 8)}`;

const abs = (base: string, u?: unknown): string | undefined => {
  const s = safeText(u);
  if (!s) return undefined;
  try { return new URL(s, base).toString(); } catch { return undefined; }
};

/* ---------------------------------------------------------------- */
/*  Output model                                                    */
/* ---------------------------------------------------------------- */
interface Image { url: string; alt: string; local: string | null; webp_local?: string | null }
interface Variant { id?: number | string; title: string; price?: number; sku?: string; available: boolean }
interface Product {
  slug: string; name: string; site: string; category: string;
  price_min?: number; price_max?: number; currency: string; price_range: string;
  available: boolean; sku?: string; vendor?: string; tags: string[];
  description: string; description_html: string; short_description: string;
  images: Image[]; variants: Variant[];
  collections: string[]; source_url?: string; scraped_at: string;
}

class Catalog {
  products = new Map<string, Product>();
  collections: Record<string, string[]> = {};

  upsert(p: Product, collection: string) {
    const existing = this.products.get(p.slug);
    if (existing) {
      if (!existing.collections.includes(collection)) existing.collections.push(collection);
      // merge images not already present
      const have = new Set(existing.images.map((i) => i.url));
      for (const img of p.images) if (!have.has(img.url)) existing.images.push(img);
      return;
    }
    p.collections.push(collection);
    this.products.set(p.slug, p);
  }

  async downloadImages(site: string) {
    const imgDir = path.join("data/scraped/images");
    await fs.ensureDir(imgDir);

    // Weedmaps images: concurrent, resumable (existing files are skipped)
    const prods = [...this.products.values()];
    const wmProds = prods.filter((p) => p.images.some((im) => {
      try { return new URL(im.url).hostname.includes("weedmaps.com"); } catch { return false; }
    }));
    const limiter = pLimit(CFG.imgConcurrency);
    await Promise.all(wmProds.map((p) => limiter(() => saveProductImages(p, site))));

    let total = 0, saved = 0;
    const jobs: Promise<void>[] = [];

    for (const p of prods) {
      p.images.forEach((img, i) => {
        total++;
        let host = "";
        try { host = new URL(img.url).hostname; } catch { host = ""; }
        if (host.includes("weedmaps.com")) {
          // downloaded by saveProductImages() above — just count the files
          if (img.webp_local && img.local === img.webp_local) {
            try { if (fs.statSync(img.webp_local).size > 100) { saved++; return; } } catch { img.local = null; return; }
          }
          img.local = null;
          return;
        }
        jobs.push(limiter(async () => {
          let dest: string;
          try {
            let ext = ".jpg";
            const pe = path.extname(new URL(img.url).pathname).split("?")[0];
            if (pe.length > 1) ext = pe;
            dest = path.join(imgDir, `${site}__${p.slug}__${String(i).padStart(3, "0")}${ext}`);
          }
          catch { img.local = null; return; }
          img.local = dest;
          if (await fs.pathExists(dest)) { saved++; return; }
          try {
            const res = await http.get(img.url, { responseType: "arraybuffer", headers: { Accept: "image/*" } });
            const buf = Buffer.from(res.data as any);
            if (buf.length >= 100) { await fs.outputFile(dest, buf); saved++; }
            else img.local = null;
          } catch { img.local = null; }
        }));
      });
    }
    await Promise.all(jobs);
    console.log(`🖼  images: ${saved}/${total} → ${imgDir}`);
  }

  async write(site: string) {
    const all = [...this.products.values()];
    const prodDir = path.join("data/scraped/metadata", site, "products");
    await fs.ensureDir(prodDir);
    await Promise.all(all.map((p) => fs.outputJson(path.join(prodDir, `${p.slug}.json`), p, { spaces: 2 })));
    await fs.outputJson(path.join("data/scraped/metadata", site, "index.json"), all, { spaces: 2 });
    await fs.outputJson(path.join("data/scraped/metadata", site, "collections.json"), this.collections, { spaces: 2 });
    console.log(`✅ ${all.length} products → ${prodDir}/ + index.json`);
  }
}

function priceRange(min?: number, max?: number, cur = "GBP"): string {
  if (min == null) return "";
  const s = (n: number) => `${cur === "USD" ? "$" : cur === "EUR" ? "€" : "£"}${n.toFixed(2)}`;
  return min === max ? s(min) : `${s(min)} – ${s(max ?? min)}`;
}

/* ---------------------------------------------------------------- */
/*  Engine 1: Shopify                                               */
/* ---------------------------------------------------------------- */
async function scrapeShopify(domain: string, site: string, cat: Catalog, only?: string[]) {
  // discover collections
  const cols: { handle: string; title: string }[] = [];
  for (let page = 1; ; page++) {
    let data: any;
    try { data = await get(`${domain}/collections.json?limit=250&page=${page}`); }
    catch { break; }
    const list = (data?.collections ?? []) as any[];
    if (!list.length) break;
    for (const c of list) cols.push({ handle: safeText(c.handle), title: safeText(c.title) });
    if (list.length < 250) break;
    await sleep(CFG.pageDelayMs);
  }
  console.log(`🔍 Shopify: ${cols.length} collections`);

  for (const col of cols) {
    if (only?.length && !only.includes(col.handle)) continue;
    const handles: string[] = [];
    for (let page = 1; page <= CFG.maxPages; page++) {
      let products: any[];
      try {
        products = (await get(`${domain}/collections/${col.handle}/products.json?limit=250&page=${page}`))?.products ?? [];
      } catch (e) { console.warn(`  ⚠ ${col.handle} p${page}: ${(e as Error).message}`); break; }
      if (!products.length) break;

      for (const p of products) {
        const slug = slugify(p.handle || p.title);
        const variants: Variant[] = (Array.isArray(p.variants) ? p.variants : []).map((v: any) => ({
          id: v.id, title: safeText(v.title) || "Default",
          price: toPrice(v.price), sku: safeText(v.sku) || undefined, available: !!v.available,
        }));
        const prices = variants.map(v => v.price).filter((n): n is number => n != null);
        const images: Image[] = (Array.isArray(p.images) ? p.images : [])
          .map((i: any) => ({ url: abs(domain, i.src ?? i) ?? "", alt: safeText(i.alt) }))
          .filter((i: Image) => i.url);
        const currency = safeText(p.variants?.[0]?.price_currency_code) || "GBP";

        cat.upsert({
          slug, name: safeText(p.title) || slug, site,
          category: col.handle,
          price_min: prices.length ? Math.min(...prices) : undefined,
          price_max: prices.length ? Math.max(...prices) : undefined,
          currency, price_range: priceRange(
            prices.length ? Math.min(...prices) : undefined,
            prices.length ? Math.max(...prices) : undefined, currency),
          available: variants.some(v => v.available),
          sku: variants[0]?.sku, vendor: safeText(p.vendor) || undefined,
          tags: Array.isArray(p.tags) ? p.tags : safeText(p.tags) ? safeText(p.tags).split(",").map(t => t.trim()) : [],
          description: htmlToText(p.body_html),
          description_html: typeof p.body_html === "string" ? p.body_html : "",
          short_description: "",
          images, variants,
          collections: [], source_url: `${domain}/products/${p.handle}`,
          scraped_at: new Date().toISOString(),
        }, col.handle);
        handles.push(slug);
      }
      process.stdout.write(`  📄 ${col.handle} p${page}: +${products.length}\r`);
      if (products.length < 250) break;
      await sleep(CFG.pageDelayMs);
    }
    cat.collections[col.handle] = handles;
    console.log(`  ✔ ${col.handle}: ${handles.length}`);
  }
}

/* ---------------------------------------------------------------- */
/*  Engine 2: WooCommerce Store API (public, no auth)               */
/* ---------------------------------------------------------------- */
async function scrapeWooCommerce(domain: string, site: string, cat: Catalog, only?: string[]) {
  // discover categories
  let categories: { id: number; slug: string; name: string }[] = [];
  try {
    const raw = await get(`${domain}/wp-json/wc/store/v1/product-categories?per_page=100`);
    categories = (Array.isArray(raw) ? raw : [])
      .filter((c: any) => c && c.id != null && c.slug)
      .map((c: any) => ({ id: Number(c.id), slug: safeText(c.slug), name: safeText(c.name) }));
  } catch { /* fall through to unfiltered scrape */ }
  console.log(`🔍 WooCommerce: ${categories.length} categories`);

  async function fetchCategory(categoryId?: number, slug = "all") {
    const handles: string[] = [];
    for (let page = 1; page <= CFG.maxPages; page++) {
      const q = new URLSearchParams({ per_page: "100", page: String(page) });
      if (categoryId != null) q.set("category", String(categoryId));
      let items: any[];
      try {
        items = await get(`${domain}/wp-json/wc/store/v1/products?${q}`);
      } catch (e) { console.warn(`  ⚠ ${slug} p${page}: ${(e as Error).message}`); break; }
      if (!Array.isArray(items) || !items.length) break;

      for (const p of items) {
        if (!p || typeof p !== "object") continue;
        const name = safeText(p.name) || safeText(p.slug);
        if (!name) continue;
        const slug2 = slugify(safeText(p.slug) || name);
        const prices = p.prices ?? {};
        const currency = safeText(prices.currency_code) || "GBP";
        // Store API returns integer minor units (1250 = £12.50)
        const factor = 10 ** (Number.isFinite(Number(prices.currency_minor_unit)) ? Number(prices.currency_minor_unit) : 2);
        const toMajor = (v: unknown) => { const n = toPrice(v); return n == null ? undefined : n / factor; };
        const min = toMajor(prices.price);
        const max = toMajor(prices.regular_price) ?? min;
        const images: Image[] = (Array.isArray(p.images) ? p.images : [])
          .map((i: any) => ({ url: abs(domain, typeof i === "string" ? i : i?.src) ?? "", alt: safeText(typeof i === "object" ? i?.alt : "") }))
          .filter((i: Image) => i.url);
        const variants: Variant[] = Array.isArray(p.variations)
          ? p.variations.map((v: any, i: number) => ({
              id: typeof v === "object" ? v.id : v,
              title: safeText(typeof v === "object" ? v.description : "") || `Variant ${i + 1}`,
              price: toMajor(typeof v === "object" ? v.prices?.price : undefined) ?? min,
              available: typeof v === "object" ? v.is_purchasable !== false : true,
            }))
          : [];

        cat.upsert({
          slug: slug2, name, site,
          category: safeText(categories.find(c => c.id === categoryId)?.slug) || slug,
          price_min: min, price_max: max, currency,
          price_range: priceRange(min, max, currency),
          available: p.is_purchasable !== false && p.is_in_stock !== false,
          sku: safeText(p.sku) || undefined,
          vendor: safeText((p as any).brands?.[0]?.name) || undefined,
          tags: Array.isArray((p as any).tags) ? (p as any).tags.map((t: any) => safeText(t?.name ?? t)) : [],
          description: htmlToText(p.description),
          description_html: typeof p.description === "string" ? p.description : "",
          short_description: htmlToText(p.short_description),
          images, variants,
          collections: [], source_url: abs(domain, p.permalink),
          scraped_at: new Date().toISOString(),
        }, slug);
        handles.push(slug2);
      }
      process.stdout.write(`  📄 ${slug} p${page}: +${items.length}\r`);
      if (items.length < 100) break;
      await sleep(CFG.pageDelayMs);
    }
    cat.collections[slug] = handles;
    console.log(`  ✔ ${slug}: ${handles.length}`);
  }

  const wanted = only?.length ? categories.filter(c => only.includes(c.slug)) : categories;
  if (wanted.length) {
    for (const c of wanted) await fetchCategory(c.id, c.slug);
  } else {
    // single unfiltered pass across the whole store
    await fetchCategory(undefined, "all");
  }
}

/* ---------------------------------------------------------------- */
/*  Engine 3: Generic HTML + Puppeteer fallback                     */ 
/* ---------------------------------------------------------------- */
async function renderedHtml(url: string): Promise<string> {
  const { default: puppeteer } = await import("puppeteer");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent(CFG.ua);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45_000 });
    return await page.content();
  } finally { await browser.close(); }
}

async function getDoc(url: string) {
  let html = "";
  try { html = String(await get(url)); } catch { html = ""; }
  if ((!html || html.length < 40_000 || !/product|price/i.test(html)) && CFG.puppeteer) {
    console.log("    ↳ JS-rendered → Puppeteer fallback");
    html = await renderedHtml(url);
  }
  const cheerio = await import("cheerio");
  return cheerio.load(html);
}

const WOO_HINTS = [/wp-content/i, /\/wp-json\//, "woocommerce"];
async function scrapeGeneric(domain: string, site: string, cat: Catalog, only?: string[]) {
  const $ = await getDoc(domain);
  const body = $("body").html() ?? "";
  if (WOO_HINTS.some(h => typeof h === "string" ? body.toLowerCase().includes(h) : h.test(body))) {
    console.log("↻ looks like WooCommerce → switching to Store API");
    return scrapeWooCommerce(domain, site, cat, only);
  }

  // heuristics for common product-card markup
  const cardSel = "li.product, article.product, div.product-card, ul.products li, .type-product";
  const pages = [`${domain}/shop/`, `${domain}/shop`, `${domain}/store/`, domain];
  let found = false;

  for (const start of pages) {
    for (let page = 1; page <= (found ? CFG.maxPages : 1); page++) {
      const url = page === 1 ? start : `${start}${start.includes("?") ? "&" : "?"}page=${page}`;
      let d: Awaited<ReturnType<typeof getDoc>>;
      try { d = await getDoc(url); } catch { break; }
      const cards = d(cardSel).toArray();
      if (!cards.length) break;
      found = true;

      for (const card of cards) {
        const name = d(card).find("h2, .woocommerce-loop-product__title, .product-title").first().text().trim();
        const link = abs(url, d(card).find("a").first().attr("href"));
        const imgEl = d(card).find("img").first();
        const image = abs(url,
          imgEl.attr("src") || imgEl.attr("data-src") || imgEl.attr("data-lazy-src")
          || imgEl.attr("data-original") || imgEl.attr("srcset")?.split(" ")[0]);
        const priceText = d(card).find(".price, .woocommerce-Price-amount").first().text().trim();
        if (!name || (!link && !image)) continue;
        const min = toPrice(priceText);
        const currency = /£/.test(priceText) ? "GBP" : /\$/.test(priceText) ? "USD" : /€/.test(priceText) ? "EUR" : "GBP";
        cat.upsert({
          slug: slugify(name), name, site, category: "all",
          price_min: min, price_max: min, currency,
          price_range: priceRange(min, min, currency), available: !/out of stock/i.test(priceText),
          description: "", description_html: "", short_description: "",
          tags: [],
          images: image ? [{ url: image, alt: name, local: null }] : [],
          variants: [], collections: [], source_url: link ?? undefined,
          scraped_at: new Date().toISOString(),
        }, "all");
      }
      await sleep(CFG.pageDelayMs);
    }
    if (found) break;
  }

  // detail pass for full descriptions
  if (found) {
    console.log(`🔍 fetching detail pages for descriptions…`);
    const limiter = pLimit(CFG.detailConcurrency);
    await Promise.all([...cat.products.values()].map(p => limiter(async () => {
      if (!p.source_url) return;
      try {
        const d = await getDoc(p.source_url);
        const desc = d(".woocommerce-Tabs-panel, #tab-description, .product-description, .entry-content").first().text().trim()
          || safeText(d('meta[name="description"]').attr("content"));
        p.description = desc || p.description;
        p.description_html = d("#tab-description").html() ?? "";
        await sleep(CFG.pageDelayMs / 2);
      } catch { /* keep whatever we have */ }
    })));
  }
  cat.collections["all"] = [...cat.products.keys()];
}

/* ---------------------------------------------------------------- */
/*  Engine 4: Weedmaps (public discovery API + SSR detail pages)     */
/* ---------------------------------------------------------------- */
const WM_API_BASE = "https://api-g.weedmaps.com/discovery/v1";
const WM_RADIUS_MI = 100;
const WM_PAGE_SIZE = 50;
const WM_OFFSET_CAP = 10_000;          // API refuses offset >= 10000
const WM_MIN_GAP_MS = 800;             // default spacing between any two Weedmaps requests
const WM_COOLDOWN_MS = 20_000;         // stand-down after a WAF hit (406 / hung socket)
const WM_MAX_IMAGES = 8;
/** legal-market hubs — the catalog is geo-partitioned, so one point per region */
const WM_HUBS: [number, number][] = [
  [34.05, -118.24],  // Los Angeles
  [40.71, -74.01],   // New York
  [39.74, -104.99],  // Denver
  [41.88, -87.63],   // Chicago
  [47.61, -122.33],  // Seattle
  [33.45, -112.07],  // Phoenix
  [42.33, -83.05],   // Detroit
  [42.36, -71.06],   // Boston
];
const WM_FALLBACK_CATEGORIES = [
  "flower", "pre-roll", "infused-pre-roll", "vape-pens", "concentrates",
  "edibles", "beverages", "wellness", "gear", "cultivation",
];

interface WmFlags { max: number; detail: boolean; hubs: [number, number][]; gap: number; img: number }

/** global gate: every Weedmaps request in this process starts through here */
let wmNextAt = 0;
let wmGapMs = WM_MIN_GAP_MS;
let wmImgWidth = 800;   // imgix downscale width — the CDN throttles to ~4KB/s per IP
async function wmPace() {
  const now = Date.now();
  const at = Math.max(now, wmNextAt);
  wmNextAt = at + wmGapMs;
  if (at > now) await sleep(at - now);
}

function wmProduct(p: any, category: string, site: string): Product | null {
  const name = safeText(p?.name);
  const slug = slugify(safeText(p?.slug) || name);
  if (!name || !slug) return null;
  const min = typeof p?.price_stats?.min === "number" ? p.price_stats.min : undefined;
  const max = typeof p?.price_stats?.max === "number" ? p.price_stats.max : min;
  const currency = "USD";
  const brandSlug = safeText(p?.brand?.slug);
  const image = abs("https://weedmaps.com", p?.avatar_image_url);
  const vp = p?.variant?.price;

  return {
    slug, name, site,
    category: safeText(p?.edge_category?.slug) || category,
    price_min: min, price_max: max, currency, price_range: priceRange(min, max, currency),
    available: true,
    vendor: safeText(p?.brand?.name) || undefined,
    tags: [],
    description: "", description_html: "", short_description: "",
    images: image ? [{ url: image, alt: name, local: null }] : [],
    variants: vp ? [{
      id: vp.id, title: safeText(vp.label) || "Default",
      price: typeof vp.price === "number" ? vp.price : toPrice(vp.price),
      sku: safeText(vp.id) || undefined, available: true,
    }] : [],
    collections: [],
    source_url: brandSlug
      ? `https://weedmaps.com/brands/${brandSlug}/products/${p.slug}`
      : undefined,
    scraped_at: new Date().toISOString(),
  };
}

async function wmApi(path: string, hub: [number, number] | null, params: Record<string, string>): Promise<any> {
  const sp = new URLSearchParams();
  if (hub) {
    sp.set("latlng[latitude]", String(hub[0]));
    sp.set("latlng[longitude]", String(hub[1]));
    sp.set("filter[bounding_radius]", `${WM_RADIUS_MI}mi`);
  }
  for (const [k, v] of Object.entries(params)) sp.append(k, v);
  const url = `${WM_API_BASE}${path}?${sp}`;
  const r = await wmRequest(url, { Accept: "application/json" });
  if (r.status !== 200) throw new Error(`HTTP ${r.status}: ${url}`);
  try { return JSON.parse(r.body); } catch { return null; }
}

async function wmGet(hub: [number, number], params: Record<string, string>): Promise<any> {
  return wmApi("/clp/explore_products", hub, params);
}

/**
 * Full product detail — description, gallery, tags — served by the fast
 * api-g host, fetched via the friendly curl fingerprint.
 */
async function wmDetail(p: Product) {
  if (!p.slug) return;
  let d: any;
  try { d = await wmApi(`/products/${encodeURIComponent(p.slug)}`, null, {}); } catch { return; }
  const data = d?.data?.product;
  if (!data) return;

  const desc = data.description;
  if (typeof desc === "string" && desc.trim()) {
    p.description_html = desc;
    p.description = htmlToText(desc);
  }
  if (Array.isArray(data.gallery_image_urls)) {
    const have = new Set(p.images.map((i) => i.url));
    for (const u of data.gallery_image_urls) {
      if (p.images.length >= WM_MAX_IMAGES) break;
      const url = abs(p.source_url ?? "https://weedmaps.com", u);
      if (!url || have.has(url)) continue;
      have.add(url);
      p.images.push({ url, alt: p.name, local: null });
    }
  }
  if (Array.isArray(data.tags)) {
    p.tags = data.tags
      .map((t: any) => safeText(t?.name))
      .filter(Boolean);
  }
  const cat = data.edge_client_category;
  if (cat?.category_slug) p.category = safeText(cat.category_slug);
}

/**
 * Downloads one product's images (imgix → downscaled webp, skips existing
 * files so interrupted runs never redo work). Called during the detail pass.
 */
async function saveProductImages(p: Product, site: string): Promise<void> {
  if (!p.images.length) return;
  const imgDir = path.join("data/scraped/images");
  await fs.ensureDir(imgDir);
  let idx = 0;
  for (const img of p.images) {
    let host = "";
    try { host = new URL(img.url).hostname; } catch { host = ""; }
    if (!host.includes("weedmaps.com")) { idx++; continue; }
    const pad = String(idx).padStart(3, "0");
    const dest = path.join(imgDir, `${site}__${p.slug}__${pad}.webp`);
    const dl = img.url.includes("?") ? "&" : "?";
    const scaled = `${img.url}${dl}w=${wmImgWidth}&fit=min&fm=webp&auto=compress`;
    img.webp_local = dest;
    if (await fs.pathExists(dest)) {
      img.local = dest;
      idx++;
      continue;
    }
    const ok = await curlFile(scaled, dest, { Accept: "image/webp" });
    if (ok) {
      try {
        if ((await fs.stat(dest)).size > 100) {
          img.local = dest;
          idx++;
          continue;
        }
      } catch { /* fall through */ }
    }
    img.local = null;
    idx++;
  }
}

async function scrapeWeedmaps(domain: string, site: string, cat: Catalog, only: string[], flags: WmFlags) {
  const hubs = flags.hubs.length ? flags.hubs : WM_HUBS;
  wmGapMs = flags.gap;
  wmImgWidth = flags.img;

  // discover top-level categories (level 1 client categories) from the facets payload
  let categories: string[] = [];
  try {
    const facet = await wmGet(hubs[0], { limit: "1", "include[]": "facets.categories" });
    categories = (facet?.data?.facets?.client_categories ?? [])
      .filter((c: any) => Number(c?.level) === 1)
      .map((c: any) => safeText(c?.category_slug))
      .filter(Boolean);
  } catch { /* fall back to the known list */ }
  if (!categories.length) categories = [...WM_FALLBACK_CATEGORIES];

  const wanted = only.length ? only : categories;
  console.log(`🔍 Weedmaps: ${wanted.length} categories × ${hubs.length} hubs${flags.max ? ` (max ${flags.max} products)` : ""}`);

  for (const category of wanted) {
    if (flags.max && cat.products.size >= flags.max) break;
    const seen = new Set<string>();

    for (const hub of hubs) {
      if (flags.max && cat.products.size >= flags.max) break;
      let offset = 0, stale = 0;

      for (;;) {
        let page: any;
        try {
          page = await wmGet(hub, {
            "filter[any_client_categories][]": category,
            limit: String(WM_PAGE_SIZE),
            offset: String(offset),
          });
        } catch (e) { console.warn(`  ⚠ ${category} offset ${offset}: ${(e as Error).message}`); break; }

        const items = page?.data?.products;
        if (!Array.isArray(items) || !items.length) break;

        let fresh = 0;
        for (const raw of items) {
          const p = wmProduct(raw, category, site);
          if (!p) continue;
          seen.add(p.slug);
          const isNew = !cat.products.has(p.slug);
          cat.upsert(p, category);
          if (isNew) {
            fresh++;
            // persist immediately so a killed run never loses catalog data
            await fs.ensureDir(path.join("data/scraped/metadata", site, "products"));
            await fs.outputJson(path.join("data/scraped/metadata", site, "products", `${p.slug}.json`), p, { spaces: 2 });
          }
        }
        // a second consecutive page with nothing new means this hub is covered
        if (fresh) stale = 0; else if (++stale >= 2) break;

        process.stdout.write(`  📄 ${category} +${fresh} → ${cat.products.size} unique (offset ${offset})\r`);
        offset += WM_PAGE_SIZE;
        const total = Math.min(Number(page?.meta?.total_products_count) || 0, WM_OFFSET_CAP);
        if (offset >= total) break;
        if (flags.max && cat.products.size >= flags.max) break;
        await sleep(Math.random() * 300);   // the global gap already paces us
      }
    }
    cat.collections[category] = [...seen];
    console.log(`  ✔ ${category}: ${seen.size} listings, catalog total ${cat.products.size}`);
  }

  if (flags.detail) {
    const targets = [...cat.products.values()].filter((p) => p.source_url);
    console.log(`🔎 detail pages for ${targets.length} products…`);
    // one page at a time: the WAF hangs bursts to weedmaps.com
    for (const [i, p] of targets.entries()) {
      await wmDetail(p);
      // persist per product so an interrupted run keeps its detail data
      await fs.ensureDir(path.join("data/scraped/metadata", site, "products"));
      await fs.outputJson(path.join("data/scraped/metadata", site, "products", `${p.slug}.json`), p, { spaces: 2 });
      if ((i + 1) % 25 === 0) process.stdout.write(`  🔎 ${i + 1}/${targets.length}\r`);
      if ((i + 1) % 250 === 0) { try { await cat.write(site); } catch { /* non-fatal */ } }
    }
    console.log(`  ✔ details done (${targets.length})`);
  }
}

/* ---------------------------------------------------------------- */
/*  MAIN                                                            */
/* ---------------------------------------------------------------- */
async function main() {
  const argv = process.argv.slice(2);
  const domain = argv[0]?.replace(/\/+$/, "");
  if (!domain || !/^https?:\/\//.test(domain)) {
    console.error('Usage: npx tsx scripts/scrape/scrape.ts <https://domain> [category-slug...] [--max=N] [--no-detail] [--hub=lat,lng] [--gap=ms] [--img=w]');
    process.exit(1);
  }
  const site = slugify(new URL(domain).hostname.replace(/^www\./, ""));
  const cat = new Catalog();

  const flags: WmFlags = { max: 0, detail: true, hubs: [], gap: WM_MIN_GAP_MS, img: 800 };
  const only: string[] = [];
  for (const a of argv.slice(1)) {
    if (a.startsWith("--max=")) flags.max = Math.max(0, Number(a.slice(6)) || 0);
    else if (a === "--no-detail") flags.detail = false;
    else if (a.startsWith("--gap=")) {
      flags.gap = Math.max(100, Number(a.slice(6)) || WM_MIN_GAP_MS);
    } else if (a.startsWith("--img=")) {
      flags.img = Math.max(64, Number(a.slice(6)) || 800);
    } else if (a.startsWith("--hub=")) {
      const [la, lo] = a.slice(6).split(",").map(Number);
      if (isFinite(la) && isFinite(lo)) flags.hubs.push([la, lo]);
    } else only.push(a.replace(/^\/+|\/+$/g, ""));
  }

  console.log(`▶ scraping ${domain} → site "${site}"`);
  const isWeedmaps = /(^|\.)weedmaps\.com$/i.test(new URL(domain).host);

  if (isWeedmaps) {
    await scrapeWeedmaps(domain, site, cat, only, flags);
  } else {
    const probe = await get(`${domain}/collections.json?page=1`).catch(() => null);
    const isShopify = !!(probe && Array.isArray((probe as any)?.collections));
    const wooProbe = await get(`${domain}/wp-json/wc/store/v1/products?per_page=1`).catch(() => null);
    const isWoo = Array.isArray(wooProbe);

    if (isShopify) await scrapeShopify(domain, site, cat, only);
    else if (isWoo) await scrapeWooCommerce(domain, site, cat, only);
    else await scrapeGeneric(domain, site, cat, only);
  }

  await cat.downloadImages(site);
  await cat.write(site);
  console.log(`\n🎉 done — ${cat.products.size} unique products`);
}

main().catch((e) => { console.error("✖ fatal:", e); process.exit(1); });
