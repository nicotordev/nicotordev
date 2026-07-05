"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import type { Locale } from "@/i18n/config";
import type { ProjectFromCMS } from "@/lib/directus";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import ProjectsTitleOverlay from "./projects-title-overlay";

interface ProjectsCarouselClientProps {
  messages: Messages;
  projects: ProjectFromCMS[];
  locale: Locale;
}

type ProjectsCarouselI18n = {
  title?: string;
  viewProject?: string;
};

const ProjectsCarouselClient = ({
  messages,
  projects,
  locale,
}: ProjectsCarouselClientProps) => {
  const t = (messages.projects?.carousel ?? {}) as ProjectsCarouselI18n;

  const media = messages.common?.a11y?.media ?? {};
  const a11y = messages.common?.a11y ?? {};
  const textureAlt = media.textureAlt || "Animated texture";
  const previousSlideLabel = a11y.previousSlide || "Previous projects";
  const nextSlideLabel = a11y.nextSlide || "Next projects";

  const navButtonClassName =
    "size-11 shrink-0 rounded-full border-2 border-white/60 bg-white text-primary shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:border-white hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:size-14";

  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined,
  );

  const titleText = t.title ?? "Projects I've Built";
  const viewProjectText = t.viewProject ?? "View Project";

  return (
    <div className="relative h-full w-full overflow-y-clip">
      <Image
        width={1920}
        height={1080}
        src="/images/background/texture-1.webp"
        alt={textureAlt}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-30 mix-blend-multiply"
        priority={false}
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-[20%] -left-[10%] z-0 h-[70%] w-[70%] rounded-full bg-accent blur-[20px]" />
      <div className="pointer-events-none absolute top-[10%] -right-[10%] z-0 h-[60%] w-[60%] rounded-full bg-accent blur-[20px]" />
      <div className="pointer-events-none absolute -bottom-[20%] left-[20%] z-0 h-[60%] w-[60%] rounded-full bg-secondary blur-[20px]" />

      {/* Title overlays */}
      <ProjectsTitleOverlay className="absolute top-0 z-10" text={titleText} />
      <ProjectsTitleOverlay
        className="absolute bottom-0 right-0 z-10 rotate-180"
        text={titleText}
      />

      <div className="relative z-20 w-full py-16 md:py-32 lg:py-48">
        <div className="relative mx-auto max-w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 flex items-center">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              aria-label={previousSlideLabel}
              className={cn(navButtonClassName, "pointer-events-auto")}
            >
              <ArrowLeft className="size-6 sm:size-7" aria-hidden="true" />
            </Button>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              aria-label={nextSlideLabel}
              className={cn(navButtonClassName, "pointer-events-auto")}
            >
              <ArrowRight className="size-6 sm:size-7" aria-hidden="true" />
            </Button>
          </div>

          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "center", loop: true, containScroll: "trimSnaps" }}
            className="relative w-full max-w-full"
          >
            <CarouselContent className="w-full max-w-full px-4">
              {projects.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="group flex h-full flex-col rounded-xl border border-white/20 bg-gray-900/30 p-6 shadow-xl backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl"
                  >
                    <div className="w-full overflow-hidden rounded-2xl">
                      <div className="flex h-84 overflow-hidden w-full transition duration-500 group-hover:scale-105">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={1080}
                          height={1080}
                          className="h-full w-full object-cover object-center aspect-square"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-6">
                      <Typography
                        role="headline"
                        as="div"
                        className="line-clamp-2 text-xl font-semibold tracking-tight text-white md:text-2xl"
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        role="body"
                        as="div"
                        className="line-clamp-2 text-sm leading-relaxed text-white/70 md:text-base"
                      >
                        {item.description}
                      </Typography>

                      <Link
                        href={`/${locale}/projects/${item.slug}`}
                        className="group/btn mt-auto flex w-fit items-center pt-4 text-sm font-medium text-white transition-colors hover:text-accent"
                      >
                        <Typography
                          as="span"
                          role="button"
                          className="underline decoration-white/50 underline-offset-4 transition-all group-hover/btn:decoration-accent"
                        >
                          {viewProjectText}
                        </Typography>
                        <ArrowRight
                          className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCarouselClient;
