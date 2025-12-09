import { getLocale, getMessages } from "next-intl/server";
import type { ReactNode } from "react";

import { defaultCurrencyByLocale } from "@/i18n/currency";
import { routing } from "@/i18n/routing";
import { defaultTimezoneByLocale } from "@/i18n/timezone";
import { fetchUserPreferences } from "@/lib/clerk/preferences";
import Providers from "./providers";

export default async function ProvidersWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const preferences = await fetchUserPreferences();
  const requestLocale = await getLocale();
  const locale = requestLocale ?? preferences.locale ?? routing.defaultLocale;
  const messages = await getMessages({ locale });

  const initialCurrency =
    preferences.currency ?? defaultCurrencyByLocale[locale];
  const initialTimezone =
    preferences.timezone ?? defaultTimezoneByLocale[locale];

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
