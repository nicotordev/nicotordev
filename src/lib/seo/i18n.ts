import type { Locale } from "@/i18n/config";

export const localeToLanguageTag: Record<Locale, string> = {
  en: "en",
  "en-gb": "en-GB",
  es: "es",
  "es-es": "es-ES",
  "es-cl": "es-CL",
  de: "de",
};

export const localeToOpenGraphLocale: Record<Locale, string> = {
  en: "en_US",
  "en-gb": "en_GB",
  es: "es_ES",
  "es-es": "es_ES",
  "es-cl": "es_CL",
  de: "de_DE",
};

export function getLocaleUrl(siteUrl: string, locale: Locale): string {
  return new URL(`/${locale}`, siteUrl).toString().replace(/\/$/, "");
}

export function getAlternatesLanguages(siteUrl: string): Record<string, string> {
  return Object.fromEntries(
    (Object.keys(localeToLanguageTag) as Locale[]).map((locale) => [
      localeToLanguageTag[locale],
      getLocaleUrl(siteUrl, locale),
    ])
  );
}

