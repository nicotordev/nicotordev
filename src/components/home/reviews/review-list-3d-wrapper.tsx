import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Messages } from "@/types/i18n";
import dynamic from "next/dynamic";

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
        <div className="text-center mx-auto space-y-6 absolute left-0 top-0 backdrop-blur-sm w-full h-full flex flex-col items-center justify-center">
          <Badge variant="secondary">{badgeLabel}</Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

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
