"use client";

import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReviewFromCMS } from "@/lib/directus";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const REVIEW_MIN_HEIGHT_PX = 800;

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
  const [tapPaused, setTapPaused] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const paused = tapPaused || dialogOpen;

  return (
    <section
      id="reviews-section"
      className="relative z-10 overflow-hidden bg-transparent"
      ref={sectionRef}
      onClick={() => {
        if (!dialogOpen) {
          setTapPaused((current) => !current);
        }
      }}
    >
      <div>
        <ReviewList3D
          reviews={reviews}
          paused={paused}
          onDialogOpenChange={setDialogOpen}
        />
      </div>
    </section>
  );
}
