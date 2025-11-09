"use client";

import { Menu, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "../logo";

export default function HeroSection() {
  const heroT = useTranslations("hero");
  const navigationT = useTranslations("navigation");
  const commonT = useTranslations("common");

  const navigationItems = [
    { name: navigationT("home"), href: "#home" },
    { name: navigationT("about"), href: "#about" },
    { name: navigationT("projects"), href: "#projects" },
    { name: navigationT("contact"), href: "#contact" },
  ];

  // Precompute gradient clip-path to avoid re-creating object on every render
  const clipPath = useMemo(
    () =>
      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
    []
  );

  return (
    <div className="bg-background">
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
                      {navigationItems.map((item) => (
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
                        {commonT("login")}
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigationItems.map((item) => (
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
              {commonT("login")} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Top gradient shape */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{ clipPath }}
            className={cn(
              "relative left-[calc(50%-11rem)] -translate-x-1/2",
              "aspect-1155/678 w-144.5 rotate-30",
              "bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30",
              "sm:left-[calc(50%-30rem)] sm:w-288.75"
            )}
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-muted-foreground ring-1 ring-border/60 hover:ring-border">
              {heroT("title_frontend")} · {heroT("title_backend")}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
              <span className="block">{heroT("greeting")}</span>
              <span className="block text-primary">{heroT("name")}</span>
              <span className="block">{heroT("title")}</span>
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-muted-foreground sm:text-xl">
              {heroT("description")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="shadow-xs">{heroT("cta.about")}</Button>
              <Button asChild variant="link" className="text-foreground">
                <a href="#" className="inline-flex items-center">
                  {heroT("cta.resume")}
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom gradient shape */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{ clipPath }}
            className={cn(
              "relative left-[calc(50%+3rem)] -translate-x-1/2",
              "aspect-1155/678 w-144.5",
              "bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30",
              "sm:left-[calc(50%+36rem)] sm:w-288.75"
            )}
          />
        </div>
      </div>
    </div>
  );
}
