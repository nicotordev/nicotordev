import { ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/header";

export interface HeroSectionProps {
  translations: {
    navigation: {
      home: string;
      about: string;
      projects: string;
      blog: string;
      contact: string;
    };
    common: {
      login: string;
    };
    hero: {
      greeting: string;
      name: string;
      title: string;
      title_frontend: string;
      title_backend: string;
      description: string;
      cta: {
        about: string;
        resume: string;
      };
    };
  };
}

export default function HeroSection({ translations }: HeroSectionProps) {
  return (
    <div className="bg-background">
      <Header
        navigation={translations.navigation}
        login={translations.common.login}
      />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
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
              {translations.hero.title_frontend} ·{" "}
              {translations.hero.title_backend}
            </div>
          </div>
          <div className="text-center">
            <h1 className="font-display text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
              <span className="block">{translations.hero.greeting}</span>
              <span className="block text-primary">
                {translations.hero.name}
              </span>
              <span className="block">{translations.hero.title}</span>
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-muted-foreground sm:text-xl">
              {translations.hero.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="[box-shadow:var(--shadow-xs)]">
                {translations.hero.cta.about}
              </Button>
              <Button asChild variant="link" className="text-foreground">
                <a href="#" className="inline-flex items-center">
                  {translations.hero.cta.resume}
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
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
