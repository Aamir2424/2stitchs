"use client";

import { useState } from "react";
import { optionSteps, type OptionIdFor, type OptionStepId } from "@/src/config/steps.config";
import FabricPicker from "./FabricPicker";
import OptionStep from "./OptionStep";
import { useWizard } from "./WizardContext";

/** Renders the current wizard step: the fabric picker or an option step from steps.config.ts. */
export default function Wizard() {
  const { currentStep, selections, select, selectFabricFamily, selectSwatch, next, back, canGoNext, isFirstStep, isLastStep } =
    useWizard();
  // Move focus to the new step's title only after the customer has navigated, not on page load.
  const [navigated, setNavigated] = useState(false);
  const nav = {
    onNext: () => {
      setNavigated(true);
      next();
    },
    onBack: () => {
      setNavigated(true);
      back();
    },
    // Lapel style is the last step built so far; later prompts add the steps after it.
    canGoNext: canGoNext && !isLastStep,
    canGoBack: !isFirstStep,
    focusTitle: navigated,
  };

  if (currentStep === "fabric") {
    return (
      <FabricPicker
        key={currentStep}
        selection={selections.fabric}
        onSelectFamily={selectFabricFamily}
        onSelectSwatch={selectSwatch}
        {...nav}
      />
    );
  }

  return (
    <OptionStep
      key={currentStep}
      config={optionSteps[currentStep]}
      selected={selections[currentStep]}
      onSelect={(id) => selectOption(select, currentStep, id)}
      {...nav}
    />
  );
}

/** Checks that a tile's option id belongs to the step before storing it. */
function selectOption<S extends OptionStepId>(
  select: (step: S, option: OptionIdFor<S>) => void,
  step: S,
  id: string,
) {
  const option = optionSteps[step].options.find((o) => o.id === id);
  if (option) select(step, option.id as OptionIdFor<S>);
}
