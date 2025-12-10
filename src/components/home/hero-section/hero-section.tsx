import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import DownloadResumeButton from "@/components/download-resume-button";
import ChileFlag from "@/components/emojis/chile-flag";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
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
        <BackgroundDecoration />

        <div className="relative z-20 mx-auto w-full max-w-6xl py-12 sm:py-18 lg:py-22 flex flex-col items-center text-center px-2 sm:px-0">
          <div className="mb-3 flex justify-center w-full">
            <Badge variant="success" className="relative pl-6 overflow-visible">
              <Dot className="w-16! h-16! absolute -left-4 top-1/2 -translate-y-1/2" />
              <Typography as="span" role="label">
                {messages.hero.available_for_hire}
              </Typography>
            </Badge>
          </div>
          <div className="mb-2 text-center text-muted-foreground font-medium w-full">
            <Typography as="h2">
              {messages.hero.greeting}{" "}
              <Typography as="span" className="font-bold text-secondary">
                {messages.hero.name}
              </Typography>
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
                  <Typography role="body">
                    {messages.hero.location.tooltip}
                  </Typography>
                </TooltipContent>
              </Tooltip>
              {messages.hero.closing}
            </Typography>
          </div>
          <div className="text-center w-full">
            <Typography as="h1" role="display" mood="artistic">
              <span className="block">
                {messages.hero.headline.transform}{" "}
                <span
                  className={cn(
                    "inline-flex items-center justify-center -rotate-2 rounded-lg bg-card text-card-foreground px-3 py-1 font-mono text-3xl font-bold shadow-sm ring-1 ring-border",
                    "sm:text-4xl md:text-5xl"
                  )}
                >
                  <Typography
                    as="span"
                    mood="code"
                    role="display"
                    className="text-secondary font-bold transform-gpu text-3xl sm:text-4xl md:text-5xl"
                  >
                    {messages.hero.headline.words}
                  </Typography>
                  <span className="relative ml-1 inline-flex items-center justify-center top-0">
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
                    "inline-flex items-center justify-center rotate-2 rounded-lg bg-card text-background px-2 py-1 font-mono text-3xl font-bold shadow-sm ring-1 ring-border",
                    "sm:text-4xl md:text-5xl",
                    "mx-4"
                  )}
                >
                  <Typography
                    as="span"
                    mood="code"
                    role="display"
                    className="text-secondary font-bold transform-gpu text-3xl sm:text-4xl md:text-5xl"
                  >
                    {messages.hero.headline.ideas}
                  </Typography>
                  <span className="relative ml-1 inline-flex items-center justify-center top-0">
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
                <span className="inline">{messages.hero.headline.into}</span>{" "}
                <span className="inline gradient-text">
                  {messages.hero.headline.applications}
                </span>{" "}
                <span className="inline gradient-text ml-1 sm:ml-2">
                  {messages.hero.headline.web}
                </span>{" "}
                <span className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 align-middle ml-1 sm:ml-2">
                  <span className="leading-tight gradient-text">
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
            </Typography>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full">
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href="#about-section"
                  className="w-full sm:w-auto shadow-xl text-center"
                >
                  <Typography as="span" mood="artistic" role="button">
                    {messages.hero.cta.lets_talk}
                  </Typography>
                </Link>
              </Button>
              <DownloadResumeButton
                label={
                  <Typography as="span" mood="artistic" role="button">
                    {messages.hero.cta.download_resume}
                  </Typography>
                }
                className="text-foreground w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
        <div className="py-10 sm:py-12">
          <HeroSectionTechStackCarousel />
        </div>
        <BackgroundDecoration
          className="top-[calc(100%-13rem)] sm:top-[calc(100%-30rem)]"
          shapeClassName="left-[calc(50%+3rem)] sm:left-[calc(50%+36rem)] bg-linear-to-tr from-accent to-secondary opacity-30 rotate-0"
        />
      </div>
    </div>
  );
}
