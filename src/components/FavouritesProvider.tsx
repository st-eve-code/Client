"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface FavouriteItem {
  category: string;
  slug: string;
  title: string;
  brand: string;
  price: { min: number; max: number; currency: string } | null;
  image: { file: string; width?: number; height?: number } | null;
  href: string;
}

interface FavouritesContextValue {
  favourites: FavouriteItem[];
  count: number;
  isFavourite: (category: string, slug: string) => boolean;
  toggleFavourite: (item: FavouriteItem) => void;
  removeFavourite: (category: string, slug: string) => void;
}

const FavouritesContext = createContext<FavouritesContextValue>({
  favourites: [],
  count: 0,
  isFavourite: () => false,
  toggleFavourite: () => {},
  removeFavourite: () => {},
});

const STORAGE_KEY = "nofacetrap-favourites";

function favouriteKey(category: string, slug: string): string {
  return `${category}/${slug}`;
}

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FavouriteItem[];
        if (Array.isArray(parsed)) setFavourites(parsed);
      }
    } catch {
      // Corrupt or missing data — start empty.
    }
  }, []);

  const persist = useCallback((items: FavouriteItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage might be unavailable — ignore.
    }
  }, []);

  const isFavourite = useCallback(
    (category: string, slug: string) =>
      favourites.some((f) => f.category === category && f.slug === slug),
    [favourites]
  );

  const toggleFavourite = useCallback(
    (item: FavouriteItem) => {
      setFavourites((prev) => {
        const exists = prev.some(
          (f) => f.category === item.category && f.slug === item.slug
        );
        const next = exists
          ? prev.filter(
              (f) => !(f.category === item.category && f.slug === item.slug)
            )
          : [...prev, item];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeFavourite = useCallback(
    (category: string, slug: string) => {
      setFavourites((prev) => {
        const next = prev.filter(
          (f) => !(f.category === category && f.slug === slug)
        );
        persist(next);
        return next;
      });
    },
    [persist]
  );

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        count: favourites.length,
        isFavourite,
        toggleFavourite,
        removeFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites(): FavouritesContextValue {
  return useContext(FavouritesContext);
}
