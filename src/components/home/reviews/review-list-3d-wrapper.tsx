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
  const badgeLabel = reviewsMessages.title || "Testimonials";
  const heading = reviewsMessages.title || "Client Reviews";
  const subtitle =
    reviewsMessages.subtitle || "Real feedback from real projects";
  return (
    <section className="relative w-full pb-52 pt-32 z-10 overflow-hidden bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8 flex flex-col items-center gap-16">
        <div className="text-center mx-auto space-y-6">
          <Badge variant="secondary">{badgeLabel}</Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="w-full relative min-h-[1200px]">
          <ReviewList3D />
        </div>
      </div>
    </section>
  );
}

export default ReviewList3DWrapper;
