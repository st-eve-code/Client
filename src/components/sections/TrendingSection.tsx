import Image from "next/image";
import Link from "next/link";
import {
  readCategoryIndex,
  readItem,
  cover,
  imageSrc,
  priceLabel,
  type CatalogItem,
} from "@/lib/catalog";

const LIMIT = 12;
const CATEGORY = "vape-kits";

export async function TrendingSection() {
  const index = await readCategoryIndex(CATEGORY);
  const entries = index?.items.slice(0, LIMIT) ?? [];

  const items: Array<CatalogItem | null> = await Promise.all(
    entries.map((entry) => readItem(CATEGORY, entry.slug))
  );
  const shown = items.filter((item): item is CatalogItem => Boolean(item));

  if (!shown.length) {
    return null;
  }

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#5eb047] mb-2">
              Best Sellers
            </p>
            <h2 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-bold text-[var(--color-text-primary)]">
              Trending Vape Products
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/shop/${CATEGORY}`}
              className="rounded-[var(--radius-pill)] bg-[#d3fdc7] px-4 py-2 text-sm font-bold text-[#111f2a] border border-[#5eb047]"
            >
              Trending
            </Link>
            <Link
              href="/shop/e-liquid"
              className="inline-block rounded-[var(--radius-pill)] border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[#111f2a] hover:bg-[#eef5fa] transition-colors duration-[var(--duration-base)]"
            >
              E-Liquids
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          {shown.map((item) => {
            const image = cover(item);
            return (
              <Link
                key={item.slug}
                href={`/shop/${CATEGORY}/${item.slug}`}
                className="group flex flex-col"
              >
                <div className="relative mb-3 overflow-hidden rounded-[var(--radius-8)] bg-white">
                  {image ? (
                    <Image
                      src={imageSrc(image.file)}
                      alt={item.title}
                      width={image.width ?? 800}
                      height={image.height ?? 800}
                      className="aspect-square w-full object-cover transition-transform duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="aspect-square w-full bg-[var(--color-bg-surface)]" />
                  )}
                </div>
                <span className="text-xs font-bold text-[#5eb047] mb-1">
                  {item.brand}
                </span>
                <span className="text-sm font-bold text-[var(--color-text-primary)] leading-[1.4] mb-2 group-hover:text-[#2563eb] transition-colors duration-[var(--duration-base)]">
                  {item.title}
                </span>
                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                  {priceLabel(item)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}