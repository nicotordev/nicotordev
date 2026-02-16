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
            "max-w-md md:max-w-xl overflow-hidden p-0 gap-0",
            "rounded-2xl sm:rounded-[28px] border-0",
            "bg-card shadow-[0_24px_38px_3px_rgba(0,0,0,0.14),0_9px_46px_8px_rgba(0,0,0,0.12),0_11px_15px_-7px_rgba(0,0,0,0.2)]",
            "data-[state=open]:zoom-in-[0.98] data-[state=closed]:zoom-out-95"
          )}
        >
          {selectedReview && (
            <div className="flex flex-col">
              <DialogHeader className="p-6 pb-4 text-left gap-4">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted shadow-sm ring-1 ring-black/5">
                    <Image
                      src={selectedReview.clientImage}
                      alt={selectedReview.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <DialogTitle className="text-lg font-semibold leading-snug tracking-tight text-foreground">
                      <Typography as="span" role="headline" className="text-lg">
                        {selectedReview.title}
                      </Typography>
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4 transition-colors",
                              (selectedReview.rating || 0) >= star
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/25"
                            )}
                          />
                        ))}
                      </div>
                      <Typography
                        as="span"
                        role="label"
                        className="text-sm text-muted-foreground font-medium"
                      >
                        {selectedReview.rating
                          ? selectedReview.rating.toFixed(1)
                          : "No rating"}
                      </Typography>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="px-6 pb-4">
                <DialogDescription className="text-[15px] leading-relaxed text-foreground/85 font-normal">
                  {selectedReview.feedback || (
                    <Typography
                      as="span"
                      role="body"
                      className="italic text-muted-foreground"
                    >
                      No feedback provided.
                    </Typography>
                  )}
                </DialogDescription>
              </div>

              <div className="border-t border-border/80">
                <div className="px-2 py-1">
                  <ListItem
                    label="Project dates"
                    value={selectedReview.dates}
                    className="mt-0.5"
                  />
                  {selectedReview.amount > 0 && (
                    <ListItem
                      label="Budget"
                      value={`$${selectedReview.amount.toLocaleString()}`}
                    />
                  )}
                  {selectedReview.paymentType && (
                    <ListItem
                      label="Payment type"
                      value={selectedReview.paymentType}
                    />
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
