import DownloadResumeButton from "@/components/download-resume-button";
import ChileFlag from "@/components/emojis/chile-flag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import HeroSectionTechStackCarousel from "./hero-section-tech-stack-carousel";

interface HeroSectionProps {
  messages: Messages;
}
export default function HeroSection({ messages }: HeroSectionProps) {
  const media = messages.common?.a11y?.media ?? {};
  return (
    <div className="bg-background py-8 sm:py-10 md:py-12 relative z-10">
      <div className="relative px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 z-10 transform-gpu overflow-x-clip blur-3xl sm:-top-80 pointer-events-none"
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

        <div className="relative z-20 mx-auto w-full max-w-5xl py-12 sm:py-18 lg:py-22 flex flex-col items-center text-center px-2 sm:px-0">
          <div className="mb-3 flex justify-center w-full">
            <Badge
              variant="success"
              className="relative flex items-center justify-center gap-2 capitalize pl-8 pr-4 py-2 z-20 w-full sm:w-auto"
            >
              <Dot className="w-16! h-16! absolute -left-3 top-1/2 -translate-y-1/2" />
              {messages.hero.available_for_hire}
            </Badge>
          </div>
          <div className="mb-2 text-center text-muted-foreground font-medium w-full">
            <p className="font-display text-balance tracking-tight pb-0 text-sm sm:text-base">
              {messages.hero.greeting}{" "}
              <span className="font-bold text-secondary">
                {messages.hero.name}
              </span>
              , {messages.hero.location.from}{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="link" className="px-1 sm:px-2">
                    <span className="underline cursor-pointer font-bold text-foreground relative top-1">
                      <ChileFlag />
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{messages.hero.location.tooltip}</p>
                </TooltipContent>
              </Tooltip>
              {messages.hero.closing}
            </p>
          </div>
          <div className="text-center w-full">
            <h1 className="font-display text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight sm:leading-[1.15] space-y-4">
              <span className="block">
                {messages.hero.headline.transform}{" "}
                <span
                  className={cn(
                    "inline-flex -rotate-2 rounded-lg bg-card text-card-foreground px-3 py-1 font-mono text-3xl font-bold shadow-sm ring-1 ring-border",
                    "sm:text-4xl md:text-5xl"
                  )}
                >
                  <span className="text-secondary font-bold font-mono transform-gpu">
                    {messages.hero.headline.words}
                  </span>
                  <span className="relative ml-2 inline-flex items-center justify-center">
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
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-xl"
                      unoptimized
                    />
                  </span>
                </span>
              </span>

              <span className="block space-y-3">
                <span className="inline-block">
                  {messages.hero.headline.and}
                </span>{" "}
                <span
                  className={cn(
                    "inline-flex rotate-2 rounded-lg bg-card text-background px-3 py-1 font-mono text-3xl font-bold shadow-sm ring-1 ring-border",
                    "sm:text-4xl md:text-5xl"
                  )}
                >
                  <span className="text-secondary font-bold font-mono transform-gpu">
                    {messages.hero.headline.ideas}
                  </span>
                  <span className="relative ml-2 inline-flex items-center justify-center">
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
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-xl"
                      unoptimized
                    />
                  </span>
                </span>
                <span className="block sm:inline">
                  {messages.hero.headline.into}
                </span>{" "}
                <span className="block sm:inline gradient-text">
                  {messages.hero.headline.applications}
                </span>{" "}
                <span className="block sm:inline gradient-text ml-1 sm:ml-2">
                  {messages.hero.headline.web}
                </span>{" "}
                <span className="block sm:inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 align-middle ml-1 sm:ml-2">
                  <span className="leading-tight">
                    {messages.hero.headline.impact}
                  </span>
                  <span className="relative inline-flex items-center justify-center mt-2 sm:mt-0">
                    <source
                      srcSet="/images/illustrations/mechanic-arm.webp"
                      type="image/webp"
                      width="100"
                      height="100"
                    />
                    <Image
                      src="/images/illustrations/mechanic-arm.webp"
                      alt={media.mechanicArmAlt || "Robotic arm illustration"}
                      width="120"
                      height="120"
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-xl"
                      unoptimized
                    />
                  </span>
                </span>
              </span>
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full">
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href="#about-section"
                  className="w-full sm:w-auto shadow-xl text-center"
                >
                  {messages.hero.cta.lets_talk}
                </Link>
              </Button>
              <DownloadResumeButton
                label={messages.hero.cta.download_resume}
                className="text-foreground w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
        <div className="py-10 sm:py-12">
          <HeroSectionTechStackCarousel />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] z-10 transform-gpu overflow-x-clip blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none"
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
