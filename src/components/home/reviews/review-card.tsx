import { Star, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Review {
  clientImage: string;
  title: string;
  rating: number | null;
  dates: string;
  feedback: string | null;
}

const ReviewCard = ({
  clientImage,
  title,
  rating,
  feedback,
  dates,
}: Review) => {
  const [startDate] = dates.split(" - ");

  return (
    <figure
      className={cn(
        "relative w-80 h-full cursor-pointer rounded-xl border bg-card/80 backdrop-blur-sm",
        "p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.025]",
        "border-border hover:bg-accent/40"
      )}
      style={{
        boxShadow: "0px 0px 5px var(--color-primary)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image
          className="rounded-full object-cover border border-border/60 shadow-sm"
          width="52"
          height="52"
          alt={title}
          src={clientImage}
        />

        <div className="flex flex-col overflow-x-clip">
          <figcaption
            className="text-sm font-semibold text-card-foreground truncate max-w-[200px]"
            title={title}
          >
            {title}
          </figcaption>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-0.5">
            {rating ? (
              <>
                <span className="text-xs font-medium text-muted-foreground">
                  {rating.toFixed(1)}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-3.5 h-3.5",
                        rating >= star
                          ? "fill-primary text-primary"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
              </>
            ) : (
              <span className="text-xs font-medium text-muted-foreground">
                No rating
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <blockquote className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
        {feedback ? (
          <p className="line-clamp-4 pr-1">“{feedback}”</p>
        ) : (
          <span className="italic text-muted-foreground/70">
            No written feedback provided.
          </span>
        )}
      </blockquote>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono">
        <CalendarDays className="w-3 h-3 opacity-70" />
        <span>{startDate}</span>
      </div>
    </figure>
  );
};

export default ReviewCard;
