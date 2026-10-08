import Image from "next/image";
import Link from "next/link";
import { imageSrc, type ShopCategory } from "@/lib/catalog";

export function CategoryCard({ category }: { category: ShopCategory }) {
  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-12)] border border-[var(--color-border)] bg-white transition-shadow duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] hover:shadow-[var(--shadow-lg)]"
    >
      <div className="relative overflow-hidden bg-[var(--color-bg-surface)]">
        {category.coverFile ? (
          <Image
            src={imageSrc(category.coverFile)}
            alt={category.label}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover transition-transform duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-[#d3fdc7]" />
        )}
        <span className="absolute left-2 top-2 rounded-[var(--radius-pill)] bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
          {category.group === "weedmaps" ? "Cannabis" : category.group === "vs2" ? "Vape Tanks" : "Vape Store"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-3">
        <span className="text-sm font-bold text-[var(--color-text-primary)]">
          {category.label}
        </span>
        <span className="rounded-[var(--radius-pill)] bg-[var(--color-bg-surface)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-text-muted)]">
          {category.count}
        </span>
      </div>
    </Link>
  );
}