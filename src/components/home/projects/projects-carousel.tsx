"use client";

import type { Locale } from "@/i18n/config";
import type { ProjectFromCMS } from "@/lib/directus";
import type { Messages } from "@/types/i18n";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import ProjectsCarouselSkeleton from "./projects-carousel-skeleton";

const ProjectsCarouselClient = dynamic(
  async () => import("./projects-carousel-client"),
  {
    loading: () => <ProjectsCarouselSkeleton />,
  },
);

interface ProjectsCarouselProps {
  messages: Messages;
  projects: ProjectFromCMS[];
  locale: Locale;
}

const ProjectsCarousel = ({
  messages,
  projects,
  locale,
}: ProjectsCarouselProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-20% 0%",
    triggerOnce: true,
  });

  const fallback = useMemo(() => <ProjectsCarouselSkeleton />, []);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative w-full h-fit min-h-[800px] select-none overflow-clip bg-primary text-foreground"
    >
      {inView ? (
        <ProjectsCarouselClient
          messages={messages}
          projects={projects}
          locale={locale}
        />
      ) : (
        fallback
      )}
    </section>
  );
};

export default ProjectsCarousel;
