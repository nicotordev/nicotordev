import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import DownloadResumeButton from "@/components/download-resume-button";
import { getExistingResumeFormatKeys } from "@/lib/resume-downloads";
import ChileFlag from "@/components/emojis/chile-flag";
import { Button } from "@/components/ui/button";
import type { Messages } from "@/types/i18n";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroSectionTechStackCarouselClient from "./hero-section-tech-stack-carousel-client";
import HeroCopyEmail from "./hero-copy-email";
import HeroImageFloatingCards from "./hero-image-floating-cards";

interface HeroSectionProps {
  messages: Messages;
}

const TECH_KEYWORDS = ["TypeScript", "Next.js", "React", "Node.js"] as const;

function renderDescription(text: string) {
  const regex = new RegExp(`(${TECH_KEYWORDS.join("|")})`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (TECH_KEYWORDS.includes(part as (typeof TECH_KEYWORDS)[number])) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part}
        </strong>
      );
    }
    return part;
  });
}

export default function HeroSection({ messages }: HeroSectionProps) {
  const media = messages.common?.a11y?.media ?? {};
  const availableResumeFormatKeys = getExistingResumeFormatKeys();

  return (
    <section
      id="hero-section"
      className="relative z-10 bg-background py-8 sm:py-12 md:py-16 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-20 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-2 pb-10 sm:pt-6 sm:pb-14">
          {/* Main Content Column */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3.5 py-1 text-xs sm:text-sm font-medium text-muted-foreground shadow-2xs backdrop-blur-xs">
                {messages.hero.greeting}{" "}
                <strong className="font-semibold text-foreground">
                  {messages.hero.name}
                </strong>{" "}
                {messages.hero.location.from}
                <ChileFlag
                  width={18}
                  height={18}
                  alt={messages.hero.flag_alt}
                  className="inline-block object-contain ml-0.5"
                />
                {messages.hero.closing}
                <span className="text-foreground font-semibold">
                  &hellip;
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.14] text-foreground font-display">
              {messages.hero.headline.transform}{" "}
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl bg-secondary/10 border border-secondary/25 text-secondary px-2.5 sm:px-3 py-0.5 align-baseline">
                {messages.hero.headline.words}
                <Image
                  src="/images/illustrations/writing.webp"
                  alt={media.writingAlt || ""}
                  width={48}
                  height={48}
                  quality={90}
                  unoptimized
                  priority
                  className="inline-block size-7 sm:size-8 md:size-9 lg:size-10 object-contain drop-shadow-sm"
                />
              </span>{" "}
              {messages.hero.headline.and}{" "}
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl bg-info/10 border border-info/25 text-info px-2.5 sm:px-3 py-0.5 align-baseline">
                {messages.hero.headline.ideas}
                <Image
                  src="/images/illustrations/lightbulb.webp"
                  alt={media.lightbulbAlt || ""}
                  width={48}
                  height={48}
                  quality={90}
                  unoptimized
                  className="inline-block size-7 sm:size-8 md:size-9 lg:size-10 object-contain drop-shadow-sm"
                />
              </span>
              <br />
              {messages.hero.headline.into}{" "}
              <span className="relative inline-block text-secondary">
                {messages.hero.headline.applications}
                {messages.hero.headline.web ? ` ${messages.hero.headline.web}` : ""}
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2.5 text-secondary/40 -z-10"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0,5 Q50,1 100,5"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              <br />
              {messages.hero.headline.impact}{" "}
              <Image
                src="/images/illustrations/mechanic-arm.webp"
                alt={media.mechanicArmAlt || ""}
                width={56}
                height={56}
                quality={90}
                unoptimized
                className="inline-block size-9 sm:size-11 md:size-12 lg:size-14 object-contain drop-shadow-sm ml-1 align-middle"
              />
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
              {renderDescription(messages.hero.description)}
            </p>

            {/* CTA Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Primary CTA */}
              <Link href="#contact-section">
                <Button
                  variant="secondary"
                  size="lg"
                  className="shadow-lg shadow-secondary/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {messages.hero.cta.lets_talk}
                </Button>
              </Link>

              {/* Secondary CTA */}
              <DownloadResumeButton
                className="rounded-full border border-border bg-card hover:bg-muted text-foreground font-semibold px-6 py-3 text-base shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                label={
                  <span className="inline-flex items-center gap-1.5">
                    {messages.hero.cta.download_resume}
                    <ArrowUpRight className="size-4 stroke-[2.5]" />
                  </span>
                }
                selectFormatLabel={messages.downloadResume?.selectFormat}
                availableResumeFormatKeys={availableResumeFormatKeys}
              />

              {/* Email Copy Pill */}
              <HeroCopyEmail
                email={messages.hero.email}
                copiedMessage={messages.hero.cta.email_copied}
                copyLabel={messages.hero.cta.copy_email}
                errorMessage={messages.hero.cta.copy_email_error}
              />
            </div>

            {/* Stats Card (mobile fallback) */}
            <div className="mt-10 sm:mt-12 w-full max-w-2xl rounded-2xl border border-border bg-card/80 p-5 sm:p-6 shadow-xs backdrop-blur-md sm:hidden">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 sm:divide-x sm:divide-border">
                {/* Top Rated */}
                <div className="flex flex-col sm:pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {messages.hero.stats.job_success_rate}
                    </span>
                    <span className="inline-flex items-center rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success uppercase tracking-wider">
                      {messages.hero.stats.top_rated}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground font-medium">
                    {messages.hero.stats.job_success}
                  </p>
                </div>

                {/* Experience */}
                <div className="flex flex-col sm:px-5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {messages.hero.stats.years_experience}
                  </span>
                  <p className="mt-1.5 text-xs text-muted-foreground font-medium">
                    {messages.hero.stats.years_description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex flex-col sm:pl-5">
                  <div
                    className="flex items-center gap-1.5"
                    aria-label={`${messages.hero.stats.rating} - ${messages.hero.stats.rating_stars_aria}`}
                  >
                    <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {messages.hero.stats.rating}
                    </span>
                    <span
                      className="text-warning text-sm tracking-widest ml-1 select-none"
                      aria-hidden="true"
                    >
                      ★★★★★
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground font-medium">
                    {messages.hero.stats.rating_description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Floating Motion Metric Cards */}
          <div className="relative lg:col-span-5 flex justify-center items-center w-full mt-6 lg:mt-0">
            <HeroImageFloatingCards
              stats={messages.hero.stats}
              availableForHire={messages.hero.available_for_hire}
              name={messages.hero.name}
            />
          </div>
        </div>

        {/* Tech Stack Carousel */}
        <div className="py-8 sm:py-10">
          <HeroSectionTechStackCarouselClient />
        </div>

      </div>
    </section>
  );
}
