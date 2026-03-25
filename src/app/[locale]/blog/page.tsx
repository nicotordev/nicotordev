import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { getLocaleUrl } from "@/lib/seo/i18n";
import type { Messages } from "@/types/i18n";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import BlogSection from "@/components/home/blog/blog-section";

export interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = await getMessages({ locale: typedLocale });

  const canonical = getLocaleUrl(messages.seo.site.url, typedLocale);

  return {
    title: { absolute: messages.seo.title.default },
    description: messages.seo.description,
    alternates: {
      canonical,
      languages: {
        "x-default": getLocaleUrl(messages.seo.site.url, routing.defaultLocale),
      },
    },
    openGraph: {
      url: canonical,
      title: messages.seo.openGraph.title,
      description: messages.seo.openGraph.description,
    },
    twitter: {
      title: messages.seo.twitter.title,
      description: messages.seo.twitter.description,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const messages = (await getMessages({
    locale: locale as Locale,
  })) as Messages;

  return (
    <>
      <Header messages={messages} />
      <main>
        <BlogSection messages={messages} />
      </main>
      <Footer messages={messages} />
    </>
  );
}
