import Image from "next/image";
import type messages from "@/locales/es-cl.json";
import { cn } from "@/lib/utils";
import PortfolioGallery from "@/components/common/portfolio-gallery";
import type { BentoSize } from "@/components/common/portfolio-gallery";
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
      value: translations.metrics.experienceValue,
    },
  ];

  const resolvedGallery = gallery ?? [
    {
      src: "/nicolas/conce-ai.webp",
      alt: translations.photos?.gallery_1_alt || "AI conference in Concepción",
      size: "large",
    },
    {
      src: "/nicolas/me-as-psychedelic-wizard.webp",
      alt:
        translations.photos?.gallery_2_alt || "Nico as a psychedelic wizard",
      size: "wide",
    },
    {
      src: "/nicolas/me_pc.webp",
      alt:
        translations.photos?.gallery_3_alt ||
        "Nico working on his Computer, Multiple Screens are present",
      size: "square",
    },
    {
      src: "/nicolas/nico-acid.webp",
      alt: "Nico's pupils dilated",
      size: "wide",
    },
    {
      src: "/nicolas/nico-psychedelic.webp",
      alt: "Nico with psychedelic (trippy) effects",
      size: "square",
    },
    {
      src: "/nicolas/nico-unicorn.webp",
      alt: "Nico in a unicorn outfit",
      size: "wide",
    },
    {
      src: "/nicolas/me-and-koka.webp",
      alt: "Nico with his dog Koka",
      size: "square",
    },
    {
      src: "/nicolas/me_flowers.webp",
      alt: "Nico among flowers",
      size: "wide",
    },
    {
      src: "/nicolas/me_trippy.webp",
      alt: "Nico with trippy photo effects",
      size: "square",
    },
    {
      src: "/nicolas/nico-piercing.webp",
      alt: "Nico with a piercing in his nose",
      size: "wide",
    },
    {
      src: "/nicolas/nico-tattoo.webp",
      alt: "Nico with a tattoo on the back of the neck, a cpu chip",
      size: "square",
    },
  ];

  return (
    <div className="relative py-24 sm:py-32">
      {/* Background Blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-x-clip blur-3xl sm:-top-80"
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
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-[calc(100%-30rem)]"
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

      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl">
          <h2 className="inline-block rounded-full bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-accent ring-2 ring-accent/30 font-display mb-6">
            {translations.title}
          </h2>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-pretty text-foreground sm:text-5xl font-display">
            {translations.subtitle}
          </h1>
          <p className="mt-6 text-xl/8 text-balance text-muted-foreground font-sans">
            {translations.description}
          </p>
        </div>
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-bold tracking-tight text-pretty text-foreground font-display">
              {translations.methodology.title}
            </h2>
            <p className="mt-6 text-base/7 text-muted-foreground font-sans">
              {translations.methodology.description}
            </p>
            <div className="mt-8 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground font-display mb-2">
                {translations.personal.title}
              </h3>
              <p className="text-base/7 text-muted-foreground font-sans">
                {translations.personal.description}
              </p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <p className="text-base/7 font-semibold text-accent font-display uppercase tracking-wide">
              {translations.metrics.title}
            </p>
            <hr className="mt-6 border-t border-border" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {resolvedStats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col gap-y-2 p-4 rounded-xl hover:bg-accent/5 transition-colors duration-300",
                    index < 2 && "border-b border-dotted border-border pb-4",
                    index === 2 &&
                      "max-sm:border-b max-sm:border-dotted max-sm:border-border max-sm:pb-4"
                  )}
                >
                  <dt className="text-sm/6 text-muted-foreground font-sans">
                    {stat.label}
                  </dt>
                  <dd className="order-first text-5xl font-bold tracking-tight text-foreground font-display">
                    <span className="text-accent">{stat.prefix}</span>
                    <span>{stat.value}</span>
                    <span className="text-muted-foreground text-3xl ml-1">
                      {stat.suffix}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-foreground font-display mb-8">
            {translations.galleryTitle || "Gallery"}
          </h3>
          <PortfolioGallery items={resolvedGallery} />
        </section>
      </div>
    </div>
  );
}
