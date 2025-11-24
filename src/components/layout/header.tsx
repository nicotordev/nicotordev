"use client";

import { Menu } from "lucide-react";
import { navigationItems } from "@/app/data";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/components/logo";
import LanguageSwitcher from "@/components/language-switcher";
import CurrencySwitcher from "@/components/currency-switcher";
import TimezoneSwitcher from "@/components/timezone-switcher";
import SettingsMenu from "@/components/common/settings-menu";
import { useWindowScroll } from "react-use";
import { cn } from "@/lib/utils";
import { useMessages } from "next-intl";

export interface HeaderProps {
  navigation: {
    home: string;
    about: string;
    projects: string;
    blog: string;
    contact: string;
  };
  login: string;
}

export default function Header({ navigation, login }: HeaderProps) {
  const messages = useMessages();
  const navigationAria = (messages.navigation as any)?.aria ?? {};
  const common = messages.common as any;
  const logoAlt = common?.a11y?.media?.logoAlt || "NicoTorDev logo";
  const navItems = navigationItems(navigation);
  const { y } = useWindowScroll();

  return (
    <header className={cn("sticky top-4 inset-x-0 z-9999 mx-auto max-w-7xl px-4")}>
      <div
        className={cn(
          "relative w-full transition-all duration-300 ease-in-out rounded-full shadow-primary border border-primary/50",
          y > 10
            ? "bg-background/50 backdrop-blur-xl border-primary/40 shadow-primary supports-backdrop-filter:bg-background/50"
            : "bg-transparent border-transparent shadow-none"
        )}
      >
        <nav
          aria-label={navigationAria.global || "Global navigation"}
          className="relative flex items-center justify-between px-6 py-2 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Logo width={120} height={30} priority alt={logoAlt} />
          </div>

          {/* Mobile menu */}
          <div className="flex lg:hidden">
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
                          {common?.preferences || "Preferences"}
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
                        {login}
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:gap-x-12">
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
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
            <SettingsMenu loginLabel={login} />
          </div>
        </nav>
      </div>
    </header>
  );
}
