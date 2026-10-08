import type { Metadata } from "next";
import { getCategories } from "@/lib/catalog";
import { CategoryCard } from "@/components/CategoryCard";

export const metadata: Metadata = {
  title: "Shop by Category",
};

export default async function ShopPage() {
  const categories = await getCategories();
  const totalProducts = categories.reduce((n, c) => n + c.count, 0);
  const updatedAt = categories
    .map((c) => c.updatedAt)
    .filter(Boolean)
    .sort()
    .pop();

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

        {categories.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
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