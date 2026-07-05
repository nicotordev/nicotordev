"use client";

import { setLocaleCookie } from "@/app/actions/locale.actions";
import Flag from "@/components/common/flag";
import { Typography } from "@/components/ui/typography";
import {
  getPathWithoutLocale,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";
import {
  currencies,
  CURRENCY_LABELS,
  CURRENCY_SYMBOLS,
  type Currency,
} from "@/i18n/currency";
import { usePathname, useRouter } from "@/i18n/navigation";
import { TIMEZONE_LABELS, timezones, type Timezone } from "@/i18n/timezone";
import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/stores/currency-store";
import { useTimezoneStore } from "@/stores/timezone-store";
import { Check, Clock, DollarSign, Globe } from "lucide-react";
import { useLocale, useMessages } from "next-intl";
import { useTransition } from "react";

function PreferenceGroup({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-lg border border-border/60 bg-muted/20">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <Typography role="label" className="flex-1 text-sm font-medium">
          {label}
        </Typography>
        <Typography
          role="caption"
          className="max-w-[45%] truncate text-xs text-muted-foreground"
        >
          {value}
        </Typography>
      </summary>
      <div className="max-h-48 space-y-0.5 overflow-y-auto overscroll-contain border-t border-border/40 px-1 py-1">
        {children}
      </div>
    </details>
  );
}

function PreferenceOption({
  active,
  onSelect,
  children,
}: {
  active: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent/60",
      )}
    >
      <span className="flex-1">{children}</span>
      {active ? <Check className="size-4 shrink-0" aria-hidden /> : null}
    </button>
  );
}

export default function HeaderMobileMenuPreferences() {
  const messages = useMessages();
  const common = messages.common ?? {};
  const preferencesLabel = common.preferences || "Preferences";
  const languageLabel = common.language || "Language";
  const currencyLabel = common.currency || "Currency";
  const timezoneLabel = common.timezone || "Timezone";

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const { currency, setCurrency } = useCurrencyStore();
  const { timezone, setTimezone } = useTimezoneStore();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (next: Locale) => {
    if (next === locale || isPending) return;
    startTransition(async () => {
      await setLocaleCookie(next);
      const normalizedPathname = getPathWithoutLocale(pathname);
      router.replace(normalizedPathname, { locale: next });
    });
  };

  const handleCurrencyChange = (next: Currency) => {
    if (next === currency || isPending) return;
    startTransition(async () => {
      await setCurrency(next);
      router.refresh();
    });
  };

  const handleTimezoneChange = (next: Timezone) => {
    if (next === timezone || isPending) return;
    startTransition(async () => {
      await setTimezone(next);
      router.refresh();
    });
  };

  return (
    <div className="space-y-3 px-3 py-6">
      <Typography
        role="label"
        className="mb-2 text-xs font-semibold text-muted-foreground"
      >
        {preferencesLabel}
      </Typography>
      <div className="space-y-2">
        <PreferenceGroup
          icon={Globe}
          label={languageLabel}
          value={localeNames[locale]}
        >
          {locales.map((l) => (
            <PreferenceOption
              key={l}
              active={l === locale}
              onSelect={() => handleLocaleChange(l)}
            >
              <span className="flex items-center gap-2">
                <Flag locale={l} />
                {localeNames[l]}
              </span>
            </PreferenceOption>
          ))}
        </PreferenceGroup>

        <PreferenceGroup
          icon={DollarSign}
          label={currencyLabel}
          value={currency}
        >
          {currencies.map((c) => (
            <PreferenceOption
              key={c}
              active={c === currency}
              onSelect={() => handleCurrencyChange(c)}
            >
              <span className="flex items-center gap-2">
                <span className="w-4 text-center text-muted-foreground">
                  {CURRENCY_SYMBOLS[c]}
                </span>
                {CURRENCY_LABELS[c]}
              </span>
            </PreferenceOption>
          ))}
        </PreferenceGroup>

        <PreferenceGroup
          icon={Clock}
          label={timezoneLabel}
          value={TIMEZONE_LABELS[timezone]}
        >
          {timezones.map((tz) => (
            <PreferenceOption
              key={tz}
              active={tz === timezone}
              onSelect={() => handleTimezoneChange(tz)}
            >
              {TIMEZONE_LABELS[tz]}
            </PreferenceOption>
          ))}
        </PreferenceGroup>
      </div>
    </div>
  );
}
