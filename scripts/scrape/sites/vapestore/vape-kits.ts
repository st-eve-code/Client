import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site, KITS_COLLECTION } from "./config.js";

export const scrapeVapeKits = createShopifyCollectionScraper({
  site,
  category: "vape-kits",
  label: "Vape Kits",
  collection: KITS_COLLECTION,
});