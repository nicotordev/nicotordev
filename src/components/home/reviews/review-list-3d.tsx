"use client";

import type { ReviewFromCMS } from "@/lib/directus";
import { useEffect, useMemo, useState } from "react";
import ReviewColumn from "./review-column";
import { ReviewDialogProvider } from "./review-dialog-provider";

const MOBILE_MEDIA = "(max-width: 767px)";

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_MEDIA).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MEDIA);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

interface ReviewList3DProps {
  reviews: ReviewFromCMS[];
  paused?: boolean;
  onDialogOpenChange?: (open: boolean) => void;
}

export default function ReviewList3D({
  reviews,
  paused = false,
  onDialogOpenChange,
}: ReviewList3DProps) {
  const isMobile = useMobileViewport();
  const rows = useMemo(
    () => (isMobile ? [] : buildRows(reviews)),
    [reviews, isMobile],
  );

  return (
    <div className="relative flex w-full h-fit flex-col items-center justify-center overflow-x-hidden overflow-y-clip rounded-2xl bg-transparent py-10 sm:py-20 lg:py-32">
      <ReviewDialogProvider
        {...(onDialogOpenChange ? { onOpenChange: onDialogOpenChange } : {})}
      >
        <div className="w-full relative z-10 flex flex-col items-center gap-6 sm:gap-8 bg-transparent">
          {isMobile ? (
            <div className="flex w-full">
              <ReviewColumn reviews={reviews} reverse={false} paused={paused} />
            </div>
          ) : (
            <div className="flex w-full flex-col gap-6 sm:gap-8 mt-12 mb-12 transform-gpu">
              {rows.map((col, idx) => (
                <ReviewColumn
                  key={`reviews-col-${idx}`}
                  reviews={col.reviews}
                  reverse={col.reverse}
                  paused={paused}
                />
              ))}
            </div>
          )}
        </div>
      </ReviewDialogProvider>
    </div>
  );
}

function buildRows(reviews: ReviewFromCMS[]) {
  if (!reviews.length) {
    return [];
  }

  const half = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.slice(half);

  return [
    { reviews: firstRow, reverse: false },
    { reviews: secondRow, reverse: true },
    { reviews: firstRow, reverse: true },
    { reviews: secondRow, reverse: false },
  ];
}
