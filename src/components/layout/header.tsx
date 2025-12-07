"use client";

import { navigationItems } from "@/app/data";
import SettingsMenu from "@/components/common/settings-menu";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { useMessages, useTranslations } from "next-intl";
import { useRendersCount, useWindowScroll } from "react-use";

import type messagesType from "@/locales/es-cl.json";
import HeaderMobileMenu from "./header-mobile-menu";
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
        "left-0 top-0 sticky z-9999 w-full py-2 flex items-center justify-center"
      )}
    >
      <div
        className={cn(
          "relative w-full max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out rounded-full shadow-primary border border-primary/50",
          y > 10 || !y || !hasRender || hasRender > 1
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
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex md:flex-1 md:justify-end md:items-center md:gap-3">
            <SettingsMenu loginLabel={tCommon("login")} />
          </div>
          <HeaderMobileMenu messages={messages} navItems={navItems} />
        </nav>
      </div>
    </header>
  );
}
