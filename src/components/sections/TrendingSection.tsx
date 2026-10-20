import Link from "next/link";
import { getShowcaseProducts } from "@/lib/catalog";
import { BestProducts } from "./BestProducts";

export async function TrendingSection() {
  const items = await getShowcaseProducts(5);

  if (!items.length) {
    return null;
  }

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#5eb047]">
              Best Products
            </p>
            <h2 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-bold text-[var(--color-text-primary)]">
              Our Best Selling Products
            </h2>
            <p className="mt-2 max-w-[640px] text-sm text-[var(--color-text-muted)]">
              Discover the best selling products in the market right now &mdash;
              a hand-picked mix of our most popular vapes, cannabis and more.
            </p>
          </div>
          <Link
            href="/shop"
            className="rounded-[var(--radius-pill)] border border-[#5eb047] bg-[#d3fdc7] px-4 py-2 text-sm font-bold text-[#111f2a] transition-colors duration-[var(--duration-base)] hover:bg-[#91f974]"
          >
            Shop All Products
          </Link>
        </div>

        <BestProducts items={items} />
      </div>
    </section>
  );
}
