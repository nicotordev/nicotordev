"use client";

import type { Messages } from "@/types/i18n";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectsCarouselSkeleton from "./projects-carousel-skeleton";
import { useInView } from "react-intersection-observer";

const ProjectsCarouselClient = dynamic(
  async () => import("./projects-carousel-client"),
  {
    loading: () => <ProjectsCarouselSkeleton />,
  }
);

interface ProjectsCarouselProps {
  messages: Messages;
}

const ProjectsCarousel = ({ messages }: ProjectsCarouselProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-20% 0%",
    triggerOnce: true,
  });

  const fallback = useMemo(() => <ProjectsCarouselSkeleton />, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-fit min-h-[800px] select-none overflow-clip bg-primary text-foreground"
    >
      {inView ? <ProjectsCarouselClient messages={messages} /> : fallback}
    </section>
  );
};

export default ProjectsCarousel;
