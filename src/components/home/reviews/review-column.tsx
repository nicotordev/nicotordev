"use client";

import type { Review } from "@/app/data/reviews";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import ReviewCard from "./review-card";

export interface ReviewColumnProps {
  reviews: Review[];
  className?: string;
  reverse?: boolean;
}
// Componente helper para reducir duplicación y limpiar el renderizado
export default function ReviewColumn({
  reviews,
  className,
  reverse = false,
}: ReviewColumnProps) {
  return (
    <div className="h-full w-80">
      <Marquee
        pauseOnHover
        vertical
        reverse={reverse}
        className={cn("[--duration:40s]", className)}
      >
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
