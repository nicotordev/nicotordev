"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Currency } from "@/i18n/currency";
import { currencies, isCurrency } from "@/i18n/currency";
import { setCurrencyCookie } from "@/app/actions/currency.actions";

type CurrencyContextValue = {
  currency: Currency;
  supported: readonly Currency[];
  setCurrency: (next: Currency) => Promise<void>;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

export function CurrencyProvider({
  initialCurrency,
  children,
}: {
  initialCurrency: string;
  children: React.ReactNode;
}) {
  const initial = isCurrency(initialCurrency) ? initialCurrency : ("USD" as Currency);
  const [currency, setCurrencyState] = useState<Currency>(initial);

  const api = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      supported: currencies,
      async setCurrency(next) {
        if (next === currency) return;
        await setCurrencyCookie(next);
        setCurrencyState(next);
      },
    }),
    [currency]
  );

  return <CurrencyContext.Provider value={api}>{children}</CurrencyContext.Provider>;
}

