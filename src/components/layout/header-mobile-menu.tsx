"use client";

import { CONTACT_NAV_HREF } from "@/app/data/navigation";
import type { Messages } from "@/types/i18n";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Typography } from "../ui/typography";

const HeaderMobileMenuPreferences = dynamic(
  () => import("./header-mobile-menu-preferences"),
  { ssr: false },
);

interface HeaderMobileMenuProps {
  messages: Messages;
  navItems: {
    name: string;
    href: string;
  }[];
  onContactClick: () => void;
}

export default function HeaderMobileMenu({
  messages,
  navItems,
  onContactClick,
}: HeaderMobileMenuProps) {
  const navigationAria = messages.navigation?.aria ?? {};
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
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
        <SheetContent
          side="right"
          className="w-full overscroll-contain sm:max-w-sm"
        >
          <SheetHeader className="p-0">
            <SheetTitle className="sr-only">
              {navigationAria.mobileMenu || "Mobile Menu"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex min-h-0 flex-1 flex-col overflow-y-auto">
            <div className="divide-y divide-border">
              {open ? <HeaderMobileMenuPreferences /> : null}
              <div className="space-y-2 py-6">
                {navItems.map((item) =>
                  item.href === CONTACT_NAV_HREF ? (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onContactClick();
                      }}
                      className="block w-full cursor-pointer rounded-md px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground"
                    >
                      <Typography
                        as="span"
                        role="button"
                        className="text-base font-semibold text-foreground"
                      >
                        {item.name}
                      </Typography>
                    </button>
                  ) : (
                    <SheetClose asChild key={item.name}>
                      <a
                        href={item.href}
                        className="block cursor-pointer rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Typography
                          as="span"
                          role="button"
                          className="text-base font-semibold text-foreground"
                        >
                          {item.name}
                        </Typography>
                      </a>
                    </SheetClose>
                  ),
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
