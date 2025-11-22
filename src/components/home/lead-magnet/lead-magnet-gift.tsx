/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadMagnetSound } from "./use-lead-magnet-sound";
import { useConfetti } from "./use-confetti";
import { useLeadMagnetSteps, LeadMagnetStep } from "./use-lead-magnet-steps";
import { StepCard } from "./step-card";
import { LeadMagnetOverlay } from "./lead-magnet-overlay";

export interface LeadMagnetGiftProps {
  show: boolean;
  setOptionSelected: (option: "GIFT" | "FORM" | null) => void;
}

export default function LeadMagnetGift({
  show,
  setOptionSelected,
}: LeadMagnetGiftProps) {
  const [isGiftVisible, setIsGiftVisible] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const { playSound } = useLeadMagnetSound();
  const { fireConfetti } = useConfetti();
  const {
    currentStep,
    completeStep,
    isStepCompleted,
    canInteractWithStep,
    allDone,
  } = useLeadMagnetSteps();

  // Control visibility based on show prop with smooth timing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (show) {
      // Smooth delay for gift appearance
      timer = setTimeout(() => {
        setIsGiftVisible(true);
        // Show tutorial if starting from scratch
        if (currentStep === LeadMagnetStep.Initial) {
          setShowTutorial(true);
        }
      }, 800);
    } else {
      setIsGiftVisible(false);
      setShowTutorial(false);
    }
    return () => clearTimeout(timer);
  }, [show, currentStep]);

  // Play success sound and fire confetti when all steps are completed
  useEffect(() => {
    if (allDone) {
      playSound("success");
      fireConfetti();
    }
  }, [allDone, playSound, fireConfetti]);

  const handleStepClick = (
    stepNumber: number,
    soundName: "intro1" | "intro2" | "notification"
  ) => {
    if (showTutorial) setShowTutorial(false);
    completeStep(stepNumber);
    playSound(soundName);
  };

  return (
    <AnimatePresence mode="wait">
      {isGiftVisible && (
        <LeadMagnetOverlay
          aria-labelledby="gift-title"
          aria-describedby="gift-subtitle"
        >
          {/* Tutorial Overlay - Only one instance */}
          <AnimatePresence>
            {showTutorial && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 w-full h-full bg-foreground/40 z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* TITLE */}
          <h2
            id="gift-title"
            className={cn(
              "text-center text-4xl sm:text-5xl font-black gradient-text leading-tight relative z-30",
              showTutorial ? "text-primary/90 text-shadow-glow" : "text-primary"
            )}
          >
            Antes de contactarme… desbloquea tu regalo exclusivo{" "}
            <picture>
              <source srcSet="/animated/gift.webp" type="image/webp" />
              <img
                src="/animated/gift.gif"
                alt=""
                aria-hidden="true"
                role="presentation"
                width="64"
                height="64"
                className="inline-block align-middle"
              />
            </picture>
          </h2>

          {/* SUBTITLE */}
          <p
            id="gift-subtitle"
            className={cn(
              "mt-4 text-lg sm:text-xl text-center max-w-3xl mx-auto relative z-30",
              showTutorial
                ? "text-background text-shadow-glow-light"
                : "text-foreground/70"
            )}
          >
            Completa cada paso para liberar tu regalo y desbloquear el
            formulario. No te preocupes: todo es 100% diversión.
          </p>

          {/* GRID WITH CONNECTED STEPS */}
          <div className="mt-12 relative grid sm:grid-cols-3 gap-8 z-30">
            {/* Lines */}
            <div className="overflow-x-clip absolute top-1/2 left-0 w-full -z-10">
              {/* Line 1 -> 2 */}
              {isStepCompleted(LeadMagnetStep.Step1Completed) && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="hidden sm:block absolute top-1/2 left-[16%] h-[2px] bg-gradient-to-r from-primary/40 to-secondary/30"
                />
              )}
              {/* Line 2 -> 3 */}
              {isStepCompleted(LeadMagnetStep.Step2Completed) && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="hidden sm:block absolute top-1/2 left-[50%] h-[2px] bg-gradient-to-r from-secondary/30 to-accent/40"
                />
              )}
            </div>

            {/* Step 1 */}
            <StepCard
              stepNumber={1}
              title="Paso 1"
              description="Imagina el sonido triunfal de tu proyecto logrando exactamente lo que sueñas."
              isCompleted={isStepCompleted(LeadMagnetStep.Step1Completed)}
              isActive={canInteractWithStep(1)}
              onClick={() => handleStepClick(1, "intro1")}
              colorClass="text-primary"
              activeBorderColor="border-secondary/60"
              activeShadowClass="shadow-[0_0_20px_rgba(160,51,255,0.15)]"
              showTutorial={showTutorial}
            />

            {/* Step 2 */}
            <StepCard
              stepNumber={2}
              title="Paso 2"
              description="Visualiza tu idea funcionando a la perfección. Sí, así de limpio."
              isCompleted={isStepCompleted(LeadMagnetStep.Step2Completed)}
              isActive={canInteractWithStep(2)}
              onClick={() => handleStepClick(2, "intro2")}
              colorClass="text-secondary"
              activeBorderColor="border-secondary/60"
              activeShadowClass="shadow-[0_0_20px_rgba(160,51,255,0.15)]"
            />

            {/* Step 3 */}
            <StepCard
              stepNumber={3}
              title="Paso 3"
              description="Toca para desbloquear el regalo y el formulario. (Promesa: cero explosiones.)"
              isCompleted={isStepCompleted(LeadMagnetStep.Step3Completed)}
              isActive={canInteractWithStep(3)}
              onClick={() => handleStepClick(3, "notification")}
              colorClass="text-accent"
              activeBorderColor="border-accent/60"
              activeShadowClass="shadow-[0_0_20px_rgba(234,88,165,0.15)]"
            />
          </div>

          {/* BUTTONS — only unlocked after all steps */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm z-30 relative">
            <Button
              variant="default"
              disabled={!allDone}
              aria-disabled={!allDone}
              onClick={() => {
                setIsGiftVisible(false);
                setOptionSelected("FORM");
              }}
              className={!allDone ? "opacity-40 cursor-not-allowed" : ""}
              aria-label="Desbloquear formulario de contacto"
            >
              <MousePointerClick
                className="w-4 h-4 animate-pulse"
                aria-hidden="true"
              />
              Desbloquear formulario
            </Button>

            <Button
              variant="secondary"
              disabled={!allDone}
              aria-disabled={!allDone}
              onClick={() => {
                setIsGiftVisible(false);
                setOptionSelected("GIFT");
              }}
              className={!allDone ? "opacity-40 cursor-not-allowed" : ""}
              aria-label="Reclamar mi regalo exclusivo"
            >
              Reclamar mi regalo{" "}
              <picture>
                <source srcSet="/animated/gift-heart.webp" type="image/webp" />
                <img
                  src="/animated/gift-heart.webp"
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                  width="32"
                  height="32"
                  className="inline-block"
                />
              </picture>
            </Button>
          </div>

          {/* Live Region for Screen Readers */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {allDone
              ? "¡Felicidades! Has completado todos los pasos. Ahora puedes desbloquear el formulario o reclamar tu regalo."
              : `Progreso: ${
                  [
                    isStepCompleted(LeadMagnetStep.Step1Completed),
                    isStepCompleted(LeadMagnetStep.Step2Completed),
                    isStepCompleted(LeadMagnetStep.Step3Completed),
                  ].filter(Boolean).length
                } de 3 pasos completados.`}
          </div>

          {/* STATUS */}
          <div className="mt-6 text-center text-xs text-muted-foreground font-mono z-30 relative">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 backdrop-blur-sm border border-border/30">
              <span className="h-2 w-2 rounded-full bg-primary/80 animate-pulse" />
              protocolo creativo: activado
            </span>
          </div>
        </LeadMagnetOverlay>
      )}
    </AnimatePresence>
  );
}
