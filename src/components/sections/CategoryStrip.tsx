const QUICK_LINKS = [
  "Prefilled Pod Kits",
  "Shortfills",
  "Nic Salts",
  "Coils",
  "Disposable Alternatives",
  "Vape Tanks",
  "Accessories",
];

export function CategoryStrip() {
  return (
    <section className="bg-[var(--color-bg-surface)]">
      <div className="container-vapestore pb-3 pt-10">
        <ul className="flex flex-wrap items-center gap-2">
          {QUICK_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="inline-block rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-bold text-[#111f2a] transition-all duration-[var(--duration-base)] ease-[var(--ease-custom-1)] hover:bg-[#d3fdc7] hover:border-[#5eb047]"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}