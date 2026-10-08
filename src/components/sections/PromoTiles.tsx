import Link from "next/link";
import { getCategories } from "@/lib/catalog";

// Preferred category slugs for the two promo tiles, in order of priority.
// The first live match for each slot wins; the static fallback is used when
// no scraped data is available yet.
const SLOT_CANDIDATES = [
  // dark tile — pod / prefilled products
  {
    slugs: ["prefilled-pods", "pod-vape-kits", "vape-kits"],
    fallbackTitle: "Prefilled Pod Kits",
    fallbackBody: "Your favourite flavours in a compact, easy-to-use pod vape.",
    cta: "Shop Pods",
    dark: true,
  },
  // light tile — e-liquids / accessories
  {
    slugs: ["e-liquid", "vape-kits", "vape-accessories"],
    fallbackTitle: "Big Puff Vapes",
    fallbackBody: "Up to 10,000 puffs of non-stop flavour in a pocket-friendly device.",
    cta: "Shop Now",
    dark: false,
  },
] as const;

export async function PromoTiles() {
  const categories = await getCategories();
  const bySlug = new Map(categories.map((c) => [c.slug, c]));

  const tiles = SLOT_CANDIDATES.map((slot) => {
    const live = slot.slugs.find((s) => bySlug.has(s));
    const cat = live ? bySlug.get(live)! : null;
    return {
      title: cat ? cat.label : slot.fallbackTitle,
      body: cat
        ? `${cat.count.toLocaleString()} products available now.`
        : slot.fallbackBody,
      cta: slot.cta,
      href: cat ? `/shop/${cat.slug}` : "/shop",
      dark: slot.dark,
    };
  });

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-11">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className={`group flex flex-col justify-between rounded-[var(--radius-12)] p-7 min-h-[200px] transition-all duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] hover:-translate-y-1 ${
                tile.dark
                  ? "bg-[#111f2a] text-white"
                  : "bg-[#d3fdc7] text-[#111f2a]"
              }`}
            >
              <div>
                <h3 className="text-[var(--text-heading-sm)] leading-[1.3] font-extrabold mb-2">
                  {tile.title}
                </h3>
                <p
                  className={`text-sm leading-[1.6] opacity-80 ${
                    tile.dark ? "text-white/80" : "text-[#111f2a]/70"
                  }`}
                >
                  {tile.body}
                </p>
              </div>
              <span
                className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${
                  tile.dark ? "text-[#91f974]" : "text-[#5eb047]"
                }`}
              >
                {tile.cta}
                <span className="transition-transform duration-[var(--duration-moderate)] group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
