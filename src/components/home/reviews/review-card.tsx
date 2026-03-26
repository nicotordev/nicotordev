"use client";

import type { Review } from "@/app/data/reviews";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { CalendarDays, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { useMeasure } from "react-use";
import { useReviewDialog } from "./review-dialog-provider";

const ReviewCard = (review: Review) => {
  const { clientImage, title, rating, feedback, dates } = review;

  const t = useTranslations("reviewCard");
  const { openDialog } = useReviewDialog();
  const [startDate] = dates.split(" - ");

  return (
    <div
      className="w-80 sm:w-95 shrink-0 relative mx-3 sm:mx-4 my-2"
      style={{
        transition: "height 0.3s", // smooth adjustments if needed
      }}
    >
      <figure
        onClick={() => openDialog(review)}
        className={cn(
          "relative w-full h-full cursor-pointer rounded-xl border bg-card/80 backdrop-blur-sm",
          "p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.025]",
          "border-border hover:bg-accent/40",
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
            <Typography
              as="figcaption"
              role="label"
              className="text-sm font-semibold text-card-foreground truncate max-w-[200px]"
              title={title}
            >
              {title}
            </Typography>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-0.5">
              {rating ? (
                <>
                  <Typography
                    as="span"
                    role="caption"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {rating.toFixed(1)}
                  </Typography>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-3.5 h-3.5",
                          rating >= star
                            ? "fill-primary text-primary"
                            : "text-muted",
                        )}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <Typography
                  as="span"
                  role="caption"
                  className="text-xs font-medium text-muted-foreground"
                >
                  {t("noRating")}
                </Typography>
              )}
            </div>
          </div>
        </div>

        {/* Feedback */}
        <blockquote className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
          {feedback ? (
            <Typography role="body" className="line-clamp-4 pr-1">
              “{feedback}”
            </Typography>
          ) : (
            <Typography
              as="span"
              role="caption"
              className="italic text-muted-foreground/70"
            >
              {t("noFeedback")}
            </Typography>
          )}
        </blockquote>

        {/* Footer */}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <CalendarDays className="w-3 h-3 opacity-70" />
          <span>{startDate}</span>
        </div>
      </figure>
    </div>
  );
};

export default ReviewCard;
