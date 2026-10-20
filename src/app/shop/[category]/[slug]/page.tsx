import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShopProduct, cleanDescription, categoryLabel } from "@/lib/catalog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";
import { Price, VariantPrice } from "@/components/Price";
import { FavouriteButton } from "@/components/FavouriteButton";
import { AddToCartButton } from "@/components/AddToCartButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const product = await getShopProduct(category, slug);
  return product ? { title: product.title } : { title: "Product" };
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

  const label = categoryLabel(category);
  const paragraphs = cleanDescription(product.description_html, product.description);
  const coverImage = product.images[0];

  // Shared by the cart and favourites buttons
  const cartItem = {
    category: product.category,
    slug: product.slug,
    title: product.title,
    brand: product.brand ?? "",
    price: product.price ?? null,
    image: coverImage
      ? {
          file: coverImage.file,
          width: coverImage.width,
          height: coverImage.height,
        }
      : null,
    href: `/shop/${product.category}/${product.slug}`,
  };

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-10">
        <Breadcrumbs
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label, href: `/shop/${product.category}` },
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
            {/* Title + brand */}
            {product.brand ? (
              <p className="mb-2 text-xs font-medium text-[var(--color-text-muted)]">
                {product.brand}
              </p>
            ) : null}
            <h1 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-extrabold text-[var(--color-text-primary)]">
              {product.title}
            </h1>

            {/* Price */}
            <Price
              price={product.price}
              className="tabular mt-4 block text-2xl font-bold text-[var(--color-text-primary)]"
            />

            {/* Add to Cart + Favourite */}
            <div className="mt-5 flex items-center gap-3">
              <AddToCartButton item={cartItem} />
              <FavouriteButton
                item={cartItem}
                className="h-[52px] w-[52px] shrink-0 border border-[var(--color-border)] bg-white text-[#111f2a] hover:text-[#ef4444]"
              />
            </div>

            {/* Variants */}
            {product.variants?.length ? (
              <div className="mt-6">
                <h2 className="mb-2 text-sm font-semibold text-[var(--color-text-muted)]">
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
                          <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-xs font-semibold text-[var(--color-text-muted)]">
                            Out of stock
                          </span>
                        ) : null}
                        {variant.price !== undefined ? (
                          <VariantPrice
                            amount={variant.price}
                            currency={product.price?.currency ?? "USD"}
                            className="font-bold text-[var(--color-text-primary)]"
                          />
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Tags */}
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

            {/* Description */}
            {paragraphs.length > 0 ? (
              <div className="mt-8">
                <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-muted)]">
                  Description
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-[var(--color-text-primary)]">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}