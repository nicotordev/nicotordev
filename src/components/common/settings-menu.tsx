"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Globe,
  DollarSign,
  Clock,
  User,
  Settings,
  Check,
  LogIn,
} from "lucide-react";

import { locales, localeNames, type Locale } from "@/i18n/config";
import {
  currencies,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
  type Currency,
} from "@/i18n/currency";
import { timezones, TIMEZONE_LABELS, type Timezone } from "@/i18n/timezone";

import { useCurrencyStore } from "@/stores/currency-store";
import { useTimezoneStore } from "@/stores/timezone-store";
import { setLocaleCookie } from "@/app/actions/locale.actions";

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

import UnitedStatesFlag from "@/components/emojis/united-states-flag";
import UnitedKingdomFlag from "@/components/emojis/united-kingdom-flag";
import SpainFlag from "@/components/emojis/spain-flag";
import MexicoFlag from "@/components/emojis/mexico-flag";
import ChileFlag from "@/components/emojis/chile-flag";
import GermanyFlag from "@/components/emojis/germany-flag";

function Flag({ locale, size = 16 }: { locale: Locale; size?: number }) {
  switch (locale) {
    case "en":
      return <UnitedStatesFlag width={size} alt="United States flag" />;
    case "en-gb":
      return <UnitedKingdomFlag width={size} alt="United Kingdom flag" />;
    case "es":
      return <MexicoFlag width={size} alt="Mexico flag" />;
    case "es-es":
      return <SpainFlag width={size} alt="Spain flag" />;
    case "es-cl":
      return <ChileFlag width={size} alt="Chile flag" />;
    case "de":
      return <GermanyFlag width={size} alt="Germany flag" />;
    default:
      return null;
  }
}

interface SettingsMenuProps {
  loginLabel: string;
}

export default function SettingsMenu({ loginLabel }: SettingsMenuProps) {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const { currency, setCurrency } = useCurrencyStore();
  const { timezone, setTimezone } = useTimezoneStore();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (next: Locale) => {
    if (next === locale) return;
    startTransition(async () => {
      await setLocaleCookie(next);
      router.refresh();
    });
  };

  const handleCurrencyChange = (next: Currency) => {
    if (next === currency) return;
    startTransition(async () => {
      await setCurrency(next);
    });
  };

  const handleTimezoneChange = (next: Timezone) => {
    if (next === timezone) return;
    startTransition(async () => {
      await setTimezone(next);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <Settings className="size-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Preferences</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Language Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Globe className="mr-2 size-4" />
            <span>Language</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {localeNames[locale]}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {locales.map((l) => (
              <DropdownMenuItem key={l} onClick={() => handleLocaleChange(l)}>
                <Flag locale={l} />
                <span className="ml-2 flex-1">{localeNames[l]}</span>
                {l === locale && <Check className="ml-2 size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Currency Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <DollarSign className="mr-2 size-4" />
            <span>Currency</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {currency}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-[300px] overflow-y-auto">
            {currencies.map((c) => (
              <DropdownMenuItem key={c} onClick={() => handleCurrencyChange(c)}>
                <span className="mr-2 text-muted-foreground w-4 text-center">
                  {CURRENCY_SYMBOLS[c]}
                </span>
                <span className="flex-1">{CURRENCY_LABELS[c]}</span>
                {c === currency && <Check className="ml-2 size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Timezone Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Clock className="mr-2 size-4" />
            <span>Timezone</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-[300px] overflow-y-auto">
            {timezones.map((tz) => (
              <DropdownMenuItem
                key={tz}
                onClick={() => handleTimezoneChange(tz)}
              >
                <span className="flex-1">{TIMEZONE_LABELS[tz]}</span>
                {tz === timezone && <Check className="ml-2 size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a href="#" className="flex items-center cursor-pointer">
            <LogIn className="mr-2 size-4" />
            <span>{loginLabel}</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
