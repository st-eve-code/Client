import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site, POD_KITS_COLLECTION } from "./config.js";

export const scrapePodVapeKits = createShopifyCollectionScraper({
  site,
  category: "pod-vape-kits",
  label: "Pod Vape Kits",
  collection: POD_KITS_COLLECTION,
});