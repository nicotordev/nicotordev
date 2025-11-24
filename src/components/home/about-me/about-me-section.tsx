import type messages from "@/locales/es-cl.json";
import { cn } from "@/lib/utils";
import PortfolioGallery from "@/components/common/portfolio-gallery";
import type { BentoSize } from "@/components/common/portfolio-gallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
type AboutSectionMessages = (typeof messages)["about"];

type AboutMeStat = {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
};

type AboutMeGalleryItem = {
  src: string;
  alt: string;
  size: BentoSize;
  description?: string;
};

export interface AboutMeSectionProps {
  translations: AboutSectionMessages;
  stats?: AboutMeStat[];
  gallery?: AboutMeGalleryItem[];
}

export default function AboutMeSection({
  translations,
  stats,
  gallery,
}: AboutMeSectionProps) {
  const resolvedStats = stats ?? [
    {
      label: translations.metrics.total_earnings,
      prefix: "$",
      value: "50",
      suffix: "K+",
    },
    {
      label: translations.metrics.hours,
      value: "~3.6K",
      suffix: " hrs",
    },
    {
      label: translations.metrics.success,
      value: "99.99",
      suffix: "%",
    },
    {
      label: translations.metrics.experience,
      value: translations.metrics.experienceValue.split(" ")[0],
      suffix: translations.metrics.experienceValue.split(" ")[1],
    },
  ];

  const resolvedGallery = gallery ?? [
    {
      src: "/images/nicolas/conce-ai.webp",
      alt:
        translations.gallery?.items?.conceAi?.alt ||
        translations.photos?.gallery_1_alt ||
        "Conce AI Logo",
      size: "large",
      description:
        translations.gallery?.items?.conceAi?.description ||
        "The official logo of Conce AI, my technology business.",
    },
    {
      src: "/images/nicolas/nico-as-psychedelic-wizard.webp",
      alt:
        translations.gallery?.items?.wizard?.alt ||
        translations.photos?.gallery_2_alt ||
        "Nico as a psychedelic wizard",
      size: "wide",
      description:
        translations.gallery?.items?.wizard?.description ||
        "Embracing creativity and magic in code, visualized as a psychedelic wizard.",
    },
    {
      src: "/images/nicolas/nico-pc.webp",
      alt:
        translations.gallery?.items?.workstation?.alt ||
        translations.photos?.gallery_3_alt ||
        "Nico working on his Computer, Multiple Screens are present",
      size: "square",
      description:
        translations.gallery?.items?.workstation?.description ||
        "Deep in the flow state, surrounded by multiple screens and lines of code.",
    },
    {
      src: "/images/nicolas/nico-acid.webp",
      alt: translations.gallery?.items?.acid?.alt || "Nico's pupils dilated",
      size: "wide",
      description:
        translations.gallery?.items?.acid?.description ||
        "A close-up capturing the intensity and focus of a late-night coding session.",
    },
    {
      src: "/images/nicolas/nico-psychedelic.webp",
      alt:
        translations.gallery?.items?.psychedelic?.alt ||
        "Nico with psychedelic (trippy) effects",
      size: "square",
      description:
        translations.gallery?.items?.psychedelic?.description ||
        "Exploring the intersection of art and technology through psychedelic visuals.",
    },
    {
      src: "/images/nicolas/nico-unicorn.webp",
      alt:
        translations.gallery?.items?.unicorn?.alt || "Nico in a unicorn outfit",
      size: "wide",
      description:
        translations.gallery?.items?.unicorn?.description ||
        "Never taking life too seriously—rocking a unicorn outfit with pride.",
    },
    {
      src: "/images/nicolas/nico-and-koka.webp",
      alt: translations.gallery?.items?.koka?.alt || "Nico with his dog Koka",
      size: "square",
      description:
        translations.gallery?.items?.koka?.description ||
        "Quality time with my loyal companion, Koka.",
    },
    {
      src: "/images/nicolas/nico-flowers.webp",
      alt: translations.gallery?.items?.flowers?.alt || "Nico among flowers",
      size: "wide",
      description:
        translations.gallery?.items?.flowers?.description ||
        "Finding balance and peace in nature, surrounded by flowers.",
    },
    {
      src: "/images/nicolas/nico-trippy.webp",
      alt:
        translations.gallery?.items?.trippy?.alt ||
        "Nico with trippy photo effects",
      size: "square",
      description:
        translations.gallery?.items?.trippy?.description ||
        "Experimenting with visual effects to create unique digital experiences.",
    },
    {
      src: "/images/nicolas/nico-piercing.webp",
      alt:
        translations.gallery?.items?.piercing?.alt ||
        "Nico with a piercing in his nose",
      size: "wide",
      description:
        translations.gallery?.items?.piercing?.description ||
        "Expressing personal style with a nose piercing.",
    },
    {
      src: "/images/nicolas/nico-tattoo.webp",
      alt:
        translations.gallery?.items?.tattoo?.alt ||
        "Nico with a tattoo on the back of the neck, a cpu chip",
      size: "square",
      description:
        translations.gallery?.items?.tattoo?.description ||
        "Cyberpunk vibes: a CPU chip tattoo on the back of my neck, symbolizing my connection to tech.",
    },
    {
      src: "/images/nicolas/only-koka.jpg",
      alt: translations.gallery?.items?.onlyKoka?.alt || "Koka, the dog",
      size: "square",
      description:
        translations.gallery?.items?.onlyKoka?.description ||
        "The real boss of the operation: Koka.",
    },
  ];

  return (
    <div className="relative py-24 sm:py-32">
      {/* Background Blobs */}
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
            "relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          )}
        />
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
            "relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-secondary to-accent opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          )}
        />
      </div>

      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h2 className="inline-block rounded-full bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-accent ring-2 ring-accent/30 font-display mb-6">
            {translations.title}
          </h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-pretty text-foreground sm:text-5xl font-display">
            {translations.subtitle}
          </h1>
          <p className="mt-6 text-xl/8 text-balance text-muted-foreground font-serif">
            {translations.description}
          </p>
        </div>
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-bold tracking-tight text-pretty text-foreground font-display">
              {translations.methodology.title}
            </h2>
            <p className="my-6 text-base/7 text-muted-foreground font-serif">
              {translations.methodology.description}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>{translations.personal.title}</CardTitle>
                <CardDescription>
                  {translations.personal.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base/7 text-muted-foreground font-serif">
                  {translations.personal.description}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <p className="text-base/7 font-semibold text-accent font-display uppercase tracking-wide">
              {translations.metrics.title}
            </p>
            <hr className="mt-6 border-t border-border" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {resolvedStats.map((stat, index) => {
                const isBottomBorder = index < resolvedStats.length - 1; // all except last on mobile
                const isDesktopRowSeparator = index < 2; // keep your original desktop rule

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col gap-2 p-4 rounded-xl transition-colors duration-300",
                      "hover:bg-accent/5 hover:border-accent",
                      // mobile: border on all except last
                      isBottomBorder &&
                        "border-b border-dotted border-border pb-4",
                      // desktop: keep your first two with borders
                      isDesktopRowSeparator &&
                        "sm:border-b sm:border-dotted sm:border-border"
                    )}
                  >
                    <dt className="text-sm text-muted-foreground font-sans uppercase tracking-wide">
                      {stat.label}
                    </dt>

                    <dd className="order-first font-mono tracking-tight">
                      <span className="text-5xl font-bold gradient-text text-transparent">
                        {stat.prefix}
                        {stat.value}
                      </span>

                      {stat.suffix && (
                        <span className="ml-1 text-base text-muted-foreground font-ibm-plex-mono">
                          {stat.suffix}
                        </span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>
        <section className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-foreground font-display mb-8">
            {translations.gallery?.title ||
              translations.galleryTitle ||
              "Gallery"}
          </h3>
          <PortfolioGallery items={resolvedGallery} />
        </section>
      </div>
    </div>
  );
}
