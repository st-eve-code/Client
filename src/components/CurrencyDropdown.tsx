"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrency } from "./CurrencyProvider";
import { CURRENCIES } from "@/lib/currency";

export function CurrencyDropdown() {
  const { currency: selected, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const selectedCurrency =
    CURRENCIES.find((c) => c.code === selected) ?? CURRENCIES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change currency"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-[var(--radius-8)] px-2 py-1.5 text-sm font-bold text-white transition-colors duration-[var(--duration-base)] hover:bg-white/10"
      >
        <span>
          {selectedCurrency.symbol} {selectedCurrency.code}
        </span>
        <svg
          className={`h-3 w-3 opacity-70 transition-transform duration-[var(--duration-base)] ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-[110] mt-2 w-28 overflow-hidden rounded-[var(--radius-8)] border border-[#1f2935] bg-[#111f2a] py-1 shadow-[var(--shadow-lg)]"
        >
          {CURRENCIES.map((currency) => (
            <li key={currency.code}>
              <button
                type="button"
                role="option"
                aria-selected={currency.code === selectedCurrency.code}
                onClick={() => {
                  setCurrency(currency.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm font-bold transition-colors duration-[var(--duration-base)] hover:bg-white/10 ${
                  currency.code === selectedCurrency.code ? "text-[#91f974]" : "text-white"
                }`}
              >
                <span>{currency.code}</span>
                <span className="text-[#91f974]">{currency.symbol}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
