import { defaultCurrencyByLocale, isCurrency } from "@/i18n/currency";
import { routing } from "@/i18n/routing";
import { defaultTimezoneByLocale, isTimezone } from "@/i18n/timezone";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import Providers from "./providers";

export default async function ProvidersWrapper({
  children,
}: {
  children: ReactNode;
}) {
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
    <Providers
      locale={locale}
      messages={messages}
      initialCurrency={initialCurrency}
      initialTimezone={initialTimezone}
    >
      {children}
    </Providers>
  );
}
