"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";

import { staticProjects } from "@/app/data/projects";
import type { Messages } from "@/types/i18n";
import ProjectsTitleOverlay from "./projects-title-overlay";

interface ProjectsCarouselClientProps {
  messages: Messages;
}

type ProjectsCarouselI18n = {
  title?: string;
  viewProject?: string;
};

const ProjectsCarouselClient = ({ messages }: ProjectsCarouselClientProps) => {
  const t = (messages.projects?.carousel ?? {}) as ProjectsCarouselI18n;

  const media = messages.common?.a11y?.media ?? {};
  const textureAlt = media.textureAlt || "Animated texture";

  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined
  );
  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);

  const titleText = t.title ?? "Projects I've Built";
  const viewProjectText = t.viewProject ?? "View Project";

  const updateSelection = useMemo(() => {
    return () => {
      if (!carouselApi) return;
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi, updateSelection]);

  return (
    <div className="relative w-full h-full">
      {/* Background texture */}
      <Image
        width={1920}
        height={1080}
        src="/images/background/texture-1.webp"
        alt={textureAlt}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover mix-blend-multiply opacity-30"
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

      <div className="relative z-20 w-full py-64">
        {/* Prev button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute -bottom-20 left-0 z-30 sm:left-6 md:left-8"
        >
          <Button
            size="icon"
            variant="outline"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous projects"
            className="disabled:pointer-events-auto rounded-full bg-gray-900/30 backdrop-blur-md border-white/20 text-white hover:bg-gray-900/50 hover:text-white disabled:opacity-30 shadow-sm transition-all duration-300 size-14 sm:size-16"
          >
            <ArrowLeft className="size-7 sm:size-8" aria-hidden="true" />
          </Button>
        </motion.div>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute -top-20 right-0 z-30 sm:right-6 md:right-8"
        >
          <Button
            size="icon"
            variant="outline"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next projects"
            className="disabled:pointer-events-auto rounded-full bg-gray-900/30 backdrop-blur-md border-white/20 text-white hover:bg-gray-900/50 hover:text-white disabled:opacity-30 shadow-sm transition-all duration-300 size-14 sm:size-16"
          >
            <ArrowRight className="size-7 sm:size-8" aria-hidden="true" />
          </Button>
        </motion.div>

        <Carousel
          setApi={setCarouselApi}
          opts={{ align: "center", loop: true }}
          className="relative w-full max-w-full"
        >
          <CarouselContent className="w-full max-w-full -ml-6 px-1 sm:px-2">
            {staticProjects.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-6 basis-10/12 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/3 2xl:basis-1/4"
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
                        className="h-full w-full object-cover object-center"
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

                    <div className="group/btn mt-auto flex w-fit items-center pt-4 text-sm font-medium text-white transition-colors group-hover:text-accent">
                      <Typography
                        as="span"
                        role="button"
                        mood="artistic"
                        className="underline decoration-white/50 underline-offset-4 transition-all group-hover:decoration-accent"
                      >
                        {viewProjectText}
                      </Typography>
                      <ArrowRight
                        className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default ProjectsCarouselClient;
