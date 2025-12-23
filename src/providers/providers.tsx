"use client";
import GlassToaster from "@/components/common/glass-toast";
import WebVitalsReporter from "@/components/performance/web-vitals-reporter";
import StoreInitializer from "@/components/store-initializer";
import type { routing } from "@/i18n/routing";
import type { Timezone } from "@/i18n/timezone";
import { NextIntlClientProvider } from "next-intl";
import type { Messages } from "@/types/i18n";
interface Props {
  children: React.ReactNode;
  locale: (typeof routing.locales)[number];
  messages: Messages;
}
export default function Providers({
  children,
  locale,
  messages,
}: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <WebVitalsReporter />
      <GlassToaster />
      {children}
    </NextIntlClientProvider>
  );
}
