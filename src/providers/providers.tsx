"use client";
import GlassToaster from "@/components/common/glass-toast";
import StoreInitializer from "@/components/store-initializer";
import type { routing } from "@/i18n/routing";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import type { Messages } from "@/types/i18n";
interface Props {
  children: React.ReactNode;
  locale: (typeof routing.locales)[number];
  messages: Messages;
  initialCurrency: string;
  initialTimezone: string;
}
export default function Providers({
  children,
  locale,
  messages,
  initialCurrency,
  initialTimezone,
}: Props) {
  return (
    <ClerkProvider telemetry={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <StoreInitializer
          initialCurrency={initialCurrency}
          initialTimezone={initialTimezone}
        />
        <GlassToaster />
        {children}
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
