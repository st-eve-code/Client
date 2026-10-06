export const site = {
  id: "vapestore",
  label: "Vapestore",
  baseUrl: "https://www.vapestore.co.uk",
} as const;

/**
 * The "Vape Kits" mega-menu resolves to the "View All Vape Kits" collection.
 * Sub-menus (Pod Kits, Sub Ohm, Box Mods, ...) are subsets of it, so this
 * single collection is the superset for the category.
 */
export const KITS_COLLECTION = "vape-kits-mods-vape-kits";
export const E_LIQUID_COLLECTION = "e-liquid";
export const POD_KITS_COLLECTION = "pod-vape-kits";
export const COILS_COLLECTION = "coils";
export const TANKS_COLLECTION = "vape-tanks";
