import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import type { CategoryIndex, ScrapedItem } from "./types.js";

const here = path.dirname(fileURLToPath(import.meta.url));

/** repo root: scripts/scrape/lib -> scripts/scrape -> scripts -> root */
export const ROOT = path.resolve(here, "..", "..", "..");

/** every site writes into this single shared folder */
export const IMAGES_DIR = path.join(ROOT, "data", "scraped", "images");

export const METADATA_DIR = path.join(ROOT, "data", "scraped", "metadata");

export function categoryDir(category: string): string {
  return path.join(METADATA_DIR, category);
}

/** unique across sites while staying in one flat folder */
export function imageFileName(
  site: string,
  slug: string,
  position: number,
  ext: string
): string {
  const n = String(position).padStart(3, "0");
  const cleanExt = (ext || ".jpg").replace(/^\./, "");
  return `${site}__${slug}__${n}.${cleanExt}`;
}

export function imagePath(file: string): string {
  return path.join(IMAGES_DIR, file);
}

export function imageExists(file: string): boolean {
  try {
    return fs.statSync(imagePath(file)).size > 0;
  } catch {
    return false;
  }
}

export async function ensureCategory(category: string): Promise<void> {
  await fs.ensureDir(IMAGES_DIR);
  await fs.ensureDir(categoryDir(category));
}

export async function writeItem(category: string, item: ScrapedItem): Promise<void> {
  const file = path.join(categoryDir(category), `${item.slug}.json`);
  await fs.writeJson(file, item, { spaces: 2 });
}

export async function writeIndex(category: string, index: CategoryIndex): Promise<void> {
  const file = path.join(categoryDir(category), "index.json");
  await fs.writeJson(file, index, { spaces: 2 });
}

/** top-level map of available categories for the main app to call by name */
export async function writeRootIndex(categories: string[]): Promise<void> {
  const entries = [];
  for (const category of categories) {
    try {
      const index = (await fs.readJson(
        path.join(categoryDir(category), "index.json")
      )) as CategoryIndex;
      entries.push({
        category: index.category,
        label: index.label,
        site: index.site,
        source: index.source,
        count: index.count,
        images: index.images,
        scrapedAt: index.scrapedAt,
        path: relFromRoot(categoryDir(category)),
        imagesPath: relFromRoot(IMAGES_DIR),
      });
    } catch {
      // category not scraped yet
    }
  }
  await fs.writeJson(
    path.join(METADATA_DIR, "index.json"),
    { updatedAt: new Date().toISOString(), categories: entries },
    { spaces: 2 }
  );
}

export function relFromRoot(absolute: string): string {
  return path.relative(ROOT, absolute).split(path.sep).join("/");
}
