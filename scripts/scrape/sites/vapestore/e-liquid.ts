import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site, E_LIQUID_COLLECTION } from "./config.js";

export const scrapeELiquid = createShopifyCollectionScraper({
  site,
  category: "e-liquid",
  label: "E-Liquid",
  collection: E_LIQUID_COLLECTION,
});