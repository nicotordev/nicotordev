"use client";

import GlassToaster from "@/components/common/glass-toast";
import StoreInitializer from "@/components/store-initializer";
import type { ReactNode } from "react";

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
