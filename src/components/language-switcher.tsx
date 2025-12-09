"use client";

import { setLocaleCookie } from "@/app/actions/locale.actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

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
}: {
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleSelect = (next: Locale) => {
    if (next === locale) return;
    startTransition(async () => {
      await setLocaleCookie(next);
      router.replace(pathname, { locale: next });
    });
  };

  const isIconSize = size?.includes("icon");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size} disabled={isPending}>
          <Flag locale={locale} />
          {!isIconSize && (
            <span className="ml-1 hidden sm:inline">{localeNames[locale]}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem key={l} onSelect={() => handleSelect(l)}>
            <Flag locale={l} />
            <span className="ml-1">{localeNames[l]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
