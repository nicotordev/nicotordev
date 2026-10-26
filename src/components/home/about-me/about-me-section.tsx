import PortfolioGallery from "@/components/common/portfolio-gallery";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { getAboutStats, type AboutStat } from "@/lib/about-stats";
import type { Messages } from "@/types/i18n";
import Image from "next/image";
import type { BentoSize } from "../../../types/footer";
import { WorkspacePhoto } from "@/components/about/workspace-photo";

type AboutMeGalleryItem = {
  src: string;
  alt: string;
  size: BentoSize;
  description?: string;
};

export interface AboutMeSectionProps {
  messages: Messages;
}

export default function AboutMeSection({
  messages,
}: AboutMeSectionProps) {
  const about = messages.about ?? {};
  const galleryMsgs = about.gallery?.items ?? {};
  const photosMsgs = about.photos ?? {};
  const methodology = about.methodology ?? {};
  const personal = about.personal ?? {};

  const methodologyTitle = methodology.title ?? "Philosophy and methodology";
  const methodologyDescription =
    methodology.description ??
    "My way of working is built on clarity, autonomy, and impact.";

  const resolvedGallery: AboutMeGalleryItem[] = [
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
    {
      src: "/images/nicolas/nico-acid.webp",
      alt: galleryMsgs.acid?.alt ?? "Nico in acid-inspired art",
      size: "square",
      description:
        galleryMsgs.acid?.description ??
        "Exploring altered perspectives through art.",
    },
    {
      src: "/images/nicolas/nico-and-koka.webp",
      alt: galleryMsgs.koka?.alt ?? "Nico and Koka together",
      size: "wide",
      description:
        galleryMsgs.koka?.description ?? "Best friends and coding companions.",
    },
    {
      src: "/images/nicolas/nico-flowers.webp",
      alt: galleryMsgs.flowers?.alt ?? "Nico with flowers",
      size: "square",
      description:
        galleryMsgs.flowers?.description ??
        "Finding beauty in nature and code.",
    },
    {
      src: "/images/nicolas/nico-piercing.webp",
      alt: galleryMsgs.piercing?.alt ?? "Nico with piercing",
      size: "square",
      description:
        galleryMsgs.piercing?.description ?? "Self-expression through style.",
    },
    {
      src: "/images/nicolas/nico-psychedelic.webp",
      alt: galleryMsgs.psychedelic?.alt ?? "Nico in psychedelic art",
      size: "square",
      description:
        galleryMsgs.psychedelic?.description ??
        "Consciousness exploration meets digital art.",
    },
    {
      src: "/images/nicolas/nico-tattoo.webp",
      alt: galleryMsgs.tattoo?.alt ?? "Nico showing tattoo",
      size: "square",
      description:
        galleryMsgs.tattoo?.description ?? "Stories written on skin.",
    },
    {
      src: "/images/nicolas/nico-trippy.webp",
      alt: galleryMsgs.trippy?.alt ?? "Nico in trippy art style",
      size: "square",
      description:
        galleryMsgs.trippy?.description ?? "Reality bends, creativity flows.",
    },
    {
      src: "/images/nicolas/nico-unicorn.webp",
      alt: galleryMsgs.unicorn?.alt ?? "Nico as a unicorn",
      size: "square",
      description:
        galleryMsgs.unicorn?.description ??
        "Embracing the magical and mythical.",
    },
  ];

  const aboutTitle = about.title ?? "About me";
  const aboutSubtitle =
    about.subtitle ?? "Building software with soul and precision";
  const aboutDescription =
    about.description ??
    "I transform ideas into platforms that blend art, engineering, and intention.";

  const personalTitle = personal.title ?? "Beyond the code";
  const personalSubtitle = personal.subtitle ?? "Who am I? A curious builder.";
  const personalDescription =
    personal.description ??
    "Between commits and coffee, I explore AI, write, and build responsibly.";

  const galleryTitle = about.gallery?.title ?? about.galleryTitle ?? "Gallery";

  const metricsTitle = about.metricsTitle ?? "Highlighted metrics";

  return (
    <section id="about-section" className="relative py-24 sm:py-32">
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
            <Image
              src="/animated/handpicked.webp"
              alt="Nico handpicked"
              width={1500}
              height={1500}
              className="h-full w-full object-contain"
            />
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
          <WorkspacePhoto
            src="/images/nicolas/nico-latest.webp"
            alt={photosMsgs.latest_alt ?? "Photo of Nicolás Torres Henriquez"}
            title={photosMsgs.latest_title ?? "Nicolás Torres Henriquez"}
            description={photosMsgs.latest_description ?? "Full-Stack Web Engineer & Software Architect"}
            aspectRatioClassName="aspect-4/5 sm:aspect-auto h-full min-h-[440px]"
          />
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
