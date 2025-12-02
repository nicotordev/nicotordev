// i18n Formatting Utilities
// This file demonstrates proper usage of currency and timezone formatting utilities

import { formatCurrency, type Currency } from "@/i18n/currency";
import { formatInTimeZone, type Timezone } from "@/i18n/timezone";
import type { Locale } from "@/i18n/config";

/**
 * Example: Format a price with current user preferences
 *
 * Usage in Server Components:
 * ```tsx
 * import { getFormattedPrice } from "@/lib/i18n-helpers";
 * import { fetchUserPreferences } from "@/lib/clerk/preferences";
 *
 * export default async function PriceDisplay() {
 *   const { locale = "en", currency = "USD" } = await fetchUserPreferences();
 *   const price = getFormattedPrice(1500, locale, currency);
 *   return <div>{price}</div>;
 * }
 * ```
 *
 * Usage in Client Components:
 * ```tsx
 * "use client";
 * import { useLocale } from "next-intl";
 * import { useCurrencyStore } from "@/stores/currency-store";
 * import { getFormattedPrice } from "@/lib/i18n-helpers";
 *
 * export default function ClientPrice() {
 *   const locale = useLocale();
 *   const { currency } = useCurrencyStore();
 *   const price = getFormattedPrice(1500, locale, currency);
 *   return <div>{price}</div>;
 * }
 * ```
 */
export function getFormattedPrice(
  amount: number,
  locale: Locale | string,
  currency?: Currency | string
): string {
  return formatCurrency(amount, {
    locale: locale as Locale,
    ...(currency ? { currency: currency as Currency } : {}),
  });
}

/**
 * Example: Format a date/time in user's timezone
 *
 * Usage in Server Components:
 * ```tsx
 * import { fetchUserPreferences } from "@/lib/clerk/preferences";
 * import { getFormattedDateTime } from "@/lib/i18n-helpers";
 *
 * export default async function DateDisplay() {
 *   const { locale = "en", timezone = "UTC" } = await fetchUserPreferences();
 *   const date = getFormattedDateTime(new Date(), locale, timezone);
 *   return <div>{date}</div>;
 * }
 * ```
 *
 * Usage in Client Components:
 * ```tsx
 * "use client";
 * import { useLocale } from "next-intl";
 * import { useTimezoneStore } from "@/stores/timezone-store";
 * import { getFormattedDateTime } from "@/lib/i18n-helpers";
 *
 * export default function ClientDate() {
 *   const locale = useLocale();
 *   const { timezone } = useTimezoneStore();
 *   const date = getFormattedDateTime(new Date(), locale, timezone);
 *   return <div>{date}</div>;
 * }
 * ```
 */
export function getFormattedDateTime(
  date: Date | string | number,
  locale: Locale | string,
  timezone: Timezone | string,
  options?: Intl.DateTimeFormatOptions
): string {
  return formatInTimeZone(
    date,
    timezone as Timezone,
    locale as Locale,
    options ?? {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

/**
 * Format a date only (no time)
 */
export function getFormattedDate(
  date: Date | string | number,
  locale: Locale | string,
  timezone: Timezone | string
): string {
  return formatInTimeZone(date, timezone as Timezone, locale as Locale, {
    dateStyle: "medium",
  });
}

/**
 * Format a time only (no date)
 */
export function getFormattedTime(
  date: Date | string | number,
  locale: Locale | string,
  timezone: Timezone | string
): string {
  return formatInTimeZone(date, timezone as Timezone, locale as Locale, {
    timeStyle: "short",
  });
}
