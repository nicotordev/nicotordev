import { useState, useCallback } from "react";

export enum LeadMagnetStep {
  Initial = 0,
  Step1Completed = 1,
  Step2Completed = 2,
  Step3Completed = 3,
}

export function useLeadMagnetSteps() {
  const [currentStep, setCurrentStep] = useState<LeadMagnetStep>(
    LeadMagnetStep.Initial
  );

  const completeStep = useCallback((stepToComplete: number) => {
    setCurrentStep((prev) => {
      // Only allow completing the next step in sequence
      if (stepToComplete === prev + 1) {
        return stepToComplete;
      }
      return prev;
    });
  }, []);

  const isStepCompleted = (step: number) => currentStep >= step;
  const canInteractWithStep = (step: number) => currentStep === step - 1;

  return {
    currentStep,
    completeStep,
    isStepCompleted,
    canInteractWithStep,
    allDone: currentStep === LeadMagnetStep.Step3Completed,
  };
}
