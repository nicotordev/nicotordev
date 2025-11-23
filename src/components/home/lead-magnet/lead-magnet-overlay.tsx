import { motion } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

interface LeadMagnetOverlayProps {
  children: ReactNode;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

export function LeadMagnetOverlay({
  children,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
}: LeadMagnetOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Find all focusable elements
    const focusableElements = overlay.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element on mount
    if (firstElement) {
      firstElement.focus();
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      // Restore focus on unmount
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  return (
    <motion.div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      key="lead-magnet-gift-overlay"
      className="fixed inset-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-99999"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      exit={{
        opacity: 0,
        y: -12,
        scale: 0.98,
        transition: { duration: 0.3, ease: "easeIn" },
      }}
    >
      {/* Background gradient - toned down */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-primary/40 via-secondary/30 to-accent/40 animate-gradient-x opacity-30 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.3,
          transition: { duration: 0.6, delay: 0.2 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      />

      {/* CONTENT - enhanced glassmorphism */}
      <motion.div
        className="relative z-10 px-6 sm:px-10 py-10 sm:py-12 rounded-3xl border border-border/50 shadow-2xl bg-background/80 backdrop-blur-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.4,
            delay: 0.1,
            ease: "easeOut",
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          transition: {
            duration: 0.25,
            ease: "easeIn",
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
