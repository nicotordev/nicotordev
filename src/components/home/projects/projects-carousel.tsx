"use client";

import type { Messages } from "@/types/i18n";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectsCarouselSkeleton from "./projects-carousel-skeleton";

const ProjectsCarouselClient = dynamic(
  async () => import("./projects-carousel-client"),
  {
    ssr: false,
    loading: () => <ProjectsCarouselSkeleton />,
  }
);

interface ProjectsCarouselProps {
  messages: Messages;
}

const ProjectsCarousel = ({ messages }: ProjectsCarouselProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);

  const fallback = useMemo(() => <ProjectsCarouselSkeleton />, []);

  useEffect(() => {
    // If already visible, do nothing
    if (isVisible) return;

    // If IntersectionObserver isn't available, just load it
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || cancelled) return;

        // Optional: defer to idle time to reduce jank
        const w = window as unknown as {
          requestIdleCallback?: (
            cb: () => void,
            opts?: { timeout: number }
          ) => number;
        };

        if (typeof w.requestIdleCallback === "function") {
          w.requestIdleCallback(
            () => {
              if (!cancelled) setIsVisible(true);
            },
            { timeout: 800 }
          );
        } else {
          setIsVisible(true);
        }

        observer.disconnect();
      },
      {
        root: null,
        rootMargin: "400px 0px", // load earlier than before (better UX)
        threshold: 0.01,
      }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section
      ref={(node) => {
        ref.current = node;
      }}
      className="relative w-full h-fit min-h-[800px] select-none overflow-clip bg-primary text-foreground"
    >
      {isVisible ? <ProjectsCarouselClient messages={messages} /> : fallback}
    </section>
  );
};

export default ProjectsCarousel;
