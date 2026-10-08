import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site } from "./config.js";

export const refillablePods = createShopifyCollectionScraper({
  site,
  category: "refillable-pods",
  label: "Refillable Pods",
  collection: "vape-tanks-vape-tanks-refillable-pods",
});