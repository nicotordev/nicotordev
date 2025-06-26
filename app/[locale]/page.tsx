import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/HeroSection';


interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('metadata');

  // Locale mapping for OpenGraph
  const localeMap: Record<string, string> = {
    'en': 'en_US',
    'en-gb': 'en_GB',
    'es': 'es_ES',
    'es-cl': 'es_CL',
    'es-es': 'es_ES',
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
      }
    },
    category: "Personal Site"
  };
}

export default async function Home() { 
  const heroSection = await HeroSection();

  return (
    <main>
      {heroSection}
    </main>
  );
}