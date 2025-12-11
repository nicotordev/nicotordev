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

export function ReviewDialogProvider({ children }: { children: ReactNode }) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (review: Review) => {
    setSelectedReview(review);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    // Delay clearing the selected review to allow animation to finish
    setTimeout(() => setSelectedReview(null), 300);
  };

  return (
    <ReviewDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md md:max-w-2xl overflow-hidden bg-card/95 backdrop-blur-xl border-white/10">
          {selectedReview && (
            <div className="flex flex-col gap-6">
              <DialogHeader>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/10 shadow-sm">
                    <Image
                      src={selectedReview.clientImage}
                      alt={selectedReview.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-center sm:text-left w-full sm:w-auto">
                    <DialogTitle className="text-xl font-bold leading-tight">
                      <Typography as="span" role="headline" className="text-xl">
                        {selectedReview.title}
                      </Typography>
                    </DialogTitle>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              (selectedReview.rating || 0) >= star
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>
                      <Typography
                        as="span"
                        role="label"
                        className="text-sm font-medium text-muted-foreground"
                      >
                        {selectedReview.rating
                          ? selectedReview.rating.toFixed(1)
                          : "No Rating"}
                      </Typography>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="relative">
                <DialogDescription className="text-base leading-relaxed text-foreground/90">
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

              <div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-sm text-muted-foreground">
                <div className="flex justify-between items-center">
                  <Typography as="span" role="label">
                    Project Dates:
                  </Typography>
                  <Typography
                    as="span"
                    role="body"
                    className="font-medium text-foreground"
                  >
                    {selectedReview.dates}
                  </Typography>
                </div>
                {selectedReview.amount > 0 && (
                  <div className="flex justify-between items-center">
                    <Typography as="span" role="label">
                      Budget:
                    </Typography>
                    <Typography
                      as="span"
                      role="body"
                      className="font-medium text-foreground"
                    >
                      ${selectedReview.amount.toLocaleString()}
                    </Typography>
                  </div>
                )}
                {selectedReview.paymentType && (
                  <div className="flex justify-between items-center">
                    <Typography as="span" role="label">
                      Payment Type:
                    </Typography>
                    <Typography
                      as="span"
                      role="body"
                      className="font-medium text-foreground"
                    >
                      {selectedReview.paymentType}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ReviewDialogContext.Provider>
  );
}
