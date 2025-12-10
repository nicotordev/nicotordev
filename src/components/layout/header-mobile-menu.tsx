"use client";

import type { Messages } from "@/types/i18n";
import { Menu } from "lucide-react";
import CurrencySwitcher from "../currency-switcher";
import LanguageSwitcher from "../language-switcher";
import TimezoneSwitcher from "../timezone-switcher";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Typography } from "../ui/typography";

interface HeaderMobileMenuProps {
  messages: Messages;
  navItems: {
    name: string;
    href: string;
  }[];
}

export default function HeaderMobileMenu({
  messages,
  navItems,
}: HeaderMobileMenuProps) {
  const navigationAria = messages.navigation?.aria ?? {};
  const commonMessages = messages.common ?? {};
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={navigationAria.openMainMenu || "Open main menu"}
            className="-m-2.5"
          >
            <Menu className="size-6" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-sm">
          <SheetHeader className="p-0">
            <SheetTitle className="sr-only">
              {navigationAria.mobileMenu || "Mobile Menu"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <div className="divide-y divide-border">
              <div className="space-y-3 py-6">
                <div className="px-3">
                  <Typography
                    role="label"
                    className="text-xs font-semibold text-muted-foreground mb-2"
                  >
                    {commonMessages.preferences || "Preferences"}
                  </Typography>
                  <div className="space-y-2">
                    <LanguageSwitcher size="default" className="w-full" />
                    <CurrencySwitcher className="w-full" />
                    <TimezoneSwitcher className="w-full" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Typography
                      as="span"
                      mood="artistic"
                      role="button"
                      className="text-base font-semibold text-foreground"
                    >
                      {item.name}
                    </Typography>
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="block rounded-md px-3 py-2.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <Typography
                    as="span"
                    mood="artistic"
                    role="button"
                    className="text-base font-semibold text-foreground"
                  >
                    {commonMessages.login || "Login"}
                  </Typography>
                </a>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
