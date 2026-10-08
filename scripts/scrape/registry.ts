import type { CategoryScraper } from "./lib/types.js";
import { scrapeVapeKits } from "./sites/vapestore/vape-kits.js";
import { scrapePodVapeKits } from "./sites/vapestore/pod-vape-kits.js";
import { scrapeELiquid } from "./sites/vapestore/e-liquid.js";
import { scrapeCoils } from "./sites/vapestore/coils.js";
import { scrapeVapeTanks } from "./sites/vapestore/vape-tanks.js";
import { refillablePods } from "./sites/vapestore/refillable-pods.js";
import { prefilledPods } from "./sites/vapestore/prefilled-pods.js";
import { nicotinePouches } from "./sites/vapestore/nicotine-pouches.js";
import { nicotineGum } from "./sites/vapestore/nicotine-gum.js";
import { vapeAccessories } from "./sites/vapestore/vape-accessories.js";

/**
 * Every category scraper registers here.
 * Add one entry per category (site-agnostic: a category may later collect
 * items from several sites) and it becomes runnable through run.ts.
 */
export const scrapers: CategoryScraper[] = [
  scrapeVapeKits,
  scrapePodVapeKits,
  scrapeELiquid,
  scrapeCoils,
  scrapeVapeTanks,
  refillablePods,
  prefilledPods,
  nicotinePouches,
  nicotineGum,
  vapeAccessories,
];

export function byCategory(name: string): CategoryScraper | undefined {
  return scrapers.find((s) => s.category === name);
}