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
 * import { cookies } from "next/headers";
 * import { getFormattedPrice } from "@/lib/i18n-helpers";
 * 
 * export default async function PriceDisplay() {
 *   const cookieStore = await cookies();
 *   const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
 *   const currency = cookieStore.get("NEXT_CURRENCY")?.value || "USD";
 *   
 *   const price = getFormattedPrice(1500, locale, currency);
 *   return <div>{price}</div>;
 * }
 * ```
 * 
 * Usage in Client Components:
 * ```tsx
 * "use client";
 * import { useLocale } from "next-intl";
 * import { useCurrency } from "@/context/CurrencyContext";
 * import { getFormattedPrice } from "@/lib/i18n-helpers";
 * 
 * export default function ClientPrice() {
 *   const locale = useLocale();
 *   const { currency } = useCurrency();
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
 * import { cookies } from "next/headers";
 * import { getFormattedDateTime } from "@/lib/i18n-helpers";
 * 
 * export default async function DateDisplay() {
 *   const cookieStore = await cookies();
 *   const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
 *   const timezone = cookieStore.get("NEXT_TIMEZONE")?.value || "UTC";
 *   
 *   const date = getFormattedDateTime(new Date(), locale, timezone);
 *   return <div>{date}</div>;
 * }
 * ```
 * 
 * Usage in Client Components:
 * ```tsx
 * "use client";
 * import { useLocale } from "next-intl";
 * import { useTimezone } from "@/context/TimezoneContext";
 * import { getFormattedDateTime } from "@/lib/i18n-helpers";
 * 
 * export default function ClientDate() {
 *   const locale = useLocale();
 *   const { timezone } = useTimezone();
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
