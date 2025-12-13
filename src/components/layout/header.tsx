"use client";

import { navigationItems } from "@/app/data/navigation";
import SettingsMenu from "@/components/common/settings-menu";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { useRendersCount, useWindowScroll } from "react-use";

import type { Messages } from "@/types/i18n";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import HeaderMobileMenu from "./header-mobile-menu";

// Header component with responsive breakpoints
export default function Header({ messages }: { messages: Messages }) {
  const navigationMessages = messages.navigation ?? {};
  const commonMessages = messages.common ?? {};

  const navigationAria = navigationMessages.aria ?? {};

  const logoAlt = commonMessages.a11y?.media?.logoAlt || "NicoTorDev logo";

  const navigation = {
    home: navigationMessages.home || "Home",
    about: navigationMessages.about || "About",
    projects: navigationMessages.projects || "Projects",
    blog: navigationMessages.blog || "Blog",
    contact: navigationMessages.contact || "Contact",
  };

  const navItems = navigationItems(navigation);
  const { y } = useWindowScroll();
  const renderCount = useRendersCount();

  return (
    <header
      className={cn(
        "left-0 top-0 sticky z-40 w-full px-2 py-2 flex items-center justify-center"
      )}
    >
      <div
        className={cn(
          "relative w-full max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out rounded-full shadow-primary border border-primary/50",
          y > 10 && renderCount > 1
            ? "bg-background/50 backdrop-blur-xl border-primary/40 shadow-primary supports-backdrop-filter:bg-background/50"
            : "bg-transparent border-transparent shadow-none"
        )}
      >
        <nav
          aria-label={navigationAria.global || "Global navigation"}
          className="relative flex items-center justify-between gap-4 py-2"
        >
          <div className="flex md:flex-1">
            <Logo width={120} height={30} priority alt={logoAlt} />
          </div>

          {/* Mobile menu */}

          {/* Desktop menu */}
          <div className="hidden md:flex md:gap-x-6 lg:gap-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-foreground/90 hover:text-foreground"
              >
                <Typography as="span" mood="artistic" role="button">
                  {item.name}
                </Typography>
              </a>
            ))}
          </div>
          <div className="hidden md:flex md:flex-1 md:justify-end md:items-center md:gap-3">
            <SettingsMenu loginLabel={commonMessages.login || "Login"} />
            <SignedOut>
              <Link href="/sign-in">
                <Button>
                  <Typography as="span" mood="artistic" role="button">
                    {commonMessages.login || "Login"}
                  </Typography>
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <HeaderMobileMenu messages={messages} navItems={navItems} />
        </nav>
      </div>
    </header>
  );
}
