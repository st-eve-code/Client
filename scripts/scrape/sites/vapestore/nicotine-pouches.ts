import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site } from "./config.js";

export const nicotinePouches = createShopifyCollectionScraper({
  site,
  category: "nicotine-pouches",
  label: "Nicotine Pouches",
  collection: "nicotine-pouches",
});