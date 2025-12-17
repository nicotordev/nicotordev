import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Skeleton } from "@/components/ui/skeleton";
import type { Messages } from "@/types/i18n";
import dynamic from "next/dynamic";
import ReviewList3DWrapperTitle from "./review-list-3d-wrapper-title";

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

function ReviewList3DWrapper({ messages }: { messages: Messages }) {
  const reviewsMessages = messages.reviews ?? {};
  const badgeLabel = reviewsMessages.pre_title ?? "Testimonials";
  const heading = reviewsMessages.title ?? "Client Reviews";
  const subtitle =
    reviewsMessages.subtitle ?? "Real feedback from real projects";
  const buttonText = messages.common?.see_reviews ?? "See reviews";

  return (
    <section className="relative z-10 w-full overflow-hidden bg-transparent">
      <BackgroundDecoration className="-top-20 opacity-40 pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-16 bg-transparent">
        <ReviewList3DWrapperTitle
          badgeLabel={badgeLabel}
          heading={heading}
          subtitle={subtitle}
          buttonText={buttonText}
        />

        <div
          className="relative w-full"
          style={{
            minHeight: REVIEW_MIN_HEIGHT_PX,
            width: "100%",
            maxWidth: "100%",
            overflowX: "clip",
          }}
          aria-busy="true"
        >
          <ReviewList3D />
        </div>
      </div>

      <BackgroundDecoration
        className="top-auto bottom-0 translate-y-1/3 pointer-events-none"
        shapeClassName="left-[calc(50%+15rem)] bg-linear-to-tr from-secondary to-accent opacity-40 rotate-180"
      />
    </section>
  );
}

export default ReviewList3DWrapper;
