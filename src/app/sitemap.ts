import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { getAlternatesLanguages, getLocaleUrl } from "@/lib/seo/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const alternatesLanguages = {
    "x-default": getLocaleUrl(SITE_URL, routing.defaultLocale),
    ...getAlternatesLanguages(SITE_URL),
  };

  const locales = routing.locales as readonly Locale[];

  return locales.map((locale) => ({
    url: getLocaleUrl(SITE_URL, locale),
    lastModified,
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages: alternatesLanguages },
    // Helps some crawlers; Google doesn't use this as Open Graph.
    // Keep it lightweight and stable.
    images: [`${SITE_URL}/og/og-image.png`],
  }));
}
