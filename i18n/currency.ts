import type { Locale } from "./config";

export const currencies = [
  "USD",
  "EUR",
  "GBP",
  "CLP",
] as const;

export type Currency = typeof currencies[number];

export function isCurrency(value: string): value is Currency {
  return (currencies as readonly string[]).includes(value);
}

// Reasonable defaults per supported locale
export const defaultCurrencyByLocale: Record<Locale, Currency> = {
  en: "USD",
  "en-gb": "GBP",
  es: "EUR",
  "es-es": "EUR",
  "es-cl": "CLP",
  de: "EUR",
};

export function formatCurrency(
  amount: number,
  opts: { locale: Locale; currency?: Currency; minimumFractionDigits?: number }
): string {
  const { locale, currency, minimumFractionDigits } = opts;
  const cur = currency ?? defaultCurrencyByLocale[locale];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: cur,
    minimumFractionDigits,
  }).format(amount);
}

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  CLP: "Chilean Peso",
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CLP: "$",
};

