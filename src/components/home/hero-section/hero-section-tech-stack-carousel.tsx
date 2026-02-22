"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

function HeroTechStackCarouselPlaceholder() {
  return (
    <div
      className="relative isolate w-full overflow-x-clip px-2 py-6 sm:px-4"
      aria-label="Loading tech stack"
    >
      <div className="h-28 w-full rounded-2xl bg-muted/30 animate-pulse" />
    </div>
  );
}

export default function HeroSectionTechStackCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [Carousel, setCarousel] = useState<ComponentType | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target || isIntersecting) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setIsIntersecting(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 32) setHasScrolled(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isIntersecting || !hasScrolled || Carousel) return;

    let active = true;

    const load = () => {
      import("./hero-section-tech-stack-carousel-client").then((mod) => {
        if (active) setCarousel(() => mod.default);
      });
    };

    if ("requestIdleCallback" in window) {
      (window as Window & {
        requestIdleCallback: (cb: IdleRequestCallback) => number;
      }).requestIdleCallback(() => load());
    } else {
      globalThis.setTimeout(load, 400);
    }

    return () => {
      active = false;
    };
  }, [Carousel, hasScrolled, isIntersecting]);

  const ActiveCarousel = Carousel;

  return (
    <div ref={ref}>
      {ActiveCarousel ? <ActiveCarousel /> : <HeroTechStackCarouselPlaceholder />}
    </div>
  );
}
