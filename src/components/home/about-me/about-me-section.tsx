import PortfolioGallery from "@/components/common/portfolio-gallery";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageDialog } from "@/components/ui/image-dialog";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import Image from "next/image";
import type { BentoSize } from "../../../types/footer";

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
  messages: Messages;
  stats?: AboutMeStat[];
  gallery?: AboutMeGalleryItem[];
}

export default function AboutMeSection({
  messages,
  stats,
  gallery,
}: AboutMeSectionProps) {
  const aboutMessages = messages.about ?? {};
  const galleryMessages = aboutMessages.gallery?.items ?? {};
  const photosMessages = aboutMessages.photos ?? {};
  const methodologyMessages = aboutMessages.methodology ?? {};
  const personalMessages = aboutMessages.personal ?? {};
  const metricsMessages = aboutMessages.metrics ?? {};
  const methodologyTitle =
    methodologyMessages.title || "Philosophy and methodology";
  const methodologyDescription =
    methodologyMessages.description ||
    "My way of working is built on clarity, autonomy, and impact.";

  const experienceValueRaw = metricsMessages.experienceValue || "2.5+ years";
  const [experienceValue, ...experienceSuffixParts] =
    experienceValueRaw.split(" ");
  const experienceSuffix = experienceSuffixParts.join(" ").trim();

  const resolvedStats = stats ?? [
    {
      label: metricsMessages.total_earnings || "Total earnings",
      prefix: "$",
      value: "50",
      suffix: "K+",
    },
    {
      label: metricsMessages.hours || "Hours worked",
      value: "~3.6K",
      suffix: " hrs",
    },
    {
      label: metricsMessages.success || "Success rate",
      value: "99.99",
      suffix: "%",
    },
    {
      label: metricsMessages.experience || "Experience",
      value: experienceValue || experienceValueRaw,
      suffix: experienceSuffix || "",
    },
  ];

  const resolvedGallery = gallery ?? [
    {
      src: "/images/nicolas/conce-ai.webp",
      alt:
        galleryMessages.conceAi?.alt ||
        photosMessages.gallery_1_alt ||
        "Conce AI Logo",
      size: "large",
      description:
        galleryMessages.conceAi?.description ||
        "The official logo of Conce AI, my technology business.",
    },
    {
      src: "/images/nicolas/nico-as-psychedelic-wizard.webp",
      alt:
        galleryMessages.wizard?.alt ||
        photosMessages.gallery_2_alt ||
        "Nico as a psychedelic wizard",
      size: "wide",
      description:
        galleryMessages.wizard?.description ||
        "Embracing creativity and magic in code, visualized as a psychedelic wizard.",
    },
    {
      src: "/images/nicolas/nico-pc.webp",
      alt:
        galleryMessages.workstation?.alt ||
        photosMessages.gallery_3_alt ||
        "Nico working on his Computer, Multiple Screens are present",
      size: "square",
      description:
        galleryMessages.workstation?.description ||
        "Deep in the flow state, surrounded by multiple screens and lines of code.",
    },
    {
      src: "/images/nicolas/nico-acid.webp",
      alt: galleryMessages.acid?.alt || "Nico's pupils dilated",
      size: "wide",
      description:
        galleryMessages.acid?.description ||
        "A close-up capturing the intensity and focus of a late-night coding session.",
    },
    {
      src: "/images/nicolas/nico-psychedelic.webp",
      alt: galleryMessages.psychedelic?.alt || "Nico with psychedelic effects",
      size: "square",
      description:
        galleryMessages.psychedelic?.description ||
        "Exploring the intersection of art and technology through psychedelic visuals.",
    },
    {
      src: "/images/nicolas/nico-unicorn.webp",
      alt: galleryMessages.unicorn?.alt || "Nico in a unicorn outfit",
      size: "wide",
      description:
        galleryMessages.unicorn?.description ||
        "Never taking life too seriously—rocking a unicorn outfit with pride.",
    },
    {
      src: "/images/nicolas/nico-and-koka.webp",
      alt: galleryMessages.koka?.alt || "Nico with his dog Koka",
      size: "square",
      description:
        galleryMessages.koka?.description ||
        "Quality time with my loyal companion, Koka.",
    },
    {
      src: "/images/nicolas/nico-flowers.webp",
      alt: galleryMessages.flowers?.alt || "Nico among flowers",
      size: "wide",
      description:
        galleryMessages.flowers?.description ||
        "Finding balance and peace in nature, surrounded by flowers.",
    },
    {
      src: "/images/nicolas/nico-trippy.webp",
      alt: galleryMessages.trippy?.alt || "Nico with trippy photo effects",
      size: "square",
      description:
        galleryMessages.trippy?.description ||
        "Experimenting with visual effects to create unique digital experiences.",
    },
    {
      src: "/images/nicolas/nico-piercing.webp",
      alt: galleryMessages.piercing?.alt || "Nico with a nose piercing",
      size: "wide",
      description:
        galleryMessages.piercing?.description ||
        "Expressing personal style with a nose piercing.",
    },
    {
      src: "/images/nicolas/nico-tattoo.webp",
      alt:
        galleryMessages.tattoo?.alt ||
        "Nico with a tattoo on the back of the neck, a cpu chip",
      size: "square",
      description:
        galleryMessages.tattoo?.description ||
        "Cyberpunk vibes: a CPU chip tattoo on the back of my neck, symbolizing my connection to tech.",
    },
    {
      src: "/images/nicolas/only-koka.jpg",
      alt: galleryMessages.onlyKoka?.alt || "Koka, the dog",
      size: "square",
      description:
        galleryMessages.onlyKoka?.description ||
        "The real boss of the operation: Koka.",
    },
  ];

  const aboutTitle = aboutMessages.title || "About me";
  const aboutSubtitle =
    aboutMessages.subtitle || "Building software with soul and precision";
  const aboutDescription =
    aboutMessages.description ||
    "I transform ideas into platforms that blend art, engineering, and intention.";
  const personalTitle = personalMessages.title || "Beyond the code";
  const personalSubtitle =
    personalMessages.subtitle || "Who am I? A curious builder.";
  const personalDescription =
    personalMessages.description ||
    "Between commits and coffee, I explore AI, write, and build responsibly.";
  const galleryTitle =
    aboutMessages.gallery?.title || aboutMessages.galleryTitle || "Gallery";
  const metricsTitle = aboutMessages.metricsTitle || "Highlighted metrics";

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
            <Badge variant="secondary">{aboutTitle}</Badge>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-pretty text-foreground sm:text-5xl font-display">
              {aboutSubtitle}
            </h1>
            <p className="mt-6 text-xl/8 text-balance text-muted-foreground font-serif">
              {aboutDescription}
            </p>
          </div>
          <div className="flex w-full items-center justify-center lg:w-7/12">
            <ImageDialog
              src="/animated/handpicked.webp"
              alt="Nico handpicked"
              width={1500}
              height={1500}
            >
              <Image
                src="/animated/handpicked.webp"
                alt="Nico handpicked"
                width={1500}
                height={1500}
                className="h-full w-full object-contain"
              />
            </ImageDialog>
          </div>
        </div>
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="text-2xl font-bold tracking-tight text-pretty text-foreground font-display">
              {methodologyTitle}
            </h2>
            <p className="my-6 text-base/7 text-muted-foreground font-serif">
              {methodologyDescription}
            </p>
            <Card>
              <CardHeader>
                <CardTitle>{personalTitle}</CardTitle>
                <CardDescription>{personalSubtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base/7 text-muted-foreground font-serif">
                  {personalDescription}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <p className="text-base/7 font-semibold text-accent font-display uppercase tracking-wide">
              {metricsTitle}
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
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <section className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-foreground font-display mb-8">
            {galleryTitle}
          </h3>
          <PortfolioGallery items={resolvedGallery} />
        </section>
      </div>
    </div>
  );
}
