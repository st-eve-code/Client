import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getShopProduct,
  priceLabel,
  weedmapsCategoryLabel,
  WM_PREFIX,
  VS2_PREFIX,
} from "@/lib/catalog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const product = await getShopProduct(category, slug);
  return product ? { title: product.title } : { title: "Product" };
}

function currencySymbol(currency?: string): string {
  switch (currency) {
    case "GBP":
      return "\u00a3";
    case "USD":
      return "$";
    case "EUR":
      return "\u20ac";
    default:
      return currency ? `${currency} ` : "";
  }
}

function humanCategoryLabel(category: string): string {
  if (category.startsWith(WM_PREFIX)) {
    return weedmapsCategoryLabel(category.slice(WM_PREFIX.length));
  }
  if (category.startsWith(VS2_PREFIX)) {
    return category
      .slice(VS2_PREFIX.length)
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = await getShopProduct(category, slug);

  if (!product) {
    notFound();
  }

  const categoryLabel = humanCategoryLabel(category);

  // Prefer rich HTML description; fall back to plain-text paragraphs.
  const hasHtml = Boolean(product.description_html?.trim());
  const paragraphs = hasHtml
    ? []
    : (product.description ?? "")
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-10">
        <Breadcrumbs
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: categoryLabel, href: `/shop/${product.category}` },
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <ProductGallery
            images={product.images.map((image) => ({
              file: image.file,
              alt: product.title,
            }))}
          />

          <div>
            {product.brand ? (
              <p className="text-sm font-bold uppercase tracking-widest text-[#5eb047] mb-2">
                {product.brand}
              </p>
            ) : null}
            <h1 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-extrabold text-[var(--color-text-primary)]">
              {product.title}
            </h1>

            {product.images.length > 0 ? (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {product.images.length} image{product.images.length > 1 ? "s" : ""}
              </p>
            ) : null}

            <p className="mt-4 text-2xl font-extrabold text-[var(--color-text-primary)]">
              {priceLabel(product)}
            </p>

            {product.variants?.length ? (
              <div className="mt-6">
                <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Variants
                </h2>
                <ul className="divide-y divide-[var(--color-border)] overflow-hidden rounded-[var(--radius-8)] border border-[var(--color-border)]">
                  {product.variants.map((variant, i) => (
                    <li
                      key={variant.sku ?? variant.title ?? i}
                      className="flex items-center justify-between gap-3 bg-white px-3 py-2 text-sm"
                    >
                      <span className="font-bold text-[var(--color-text-primary)]">
                        {variant.title ?? "Standard"}
                      </span>
                      <span className="flex items-center gap-3">
                        {variant.available === false ? (
                          <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-text-muted)]">
                            Out of stock
                          </span>
                        ) : null}
                        {variant.price !== undefined ? (
                          <span className="font-bold text-[var(--color-text-primary)]">
                            {currencySymbol(product.price?.currency)}
                            {variant.price.toFixed(2)}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {product.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white px-3 py-1 text-xs font-bold text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {(hasHtml || paragraphs.length > 0) ? (
              <div className="mt-8">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  Description
                </h2>
                {hasHtml ? (
                  <div
                    className="prose prose-sm max-w-none text-[var(--color-text-primary)] [&_a]:text-[#2563eb] [&_a]:underline [&_strong]:font-bold"
                    dangerouslySetInnerHTML={{ __html: product.description_html! }}
                  />
                ) : (
                  <div className="space-y-3 text-[var(--text-body)] leading-[var(--leading-body)] text-[var(--color-text-primary)]">
                    {paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-8 rounded-[var(--radius-8)] bg-[var(--color-bg-surface)] p-4 text-sm text-[var(--color-text-muted)]">
              <dl className="space-y-1">
                {product.site ? (
                  <div className="flex justify-between gap-4">
                    <dt className="font-bold">Source</dt>
                    <dd>{product.site}</dd>
                  </div>
                ) : null}
                {product.collections?.length ? (
                  <div className="flex justify-between gap-4">
                    <dt className="font-bold">Collections</dt>
                    <dd className="text-right">{product.collections.join(", ")}</dd>
                  </div>
                ) : null}
                {product.scrapedAt ? (
                  <div className="flex justify-between gap-4">
                    <dt className="font-bold">Scraped</dt>
                    <dd>{new Date(product.scrapedAt).toLocaleString()}</dd>
                  </div>
                ) : null}
              </dl>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-bold text-[#2563eb] underline-offset-2 hover:underline"
              >
                View original listing &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
