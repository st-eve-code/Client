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
    count: number;
    images: number;
  }>;
}

export function imageSrc(file: string): string {
  return `/api/img/${encodeURIComponent(file)}`;
}

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

export function priceLabel(item: CatalogItem): string {
  if (!item.price) return "";
  const { min, max, currency } = item.price;
  const symbol = currency === "GBP" ? "\u00a3" : currency + " ";
  if (min === max) return `${symbol}${min.toFixed(2)}`;
  return `${symbol}${min.toFixed(2)} \u2013 ${symbol}${max.toFixed(2)}`;
}