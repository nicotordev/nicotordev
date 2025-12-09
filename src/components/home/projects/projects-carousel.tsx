"use client";

import type { Messages } from "@/types/i18n";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ProjectsCarouselSkeleton from "./projects-carousel-skeleton";

const ProjectsCarouselClient = dynamic(
  () => import("./projects-carousel-client"),
  {
    ssr: false,
    loading: () => <ProjectsCarouselSkeleton />,
  }
);

interface ProjectsCarouselProps {
  messages: Messages;
}

const ProjectsCarousel = ({ messages }: ProjectsCarouselProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before it comes into view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-primary text-foreground overflow-clip w-full h-fit select-none min-h-[800px]"
    >
      {isVisible ? (
        <ProjectsCarouselClient messages={messages} />
      ) : (
        <ProjectsCarouselSkeleton />
      )}
    </section>
  );
};

export default ProjectsCarousel;
