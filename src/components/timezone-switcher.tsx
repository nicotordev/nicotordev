"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIMEZONE_LABELS, timezones, type Timezone } from "@/i18n/timezone";
import { useTimezoneStore } from "@/stores/timezone-store";
import { useTransition } from "react";

export default function TimezoneSwitcher({
  className,
}: {
  className?: string;
}) {
  const { timezone, setTimezone } = useTimezoneStore();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (next: string) => {
    if (next === timezone) return;
    startTransition(async () => {
      await setTimezone(next as Timezone);
    });
  };

  return (
    <Select value={timezone} onValueChange={handleSelect} disabled={isPending}>
      <SelectTrigger className={className || "w-[180px]"}>
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
