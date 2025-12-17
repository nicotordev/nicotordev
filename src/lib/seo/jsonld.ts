import type { Locale } from "@/i18n/config";

import { localeToLanguageTag } from "./i18n";
import type { SeoMessages } from "./types";

type JsonLdNode =
  | Record<string, unknown>
  | string
  | number
  | boolean
  | null
  | JsonLdNode[]
  | { [key: string]: JsonLdNode };

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

export function buildJsonLdGraph(args: {
  siteName: string;
  siteUrl: string;
  locale: Locale;
  ogImageUrl: string;
  person: SeoMessages["person"];
}): JsonLdGraph {
  const siteUrl = args.siteUrl.replace(/\/$/, "");
  const inLanguage = localeToLanguageTag[args.locale];

  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const orgId = `${siteUrl}/#org`;

  const organization: JsonLdNode = {
    "@type": "Organization",
    "@id": orgId,
    name: args.siteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: args.ogImageUrl,
    },
  };

  const website: JsonLdNode = {
    "@type": "WebSite",
    "@id": websiteId,
    name: args.siteName,
    url: siteUrl,
    inLanguage,
    publisher: { "@id": orgId },
  };

  const person: JsonLdNode = {
    "@type": "Person",
    "@id": personId,
    name: args.person.name,
    jobTitle: args.person.jobTitle,
    url: siteUrl,
    image: args.person.image,
    sameAs: args.person.sameAs,
    knowsAbout: args.person.knowsAbout,
    worksFor: { "@id": orgId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, person],
  };
}

export function jsonLdToScriptInnerHtml(graph: JsonLdGraph): { __html: string } {
  return { __html: JSON.stringify(graph) };
}

