  import type { ReviewFromCMS } from "@/lib/directus";
import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const REVIEW_MIN_HEIGHT_PX = 1800;

// ✅ Lazy real: no SSR para el componente pesado (mejor perf/hydration)
const ReviewList3D = dynamic(() => import("./review-list-3d"), {
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

export default function ReviewList3DWrapper({ reviews }: ReviewList3DWrapperProps) {
  return (
    <section id="reviews-section" className="relative z-10 overflow-hidden bg-transparent ">
      <BackgroundDecoration className="-top-20 opacity-40 pointer-events-none" />
      <div className="container mx-auto">
        <ReviewList3D reviews={reviews} />
      </div>

      <BackgroundDecoration
        className="top-auto bottom-0 translate-y-1/3 pointer-events-none"
        shapeClassName="left-[calc(50%+15rem)] bg-linear-to-tr from-secondary to-accent opacity-40 rotate-180"
      />
    </section>
  );
}
