const BENEFITS = [
  "Free UK delivery over £20",
  "18+ age verification at checkout",
  "100% authentic products",
];

export function BannerStrip() {
  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="mx-auto max-w-[975px] px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="rounded-[var(--radius-8)] bg-[var(--color-bg-surface)] px-4 py-3 text-left text-sm font-bold text-[#111f2a] shadow-[var(--shadow-sm)]"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}