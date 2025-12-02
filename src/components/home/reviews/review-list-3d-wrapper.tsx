import { Badge } from "@/components/ui/badge";
import ReviewList3D from "./review-list-3d";

function ReviewList3DWrapper() {
  return (
    <section className="relative w-full pb-52 pt-32 z-10 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] -translate-x-1/2 aspect-1155/678 w-144.5 -translate-y-1/2 rotate-30 bg-linear-to-tr from-accent to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-accent to-primary opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
      {/* New Blob - Left Mid */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative aspect-1155/678 w-144.5 -rotate-12 bg-linear-to-tr from-accent to-primary opacity-20"
        />
      </div>
      {/* New Blob - Right Mid */}
      <div className="absolute -right-20 top-1/4 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative aspect-1155/678 w-144.5 rotate-45 bg-linear-to-tr from-accent to-primary opacity-20"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center gap-16">
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
