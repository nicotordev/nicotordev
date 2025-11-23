import type { StaticImageData } from "next/image";

import UnitedStatesFlagPng from "@public/emojis/united-states-flag.webp";
import UnitedKingdomFlagPng from "@public/emojis/united-kingdom-flag.webp";
import SpainFlagPng from "@public/emojis/spain-flag.webp";
import ChileFlagPng from "@public/emojis/chile-flag.webp";
import GermanyFlagPng from "@public/emojis/germany-flag.webp";

export const locales = [
  "en",
  "en-gb",
  "es",
  "es-es",
  "es-cl",
  "de",
] as const;

export type Locale = typeof locales[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  "en-gb": "English (UK)",
  es: "Español",
  "es-es": "Español (España)",
  "es-cl": "Español (Chile)",
  de: "Deutsch",
};

const baseFlags = {
  en: UnitedStatesFlagPng,
  "en-gb": UnitedKingdomFlagPng,
  es: SpainFlagPng,
  "es-es": SpainFlagPng,
  "es-cl": ChileFlagPng,
  de: GermanyFlagPng,
} satisfies Record<Locale, StaticImageData>;

export const localeFlagImages = baseFlags;
export const localeFlags = Object.fromEntries(
  Object.entries(baseFlags).map(([k]) => [k, `/emojis/${k === "en" ? "united-states" :
  k === "en-gb" ? "united-kingdom" :
  k === "es" || k === "es-es" ? "spain" :
  k === "es-cl" ? "chile" : "germany"}-flag.webp`])
) as Record<Locale, string>;

export const localesJson = Object.fromEntries(
  locales.map((l) => [l, () => import(`@/locales/${l}.json`)])
) as Record<Locale, () => Promise<any>>;


export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPath(path: string): Locale | null {
  const segments = path.split("/");
  const firstSegment = segments[1] ?? "";
  if (isLocale(firstSegment)) {
    return firstSegment;
  }
  return null;
}

export function getPathWithoutLocale(path: string): string {
  const segments = path.split("/");
  const firstSegment = segments[1] ?? "";
  if (isLocale(firstSegment)) {
    return "/" + segments.slice(2).join("/");
  }
  return path;
}

export function getPathWithLocale(path: string, locale: Locale): string {
  const segments = path.split("/");
  const firstSegment = segments[1] ?? "";
  if (isLocale(firstSegment)) {
    segments[1] = locale;
    return segments.join("/");
  }
  return `/${locale}${path.startsWith("/") ? "" : "/"}${path}`;
}
