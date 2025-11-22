import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Providers from "./providers";
import {
  localInter,
  localSora,
  localSourceSerif4,
  localFiraCode,
  localJetBrainsMono,
  localIBMPlexMono,
  localFontdinerSwanky,
  localLoveLight,
  localPermanentMarker,
} from "./fonts";
import "./globals.css";
import { defaultCurrencyByLocale, isCurrency } from "@/i18n/currency";
import { defaultTimezoneByLocale, isTimezone } from "@/i18n/timezone";

export const metadata: Metadata = {
  title: "NicoTorDev",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

type RootLayoutProps = {
  children: ReactNode;
};

async function LocalizedContent({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const cookieCurrency = cookieStore.get("NEXT_CURRENCY")?.value;
  const cookieTimezone = cookieStore.get("NEXT_TIMEZONE")?.value;
  const isSupportedLocale = (
    value: string | undefined
  ): value is (typeof routing.locales)[number] =>
    Boolean(
      value &&
        routing.locales.includes(value as (typeof routing.locales)[number])
    );

  const locale = isSupportedLocale(cookieLocale)
    ? cookieLocale
    : routing.defaultLocale;
  const messages = await getMessages({ locale });

  const initialCurrency = isCurrency(cookieCurrency || "")
    ? cookieCurrency!
    : defaultCurrencyByLocale[locale];
  const initialTimezone = isTimezone(cookieTimezone || "")
    ? cookieTimezone!
    : defaultTimezoneByLocale[locale];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers
        initialCurrency={initialCurrency}
        initialTimezone={initialTimezone}
      >
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang={routing.defaultLocale}
      suppressHydrationWarning
      className={`${localInter.variable} ${localSora.variable} ${localSourceSerif4.variable} ${localFiraCode.variable} ${localJetBrainsMono.variable} ${localIBMPlexMono.variable} ${localFontdinerSwanky.variable} ${localLoveLight.variable} ${localPermanentMarker.variable}`}
    >
      <body className="antialiased">
        <Suspense fallback={null}>
          <LocalizedContent>{children}</LocalizedContent>
        </Suspense>
      </body>
    </html>
  );
}
