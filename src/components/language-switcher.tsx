"use client";

import { setLocaleCookie } from "@/app/actions/locale.actions";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ChileFlag from "@/components/emojis/chile-flag";
import GermanyFlag from "@/components/emojis/germany-flag";
import MexicoFlag from "@/components/emojis/mexico-flag";
import SpainFlag from "@/components/emojis/spain-flag";
import UnitedKingdomFlag from "@/components/emojis/united-kingdom-flag";
import UnitedStatesFlag from "@/components/emojis/united-states-flag";

function Flag({ locale, size = 16 }: { locale: Locale; size?: number }) {
  const alt = `${localeNames[locale]} flag`;
  switch (locale) {
    case "en":
      return <UnitedStatesFlag width={size} alt={alt} />;
    case "en-gb":
      return <UnitedKingdomFlag width={size} alt={alt} />;
    case "es":
      return <MexicoFlag width={size} alt={alt} />;
    case "es-es":
      return <SpainFlag width={size} alt={alt} />;
    case "es-cl":
      return <ChileFlag width={size} alt={alt} />;
    case "de":
      return <GermanyFlag width={size} alt={alt} />;
    default:
      return null;
  }
}

export default function LanguageSwitcher({
  size = "default",
  className,
}: {
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleSelect = (next: string) => {
    if (next === locale) return;
    startTransition(async () => {
      await setLocaleCookie(next as Locale);
      router.replace(pathname, { locale: next as Locale });
    });
  };

  const isIconSize = size?.includes("icon");

  return (
    <Select value={locale} onValueChange={handleSelect} disabled={isPending}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={localeNames[locale]}>
          <div className="flex items-center gap-2">
            <Flag locale={locale} />
            {!isIconSize && (
              <span className="truncate">{localeNames[locale]}</span>
            )}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {locales.map((l) => (
          <SelectItem key={l} value={l}>
            <div className="flex items-center gap-2">
              <Flag locale={l} />
              <span>{localeNames[l]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
