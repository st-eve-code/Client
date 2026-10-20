"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavourites } from "./FavouritesProvider";
import { Price } from "./Price";
import { imageSrc } from "@/lib/image";

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function FavouritesContent() {
  const { favourites, removeFavourite } = useFavourites();

  return (
    <section className="bg-[var(--color-bg-canvas)]">
      <div className="container-vapestore py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-[#5eb047]">Saved Items</p>
          <h1 className="text-[var(--text-heading-lg)] leading-[var(--leading-heading-lg)] font-extrabold text-[var(--color-text-primary)]">
            Your Favourites
          </h1>
          {favourites.length > 0 ? (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {favourites.length} saved product{favourites.length > 1 ? "s" : ""}
            </p>
          ) : null}
        </div>

        {favourites.length === 0 ? (
          <div className="rounded-[var(--radius-12)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] px-6 py-16 text-center">
            <p className="text-sm font-bold text-[var(--color-text-primary)]">
              No favourites yet.
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[#5eb047] bg-[#d3fdc7] px-4 py-2 text-sm font-bold text-[#111f2a] transition-colors duration-[var(--duration-base)] hover:bg-[#91f974]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-8">
            {favourites.map((item) => (
              <div
                key={`${item.category}-${item.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-1 transition-shadow duration-[var(--duration-base)] hover:shadow-[var(--shadow-lg)]"
              >
                <button
                  type="button"
                  aria-label={`Remove ${item.title} from favourites`}
                  onClick={() => removeFavourite(item.category, item.slug)}
                  className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#111f2a] shadow-[var(--shadow-sm)] backdrop-blur-sm transition-colors duration-[var(--duration-base)] hover:bg-white hover:text-[#ef4444]"
                >
                  <TrashIcon />
                </button>

                <Link
                  href={item.href}
                  className="relative mb-1 block overflow-hidden rounded-t-xl rounded-b bg-[var(--color-bg-surface)]"
                >
                  {item.image ? (
                    <Image
                      src={imageSrc(item.image.file)}
                      alt={item.title}
                      width={item.image.width ?? 800}
                      height={item.image.height ?? 800}
                      className="aspect-square w-full object-cover transition-transform duration-[var(--duration-moderate)] ease-[var(--ease-custom-1)] group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="aspect-square w-full bg-[var(--color-bg-surface)]" />
                  )}
                </Link>

                <div className="flex grow flex-col p-2">
                  {item.brand ? (
                    <span className="mb-1 text-xs font-medium text-[var(--color-text-muted)]">
                      {item.brand}
                    </span>
                  ) : null}
                  <Link
                    href={item.href}
                    className="mb-2 line-clamp-2 text-[14px] font-medium leading-[1.35] text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] group-hover:text-[#2563eb] md:text-[15px]"
                  >
                    {item.title}
                  </Link>
                  <Price
                    price={item.price}
                    className="tabular mt-auto text-[18px] font-bold leading-tight text-[#3f3f46]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
