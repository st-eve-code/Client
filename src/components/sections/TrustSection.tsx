const POINTS = [
  {
    title: "Trusted Brands",
    body: "Every kit, tank and coil is 100% authentic from the brands you know and trust.",
  },
  {
    title: "Fast UK Delivery",
    body: "Order by 3pm for next-day dispatch with free delivery on orders over £20.",
  },
  {
    title: "Expert Support",
    body: "Our team helps you pick the right strength, pod and flavour for your vape.",
  },
  {
    title: "Rated Excellent",
    body: "19,176+ happy customers rate us 'Excellent' on Trustpilot.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-[var(--color-bg-surface)]">
      <div className="container-vapestore py-14">
        <h2 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-bold text-[var(--color-text-primary)] mb-10">
          Your Trusted Source for All Vaping Needs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
          {POINTS.map((point) => (
            <div key={point.title} className="bg-white rounded-[var(--radius-8)] p-4">
              <span className="block w-10 h-1 rounded-full bg-[#d3fdc7] mb-4" />
              <h3 className="text-base font-bold mb-2 text-[var(--color-text-primary)]">
                {point.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-[1.6]">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}