const BRANDS = [
  "IVG",
  "Vaporesso",
  "Elf Bar",
  "Double Drip",
  "Bar Juice",
  "Riot Squad",
  "Lost Mary",
  "SMOK",
  "Geekvape",
  "VOOPOO",
  "Aspire",
  "Uwell",
];

export function LogoWall() {
  return (
    <section className="bg-[var(--color-bg-canvas)] -mt-6">
      <div className="mx-auto max-w-[975px] px-4 pb-9 pt-4">
        <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-4">
          {BRANDS.map((brand) => (
            <li key={brand}>
              <a
                href="#"
                className="flex h-14 items-center justify-center rounded-[var(--radius-8)] bg-[var(--color-bg-surface)] px-3 text-sm font-extrabold tracking-tight text-[#3f3f46] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-base)] ease-[var(--ease-custom-1)] hover:bg-[#d3fdc7] hover:text-[#111f2a]"
              >
                {brand}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}