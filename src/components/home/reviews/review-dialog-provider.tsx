"use client";

import type { Review } from "@/app/data/reviews";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { createContext, useContext, useState, type ReactNode } from "react";

interface ReviewDialogContextType {
  openDialog: (review: Review) => void;
  closeDialog: () => void;
}

const ReviewDialogContext = createContext<ReviewDialogContextType | undefined>(
  undefined
);

export function useReviewDialog() {
  const context = useContext(ReviewDialogContext);
  if (!context) {
    throw new Error(
      "useReviewDialog must be used within a ReviewDialogProvider"
    );
  }
  return context;
}

/** Material-style list row: leading label, trailing value */
function ListItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between min-h-12 px-4 -mx-4 rounded-xl active:bg-black/5",
        className
      )}
    >
      <Typography
        as="span"
        role="label"
        className="text-sm text-muted-foreground font-normal"
      >
        {label}
      </Typography>
      <Typography
        as="span"
        role="body"
        className="text-sm font-medium text-foreground text-right max-w-[60%]"
      >
        {value}
      </Typography>
    </div>
  );
}

export function ReviewDialogProvider({ children }: { children: ReactNode }) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (review: Review) => {
    setSelectedReview(review);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedReview(null), 300);
  };

  return (
    <ReviewDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn(
            "max-w-md md:max-w-2xl overflow-hidden p-0 gap-0",
            "rounded-4xl border border-white/20 dark:border-white/10",
            "bg-background/70 backdrop-blur-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]",
            "data-[state=open]:zoom-in-[0.95] data-[state=closed]:zoom-out-95 duration-500 sm:zoom-in-[0.97]"
          )}
        >
          {selectedReview && (
            <div className="flex flex-col relative w-full group">
              {/* Premium Glow Gradient Background */}
              <div className="absolute top-0 inset-x-0 h-48 bg-linear-to-b from-primary/15 via-primary/5 to-transparent pointer-events-none rounded-t-4xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
              
              <DialogHeader className="p-6 sm:p-8 sm:pb-5 text-left relative z-10 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 w-full">
                  
                  {/* Avatar wrapper with gradient ring */}
                  <div className="relative h-16 w-16 sm:h-24 sm:w-24 shrink-0 rounded-full bg-linear-to-br from-primary/60 via-primary/30 to-transparent p-0.75 shadow-xl">
                    <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-background bg-muted">
                      <Image
                        src={selectedReview.clientImage}
                        alt={selectedReview.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <DialogTitle className="text-xl sm:text-2xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-linear-to-br from-foreground to-foreground/60">
                      {selectedReview.title}
                    </DialogTitle>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 backdrop-blur-md">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "h-3.5 w-3.5 sm:h-4 sm:w-4 drop-shadow-sm transition-all duration-300",
                                (selectedReview.rating || 0) >= star
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted-foreground/30"
                              )}
                            />
                          ))}
                        </div>
                        <Typography
                          as="span"
                          className="text-[13px] sm:text-sm text-foreground/90 font-bold ml-1"
                        >
                          {selectedReview.rating
                            ? selectedReview.rating.toFixed(1)
                            : "N/A"}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="px-6 sm:px-8 pb-8 pt-2 relative z-10">
                <div className="relative">
                  {/* Decorative Quote mark */}
                  <div className="absolute -top-6 -left-3 sm:-top-8 sm:-left-4 text-[100px] leading-none font-serif text-primary/10 dark:text-primary/10 select-none pointer-events-none transform -rotate-6">
                    &ldquo;
                  </div>
                  <DialogDescription className="text-base sm:text-lg leading-relaxed text-foreground/80 font-medium relative z-10 mt-2">
                    {selectedReview.feedback || (
                      <span className="italic text-muted-foreground/70 font-normal">
                        No feedback provided.
                      </span>
                    )}
                  </DialogDescription>
                </div>
              </div>

              {/* Actionable / Stats Area styled as pills */}
              <div className="bg-muted/40 dark:bg-muted/20 border-t border-white/10 p-6 sm:p-8 rounded-b-4xl relative z-10 w-full">
                <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 w-full">
                  <div className="flex-1 flex flex-col gap-1 p-3.5 rounded-2xl bg-background/60 shadow-sm border border-border/40 backdrop-blur-md transition-all hover:bg-background/80 hover:-translate-y-0.5 hover:shadow-md">
                    <Typography className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Timeline</Typography>
                    <Typography className="text-sm font-semibold text-foreground/90">{selectedReview.dates}</Typography>
                  </div>
                  {selectedReview.amount > 0 && (
                    <div className="flex-1 flex flex-col gap-1 p-3.5 rounded-2xl bg-background/60 shadow-sm border border-border/40 backdrop-blur-md transition-all hover:bg-background/80 hover:-translate-y-0.5 hover:shadow-md">
                      <Typography className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Budget</Typography>
                      <Typography className="text-sm font-semibold text-foreground/90">${selectedReview.amount.toLocaleString()}</Typography>
                    </div>
                  )}
                  {selectedReview.paymentType && (
                    <div className="flex-1 flex flex-col gap-1 p-3.5 rounded-2xl bg-background/60 shadow-sm border border-border/40 backdrop-blur-md transition-all hover:bg-background/80 hover:-translate-y-0.5 hover:shadow-md">
                      <Typography className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Payment</Typography>
                      <Typography className="text-sm font-semibold whitespace-nowrap text-foreground/90">{selectedReview.paymentType}</Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ReviewDialogContext.Provider>
  );
}
