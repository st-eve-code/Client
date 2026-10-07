const TILES = [
  {
    title: "Prefilled Pod Kits",
    body: "Your favourite flavours in a compact, easy-to-use pod vape.",
    cta: "Shop Pods",
    dark: true,
  },
  {
    title: "Big Puff Vapes",
    body: "Up to 10,000 puffs of non-stop flavour in a pocket-friendly device.",
    cta: "Shop Vapes",
    dark: false,
  },
];

export function PromoTiles() {
  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-11">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TILES.map((tile) => (
            <a
              key={tile.title}
              href="#"
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
                <p className="text-sm text-white/80 leading-[1.6] opacity-80">
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}