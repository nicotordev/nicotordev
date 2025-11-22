"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "@/context/SessionContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { TimezoneProvider } from "@/context/TimezoneContext";
import GlassToaster from "@/components/common/glass-toast";

type ProvidersProps = {
  children: ReactNode;
  initialCurrency: string;
  initialTimezone: string;
};

export default function Providers({
  children,
  initialCurrency,
  initialTimezone,
}: ProvidersProps) {
  return (
    <SessionProvider>
      <CurrencyProvider initialCurrency={initialCurrency}>
        <TimezoneProvider initialTimezone={initialTimezone}>
          <GlassToaster />
          {children}
        </TimezoneProvider>
      </CurrencyProvider>
    </SessionProvider>
  );
}
