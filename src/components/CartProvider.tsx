"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ShowcaseProduct } from "@/lib/catalog";

export interface CartItem {
  key: string; // `${category}-${slug}`
  category: ShowcaseProduct["category"];
  slug: string;
  title: string;
  brand: ShowcaseProduct["brand"];
  price: ShowcaseProduct["price"];
  image: ShowcaseProduct["image"];
  href: string;
  quantity: number;
}

export type CartInput = Omit<CartItem, "key" | "quantity">;

interface CartContextValue {
  items: CartItem[];
  /** Total number of units in the cart (use for the header badge). */
  count: number;
  /** False until the saved cart has been read, so SSR and first client render match. */
  ready: boolean;
  addItem: (item: CartInput, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const STORAGE_KEY = "cart:v1";
const CartContext = createContext<CartContextValue | null>(null);

export const cartKey = (item: { category: string; slug: string }) =>
  `${item.category}-${item.slug}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Load after mount (avoids hydration mismatch) and stay in sync across tabs.
  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setItems(raw ? (JSON.parse(raw) as CartItem[]) : []);
      } catch {
        setItems([]);
      }
    };
    read();
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Persist only after the initial load, otherwise we'd overwrite the saved cart with [].
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked: cart still works for this session */
    }
  }, [items, ready]);

  const addItem = useCallback((input: CartInput, quantity = 1) => {
    const key = cartKey(input);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...input, key, quantity }];
    });
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback(
    (key: string) => setItems((prev) => prev.filter((i) => i.key !== key)),
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      ready,
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [items, ready, addItem, setQuantity, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
