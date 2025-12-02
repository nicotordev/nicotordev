import GlassToaster from "@/components/common/glass-toast";
import StoreInitializer from "@/components/store-initializer";
import type { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

interface Props {
  children: React.ReactNode;
  locale: (typeof routing.locales)[number];
  messages: Record<string, string>;
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <StoreInitializer
        initialCurrency={initialCurrency}
        initialTimezone={initialTimezone}
      />
      <GlassToaster />
      {children}
    </NextIntlClientProvider>
  );
}
