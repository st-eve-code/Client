import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/catalog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";

export const PAGE_SIZE = 24;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const data = await getCategory(category, 1, PAGE_SIZE);
  return data ? { title: data.label } : { title: "Category" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const { page } = await searchParams;
  const requested = Number.parseInt(page ?? "1", 10);
  const data = await getCategory(category, Number.isFinite(requested) ? requested : 1, PAGE_SIZE);

  if (!data) {
    notFound();
  }

  const currentPage = data.page;
  const from = (currentPage - 1) * data.pageSize + 1;
  const to = Math.min(from + data.pageSize - 1, data.total);

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-10">
        <Breadcrumbs
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: data.label },
          ]}
        />

        <div className="mt-6 mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#5eb047]">
            {data.group === "weedmaps" ? "Cannabis" : "Vape Store"}
          </p>
          <h1 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-extrabold text-[var(--color-text-primary)]">
            {data.label}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Showing {from}&ndash;{to} of {data.total.toLocaleString()} products
          </p>
        </div>

        <ProductGrid items={data.items} />

        <Pagination basePath={`/shop/${data.slug}`} page={data.page} pages={data.pages} />
      </div>
    </section>
  );
}