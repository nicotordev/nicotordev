import { routing } from "@/i18n/routing";
import ProvidersWrapper from "@/providers/providers-wrapper";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
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

export const metadata: Metadata = {
  title: "NicoTorDev",
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Suspense fallback={null}>
      <ClerkProvider>
        <ProvidersWrapper>
          <html
            lang={routing.defaultLocale}
            suppressHydrationWarning
            className={`${localInter.variable} ${localSora.variable} ${localSourceSerif4.variable} ${localFiraCode.variable} ${localJetBrainsMono.variable} ${localIBMPlexMono.variable} ${localFontdinerSwanky.variable} ${localLoveLight.variable} ${localPermanentMarker.variable}`}
          >
            <body className="antialiased">{children}</body>
          </html>
        </ProvidersWrapper>
      </ClerkProvider>
    </Suspense>
  );
}
