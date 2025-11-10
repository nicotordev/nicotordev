import { Menu } from "lucide-react";
import React from "react";
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

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold text-foreground">
            {login} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
