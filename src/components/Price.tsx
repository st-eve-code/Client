"use client";

import { useCurrency } from "./CurrencyProvider";
import { convertAmount, formatPrice } from "@/lib/currency";

interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

/** Displays a price range converted to the user's selected currency. */
export function Price({
  price,
  className = "",
}: {
  price: PriceRange | null | undefined;
  className?: string;
}) {
  const { currency } = useCurrency();
  if (!price) return null;

  const min = convertAmount(price.min, price.currency, currency);
  const max = convertAmount(price.max, price.currency, currency);

  return <span className={className}>{formatPrice(min, max, currency)}</span>;
}

/** Displays a single variant price converted to the user's selected currency. */
export function VariantPrice({
  amount,
  currency: nativeCurrency,
  className = "",
}: {
  amount: number;
  currency: string;
  className?: string;
}) {
  const { currency } = useCurrency();
  const converted = convertAmount(amount, nativeCurrency, currency);

  return <span className={className}>{formatPrice(converted, converted, currency)}</span>;
}
