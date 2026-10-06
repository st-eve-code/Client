import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site, TANKS_COLLECTION } from "./config.js";

export const scrapeVapeTanks = createShopifyCollectionScraper({
  site,
  category: "vape-tanks",
  label: "Vape Tanks",
  collection: TANKS_COLLECTION,
});