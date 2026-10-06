import type { CategoryScraper } from "./lib/types.js";
import { scrapeVapeKits } from "./sites/vapestore/vape-kits.js";
import { scrapeELiquid } from "./sites/vapestore/e-liquid.js";
import { scrapePodVapeKits } from "./sites/vapestore/pod-vape-kits.js";
import { scrapeCoils } from "./sites/vapestore/coils.js";
import { scrapeVapeTanks } from "./sites/vapestore/vape-tanks.js";

/**
 * Every category scraper registers here.
 * Add one entry per category (site-agnostic: a category may later collect
 * items from several sites) and it becomes runnable through run.ts.
 */
export const scrapers: CategoryScraper[] = [
  scrapeVapeKits,
  scrapeELiquid,
  scrapePodVapeKits,
  scrapeCoils,
  scrapeVapeTanks,
];

export function byCategory(name: string): CategoryScraper | undefined {
  return scrapers.find((s) => s.category === name);
}