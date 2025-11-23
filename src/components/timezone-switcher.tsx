"use client";

import { useTransition } from "react";
import { timezones, TIMEZONE_LABELS, type Timezone } from "@/i18n/timezone";
import { useTimezoneStore } from "@/stores/timezone-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TimezoneSwitcher() {
  const { timezone, setTimezone } = useTimezoneStore();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (next: Timezone) => {
    if (next === timezone) return;
    startTransition(async () => {
      await setTimezone(next);
    });
  };

  return (
    <Select value={timezone} onValueChange={handleSelect} disabled={isPending}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          <span className="truncate">{TIMEZONE_LABELS[timezone]}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {timezones.map((tz) => (
          <SelectItem key={tz} value={tz}>
            {TIMEZONE_LABELS[tz]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
