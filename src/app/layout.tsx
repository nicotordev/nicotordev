import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { getLocale, getMessages } from "next-intl/server";
import {
  localFiraCode,
  localFontdinerSwanky,
  localIBMPlexMono,
  localInter,
  localJetBrainsMono,
  localLoveLight,
  localPermanentMarker,
  localSora,
  localSourceSerif4,
} from "./fonts";
import "./globals.css";
import ProvidersWrapper from "@/providers/providers-wrapper";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.webp",
  },
  manifest: "/site.webmanifest",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = (await getLocale()) ?? routing.defaultLocale;
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${localInter.variable} ${localSora.variable} ${localSourceSerif4.variable} ${localFiraCode.variable} ${localJetBrainsMono.variable} ${localIBMPlexMono.variable} ${localFontdinerSwanky.variable} ${localLoveLight.variable} ${localPermanentMarker.variable}`}
    >
      <body className="antialiased">
        <Suspense fallback={null}>
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </Suspense>
      </body>
    </html>
  );
}
