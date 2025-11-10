"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Timezone } from "@/i18n/timezone";
import { timezones, isTimezone } from "@/i18n/timezone";
import { setTimezoneCookie } from "@/app/actions/timezone.actions";

type TimezoneContextValue = {
  timezone: Timezone;
  supported: readonly Timezone[];
  setTimezone: (next: Timezone) => Promise<void>;
};

const TimezoneContext = createContext<TimezoneContextValue | null>(null);

export function useTimezone(): TimezoneContextValue {
  const ctx = useContext(TimezoneContext);
  if (!ctx) throw new Error("useTimezone must be used within TimezoneProvider");
  return ctx;
}

export function TimezoneProvider({
  initialTimezone,
  children,
}: {
  initialTimezone: string;
  children: React.ReactNode;
}) {
  const initial = isTimezone(initialTimezone) ? initialTimezone : ("UTC" as Timezone);
  const [timezone, setTimezoneState] = useState<Timezone>(initial);

  const api = useMemo<TimezoneContextValue>(
    () => ({
      timezone,
      supported: timezones,
      async setTimezone(next) {
        if (next === timezone) return;
        await setTimezoneCookie(next);
        setTimezoneState(next);
      },
    }),
    [timezone]
  );

  return <TimezoneContext.Provider value={api}>{children}</TimezoneContext.Provider>;
}

