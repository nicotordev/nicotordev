import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import DownloadResumeButton from "@/components/download-resume-button";
import ChileFlag from "@/components/emojis/chile-flag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroSectionTechStackCarousel from "./hero-section-tech-stack-carousel";

interface HeroSectionProps {
  messages: Messages;
}

interface HighlightWordProps {
  text: string;
  imageSrc: string;
  imageAlt: string;
  rotate?: "-rotate-2" | "rotate-2";
}

function HighlightWord({
  text,
  imageSrc,
  imageAlt,
  rotate = "-rotate-2",
}: HighlightWordProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-card px-3 py-1 font-mono",
        "font-extrabold tracking-tight", // ✅ más bold
        "shadow-sm ring-1 ring-border",
        rotate,
        "text-3xl sm:text-4xl md:text-5xl"
      )}
    >
      <Typography
        as="span"
        mood="code"
        role="display"
        className="text-secondary font-extrabold" // ✅ más bold
      >
        {text}
      </Typography>

      <Image
        src={imageSrc}
        alt={imageAlt}
        width={64}
        height={64}
        aria-hidden
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-xl"
        unoptimized
      />
    </span>
  );
}

export default function HeroSection({ messages }: HeroSectionProps) {
  const media = messages.common?.a11y?.media ?? {};

  return (
    <section className="relative z-10 bg-background py-8 sm:py-10 md:py-12">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BackgroundDecoration />

        <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-2 py-12 text-center sm:px-0 sm:py-18 lg:py-22">
          {/* Availability badge */}
          <div className="mb-3">
            <Badge
              variant="success"
              className="relative pl-6"
              role="status"
              aria-live="polite"
            >
              <Dot className="absolute -left-4 top-1/2 h-16 w-16 -translate-y-1/2" />
              <Typography as="span">
                {messages.hero.available_for_hire}
              </Typography>
            </Badge>
          </div>

          {/* Greeting */}
          <Typography
            as="h2"
            className="mb-2 font-medium text-muted-foreground"
          >
            {messages.hero.greeting}{" "}
            <span className="font-bold text-secondary">
              {messages.hero.name}
            </span>
            , {messages.hero.location.from}{" "}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" className="px-1 sm:px-2">
                  <span className="relative top-1 cursor-pointer font-bold underline">
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

          {/* Headline */}
          <Typography as="h1" role="display" mood="artistic">
            <div className="space-y-3">
              <div className="space-y-2">
                {messages.hero.headline.transform}{" "}
                <HighlightWord
                  text={messages.hero.headline.words}
                  imageSrc="/images/illustrations/writing.webp"
                  imageAlt={media.writingAlt || "Hand writing illustration"}
                />
              </div>

              <div className="space-y-2">
                <div>
                  {messages.hero.headline.and}{" "}
                  <HighlightWord
                    text={messages.hero.headline.ideas}
                    imageSrc="/images/illustrations/lightbulb.webp"
                    imageAlt={media.lightbulbAlt || "Lightbulb illustration"}
                    rotate="rotate-2"
                  />{" "}
                  {messages.hero.headline.into}{" "}
                  <span className="gradient-text">
                    {messages.hero.headline.applications}
                  </span>{" "}
                  <span className="gradient-text">
                    {messages.hero.headline.web}
                  </span>
                </div>
                <div className="inline-flex flex-wrap items-center justify-center gap-3">
                  <span className="gradient-text">
                    {messages.hero.headline.impact}
                  </span>
                  <Image
                    src="/images/illustrations/mechanic-arm.webp"
                    alt={media.mechanicArmAlt || "Robotic arm illustration"}
                    width={96}
                    height={96}
                    aria-hidden
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain drop-shadow-xl"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </Typography>

          {/* CTA (✅ mejorado <500px, mobile-first) */}
          <div
            className={cn(
              "mt-8 w-full",
              "flex flex-col gap-3",
              "sm:flex-row sm:justify-center sm:gap-6"
            )}
          >
            {/* Primary CTA */}
            <Button
              asChild
              size="lg"
              className={cn(
                "w-full",
                "text-base font-bold",
                "sm:w-auto sm:px-8"
              )}
            >
              <Link href="#about-section">
                <Typography as="span" mood="artistic" role="button">
                  {messages.hero.cta.lets_talk}
                </Typography>
              </Link>
            </Button>

            {/* Secondary CTA */}
            <DownloadResumeButton
              className={cn(
                "w-full",
                "border border-border",
                "text-sm font-medium opacity-90",
                "sm:w-auto sm:opacity-100"
              )}
              label={
                <Typography as="span" mood="artistic" role="button">
                  {messages.hero.cta.download_resume}
                </Typography>
              }
            />
          </div>
        </div>

        <div className="py-10 sm:py-12">
          <HeroSectionTechStackCarousel />
        </div>

        <BackgroundDecoration
          className="top-[calc(100%-13rem)] sm:top-[calc(100%-30rem)]"
          shapeClassName="left-[calc(50%+3rem)] sm:left-[calc(50%+36rem)] bg-linear-to-tr from-accent to-secondary opacity-30"
        />
      </div>
    </section>
  );
}
