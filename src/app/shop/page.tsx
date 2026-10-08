import type { Metadata } from "next";
import { getCategories } from "@/lib/catalog";
import type { ShopCategory } from "@/lib/catalog";
import { CategoryCard } from "@/components/CategoryCard";

export const metadata: Metadata = {
  title: "Shop by Category",
};

interface CategoryGroup {
  title: string;
  categories: ShopCategory[];
}

function buildGroups(categories: ShopCategory[]): CategoryGroup[] {
  const groups: CategoryGroup[] = [];
  let current: CategoryGroup | null = null;
  for (const category of categories) {
    const key = category.group === "weedmaps" ? "Cannabis" : category.section ?? "Products";
    if (!current || current.title !== key) {
      current = { title: key, categories: [] };
      groups.push(current);
    }
    current.categories.push(category);
  }
  return groups;
}

export default async function ShopPage() {
  const categories = await getCategories();
  const totalProducts = categories.reduce((n, c) => n + c.count, 0);
  let updatedAt: string | undefined;
  for (const c of categories) {
    if (!c.updatedAt) continue;
    if (!updatedAt || c.updatedAt > updatedAt) updatedAt = c.updatedAt;
  }
  const groups = buildGroups(categories);

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-12">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#5eb047]">
            The Catalogue
          </p>
          <h1 className="mb-4 text-[var(--text-heading)] font-extrabold leading-none text-[var(--color-text-primary)]">
            Shop by Category
          </h1>
          <p className="text-[var(--text-body)] leading-[var(--leading-body)] text-[var(--color-text-muted)]">
            A browsable catalogue organised from the scraped product data. Every
            product is grouped under its category and links through to a
            dedicated page with its description, images and variants.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 font-bold text-[var(--color-text-primary)]">
              {categories.length} categories
            </span>
            <span className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 font-bold text-[var(--color-text-primary)]">
              {totalProducts.toLocaleString()} products
            </span>
            {updatedAt ? (
              <span className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-3 py-1 font-bold text-[var(--color-text-muted)]">
                Updated {new Date(updatedAt).toLocaleDateString()}
              </span>
            ) : null}
          </div>
        </div>

        {groups.length ? (
          <div className="space-y-10">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--color-gray-dark)]">
                  {group.title}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-6">
                  {group.categories.map((category) => (
                    <CategoryCard key={category.slug} category={category} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-12)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] px-6 py-12 text-center">
            <p className="text-sm font-bold text-[var(--color-text-primary)]">
              The catalogue is empty.
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Run the scraper first so products show up here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}