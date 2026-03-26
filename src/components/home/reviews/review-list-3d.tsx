"use client";
import type { ReviewFromCMS } from "@/lib/directus";
import { useMemo } from "react";
import ReviewColumn from "./review-column";
import { ReviewDialogProvider } from "./review-dialog-provider";

interface ReviewList3DProps {
  reviews: ReviewFromCMS[];
}

export default function ReviewList3D({ reviews }: ReviewList3DProps) {
  const rows = useMemo(() => buildRows(reviews), [reviews]);
  const mobileRow = useMemo(
    () => ({ reviews, reverse: false }),
    [reviews]
  );

  return (
    <div className="relative flex w-full h-fit flex-col items-center justify-center overflow-x-hidden overflow-y-clip rounded-2xl bg-transparent py-10 sm:py-20 lg:py-32">
      <ReviewDialogProvider>
        <div className="w-full relative z-10 flex flex-col items-center gap-6 sm:gap-8 bg-transparent">
          <div className="flex w-full md:hidden">
            <ReviewColumn
              reviews={mobileRow.reviews}
              reverse={mobileRow.reverse}
            />
          </div>
          <div className="hidden w-full flex-col gap-6 sm:gap-8 md:flex mt-12 mb-12 transform-gpu">
            {rows.map((col, idx) => (
              <ReviewColumn
                key={`reviews-col-${idx}`}
                reviews={col.reviews}
                reverse={col.reverse}
              />
            ))}
          </div>
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
