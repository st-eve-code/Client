const POSTS = [
  {
    title: "Classic Vaping vs Sub-Ohm: Which Is For You?",
    excerpt: "MTL versus direct-to-lung explained, and how to pick your first device.",
    tag: "Guides",
  },
  {
    title: "Vaping Top Tips for Beginners",
    excerpt: "Priming coils, draw resistance and the mistakes most new vapers make.",
    tag: "Tips",
  },
  {
    title: "Battery Safety: A Quick Checklist",
    excerpt: "Charge the right way, store batteries safely and spot damage early.",
    tag: "Safety",
  },
  {
    title: "Vaping Terms You Need to Know",
    excerpt: "Nic salts, shortfill, coil ohms and everything between \u2013 decoded.",
    tag: "Glossary",
  },
];

const GRADIENTS = [
  "from-[#bbd6ed] to-[#d3fdc7]",
  "from-[#d3fdc7] to-[#eef5fa]",
  "from-[#111f2a] to-[#3f3f46]",
  "from-[#5eb047] to-[#bbd6ed]",
];

export function NewsSection() {
  return (
    <section className="bg-[#f4f4f5]">
      <div className="mx-auto max-w-[975px] px-4 py-[36px]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#5eb047] mb-2">
              Vaping Blogs
            </p>
            <h2 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-bold text-[var(--color-text-primary)]">
              Latest Vape News: Expert Tips &amp; Advice
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-[var(--radius-8)] bg-[#111f2a] px-5 py-3 text-sm font-bold text-white transition-all duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] hover:opacity-90"
          >
            Explore the latest advice →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POSTS.map((post, i) => (
            <a
              key={post.title}
              href="#"
              className="group flex flex-col overflow-hidden rounded-[var(--radius-8)] bg-white shadow-[var(--shadow-sm)]"
            >
              <div
                className={`h-28 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
              />
              <div className="flex flex-1 flex-col p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5eb047] mb-2">
                  {post.tag}
                </span>
                <h3 className="text-sm font-bold leading-[1.4] text-[var(--color-text-primary)] mb-2 group-hover:text-[#2563eb] transition-colors duration-[var(--duration-base)]">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-[1.6]">
                  {post.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}