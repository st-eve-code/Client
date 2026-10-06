export interface ScrapedImage {
  /** filename inside the shared data/scraped/images folder */
  file: string;
  /** original remote url */
  url: string;
  position: number;
  width?: number;
  height?: number;
  downloaded: boolean;
}

export interface ScrapedItem {
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
  options?: Array<{ name: string; values: string[] }>;
  variants?: Array<{ title: string; sku?: string; price: number }>;
  images: ScrapedImage[];
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

export interface CategoryScraper {
  category: string;
  label: string;
  site: string;
  run(): Promise<CategoryIndex>;
}
