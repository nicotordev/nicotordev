import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ChileFlag from "@/components/emojis/chile-flag";
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
      a11y?: {
        media?: Record<string, string>;
      };
    };
    hero: {
      greeting: string;
      name: string;
      title: string;
      available_for_hire: string;
      description: string;
      location: {
        from: string;
        tooltip: string;
      };
      closing: string;
      headline: {
        transform: string;
        words: string;
        and: string;
        ideas: string;
        into: string;
        applications: string;
        web: string;
        impact: string;
      };
      cta: {
        about: string;
        download_resume: string;
        lets_talk: string;
      };
    };
  };
}

export default function HeroSection({ translations }: HeroSectionProps) {
  const media = translations.common?.a11y?.media ?? {};

  return (
    <div className="bg-background py-12">
      <div className="relative px-6 lg:px-8">
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

        <div className="relative z-60 mx-auto max-w-5xl py-22 sm:py-28 lg:py-32 flex flex-col items-center text-center">
          <div className="mb-4 flex justify-center">
            <Badge
              variant="success"
              className="relative flex items-center justify-center gap-2 capitalize pl-8 pr-4 py-2 z-60"
            >
              <Dot className="w-16! h-16! absolute -left-3 top-1/2 -translate-y-1/2" />
              {translations.hero.available_for_hire}
            </Badge>
          </div>
          <div className="mb-2 text-center text-muted-foreground font-medium">
            <p className="font-display text-balance tracking-tight pb-0">
              {translations.hero.greeting}{" "}
              <span className="font-bold text-accent">
                {translations.hero.name}
              </span>
              , {translations.hero.location.from}{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="link" className="px-2">
                    <span className="underline cursor-pointer font-bold text-foreground relative top-1">
                      <ChileFlag />
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{translations.hero.location.tooltip}</p>
                </TooltipContent>
              </Tooltip>
              , {translations.hero.closing}
            </p>
          </div>
          <div className="text-center">
            <h1 className="font-display text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl leading-[1.2]">
              {translations.hero.headline.transform}{" "}
              <span
                className={cn(
                  "inline-flex -rotate-2 rounded-lg bg-card text-card-foreground px-3 py-1 font-mono text-4xl font-bold shadow-sm ring-1 ring-border sm:text-6xl"
                )}
              >
                <span className="text-secondary font-bold font-mono transform-gpu">
                  {translations.hero.headline.words}
                </span>{" "}
                <picture className="relative top-2">
                  <source
                    srcSet="/images/illustrations/writing.webp"
                    type="image/webp"
                    width="50"
                    height="50"
                  />
                  <Image
                    src="/images/illustrations/writing.webp"
                    alt={media.writingAlt || "Hand writing illustration"}
                    width="100"
                    height="100"
                  />
                </picture>
              </span>{" "}
              <br />
              <div className="inline-block">
                <span className="inline-block">
                  {translations.hero.headline.and}
                </span>{" "}
                <span className="inline-flex rotate-2 rounded-lg bg-card text-background  px-3 py-1 font-mono text-4xl font-bold shadow-sm ring-1 ring-border sm:text-6xl">
                  <span className="text-secondary font-bold font-mono transform-gpu">
                    {translations.hero.headline.ideas}
                  </span>{" "}
                  <picture className="relative top-2">
                    <source
                      srcSet="/images/illustrations/lightbulb.webp"
                      type="image/webp"
                      width="50"
                      height="50"
                    />
                    <Image
                      src="/images/illustrations/lightbulb.webp"
                      alt={media.lightbulbAlt || "Lightbulb illustration"}
                      width="100"
                      height="100"
                    />
                  </picture>
                </span>{" "}
                {translations.hero.headline.into}{" "}
                <span className="gradient-text relative">
                  {translations.hero.headline.applications}
                  <br />
                  <span className="relative right-16 gradient-text">
                    {translations.hero.headline.web}
                  </span>
                </span>{" "}
                <div className="inline-block relative right-16">
                  {translations.hero.headline.impact}
                  <picture className="absolute -right-32 bottom-0">
                    <source
                      srcSet="/images/illustrations/mechanic-arm.webp"
                      type="image/webp"
                      width="100"
                      height="100"
                    />
                    <Image
                      src="/images/illustrations/mechanic-arm.webp"
                      alt={media.mechanicArmAlt || "Robotic arm illustration"}
                      width="100"
                      height="100"
                    />
                  </picture>
                </div>
              </div>
            </h1>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild>
                <Link href="#about-section" className="shadow-xl">
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
        <div className="py-12">
          <HeroSectionTechStackCarousel />
        </div>
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
