import Image from "next/image";
import type messages from "@/locales/es-cl.json";

import { assets } from "@/app/assets";
import { cn } from "@/lib/utils";

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
  offset?: "none" | "raise";
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
      value: "~1.6K",
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
      src: "/nicolas/me_flowers.jpg",
      alt: translations.photos.gallery_2_alt,
      offset: "none" as const,
    },
    {
      src: "/nicolas/me_trippy.jpg",
      alt: translations.photos.gallery_3_alt,
      offset: "raise" as const,
    },
    {
      src: "/nicolas/me-and-koka.jpg",
      alt: translations.photos.gallery_4_alt,
      offset: "none" as const,
    },
    {
      src: "/nicolas/conce-ai.png",
      alt: translations.photos.gallery_1_alt,
      offset: "raise" as const,
    },
  ];

  return (
    <div className="overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl">
          <p className="text-base/7 font-semibold text-accent">
            {translations.title}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            {translations.subtitle}
          </h1>
          <p className="mt-6 text-xl/8 text-balance text-muted-foreground">
            {translations.description}
          </p>
        </div>
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-semibold tracking-tight text-pretty text-foreground">
              {translations.methodology.title}
            </h2>
            <p className="mt-6 text-base/7 text-muted-foreground">
              {translations.methodology.description}
            </p>
            <p className="mt-8 text-base/7 text-muted-foreground">
              {translations.personal.description}
            </p>
          </div>
          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 xl:gap-8">
              {resolvedGallery.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-border hover:outline-accent transition-colors duration-300",
                    item.offset === "raise" && "-mt-8 lg:-mt-40"
                  )}
                >
                  <Image
                    alt={item.alt}
                    src={item.src}
                    width={560}
                    height={560}
                    className="block size-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-muted-foreground">
              {translations.metrics.title}
            </p>
            <hr className="mt-6 border-t border-border" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {resolvedStats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col gap-y-2",
                    index < 2 && "border-b border-dotted border-border pb-4",
                    index === 2 &&
                      "max-sm:border-b max-sm:border-dotted max-sm:border-border max-sm:pb-4"
                  )}
                >
                  <dt className="text-sm/6 text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="order-first text-6xl font-semibold tracking-tight text-foreground">
                    {stat.prefix}
                    <span>{stat.value}</span>
                    {stat.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}
