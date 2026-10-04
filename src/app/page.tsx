const specimens = [
  {
    name: "Fraunces",
    role: "Display / headings",
    className: "font-serif",
    sample: "Ibuprofen 200mg Tablets",
  },
  {
    name: "Inter",
    role: "Body / UI",
    className: "font-sans",
    sample: "Dispense as directed by your physician.",
  },
  {
    name: "JetBrains Mono",
    role: "Prices / dosage",
    className: "font-mono",
    sample: "$12.99 · 500mg · SKU 8492",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="border-b border-ink-200 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-600 uppercase">
            PharmaCart
          </p>
          <h1 className="mt-3 text-5xl font-semibold text-ink-900">
            Fonts ready for your drug store
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-600">
            Three self-hosted via{" "}
            <code className="rounded bg-ink-900/5 px-1.5 py-0.5 font-mono text-[0.9em]">
              next/font
            </code>
            . No layout shift, no external requests at runtime.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <ul className="grid gap-6 sm:grid-cols-3">
          {specimens.map((font) => (
            <li
              key={font.name}
              className="rounded-card border border-ink-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold tracking-[0.15em] text-brand-700 uppercase">
                {font.role}
              </p>
              <p className={`mt-4 text-2xl leading-snug text-ink-900 ${font.className}`}>
                {font.sample}
              </p>
              <p className="mt-6 text-sm text-ink-400">
                className=&quot;{font.className}&quot;
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-card bg-brand-700 p-8 text-white">
          <h2 className="text-3xl font-semibold">Free delivery over $35</h2>
          <p className="mt-2 text-brand-100">
            Licensed pharmacists on call 24/7 for refill questions.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-accent-500 px-6 py-3 font-semibold text-ink-900 transition-colors hover:bg-accent-400">
              Shop medicines
            </button>
            <span className="price text-lg">from $4.49</span>
          </div>
        </div>
      </section>
    </main>
  );
}