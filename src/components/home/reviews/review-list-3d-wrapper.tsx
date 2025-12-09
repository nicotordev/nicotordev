import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Skeleton } from "@/components/ui/skeleton";
import type { Messages } from "@/types/i18n";
import dynamic from "next/dynamic";
import ReviewList3DWrapperTitle from "./review-list-3d-wrapper-title";

// Optimizacion: Lazy load del componente pesado de reviews.
// Usamos un Skeleton del mismo alto (1200px) para evitar CLS (Layout Shift) durante la carga.
const ReviewList3D = dynamic(() => import("./review-list-3d"), {
  loading: () => (
    <div className="w-full h-[1200px] flex items-center justify-center p-8">
      <Skeleton className="w-full h-full rounded-3xl bg-muted/20" />
    </div>
  ),
  ssr: true, // Mantenemos SSR para SEO, pero fragmentamos el bundle.
});

function ReviewList3DWrapper({ messages }: { messages: Messages }) {
  const reviewsMessages = messages.reviews ?? {};
  const badgeLabel = reviewsMessages.pre_title || "Testimonials";
  const heading = reviewsMessages.title || "Client Reviews";
  const subtitle =
    reviewsMessages.subtitle || "Real feedback from real projects";
  return (
    <section className="relative w-full z-10 overflow-hidden bg-transparent">
      <BackgroundDecoration className="-top-20 opacity-40" />
      <div className="relative z-10 mx-auto w-full px-6 lg:px-8 flex flex-col items-center gap-16 bg-transparent">
        <ReviewList3DWrapperTitle
          badgeLabel={badgeLabel}
          heading={heading}
          subtitle={subtitle}
          buttonText={messages.common.see_reviews || "See reviews"}
        />

        <div className="w-fit relative min-h-[1800px]">
          <ReviewList3D />
        </div>
      </div>

      <BackgroundDecoration
        className="top-auto bottom-0 translate-y-1/3"
        shapeClassName="left-[calc(50%+15rem)] bg-linear-to-tr from-secondary to-accent opacity-40 rotate-180"
      />
    </section>
  );
}

export default ReviewList3DWrapper;
