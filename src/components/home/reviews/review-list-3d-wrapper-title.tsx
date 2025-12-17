"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

interface ReviewList3DWrapperTitleProps {
  badgeLabel: string;
  heading: string;
  subtitle: string;
  buttonText: string;
}

export default function ReviewList3DWrapperTitle({
  badgeLabel,
  heading,
  subtitle,
  buttonText,
}: ReviewList3DWrapperTitleProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;

  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsVisible((v) => !v);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (isVisible) {
      closeButtonRef.current?.focus();
    } else {
      openButtonRef.current?.focus();
    }
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <motion.div
          key="title-dialog"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute inset-0 z-40",
            "flex items-center justify-center",
            "px-4 pt-20 sm:pt-32",
            "backdrop-blur-sm bg-background/5", // Added blur effect
            "pointer-events-none" // Allow clicks to pass through empty areas
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full max-w-xl pointer-events-auto" // Re-enable clicks
          >
            <Card className="shadow-2xl border-white/10 bg-card/60 backdrop-blur-xl">
              <CardHeader className="space-y-4 pb-2">
                <div className="flex items-center text-center justify-between gap-4">
                  <div className="space-y-2">
                    <Badge
                      variant="outline"
                      className="w-fit bg-primary/10 text-primary border-primary/20 backdrop-blur-md"
                    >
                      {badgeLabel}
                    </Badge>

                    <CardTitle>
                      <Typography
                        id={titleId}
                        as="h2"
                        role="display"
                        className="font-bold tracking-tight text-3xl sm:text-5xl leading-tight gradient-text"
                      >
                        {heading}
                      </Typography>
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Typography
                  id={descId}
                  role="body"
                  className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed text-center"
                >
                  {subtitle}
                </Typography>
              </CardContent>

              <CardFooter className="pt-2 pb-6 flex items-center justify-center">
                <Button
                  type="button"
                  className="w-full sm:w-auto shadow-lg shadow-primary/20"
                  onClick={() => setIsVisible(false)}
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="floating-bubble"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute z-50 top-6 right-6 lg:top-10 lg:right-10"
        >
          <Button
            ref={openButtonRef}
            size="lg"
            className="rounded-full h-14 w-14 shadow-2xl bg-background/80 backdrop-blur-md border border-white/10 text-foreground hover:scale-110 transition-transform duration-200"
            onClick={() => setIsVisible(true)}
            aria-label="Show info"
          >
            <Eye className="h-6 w-6" aria-hidden="true" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
