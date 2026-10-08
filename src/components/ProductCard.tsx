import Image from "next/image";
import Link from "next/link";
import { cover, imageSrc, priceLabel, type CatalogItem } from "@/lib/catalog";

export function ProductCard({ product }: { product: CatalogItem }) {
  const image = cover(product);
  return (
    <Link
      href={`/shop/${product.category}/${product.slug}`}
      className="group flex flex-col"
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
          <span className="absolute left-2 top-2 rounded-[var(--radius-pill)] bg-[#d3fdc7] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#111f2a]">
            {product.tags[0]}
          </span>
        ) : null}
      </div>
      <span className="text-xs font-bold text-[#5eb047] mb-1">{product.brand}</span>
      <span className="mb-2 text-sm font-bold text-[var(--color-text-primary)] leading-[1.4] line-clamp-2 transition-colors duration-[var(--duration-base)] group-hover:text-[#2563eb]">
        {product.title}
      </span>
      <span className="text-sm font-bold text-[var(--color-text-primary)]">
        {priceLabel(product)}
      </span>
    </Link>
  );
}