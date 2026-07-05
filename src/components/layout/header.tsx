"use client";

import { navigationItems } from "@/app/data/navigation";
import SettingsMenu from "@/components/common/settings-menu";
import Logo from "@/components/logo";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { cn } from "@/lib/utils";

import type { Messages } from "@/types/i18n";
import Link from "next/link";
import { Typography } from "../ui/typography";
import HeaderMobileMenu from "./header-mobile-menu";

// Render real header on first paint to avoid LCP delay and layout shift (no client-only skeleton).
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
  const { scrolled, sentinelRef } = useScrolledPast();

  return (
    <>
      <div
        ref={sentinelRef}
        className="pointer-events-none h-px w-full"
        aria-hidden="true"
      />
      <header
        className={cn(
          "left-0 top-4 sticky z-40 mt-4 flex w-full items-center justify-center bg-transparent px-2 pb-2",
        )}
      >
        <div
          className={cn(
            "relative w-full max-w-7xl rounded-full border px-4 shadow-primary transition-[border-color,box-shadow] duration-300 ease-in-out sm:px-6 lg:px-8",
            scrolled
              ? "header-scroll-glass isolate border-primary/40 shadow-primary"
              : "border-transparent bg-transparent shadow-none",
          )}
        >
          <nav
            aria-label={navigationAria.global || "Global navigation"}
            className="relative flex items-center justify-between gap-4 py-2"
          >
            <Link href="/" className="flex w-full items-center justify-start">
              <Logo height="auto" priority alt={logoAlt} />
            </Link>

            {/* Desktop menu */}
            <div className="hidden w-full items-center justify-center md:flex md:gap-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold text-foreground/90 hover:text-foreground"
                >
                  <Typography as="span" role="button">
                    {item.name}
                  </Typography>
                </a>
              ))}
            </div>
            <div className="hidden w-full items-center justify-end md:flex md:items-center md:justify-end md:gap-3">
              <SettingsMenu loginLabel={commonMessages.login || "Login"} />
            </div>
            <HeaderMobileMenu messages={messages} navItems={navItems} />
          </nav>
        </div>
      </header>
    </>
  );
}
