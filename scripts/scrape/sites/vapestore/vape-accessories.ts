import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site } from "./config.js";

export const vapeAccessories = createShopifyCollectionScraper({
  site,
  category: "vape-accessories",
  label: "Vape Accessories",
  collections: ["vape-accessories", "accessories-batteries"],
});