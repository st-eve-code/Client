export function HeroSection() {
  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-16">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#5eb047] mb-4">
            UK&apos;s #1 Online Vape Shop
          </p>
          <h1 className="text-[var(--text-display)] leading-[var(--leading-display)] font-extrabold text-[var(--color-text-primary)] mb-6">
            Vapestore - Online Vape Shop
          </h1>
          <p className="text-[18px] leading-[1.6] text-[var(--color-text-primary)] max-w-2xl mb-8">
            Easy-to-use kits with prefilled pods. Pair with your favourite
            compatible refill pod flavours for a flexible alternative to
            disposable vapes
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-[var(--radius-8)] border border-[#5eb047] bg-[#d3fdc7] px-6 py-3 text-base font-bold text-[#111f2a] transition-all duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] hover:bg-[#91f974]"
            >
              Shop All Categories
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-[var(--radius-8)] bg-[#111f2a] text-white font-bold text-base px-6 py-3 transition-all duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] hover:opacity-90"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}