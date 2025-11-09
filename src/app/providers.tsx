"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "@/context/SessionContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
