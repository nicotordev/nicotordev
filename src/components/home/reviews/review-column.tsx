"use client";

import type { Review } from "@/app/data/reviews";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "500px", once: false });

  return (
    <div ref={ref} className="h-full w-80">
      {inView && (
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
      )}
    </div>
  );
}
