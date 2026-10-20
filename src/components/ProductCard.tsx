import Image from "next/image";
import Link from "next/link";
import { cover, imageSrc, type CatalogItem } from "@/lib/catalog";
import { Price } from "./Price";
import { FavouriteButton } from "./FavouriteButton";

export function ProductCard({ product }: { product: CatalogItem }) {
  const image = cover(product);
  return (
    <div className="group relative flex flex-col">
      <FavouriteButton
        item={{
          category: product.category,
          slug: product.slug,
          title: product.title,
          brand: product.brand ?? "",
          price: product.price ?? null,
          image: image
            ? { file: image.file, width: image.width, height: image.height }
            : null,
          href: `/shop/${product.category}/${product.slug}`,
        }}
        className="absolute right-2 top-2 z-10 h-8 w-8 bg-white/90 shadow-[var(--shadow-sm)] backdrop-blur-sm hover:bg-white"
      />
      <Link
        href={`/shop/${product.category}/${product.slug}`}
        className="flex flex-col"
      >
        <div className="relative mb-3 overflow-hidden rounded-[var(--radius-8)] border border-[var(--color-border)] bg-white">
          {image ? (
            <Image
              src={imageSrc(image.file)}
              alt={product.title}
              width={image.width ?? 800}
              height={image.height ?? 800}
              className="aspect-square w-full object-cover transition-transform duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="aspect-square w-full bg-[var(--color-bg-surface)]" />
          )}
          {product.tags.length ? (
            <span className="absolute left-2 top-2 rounded-[var(--radius-pill)] bg-[#d3fdc7] px-2 py-0.5 text-xs font-semibold text-[#111f2a]">
              {product.tags[0]}
            </span>
          ) : null}
        </div>
        <span className="mb-1 text-xs font-medium text-[var(--color-text-muted)]">
          {product.brand}
        </span>
        <span className="mb-2 line-clamp-2 text-[14px] font-medium leading-[1.35] text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] group-hover:text-[#2563eb]">
          {product.title}
        </span>
        <Price
          price={product.price}
          className="tabular text-[18px] font-bold text-[var(--color-text-primary)]"
        />
      </Link>
    </div>
  );
}
