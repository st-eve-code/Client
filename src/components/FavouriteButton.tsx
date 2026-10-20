"use client";

import { useFavourites, type FavouriteItem } from "./FavouritesProvider";

export function HeartIcon({
  className,
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function FavouriteButton({
  item,
  className = "",
}: {
  item: FavouriteItem;
  className?: string;
}) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const active = isFavourite(item.category, item.slug);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        active
          ? `Remove ${item.title} from favourites`
          : `Add ${item.title} to favourites`
      }
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavourite(item);
      }}
      className={`inline-flex items-center justify-center rounded-full transition-colors duration-[var(--duration-base)] ${
        active ? "text-[#ef4444]" : "text-[#111f2a]"
      } ${className}`}
    >
      <HeartIcon className="h-[18px] w-[18px]" filled={active} />
    </button>
  );
}
