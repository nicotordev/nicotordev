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
  const navItems = navigationItems(navigation);
  const { y } = useWindowScroll();

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 z-9999 transition-all duration-300 ease-in-out",
        y > 10 ? "bg-background/60 backdrop-blur-2xl" : "bg-transparent"
      )}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-6 py-3 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Logo width={120} height={30} priority alt="NicoTorDev Logo" />
        </div>

        {/* Mobile menu */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open main menu"
                className="-m-2.5"
              >
                <Menu className="size-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader className="p-0">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <div className="divide-y divide-border">
                  <div className="space-y-3 py-6">
                    <div className="px-3">
                      <div className="text-xs font-semibold text-muted-foreground mb-2">
                        Preferences
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
    </header>
  );
}
