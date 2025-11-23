"use client";

import type { ReactNode } from "react";
import StoreInitializer from "@/components/store-initializer";
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
    <>
      <StoreInitializer
        initialCurrency={initialCurrency}
        initialTimezone={initialTimezone}
      />
      <GlassToaster />
      {children}
    </>
  );
}
