"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  currencies,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
  type Currency,
} from "@/i18n/currency";
import { useCurrencyStore } from "@/stores/currency-store";
import { useTransition } from "react";

export default function CurrencySwitcher({
  className,
}: {
  className?: string;
}) {
  const { currency, setCurrency } = useCurrencyStore();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (next: string) => {
    if (next === currency) return;
    startTransition(async () => {
      await setCurrency(next as Currency);
    });
  };

  return (
    <Select value={currency} onValueChange={handleSelect} disabled={isPending}>
      <SelectTrigger className={className || "w-[140px]"}>
        <SelectValue>
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">
              {CURRENCY_SYMBOLS[currency]}
            </span>
            <span>{currency}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {currencies.map((cur) => (
          <SelectItem key={cur} value={cur}>
            <span className="flex items-center gap-1.5">
              <span className="text-muted-foreground">
                {CURRENCY_SYMBOLS[cur]}
              </span>
              <span>{CURRENCY_LABELS[cur]}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
