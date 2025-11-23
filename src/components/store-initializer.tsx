"use client";

import { useRef } from "react";
import { useCurrencyStore } from "@/stores/currency-store";
import { useTimezoneStore } from "@/stores/timezone-store";
import type { Currency } from "@/i18n/currency";
import type { Timezone } from "@/i18n/timezone";

interface StoreInitializerProps {
  initialCurrency: string;
  initialTimezone: string;
}

export default function StoreInitializer({
  initialCurrency,
  initialTimezone,
}: StoreInitializerProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useCurrencyStore.setState({ currency: initialCurrency as Currency });
    useTimezoneStore.setState({ timezone: initialTimezone as Timezone });
    initialized.current = true;
  }

  return null;
}
