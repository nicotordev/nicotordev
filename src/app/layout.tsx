import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { getLocale, getMessages } from "next-intl/server";
import {
  localIBMPlexMono,
  localInter,
  localPermanentMarker,
  localSora,
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
  // Reduce layout shift and help crawlers; themeColor can improve browser chrome.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdf2f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
  robots: {
    index: true,
    follow: true,
  },
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
      className={`${localInter.variable} ${localSora.variable} ${localIBMPlexMono.variable} ${localPermanentMarker.variable}`}
    >
      <body className="antialiased">
        <Suspense fallback={null}>
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </Suspense>
      </body>
    </html>
  );
}
