import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site, COILS_COLLECTION } from "./config.js";

export const scrapeCoils = createShopifyCollectionScraper({
  site,
  category: "coils",
  label: "Coils",
  collection: COILS_COLLECTION,
});