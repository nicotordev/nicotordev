import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Mono, Fira_Code } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from "@/components/Home/ThemeProvider"
import { getLanguage, setLanguage } from "../actions/language.actions";
import Header from "@/components/Layout/Header";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('metadata');

  // Locale mapping for OpenGraph
  const localeMap: Record<string, string> = {
    'en': 'en_US',
    'en-gb': 'en_GB',
    'es': 'es_ES',
    'es-cl': 'es_CL',
    'es-es': 'es_ES',
    'de': 'de_DE',
  };

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`
    },
    description: t('description'),
    applicationName: "NicoTordev",
    authors: [{ name: "NicoTordev", url: "https://nicotordev.com" }],
    creator: "NicoTordev",
    keywords: t('keywords').split(', '),
    openGraph: {
      type: "website",
      locale: localeMap[locale] || 'en_US',
      url: `https://nicotordev.com/${locale === 'en' ? '' : locale}`,
      title: t('title'),
      description: t('description'),
      siteName: "NicoTordev",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t('title')
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/og-image.png"],
      creator: "@nicotordev"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png"
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: `https://nicotordev.com/${locale === 'en' ? '' : locale}`,
      languages: {
        'en': 'https://nicotordev.com',
        'en-gb': 'https://nicotordev.com/en-gb',
        'es': 'https://nicotordev.com/es',
        'es-cl': 'https://nicotordev.com/es-cl',
        'es-es': 'https://nicotordev.com/es-es',
        'de': 'https://nicotordev.com/de',
      }
    },
    category: "Personal Site"
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const language = getLanguage();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  if (!language) {
    setLanguage(locale);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${jetbrainsMono.variable} ${ibmPlexMono.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Header />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}