import { createShopifyCollectionScraper } from "../../lib/shopify.js";
import { site } from "./config.js";

export const nicotineGum = createShopifyCollectionScraper({
  site,
  category: "nicotine-gum",
  label: "Nicotine Gum & Strips",
  collections: ["nicotine-gum", "nicotine-strips"],
});