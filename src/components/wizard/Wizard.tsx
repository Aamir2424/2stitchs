"use client";

import { useState } from "react";
import {
  choiceSteps,
  optionSteps,
  type SelectableStepId,
  type SelectionIdFor,
} from "@/src/config/steps.config";
import ChoiceStep from "./ChoiceStep";
import FabricPicker from "./FabricPicker";
import { findMeasurementStep } from "@/src/config/measurements.config";
import MeasurementStep from "./MeasurementStep";
import SummaryStep from "./SummaryStep";
import MonogramStep from "./MonogramStep";
import OptionStep from "./OptionStep";
import TailorNoteStep from "./TailorNoteStep";
import { useWizard } from "./WizardContext";

/**
 * Renders the current wizard step: the fabric picker (jacket or pants fabric), a YES/NO
 * question, the monogram or tailor-note step, or an option step from steps.config.ts.
 */
export default function Wizard() {
  const {
    currentStep, selections, select, selectFabricFamily, selectSwatch, setMonogramText, selectMonogramStyle, setTailorNote,
    saveMeasurements, next, back, canGoNext, isFirstStep, isLastStep,
  } = useWizard();
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
    // The summary is the last step; submitting the order comes later.
    canGoNext: canGoNext && !isLastStep,
    canGoBack: !isFirstStep,
    focusTitle: navigated,
  };

  if (currentStep === "fabric" || currentStep === "pantsFabric") {
    // The pants run the same picker; it writes only to selections.pantsFabric.
    const target = currentStep;
    return (
      <FabricPicker
        key={currentStep}
        selection={selections[target]}
        onSelectFamily={(family) => selectFabricFamily(target, family)}
        onSelectSwatch={(swatch) => selectSwatch(target, swatch)}
        {...nav}
      />
    );
  }

  if (currentStep === "monogram") {
    return (
      <MonogramStep
        key={currentStep}
        text={selections.monogramText ?? ""}
        style={selections.monogramStyle}
        onTextChange={setMonogramText}
        onSelectStyle={selectMonogramStyle}
        {...nav}
      />
    );
  }

  if (currentStep === "tailorNote") {
    return <TailorNoteStep key={currentStep} note={selections.tailorNote ?? ""} onNoteChange={setTailorNote} {...nav} />;
  }

  if (currentStep === "summary") {
    return <SummaryStep key={currentStep} onBack={nav.onBack} canGoBack={nav.canGoBack} focusTitle={nav.focusTitle} />;
  }

  const measurementStep = findMeasurementStep(currentStep);
  if (measurementStep) {
    return (
      <MeasurementStep
        key={currentStep}
        config={measurementStep}
        saved={selections.measurements ?? {}}
        onSave={saveMeasurements}
        {...nav}
      />
    );
  }

  if (currentStep in choiceSteps) {
    const step = currentStep as keyof typeof choiceSteps;
    return (
      <ChoiceStep
        key={step}
        config={choiceSteps[step]}
        selected={selections[step]}
        onSelect={(id) => selectOption(select, step, id)}
        {...nav}
      />
    );
  }

  const step = currentStep as keyof typeof optionSteps;
  return (
    <OptionStep
      key={step}
      config={optionSteps[step]}
      selected={selections[step]}
      onSelect={(id) => selectOption(select, step, id)}
      {...nav}
    />
  );
}

/** Checks that an option id belongs to the step before storing it. */
function selectOption<S extends SelectableStepId>(
  select: (step: S, option: SelectionIdFor<S>) => void,
  step: S,
  id: string,
) {
  const config = step in choiceSteps ? choiceSteps[step as keyof typeof choiceSteps] : optionSteps[step as keyof typeof optionSteps];
  const option = config.options.find((o) => o.id === id);
  if (option) select(step, option.id as SelectionIdFor<S>);
}
