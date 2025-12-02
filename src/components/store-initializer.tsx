"use client";

import type { Currency } from "@/i18n/currency";
import type { Timezone } from "@/i18n/timezone";
import { useCurrencyStore } from "@/stores/currency-store";
import { useTimezoneStore } from "@/stores/timezone-store";
import { useEffect, useRef } from "react";

interface StoreInitializerProps {
  initialCurrency: string;
  initialTimezone: string;
}

export default function StoreInitializer({
  initialCurrency,
  initialTimezone,
}: StoreInitializerProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      useCurrencyStore.setState({ currency: initialCurrency as Currency });
      useTimezoneStore.setState({ timezone: initialTimezone as Timezone });
      initialized.current = true;
    }
  }, [initialCurrency, initialTimezone]); // Add dependencies to re-run if props change, though for initial setup, they often don't.

  return null;
}
