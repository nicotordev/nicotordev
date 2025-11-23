import { create } from "zustand";
import { timezones, type Timezone } from "@/i18n/timezone";
import { setTimezoneCookie } from "@/app/actions/timezone.actions";

interface TimezoneState {
  timezone: Timezone;
  supported: readonly Timezone[];
  setTimezone: (timezone: Timezone) => Promise<void>;
}

export const useTimezoneStore = create<TimezoneState>((set) => ({
  timezone: "UTC",
  supported: timezones,
  setTimezone: async (next: Timezone) => {
    await setTimezoneCookie(next);
    set({ timezone: next });
  },
}));
