"use client";

import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReviewFromCMS } from "@/lib/directus";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const REVIEW_MIN_HEIGHT_PX = 1800;

const ReviewList3D = dynamic(() => import("./review-list-3d"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center p-8"
      style={{ minHeight: REVIEW_MIN_HEIGHT_PX }}
      role="status"
      aria-live="polite"
      aria-label="Loading reviews"
    >
      <Skeleton className="w-full h-full rounded-3xl bg-muted/20" />
    </div>
  ),
});

interface ReviewList3DWrapperProps {
  reviews: ReviewFromCMS[];
}

export default function ReviewList3DWrapper({
  reviews,
}: ReviewList3DWrapperProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "350px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <section
      id="reviews-section"
      className="relative z-10 overflow-hidden bg-transparent"
      ref={sectionRef}
    >
      <BackgroundDecoration className="-top-20 opacity-40 pointer-events-none" />
      <div className="container mx-auto">
        {shouldLoad ? (
          <ReviewList3D reviews={reviews} />
        ) : (
          <div
            className="w-full flex items-center justify-center p-8"
            style={{ minHeight: REVIEW_MIN_HEIGHT_PX }}
            role="status"
            aria-live="polite"
            aria-label="Loading reviews"
          >
            <Skeleton className="w-full h-full rounded-3xl bg-muted/20" />
          </div>
        )}
      </div>

      <BackgroundDecoration
        className="top-auto bottom-0 translate-y-1/3 pointer-events-none"
        shapeClassName="left-[calc(50%+15rem)] bg-linear-to-tr from-secondary to-accent opacity-40 rotate-180"
      />
    </section>
  );
}
