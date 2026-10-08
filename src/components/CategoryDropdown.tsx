import Link from "next/link";
import type { ShopCategory } from "@/lib/catalog";

interface Section {
  title: string;
  items: ShopCategory[];
}

function buildSections(categories: ShopCategory[]): Section[] {
  const sections: Section[] = [];
  for (const category of categories) {
    const title = category.section ?? "Products";
    const section = sections.find((s) => s.title === title);
    if (section) {
      section.items.push(category);
    } else {
      sections.push({ title, items: [category] });
    }
  }
  return sections;
}

export function CategoryDropdown({ categories }: { categories: ShopCategory[] }) {
  const vapestore = categories.filter((c) => c.group === "vapestore");
  const vs2 = categories.filter((c) => c.group === "vs2");
  const weedmaps = categories.filter((c) => c.group === "weedmaps");

  const hasVapestore = vapestore.length > 0;
  const hasVS2 = vs2.length > 0;
  const hasWeedmaps = weedmaps.length > 0;
  const hasAny = hasVapestore || hasVS2 || hasWeedmaps;

  if (!hasAny) {
    return (
      <Link href="/shop" className="hover:text-white transition-colors duration-[var(--duration-base)]">
        Shop
      </Link>
    );
  }

  const columnCount = [hasVapestore || hasVS2, hasWeedmaps].filter(Boolean).length;
  const vapestoreSections = buildSections(vapestore);
  const vs2Sections = buildSections(vs2);

  return (
    <div className="group relative">
      <Link
        href="/shop"
        className="flex items-center gap-1.5 hover:text-white transition-colors duration-[var(--duration-base)]"
        aria-haspopup="true"
      >
        Shop
        <svg
          className="h-3 w-3 opacity-70 transition-transform duration-[var(--duration-base)] group-hover:rotate-180"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </Link>

      <div className="invisible opacity-0 absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 transition-[opacity,visibility] duration-[var(--duration-base)] ease-[var(--ease-custom-1)] group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="rounded-[var(--radius-16)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-lg)]">
          <div className={`grid gap-x-10 gap-y-5 ${columnCount === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {/* Left column: vapestore + vs2 */}
            {(hasVapestore || hasVS2) ? (
              <div className="space-y-5">
                {hasVapestore ? (
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-gray-dark)]">
                      Vape Store
                    </p>
                    <div className="space-y-3">
                      {vapestoreSections.map((section) => (
                        <div key={section.title}>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                            {section.title}
                          </p>
                          <ul className="space-y-0.5">
                            {section.items.map((category) => (
                              <li key={category.slug}>
                                <Link
                                  href={`/shop/${category.slug}`}
                                  className="flex items-center justify-between gap-3 rounded-[var(--radius-8)] px-2 py-1 text-sm font-bold text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-bg-surface)]"
                                >
                                  <span>{category.label}</span>
                                  <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-text-muted)]">
                                    {category.count}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {hasVS2 ? (
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-gray-dark)]">
                      Vape Tanks
                    </p>
                    <div className="space-y-3">
                      {vs2Sections.map((section) => (
                        <div key={section.title}>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                            {section.title}
                          </p>
                          <ul className="space-y-0.5">
                            {section.items.map((category) => (
                              <li key={category.slug}>
                                <Link
                                  href={`/shop/${category.slug}`}
                                  className="flex items-center justify-between gap-3 rounded-[var(--radius-8)] px-2 py-1 text-sm font-bold text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-bg-surface)]"
                                >
                                  <span>{category.label}</span>
                                  <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-text-muted)]">
                                    {category.count}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Right column: weedmaps */}
            {hasWeedmaps ? (
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--color-gray-dark)]">
                  Cannabis
                </p>
                <ul className="space-y-1">
                  {weedmaps.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/shop/${category.slug}`}
                        className="flex items-center justify-between gap-3 rounded-[var(--radius-8)] px-2 py-1.5 text-sm font-bold text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-bg-surface)]"
                      >
                        <span>{category.label}</span>
                        <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-text-muted)]">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <Link
            href="/shop"
            className="mt-4 block rounded-[var(--radius-8)] bg-[#111f2a] px-4 py-2.5 text-center text-sm font-bold text-white transition-opacity duration-[var(--duration-base)] hover:opacity-90"
          >
            Shop all categories
          </Link>
        </div>
      </div>
    </div>
  );
}
