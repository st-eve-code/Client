import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Header band - 95px tall, #080f15 */}
      <header className="sticky top-0 z-[100] bg-[#080f15]">
        <div className="container-vapestore h-[95px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Image
              src="/favicon-large.png"
              alt="Vapestore"
              width={48}
              height={48}
              className="rounded-full"
            />
            <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
              <a href="#" className="hover:text-white transition-colors duration-[var(--duration-base)] ease-[var(--ease-custom-1)]">
                Kits
              </a>
              <a href="#" className="hover:text-white transition-colors duration-[var(--duration-base)] ease-[var(--ease-custom-1)]">
                E-Liquids
              </a>
              <a href="#" className="hover:text-white transition-colors duration-[var(--duration-base)] ease-[var(--ease-custom-1)]">
                Pods
              </a>
              <a href="#" className="hover:text-white transition-colors duration-[var(--duration-base)] ease-[var(--ease-custom-1)]">
                Coils
              </a>
              <a href="#" className="hover:text-white transition-colors duration-[var(--duration-base)] ease-[var(--ease-custom-1)]">
                Brands
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-white">
            <span className="text-sm">Account</span>
            <span className="text-sm">0</span>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-[var(--color-bg-canvas)]">
        <div className="container-vapestore py-16">
          <div className="max-w-4xl">
            <h1 className="text-[var(--text-display)] leading-[var(--leading-display)] font-extrabold text-[var(--color-text-primary)] mb-6">
              Vapestore - Online Vape Shop
            </h1>
            <p className="text-[18px] leading-[1.6] text-[var(--color-text-primary)] max-w-2xl mb-8">
              Easy-to-use kits with prefilled pods. Pair with your favourite compatible refill pod flavours for a flexible alternative to disposable vapes
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-[var(--radius-8)] bg-[#d3fdc7] text-[#111f2a] font-bold text-base px-6 py-3 border border-[#5eb047] transition-all duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] hover:bg-[#91f974]"
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

      {/* Band 2 - Content band */}
      <section className="bg-[var(--color-bg-surface)]">
        <div className="container-vapestore py-12">
          <h2 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-bold text-[var(--color-text-primary)] mb-8">
            Your Trusted Source for All Vaping Needs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-[var(--radius-8)] p-4">
                <div className="aspect-square relative bg-[var(--color-bg-surface)] rounded-[var(--radius-8)] mb-4">
                  <Image
                    src="/favicon.png"
                    alt="Product"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="text-base font-bold mb-2">Vape Kit {i}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Premium quality vape kits
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
