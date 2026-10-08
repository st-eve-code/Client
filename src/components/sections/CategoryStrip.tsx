import Link from "next/link";
import { getCategories } from "@/lib/catalog";

const STATIC_LINKS = [
  "Prefilled Pod Kits",
  "Shortfills",
  "Nic Salts",
  "Disposable Alternatives",
  "Accessories",
];

export async function CategoryStrip() {
  const categories = await getCategories();

  const pills = categories.length
    ? categories.map((category) => ({
        label: `${category.label} (${category.count})`,
        href: `/shop/${category.slug}`,
      }))
    : STATIC_LINKS.map((label) => ({ label, href: "#" }));

  return (
    <section className="bg-[var(--color-bg-surface)]">
      <div className="container-vapestore pb-3 pt-10">
        <ul className="flex flex-wrap items-center gap-2">
          {pills.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="inline-block rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-bold text-[#111f2a] transition-all duration-[var(--duration-base)] ease-[var(--ease-custom-1)] hover:bg-[#d3fdc7] hover:border-[#5eb047]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}