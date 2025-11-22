import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/header";
import ChileFlag from "../../emojis/chile-flag";
import Link from "next/link";
import DownloadResumeButton from "@/components/download-resume-button";
import { Badge } from "../../ui/badge";
import { Dot } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import HeroSectionTechStackCarousel from "./hero-section-tech-stack-carousel";
import Image from "next/image";

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
      available_for_hire: string;
      description: string;
      cta: {
        about: string;
        download_resume: string;
        lets_talk: string;
      };
    };
  };
}

export default function HeroSection({ translations }: HeroSectionProps) {
  return (
    <div className="bg-background min-h-screen">
      <Header
        navigation={translations.navigation}
        login={translations.common.login}
      />

      <div className="relative px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 z-10 transform-gpu overflow-x-clip blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className={cn(
              "relative left-[calc(50%-11rem)] -translate-x-1/2",
              "aspect-1155/678 w-144.5 rotate-30",
              "bg-linear-to-tr from-accent to-primary opacity-80",
              "sm:left-[calc(50%-30rem)] sm:w-288.75"
            )}
          />
        </div>

        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56 flex flex-col items-center text-center">
          <div className="mb-4 flex justify-center">
            <Badge
              variant="success"
              className="relative flex items-center justify-center gap-2 capitalize pl-8 pr-4 py-2"
            >
              <Dot className="w-16! h-16! absolute -left-3 top-1/2 -translate-y-1/2" />
              {translations.hero.available_for_hire}
            </Badge>
          </div>
          <div className="mb-2 text-center text-muted-foreground font-medium">
            <p className="font-display text-balance tracking-tight pb-0">
              ¡Hola, soy{" "}
              <span className="font-bold text-accent">Nicolas Torres</span>, un
              ingeniero web full-stack de{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="link" className="px-2">
                    <span className="underline cursor-pointer font-bold text-foreground relative top-1">
                      <ChileFlag />
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desde Concepción, Chile. Me alegro de que estés aquí!</p>
                </TooltipContent>
              </Tooltip>
              y mi trabajo consiste en...
            </p>
          </div>
          <div className="text-center">
            <h1 className="font-display text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl leading-[1.2]">
              Transformar{" "}
              <span
                className={cn(
                  "inline-flex -rotate-2 rounded-lg bg-card text-card-foreground px-3 py-1 font-mono text-4xl font-bold shadow-sm ring-1 ring-border sm:text-6xl"
                )}
              >
                <span className="nicotordev-outlined-text text-background font-bold font-mono transform-gpu">
                  palabras
                </span>{" "}
                <picture className="relative top-2">
                  <source
                    srcSet="/illustrations/writing.webp"
                    type="image/webp"
                    width="50"
                    height="50"
                  />
                  <Image
                    src="/illustrations/writing.webp"
                    alt="✍️"
                    width="100"
                    height="100"
                  />
                </picture>
              </span>{" "}
              e <br />
              <div className="inline-block">
                <span className="inline-flex rotate-2 rounded-lg bg-card text-background nicotordev-outlined-text px-3 py-1 font-mono text-4xl font-bold shadow-sm ring-1 ring-border sm:text-6xl">
                  <span className="nicotordev-outlined-text text-background font-bold font-mono transform-gpu">
                    ideas
                  </span>{" "}
                  <picture className="relative top-2">
                    <source
                      srcSet="/illustrations/lightbulb.webp"
                      type="image/webp"
                      width="50"
                      height="50"
                    />
                    <Image
                      src="/illustrations/lightbulb.webp"
                      alt="💡"
                      width="100"
                      height="100"
                    />
                  </picture>
                </span>{" "}
                en{" "}
                <span className="gradient-text relative">
                  aplicaciones
                  <br />
                  <span className="relative right-16 gradient-text">web</span>
                </span>{" "}
                <div className="inline-block relative right-16">
                  impactantes
                  <picture className="absolute -right-32 bottom-0">
                    <source
                      srcSet="/illustrations/mechanic-arm.webp"
                      type="image/webp"
                      width="100"
                      height="100"
                    />
                    <Image
                      src="/illustrations/mechanic-arm.webp"
                      alt="🦾"
                      width="100"
                      height="100"
                    />
                  </picture>
                </div>
              </div>
            </h1>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="[box-shadow:var(--shadow-xs)]" asChild>
                <Link href="#about-section">
                  {translations.hero.cta.lets_talk}
                </Link>
              </Button>
              <DownloadResumeButton
                label={translations.hero.cta.download_resume}
                className="text-foreground"
              />
            </div>
          </div>
        </div>
        <HeroSectionTechStackCarousel />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] z-10 transform-gpu overflow-x-clip blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className={cn(
              "relative left-[calc(50%+3rem)] -translate-x-1/2",
              "aspect-1155/678 w-144.5",
              "bg-linear-to-tr from-accent to-secondary opacity-30",
              "sm:left-[calc(50%+36rem)] sm:w-288.75"
            )}
          />
        </div>
      </div>
    </div>
  );
}
