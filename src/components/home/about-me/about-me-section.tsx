import type { BentoSize } from "@/components/common/portfolio-gallery";
import PortfolioGallery from "@/components/common/portfolio-gallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
  stats?: AboutMeStat[];
  gallery?: AboutMeGalleryItem[];
}

export default function AboutMeSection({
  stats,
  gallery,
}: AboutMeSectionProps) {
  const t = useTranslations("about");
  const tGallery = useTranslations("about.gallery.items");
  const tPhotos = useTranslations("about.photos");

  const resolvedStats = stats ?? [
    {
      label: t("metrics.total_earnings"),
      prefix: "$",
      value: "50",
      suffix: "K+",
    },
    {
      label: t("metrics.hours"),
      value: "~3.6K",
      suffix: " hrs",
    },
    {
      label: t("metrics.success"),
      value: "99.99",
      suffix: "%",
    },
    {
      label: t("metrics.experience"),
      value: t("metrics.experienceValue").split(" ")[0],
      suffix: t("metrics.experienceValue").split(" ")[1],
    },
  ];

  const resolvedGallery = gallery ?? [
    {
      src: "/images/nicolas/conce-ai.webp",
      alt: tGallery.has("conceAi.alt")
        ? tGallery("conceAi.alt")
        : tPhotos.has("gallery_1_alt")
        ? tPhotos("gallery_1_alt")
        : "Conce AI Logo",
      size: "large",
      description: tGallery.has("conceAi.description")
        ? tGallery("conceAi.description")
        : "The official logo of Conce AI, my technology business.",
    },
    {
      src: "/images/nicolas/nico-as-psychedelic-wizard.webp",
      alt: tGallery.has("wizard.alt")
        ? tGallery("wizard.alt")
        : tPhotos.has("gallery_2_alt")
        ? tPhotos("gallery_2_alt")
        : "Nico as a psychedelic wizard",
      size: "wide",
      description: tGallery.has("wizard.description")
        ? tGallery("wizard.description")
        : "Embracing creativity and magic in code, visualized as a psychedelic wizard.",
    },
    {
      src: "/images/nicolas/nico-pc.webp",
      alt: tGallery.has("workstation.alt")
        ? tGallery("workstation.alt")
        : tPhotos.has("gallery_3_alt")
        ? tPhotos("gallery_3_alt")
        : "Nico working on his Computer, Multiple Screens are present",
      size: "square",
      description: tGallery.has("workstation.description")
        ? tGallery("workstation.description")
        : "Deep in the flow state, surrounded by multiple screens and lines of code.",
    },
    {
      src: "/images/nicolas/nico-acid.webp",
      alt: tGallery.has("acid.alt")
        ? tGallery("acid.alt")
        : "Nico's pupils dilated",
      size: "wide",
      description: tGallery.has("acid.description")
        ? tGallery("acid.description")
        : "A close-up capturing the intensity and focus of a late-night coding session.",
    },
    {
      src: "/images/nicolas/nico-psychedelic.webp",
      alt: tGallery.has("psychedelic.alt")
        ? tGallery("psychedelic.alt")
        : "Nico with psychedelic (trippy) effects",
      size: "square",
      description: tGallery.has("psychedelic.description")
        ? tGallery("psychedelic.description")
        : "Exploring the intersection of art and technology through psychedelic visuals.",
    },
    {
      src: "/images/nicolas/nico-unicorn.webp",
      alt: tGallery.has("unicorn.alt")
        ? tGallery("unicorn.alt")
        : "Nico in a unicorn outfit",
      size: "wide",
      description: tGallery.has("unicorn.description")
        ? tGallery("unicorn.description")
        : "Never taking life too seriously—rocking a unicorn outfit with pride.",
    },
    {
      src: "/images/nicolas/nico-and-koka.webp",
      alt: tGallery.has("koka.alt")
        ? tGallery("koka.alt")
        : "Nico with his dog Koka",
      size: "square",
      description: tGallery.has("koka.description")
        ? tGallery("koka.description")
        : "Quality time with my loyal companion, Koka.",
    },
    {
      src: "/images/nicolas/nico-flowers.webp",
      alt: tGallery.has("flowers.alt")
        ? tGallery("flowers.alt")
        : "Nico among flowers",
      size: "wide",
      description: tGallery.has("flowers.description")
        ? tGallery("flowers.description")
        : "Finding balance and peace in nature, surrounded by flowers.",
    },
    {
      src: "/images/nicolas/nico-trippy.webp",
      alt: tGallery.has("trippy.alt")
        ? tGallery("trippy.alt")
        : "Nico with trippy photo effects",
      size: "square",
      description: tGallery.has("trippy.description")
        ? tGallery("trippy.description")
        : "Experimenting with visual effects to create unique digital experiences.",
    },
    {
      src: "/images/nicolas/nico-piercing.webp",
      alt: tGallery.has("piercing.alt")
        ? tGallery("piercing.alt")
        : "Nico with a piercing in his nose",
      size: "wide",
      description: tGallery.has("piercing.description")
        ? tGallery("piercing.description")
        : "Expressing personal style with a nose piercing.",
    },
    {
      src: "/images/nicolas/nico-tattoo.webp",
      alt: tGallery.has("tattoo.alt")
        ? tGallery("tattoo.alt")
        : "Nico with a tattoo on the back of the neck, a cpu chip",
      size: "square",
      description: tGallery.has("tattoo.description")
        ? tGallery("tattoo.description")
        : "Cyberpunk vibes: a CPU chip tattoo on the back of my neck, symbolizing my connection to tech.",
    },
    {
      src: "/images/nicolas/only-koka.jpg",
      alt: tGallery.has("onlyKoka.alt")
        ? tGallery("onlyKoka.alt")
        : "Koka, the dog",
      size: "square",
      description: tGallery.has("onlyKoka.description")
        ? tGallery("onlyKoka.description")
        : "The real boss of the operation: Koka.",
    },
  ];

  return (
    <div className="relative py-24 sm:py-32">
      {/* Background Blobs */}
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
            "relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          )}
        />
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
            "relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-secondary to-accent opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          )}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:w-5/12">
            <h2 className="inline-block rounded-full bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-wider text-accent ring-2 ring-accent/30 font-display mb-6">
              {t("title")}
            </h2>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-pretty text-foreground sm:text-5xl font-display">
              {t("subtitle")}
            </h1>
            <p className="mt-6 text-xl/8 text-balance text-muted-foreground font-serif">
              {t("description")}
            </p>
          </div>
          <div className="flex w-full items-center justify-center lg:w-7/12">
            <Image
              src="/animated/handpicked.webp"
              alt="Nico handpicked"
              width={1500}
              height={1500}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-bold tracking-tight text-pretty text-foreground font-display">
              {t("methodology.title")}
            </h2>
            <p className="my-6 text-base/7 text-muted-foreground font-serif">
              {t("methodology.description")}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>{t("personal.title")}</CardTitle>
                <CardDescription>{t("personal.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base/7 text-muted-foreground font-serif">
                  {t("personal.description")}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <p className="text-base/7 font-semibold text-accent font-display uppercase tracking-wide">
              {t("metrics.title")}
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
            {t.has("gallery.title")
              ? t("gallery.title")
              : t.has("galleryTitle")
              ? t("galleryTitle")
              : "Gallery"}
          </h3>
          <PortfolioGallery items={resolvedGallery} />
        </section>
      </div>
    </div>
  );
}
