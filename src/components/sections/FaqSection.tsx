const FAQS = [
  {
    q: "How is Vaping an Alternative to Smoking?",
    a: "Vaping delivers nicotine through inhaled vapour instead of burning tobacco. It removes tar, carbon monoxide and the thousands of chemicals produced by combustion, while keeping a familiar hand-to-mouth ritual. Many use it as a stepping stone to cut down or quit smoking.",
  },
  {
    q: "Which Vape Kit Should I Choose?",
    a: "Start with a pod kit for a simple, mouth-to-lung draw that feels closest to smoking. If you want bigger clouds and stronger flavour, a sub-ohm kit pairs with high-VG shortfills. Your nicotine strength and preferred inhale style decide the kit, not the other way around.",
  },
  {
    q: "Top Prefilled Pod Vape to use in 2026?",
    a: "The strongest trend is prefilled pod devices from Elf Bar, Lost Mary and IVG \u2013 easy refills, consistent coils and great flavour. Check our trending products for the current best sellers and the latest launches.",
  },
  {
    q: "Which E-Liquid Should I Use?",
    a: "Match your kit to the liquid. Pod kits and mouth-to-lung devices want 50/50 or high-PG liquids; sub-ohm kits want high-VG shortfills. Nicotine salts are smoother and suit low-wattage pod kits, while freebase nicotine suits higher-powered devices.",
  },
  {
    q: "Which Nicotine Strength Is Right For Me?",
    a: "A light smoker needs 3-6mg, a moderate smoker 6-12mg and a heavy smoker 18-20mg (or a 10/20mg nic salt in a pod kit). You can always step down over time \u2013 most vapers start high and reduce gradually.",
  },
  {
    q: "How To Choose The Best E-Liquid Flavour",
    a: "Fruit and menthol flavours are the most beginner-friendly and easiest to switch between. Dessert and bakery flavours suit shorter sessions. Start with a small bottle or a multi-buy deal to find your favourites without committing.",
  },
  {
    q: "What Vape Coils Do I Need To Use?",
    a: "Coils are rated in ohms. Above 1.0\u03a9 gives a tight MTL draw for 50/50 liquids; below 0.5\u03a9 gives a loose, cloud-heavy draw for high-VG liquids. Any 0.6-0.9\u03a9 coil is a versatile middle ground.",
  },
  {
    q: "What Are Box Mods?",
    a: "Box mods are powerful, refillable vape devices with replaceable coils or tanks. They give you adjustable wattage and big battery capacity, ideal for sub-ohm vaping and long sessions. Most are more advanced than pod kits but far more customisable.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="mx-auto max-w-[975px] px-4 py-[36px]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-bold text-[var(--color-text-primary)] mb-2">
              FAQs
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Everything you need to know before you vape.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:underline"
          >
            Got a question? Contact Us
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-[var(--radius-8)] border border-[var(--color-border)] bg-white px-5 py-4 open:bg-[var(--color-bg-surface)] transition-colors duration-[var(--duration-base)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-bold text-[var(--color-text-primary)]">
                {faq.q}
                <span
                  className="shrink-0 text-[#5eb047] transition-transform duration-[var(--duration-base)] ease-[var(--ease-custom-1)] group-open:rotate-45"
                  aria-hidden="true"
                >
                  ＋
                </span>
              </summary>
              <p className="mt-3 text-sm leading-[1.7] text-[var(--color-text-muted)]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}