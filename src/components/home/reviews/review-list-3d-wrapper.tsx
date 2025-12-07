import { Badge } from "@/components/ui/badge";
import ReviewList3D from "./review-list-3d";

function ReviewList3DWrapper() {
  return (
    <section className="relative w-full pb-52 pt-32 z-10 overflow-hidden bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8 flex flex-col items-center gap-16">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm border-secondary-foreground text-secondary-foreground bg-secondary/5 backdrop-blur-sm"
          >
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Client <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See what people are saying about working with me. I take pride in
            delivering high-quality work and building lasting relationships.
          </p>
        </div>

        <div className="w-full relative">
          <ReviewList3D />
        </div>
      </div>
    </section>
  );
}

export default ReviewList3DWrapper;
