import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
  colorClass: string;
  activeBorderColor: string;
  activeShadowClass: string;
  showTutorial?: boolean;
  labels?: {
    stepLabel: string;
    status: {
      completed: string;
      pending: string;
      locked: string;
    };
  };
}

export function StepCard({
  stepNumber,
  title,
  description,
  isCompleted,
  isActive,
  onClick,
  colorClass,
  activeBorderColor,
  activeShadowClass,
  showTutorial = false,
  labels,
}: StepCardProps) {
  // Pulse if it's the active step and tutorial is showing
  const shouldPulse = showTutorial && isActive;

  // Allow clicking if it's the active step.
  // If it's already completed, we might not want to do anything, or maybe just play sound again?
  // The original logic was: if (!step) setStep(true). So only if not completed.
  const canInteract = isActive && !isCompleted;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!canInteract}
      whileHover={canInteract ? { scale: 1.03 } : {}}
      whileTap={canInteract ? { scale: 0.97 } : {}}
      animate={
        shouldPulse
          ? {
              scale: [1, 1.03, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : {}
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative w-full text-left rounded-2xl bg-card/60 backdrop-blur-sm border p-6 shadow-md transition-all z-10",
        // If completed or pulsing (active in tutorial), show active styles
        isCompleted || shouldPulse
          ? cn(activeBorderColor, activeShadowClass, "bg-card/80")
          : "border-border/50",
        // Hover effects for interactive state
        canInteract &&
          !shouldPulse &&
          "hover:shadow-lg hover:bg-card/70 cursor-pointer",
        // Disabled state for future steps
        !isActive && !isCompleted && "opacity-50 cursor-not-allowed"
      )}
      aria-label={`${labels?.stepLabel || "Step"} ${stepNumber}: ${title}. ${
        isCompleted
          ? labels?.status.completed || "Completed"
          : isActive
          ? labels?.status.pending || "Pending, click to complete"
          : labels?.status.locked || "Locked"
      }`}
      aria-pressed={isCompleted}
      aria-current={isActive ? "step" : undefined}
    >
      <Typography
        as="div"
        role="label"
        mood="handwritten"
        className={cn("text-lg flex items-center gap-2", colorClass)}
      >
        {labels?.stepLabel || "Step"} {stepNumber}{" "}
        {isCompleted && <CheckCircle className={cn("w-5 h-5", colorClass)} />}
      </Typography>
      <Typography role="body" className="mt-2 text-sm text-foreground/80">
        {description}
      </Typography>
    </motion.button>
  );
}
