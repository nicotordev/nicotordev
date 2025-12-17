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
import { Typography } from "@/components/ui/typography";
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
  const about = messages.about ?? {};
  const galleryMsgs = about.gallery?.items ?? {};
  const photosMsgs = about.photos ?? {};
  const methodology = about.methodology ?? {};
  const personal = about.personal ?? {};
  const metrics = about.metrics ?? {};

  const methodologyTitle =
    methodology.title ?? "Philosophy and methodology";
  const methodologyDescription =
    methodology.description ??
    "My way of working is built on clarity, autonomy, and impact.";

  const experienceRaw = metrics.experienceValue ?? "2.5+ years";
  const [experienceValue, ...experienceSuffixParts] =
    experienceRaw.split(" ");
  const experienceSuffix = experienceSuffixParts.join(" ").trim();

  const resolvedStats: AboutMeStat[] =
    stats ??
    [
      {
        label: metrics.total_earnings ?? "Total earnings",
        prefix: "$",
        value: "50",
        suffix: "K+",
      },
      {
        label: metrics.hours ?? "Hours worked",
        value: "~3.6K",
        suffix: " hrs",
      },
      {
        label: metrics.success ?? "Success rate",
        value: "99.99",
        suffix: "%",
      },
      {
        label: metrics.experience ?? "Experience",
        value: experienceValue || experienceRaw,
        suffix: experienceSuffix,
      },
    ];

  const resolvedGallery: AboutMeGalleryItem[] =
    gallery ??
    [
      {
        src: "/images/nicolas/conce-ai.webp",
        alt:
          galleryMsgs.conceAi?.alt ??
          photosMsgs.gallery_1_alt ??
          "Conce AI Logo",
        size: "large",
        description:
          galleryMsgs.conceAi?.description ??
          "The official logo of Conce AI, my technology business.",
      },
      {
        src: "/images/nicolas/nico-as-psychedelic-wizard.webp",
        alt:
          galleryMsgs.wizard?.alt ??
          photosMsgs.gallery_2_alt ??
          "Nico as a psychedelic wizard",
        size: "wide",
        description:
          galleryMsgs.wizard?.description ??
          "Embracing creativity and magic in code.",
      },
      {
        src: "/images/nicolas/nico-pc.webp",
        alt:
          galleryMsgs.workstation?.alt ??
          photosMsgs.gallery_3_alt ??
          "Nico working on his computer",
        size: "square",
        description:
          galleryMsgs.workstation?.description ??
          "Deep in the flow state, surrounded by code.",
      },
      {
        src: "/images/nicolas/only-koka.jpg",
        alt: galleryMsgs.onlyKoka?.alt ?? "Koka the dog",
        size: "square",
        description:
          galleryMsgs.onlyKoka?.description ??
          "The real boss of the operation: Koka.",
      },
    ];

  const aboutTitle = about.title ?? "About me";
  const aboutSubtitle =
    about.subtitle ?? "Building software with soul and precision";
  const aboutDescription =
    about.description ??
    "I transform ideas into platforms that blend art, engineering, and intention.";

  const personalTitle = personal.title ?? "Beyond the code";
  const personalSubtitle =
    personal.subtitle ?? "Who am I? A curious builder.";
  const personalDescription =
    personal.description ??
    "Between commits and coffee, I explore AI, write, and build responsibly.";

  const galleryTitle =
    about.gallery?.title ??
    about.galleryTitle ??
    "Gallery";

  const metricsTitle =
    about.metricsTitle ?? "Highlighted metrics";

  return (
    <section className="relative py-24 sm:py-32">
      {/* Background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 z-0 transform-gpu overflow-x-clip blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className={cn(
            "relative left-[calc(50%-11rem)] -translate-x-1/2 rotate-30",
            "aspect-1155/678 w-144.5",
            "bg-linear-to-tr from-primary to-secondary opacity-30",
            "sm:left-[calc(50%-30rem)] sm:w-288.75"
          )}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:w-5/12">
            <Badge variant="secondary">{aboutTitle}</Badge>
            <Typography
              as="h1"
              role="display"
              className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              {aboutSubtitle}
            </Typography>
            <Typography
              role="body"
              mood="editorial"
              className="mt-6 text-xl/8 text-muted-foreground"
            >
              {aboutDescription}
            </Typography>
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

        {/* Content */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-8">
          <div>
            <Typography
              as="h2"
              role="headline"
              className="text-2xl font-bold text-foreground"
            >
              {methodologyTitle}
            </Typography>
            <Typography
              role="body"
              mood="editorial"
              className="my-6 text-base/7 text-muted-foreground"
            >
              {methodologyDescription}
            </Typography>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Typography role="title">{personalTitle}</Typography>
                </CardTitle>
                <CardDescription>
                  <Typography role="body" className="text-muted-foreground">
                    {personalSubtitle}
                  </Typography>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Typography
                  role="body"
                  mood="editorial"
                  className="text-base/7 text-muted-foreground"
                >
                  {personalDescription}
                </Typography>
              </CardContent>
            </Card>
          </div>

          <div>
            <Typography
              role="label"
              mood="product"
              className="text-base font-semibold uppercase tracking-wide text-accent"
            >
              {metricsTitle}
            </Typography>
            <hr className="mt-6 border-border" />
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resolvedStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 transition-colors hover:bg-accent/5"
                >
                  <Typography
                    as="dt"
                    role="label"
                    className="text-sm uppercase tracking-wide text-muted-foreground"
                  >
                    {stat.label}
                  </Typography>
                  <dd className="mt-1">
                    <Typography
                      as="span"
                      role="headline"
                      mood="code"
                      className="text-3xl font-bold gradient-text"
                    >
                      {stat.prefix}
                      {stat.value}
                    </Typography>
                    {stat.suffix && (
                      <Typography
                        as="span"
                        role="code"
                        className="ml-1 text-muted-foreground"
                      >
                        {stat.suffix}
                      </Typography>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      {/* Gallery */}
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <Typography
          as="h3"
          role="headline"
          className="mb-8 text-2xl font-bold text-foreground"
        >
          {galleryTitle}
        </Typography>
        <PortfolioGallery items={resolvedGallery} />
      </div>
    </section>
  );
}
