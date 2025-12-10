"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Check, Clock, DollarSign, Globe, Settings } from "lucide-react";
import { useLocale, useMessages } from "next-intl";
import { useTransition } from "react";

import { localeNames, locales, type Locale } from "@/i18n/config";
import {
  currencies,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
  type Currency,
} from "@/i18n/currency";
import { TIMEZONE_LABELS, timezones, type Timezone } from "@/i18n/timezone";

import { setLocaleCookie } from "@/app/actions/locale.actions";
import { useCurrencyStore } from "@/stores/currency-store";
import { useTimezoneStore } from "@/stores/timezone-store";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import Flag from "./flag";

interface SettingsMenuProps {
  loginLabel: string;
}

export default function SettingsMenu({ loginLabel }: SettingsMenuProps) {
  const messages = useMessages();
  const common = messages.common as any;

  const settingsLabel = common?.settings || "Settings";
  const preferencesLabel = common?.preferences || "Preferences";
  const languageLabel = common?.language || "Language";
  const currencyLabel = common?.currency || "Currency";
  const timezoneLabel = common?.timezone || "Timezone";
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const { currency, setCurrency } = useCurrencyStore();
  const { timezone, setTimezone } = useTimezoneStore();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (next: Locale) => {
    if (next === locale) return;
    startTransition(async () => {
      await setLocaleCookie(next);
      router.replace(pathname, { locale: next });
    });
  };

  const handleCurrencyChange = (next: Currency) => {
    if (next === currency) return;
    startTransition(async () => {
      await setCurrency(next);
      router.refresh();
    });
  };

  const handleTimezoneChange = (next: Timezone) => {
    if (next === timezone) return;
    startTransition(async () => {
      await setTimezone(next);
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <Settings className="size-5" />
          <Typography role="label" className="sr-only">
            {settingsLabel}
          </Typography>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-70">
        <DropdownMenuLabel>
          <Typography role="label">{preferencesLabel}</Typography>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Language Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Globe className="mr-2 size-4" />
            <Typography role="label">{languageLabel}</Typography>
            <Typography
              role="caption"
              className="ml-auto text-muted-foreground"
            >
              {localeNames[locale]}
            </Typography>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="z-70">
            {locales.map((l) => (
              <DropdownMenuItem key={l} onClick={() => handleLocaleChange(l)}>
                <Flag locale={l} />
                <Typography role="label" className="ml-2 flex-1">
                  {localeNames[l]}
                </Typography>
                {l === locale && <Check className="ml-2 size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Currency Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <DollarSign className="mr-2 size-4" />
            <Typography role="label">{currencyLabel}</Typography>
            <Typography
              role="caption"
              className="ml-auto text-muted-foreground"
            >
              {currency}
            </Typography>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-[300px] overflow-y-auto z-70">
            {currencies.map((c) => (
              <DropdownMenuItem key={c} onClick={() => handleCurrencyChange(c)}>
                <Typography
                  role="label"
                  className="mr-2 text-muted-foreground w-4 text-center"
                >
                  {CURRENCY_SYMBOLS[c]}
                </Typography>
                <Typography role="label" className="flex-1">
                  {CURRENCY_LABELS[c]}
                </Typography>
                {c === currency && <Check className="ml-2 size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Timezone Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Clock className="mr-2 size-4" />
            <Typography role="label">{timezoneLabel}</Typography>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-[300px] overflow-y-auto z-70">
            {timezones.map((tz) => (
              <DropdownMenuItem
                key={tz}
                onClick={() => handleTimezoneChange(tz)}
              >
                <Typography role="label" className="flex-1">
                  {TIMEZONE_LABELS[tz]}
                </Typography>
                {tz === timezone && <Check className="ml-2 size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
