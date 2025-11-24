/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadMagnetSound } from "./use-lead-magnet-sound";
import { useConfetti } from "./use-confetti";
import { useLeadMagnetSteps, LeadMagnetStep } from "./use-lead-magnet-steps";
import { StepCard } from "./step-card";
import { LeadMagnetOverlay } from "./lead-magnet-overlay";
import Image from "next/image";
import { useUIStore } from "@/stores/ui-store";
import type messages from "@/locales/es-cl.json";
import { useMessages } from "next-intl";

export interface LeadMagnetGiftProps {
  show: boolean;
  setOptionSelected: (option: "GIFT" | "FORM" | null) => void;
  translations?: (typeof messages)["leadMagnet"]["gift"]["experience"];
}

export default function LeadMagnetGift({
  show: showParam,
  setOptionSelected,
  translations,
}: LeadMagnetGiftProps) {
  const messages = useMessages();
  const { claimedGift, setClaimedGift } = useUIStore();
  const [isGiftVisible, setIsGiftVisible] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const show = useMemo(
    () => showParam && !claimedGift,
    [showParam, claimedGift]
  );

  const { playSound } = useLeadMagnetSound();
  const { fireConfetti } = useConfetti();
  const {
    currentStep,
    completeStep,
    isStepCompleted,
    canInteractWithStep,
    allDone,
  } = useLeadMagnetSteps();
  const labels = translations?.actions;
  const media = (messages as any)?.common?.a11y?.media ?? {};
  const giftAlt = media.giftAlt || "Gift box";
  const sadAlt = media.sadAlt || "Crying face emoji";
  const giftHeartAlt = media.giftHeartAlt || "Gift with heart";

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
              "text-center text-4xl sm:text-5xl font-black leading-tight relative z-30",
              showTutorial
                ? "text-background/90 text-shadow-glow"
                : "text-primary text-shadow-glow "
            )}
          >
            {translations?.title ||
              "Before seeing this section, unlock your exclusive gift"}{" "}
            <picture>
              <source srcSet="/animated/gift.webp" type="image/webp" />
              <Image
                src="/animated/gift.gif"
                alt={giftAlt}
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
            {translations?.subtitle ||
              "Complete each step to release your gift and unlock the form. Don't worry: it's 100% fun."}
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
              title={translations?.steps?.[0]?.title || "Step 1"}
              description={
                translations?.steps?.[0]?.description ||
                "Imagine the triumphant sound of your project doing exactly what you dream."
              }
              isCompleted={isStepCompleted(LeadMagnetStep.Step1Completed)}
              isActive={canInteractWithStep(1)}
              onClick={() => handleStepClick(1, "intro1")}
              colorClass="text-primary"
              activeBorderColor="border-secondary/60"
              activeShadowClass="shadow-[0_0_20px_rgba(160,51,255,0.15)]"
              showTutorial={showTutorial}
              {...(labels ? { labels } : {})}
            />

            {/* Step 2 */}
            <StepCard
              stepNumber={2}
              title={translations?.steps?.[1]?.title || "Step 2"}
              description={
                translations?.steps?.[1]?.description ||
                "Visualize your idea running perfectly. Yes, that clean."
              }
              isCompleted={isStepCompleted(LeadMagnetStep.Step2Completed)}
              isActive={canInteractWithStep(2)}
              onClick={() => handleStepClick(2, "intro2")}
              colorClass="text-secondary"
              activeBorderColor="border-secondary/60"
              activeShadowClass="shadow-[0_0_20px_rgba(160,51,255,0.15)]"
              {...(labels ? { labels } : {})}
            />

            {/* Step 3 */}
            <StepCard
              stepNumber={3}
              title={translations?.steps?.[2]?.title || "Step 3"}
              description={
                translations?.steps?.[2]?.description ||
                "Tap to unlock the gift and the form. Promise: zero explosions."
              }
              isCompleted={isStepCompleted(LeadMagnetStep.Step3Completed)}
              isActive={canInteractWithStep(3)}
              onClick={() => handleStepClick(3, "notification")}
              colorClass="text-accent"
              activeBorderColor="border-accent/60"
              activeShadowClass="shadow-[0_0_20px_rgba(234,88,165,0.15)]"
              {...(labels ? { labels } : {})}
            />
          </div>

          {/* BUTTONS — only unlocked after all steps */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm z-30 relative">
            <Button
              variant="destructive"
              onClick={() => {
                setIsGiftVisible(false);
                setClaimedGift();
              }}
            >
              {translations?.actions?.close || "Close forever"}{" "}
              <picture>
                <source
                  srcSet="/animated/emoji-crying.webp"
                  type="image/webp"
                />
                <Image
                  src="/animated/emoji-crying.webp"
                  alt={sadAlt}
                  width="32"
                  height="32"
                  className="inline-block"
                />
              </picture>
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
              aria-label={
                translations?.actions?.claimAria || "Claim my exclusive gift"
              }
            >
              {translations?.actions?.claim || "Claim my gift"}{" "}
              <picture>
                <source srcSet="/animated/gift-heart.webp" type="image/webp" />
                <Image
                  src="/animated/gift-heart.webp"
                  alt={giftHeartAlt}
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
              ? translations?.actions?.complete ||
                "Congrats! You've completed all the steps. Now you can unlock the form or claim your gift."
              : (translations?.actions?.progress ||
                  "Progress: {completed} of 3 steps completed.")
                  .replace(
                    "{completed}",
                    [
                      isStepCompleted(LeadMagnetStep.Step1Completed),
                      isStepCompleted(LeadMagnetStep.Step2Completed),
                      isStepCompleted(LeadMagnetStep.Step3Completed),
                    ].filter(Boolean).length.toString()
                  )}
          </div>
        </LeadMagnetOverlay>
      )}
    </AnimatePresence>
  );
}
