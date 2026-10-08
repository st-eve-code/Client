import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site } from "./config.js";

export const prefilledPods = createShopifyCollectionScraper({
  site,
  category: "prefilled-pods",
  label: "Prefilled Pods",
  collection: "e-liquid-vape-type-refills-and-pods-e-liquid",
});