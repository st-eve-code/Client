// Static exchange rates with GBP as the base currency.
// 1 GBP = rate * 1 of the target currency.
// Rates are approximate and updated periodically. For a production app you'd
// fetch live rates, but static rates keep the UI instant and dependency-free.
const RATES: Record<string, number> = {
  GBP: 1,
  USD: 1.27,
  EUR: 1.17,
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: "\u00a3",
  USD: "$",
  EUR: "\u20ac",
};

export interface CurrencyOption {
  code: string;
  symbol: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "GBP", symbol: "\u00a3" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "\u20ac" },
];

export const DEFAULT_CURRENCY = "GBP";

export function currencySymbol(code: string): string {
  return CURRENCY_SYMBOLS[code] ?? `${code} `;
}

/** Convert an amount from one currency to another using static rates. */
export function convertAmount(amount: number, from: string, to: string): number {
  if (from === to) return amount;
  const fromRate = RATES[from] ?? 1;
  const toRate = RATES[to] ?? 1;
  return (amount * toRate) / fromRate;
}

/** Format a price range (or single price) in the given currency. */
export function formatPrice(min: number, max: number, currency: string): string {
  const symbol = currencySymbol(currency);
  const fmt = (n: number) => `${symbol}${n.toFixed(2)}`;
  if (min === max) return fmt(min);
  return `${fmt(min)} \u2013 ${fmt(max)}`;
}
