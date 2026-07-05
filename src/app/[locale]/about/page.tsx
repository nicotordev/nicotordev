import AboutPageContent from "@/components/about/about-page-content";
import { staticProjects } from "@/app/data/projects";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { fetchProjectsOptional, type ProjectFromCMS } from "@/lib/directus";
import { getLocaleUrl, localeToLanguageTag } from "@/lib/seo/i18n";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";

export interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const translation = await getTranslations({ locale: typedLocale });

  const siteUrl = translation("seo.site.url").replace(/\/$/, "");
  const canonical = `${getLocaleUrl(siteUrl, typedLocale)}/about`;

  const alternatesLanguages = {
    "x-default": `${getLocaleUrl(siteUrl, routing.defaultLocale)}/about`,
    ...Object.fromEntries(
      (routing.locales as readonly Locale[]).map((l) => [
        localeToLanguageTag[l],
        `${getLocaleUrl(siteUrl, l)}/about`,
      ]),
    ),
  };

  return {
    title: { absolute: translation("seo.about.title") },
    description: translation("seo.about.description"),
    alternates: {
      canonical,
      languages: alternatesLanguages,
    },
    openGraph: {
      url: canonical,
      title: translation("seo.about.openGraph.title"),
      description: translation("seo.about.openGraph.description"),
    },
    twitter: {
      title: translation("seo.about.twitter.title"),
      description: translation("seo.about.twitter.description"),
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const [messages, cmsProjects] = await Promise.all([
    getMessages({ locale: typedLocale }) as Promise<Messages>,
    fetchProjectsOptional(typedLocale),
  ]);

  const projects: ProjectFromCMS[] = (
    cmsProjects && cmsProjects.length > 0
      ? cmsProjects
      : (staticProjects as ProjectFromCMS[])
  ).slice(0, 4);

  return (
    <>
      <Header messages={messages} />
      <main className="w-full overflow-x-clip">
        <AboutPageContent messages={messages} projects={projects} />
      </main>
      <Footer messages={messages} />
    </>
  );
}
