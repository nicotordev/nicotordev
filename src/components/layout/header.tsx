"use client";

import { navigationItems } from "@/app/data";
import SettingsMenu from "@/components/common/settings-menu";
import CurrencySwitcher from "@/components/currency-switcher";
import LanguageSwitcher from "@/components/language-switcher";
import Logo from "@/components/logo";
import TimezoneSwitcher from "@/components/timezone-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useTranslations, useMessages } from "next-intl";
import { useRendersCount, useWindowScroll } from "react-use";

import type messagesType from "@/locales/es-cl.json";
type Messages = typeof messagesType;

// Header component with responsive breakpoints
export default function Header() {
  const tNavigation = useTranslations("navigation");
  const tCommon = useTranslations("common");
  const messages = useMessages() as unknown as Messages;

  const navigationAria = messages.navigation?.aria ?? {};

  const logoAlt = messages.common?.a11y?.media?.logoAlt || "NicoTorDev logo";

  const navigation = {
    home: tNavigation("home"),
    about: tNavigation("about"),
    projects: tNavigation("projects"),
    blog: tNavigation("blog"),
    contact: tNavigation("contact"),
  };

  const navItems = navigationItems(navigation);
  const { y } = useWindowScroll();
  const hasRender = useRendersCount();

  return (
    <header
      className={cn(
        "left-0 top-0 sticky z-9999 w-full px-4 py-2 flex items-center justify-center"
      )}
    >
      <div
        className={cn(
          "relative w-full transition-all duration-300 ease-in-out rounded-full shadow-primary border border-primary/50",
          y > 10 || !y || !hasRender || hasRender > 1
            ? "bg-background/50 backdrop-blur-xl border-primary/40 shadow-primary supports-backdrop-filter:bg-background/50"
            : "bg-transparent border-transparent shadow-none"
        )}
      >
        <nav
          aria-label={navigationAria.global || "Global navigation"}
          className="relative flex items-center justify-between px-4 py-2 md:px-6 lg:px-8"
        >
          <div className="flex md:flex-1">
            <Logo width={120} height={30} priority alt={logoAlt} />
          </div>

          {/* Mobile menu */}
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
                        <div className="text-xs font-semibold text-muted-foreground mb-2">
                          {tCommon("preferences") || "Preferences"}
                        </div>
                        <div className="space-y-2">
                          <LanguageSwitcher size="default" />
                          <CurrencySwitcher />
                          <TimezoneSwitcher />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 py-6">
                      {navItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-semibold text-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="py-6">
                      <a
                        href="#"
                        className="block rounded-md px-3 py-2.5 text-base font-semibold text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {tCommon("login")}
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:gap-x-6 lg:gap-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-foreground/90 hover:text-foreground"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex md:flex-1 md:justify-end md:items-center md:gap-3">
            <SettingsMenu loginLabel={tCommon("login")} />
          </div>
        </nav>
      </div>
    </header>
  );
}
