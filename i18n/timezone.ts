import type { Locale } from "./config";

// Curated set of IANA time zones commonly used in supported locales
export const timezones = [
  "UTC",
  "America/New_York",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Madrid",
  "America/Santiago",
] as const;

export type Timezone = typeof timezones[number];

export function isTimezone(value: string): value is Timezone {
  return (timezones as readonly string[]).includes(value);
}

export const defaultTimezoneByLocale: Record<Locale, Timezone> = {
  en: "America/New_York",
  "en-gb": "Europe/London",
  es: "Europe/Madrid",
  "es-es": "Europe/Madrid",
  "es-cl": "America/Santiago",
  de: "Europe/Berlin",
};

export function formatInTimeZone(
  date: Date | string | number,
  tz: Timezone,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, { timeZone: tz, ...(options ?? {}) }).format(d);
}

export const TIMEZONE_LABELS: Record<Timezone, string> = {
  UTC: "UTC",
  "America/New_York": "Eastern Time (US)",
  "Europe/London": "London",
  "Europe/Berlin": "Berlin",
  "Europe/Madrid": "Madrid",
  "America/Santiago": "Santiago",
};

