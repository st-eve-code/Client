"use client";

import { useEffect, useRef, useState } from "react";
import { useCart, type CartInput } from "@/components/CartProvider";

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3h2.2l2.3 12.2a1.6 1.6 0 0 0 1.6 1.3h9.2a1.6 1.6 0 0 0 1.6-1.3L21 7H6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function AddToCartButton({
  item,
  className = "",
}: {
  item: CartInput;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleClick = () => {
    addItem(item);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${item.title} to cart`}
      className={`flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-8)] px-5 text-[15px] font-semibold text-white transition-colors duration-[var(--duration-moderate)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
        added ? "bg-[var(--color-green-dark)]" : "bg-black hover:bg-[#111f2a]"
      } ${className}`}
    >
      {added ? <CheckIcon /> : <CartIcon />}
      <span aria-live="polite">{added ? "Added to cart" : "Add to Cart"}</span>
    </button>
  );
}