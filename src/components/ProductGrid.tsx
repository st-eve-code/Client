import type { CatalogItem } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ items }: { items: CatalogItem[] }) {
  if (!items.length) {
    return (
      <div className="rounded-[var(--radius-12)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] px-6 py-12 text-center">
        <p className="text-sm font-bold text-[var(--color-text-primary)]">
          No products here yet.
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          The catalogue for this section is still being scraped.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
      {items.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}