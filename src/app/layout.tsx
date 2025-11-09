import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { routing } from "@/i18n/routing";
import { localInter, localSora, localSourceSerif4, localFiraCode } from "./fonts"; 
import "./globals.css";

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

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
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

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${localInter.variable} ${localSora.variable} ${localSourceSerif4.variable} ${localFiraCode.variable}`} 
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
