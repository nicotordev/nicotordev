import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SignInForm from '@/components/Auth/SignInForm';
import AnimatedBackgroundBlobs from '@/components/common/AnimatedBackgroundBlobs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('auth.signIn.metadata');

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
    metadataBase: new URL('https://nicotordev.com'),

    title: t('title'),
    description: t('description'),
    applicationName: "NicoTordev",
    authors: [{ name: "NicoTordev", url: "https://nicotordev.com" }],
    creator: "NicoTordev",
    keywords: t('keywords').split(', '),
    openGraph: {
      type: "website",
      locale: localeMap[locale] || 'en_US',
      url: `https://nicotordev.com/${locale === 'en' ? '' : locale}/auth/sign-in`,
      title: t('title'),
      description: t('description'),
      siteName: "NicoTordev",
      images: [
        {
          url: "/og-image-auth.png",
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
      images: ["/og-image-auth.png"],
      creator: "@nicotordev"
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
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
      canonical: `https://nicotordev.com/${locale === 'en' ? '' : locale}/auth/sign-in`,
      languages: {
        'en': 'https://nicotordev.com/auth/sign-in',
        'en-gb': 'https://nicotordev.com/en-gb/auth/sign-in',
        'es': 'https://nicotordev.com/es/auth/sign-in',
        'es-cl': 'https://nicotordev.com/es-cl/auth/sign-in',
        'es-es': 'https://nicotordev.com/es-es/auth/sign-in',
        'de': 'https://nicotordev.com/de/auth/sign-in',
      }
    },
    category: "Authentication"
  };
}

export default async function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-8 relative">
      <AnimatedBackgroundBlobs />
      <div className="w-full max-w-md space-y-8 relative z-10">
        <SignInForm />
      </div>
    </main>
  );
}
