import { routing } from "@/i18n/routing";
import { buildJsonLdGraph, jsonLdToScriptInnerHtml } from "@/lib/seo/jsonld";
import { getSeoMessages } from "@/lib/seo/get-seo";
import {
  getAlternatesLanguages,
  getLocaleUrl,
  localeToLanguageTag,
  localeToOpenGraphLocale,
} from "@/lib/seo/i18n";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  const seo = await getSeoMessages(typedLocale);
  const siteUrl = seo.site.url.replace(/\/$/, "");
  const canonical = getLocaleUrl(siteUrl, typedLocale);

  const alternatesLanguages = {
    "x-default": getLocaleUrl(siteUrl, routing.defaultLocale),
    ...getAlternatesLanguages(siteUrl),
  };

  const openGraphLocale = localeToOpenGraphLocale[typedLocale];
  const openGraphAlternateLocales = (routing.locales as readonly Locale[])
    .filter((l) => l !== typedLocale)
    .map((l) => localeToOpenGraphLocale[l]);

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  const otherVerification: Record<string, string> = {};
  if (bingVerification) otherVerification["msvalidate.01"] = bingVerification;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.title.default, template: seo.title.template },
    description: seo.description,
    applicationName: seo.site.name,
    keywords: seo.keywords,
    alternates: { canonical, languages: alternatesLanguages },
    authors: [{ name: seo.person.name, url: siteUrl }],
    creator: seo.person.name,
    publisher: seo.site.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      siteName: seo.site.name,
      locale: openGraphLocale,
      alternateLocale: openGraphAlternateLocales,
      images: [
        {
          url: "/og/og-image.png",
          width: 1200,
          height: 630,
          alt: seo.openGraph.imageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitter.title,
      description: seo.twitter.description,
      creator: seo.twitter.creator,
      images: ["/og/og-image.png"],
    },
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(Object.keys(otherVerification).length ? { other: otherVerification } : {}),
    },
    other: {
      "content-language": localeToLanguageTag[typedLocale],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  setRequestLocale(typedLocale);
  const seo = await getSeoMessages(typedLocale);

  const graph = buildJsonLdGraph({
    siteName: seo.site.name,
    siteUrl: seo.site.url,
    locale: typedLocale,
    ogImageUrl: `${seo.site.url.replace(/\/$/, "")}/og/og-image.png`,
    person: seo.person,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdToScriptInnerHtml(graph)}
      />
      {children}
    </>
  );
}
