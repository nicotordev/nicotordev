"use client";

import { useCallback, useMemo } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { formatCurrency, type Currency } from "@/i18n/currency";
import { formatInTimeZone, type Timezone } from "@/i18n/timezone";
import { useCurrencyStore } from "@/stores/currency-store";
import { useTimezoneStore } from "@/stores/timezone-store";

type LocaleFamily = "en" | "es" | "de";

type LocalizedCopy = {
  proBono: string;
  statusActive: string;
  statusInactive: string;
  impact: string;
};

const LOCALE_COPY: Record<LocaleFamily, LocalizedCopy> = {
  en: {
    proBono: "Pro bono / internal",
    statusActive: "Active",
    statusInactive: "Archived",
    impact: "Impact",
  },
  es: {
    proBono: "Pro bono / interno",
    statusActive: "Activo",
    statusInactive: "Archivado",
    impact: "Impacto",
  },
  de: {
    proBono: "Pro-bono / intern",
    statusActive: "Aktiv",
    statusInactive: "Archiviert",
    impact: "Wirkung",
  },
};

function getLocaleFamily(locale: Locale | string): LocaleFamily {
  if (locale.startsWith("es")) return "es";
  if (locale.startsWith("de")) return "de";
  return "en";
}

export function useLocalizedPreferences() {
  const locale = useLocale() as Locale;
  const {
    currency,
    supported: supportedCurrencies,
    setCurrency,
  } = useCurrencyStore();
  const {
    timezone,
    supported: supportedTimezones,
    setTimezone,
  } = useTimezoneStore();

  const localeFamily = useMemo(() => getLocaleFamily(locale), [locale]);
  const copy = useMemo(() => LOCALE_COPY[localeFamily], [localeFamily]);

  const formatCost = useCallback(
    (amount: number): string => {
      if (amount <= 0) return copy.proBono;
      return formatCurrency(amount, {
        locale,
        currency: currency as Currency,
        minimumFractionDigits: amount >= 1000 ? 0 : 2,
      });
    },
    [copy.proBono, currency, locale]
  );

  const formatDate = useCallback(
    (
      date: Date | string | number,
      options?: Intl.DateTimeFormatOptions
    ): string => formatInTimeZone(date, timezone as Timezone, locale, options),
    [locale, timezone]
  );

  const getStatusLabel = useCallback(
    (isActive: boolean) => (isActive ? copy.statusActive : copy.statusInactive),
    [copy.statusActive, copy.statusInactive]
  );

  return {
    locale,
    currency,
    timezone,
    supportedCurrencies,
    supportedTimezones,
    setCurrency,
    setTimezone,
    copy,
    formatCost,
    formatDate,
    getStatusLabel,
  } as const;
}
