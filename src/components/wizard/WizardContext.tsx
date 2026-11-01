"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import { fabricFamilies, type FabricFamilyId, type SwatchIdFor } from "@/src/config/fabrics.config";
import { effectivePantsFabric } from "@/src/lib/selections";
import {
  fieldsOf,
  findMeasurementStep,
  isMeasurementStep,
  measurementFields,
  parseMeasurement,
  type MeasurementFieldId,
  type MeasurementValues,
} from "@/src/config/measurements.config";
import {
  conditionalSteps,
  monogramStyles,
  sanitizeMonogramText,
  wizardSteps,
  type FabricStepId,
  type MonogramStyleId,
  type SelectableStepId,
  type SelectionIdFor,
  type WizardStepId,
} from "@/src/config/steps.config";

/** The chosen fabric: a family, then one of that family's swatches. */
export type FabricSelection = {
  [F in FabricFamilyId]: { family: F; swatch?: SwatchIdFor<F> };
}[FabricFamilyId];

/**
 * The customer's design choices. One optional field per option or YES/NO step, typed to that
 * step's option ids, plus the jacket fabric ("fabric") and a separate pants fabric
 * ("pantsFabric", set only when the customer answers YES on screen 19), the monogram, the
 * note to the tailor and the 15 measurements.
 */
export type WizardSelections = { [S in SelectableStepId]?: SelectionIdFor<S> } & {
  [F in FabricStepId]?: FabricSelection;
} & {
  /** Up to 10 capital letters A-Z (sanitizeMonogramText). Empty means no monogram. */
  monogramText?: string;
  monogramStyle?: MonogramStyleId;
  /** Free text for the tailor, stored as typed. */
  tailorNote?: string;
  /** Saved measurement values (positive numbers in each field's unit; measurements.config.ts). */
  measurements?: MeasurementValues;
};

/** Which fabric a fabric-picker action changes. */
export type FabricTarget = FabricStepId;

// The current step is stored by id, because the list of shown steps changes with the
// selections (waistcoat only for 3-Piece, pants fabric only after YES).
type WizardState = { step: WizardStepId; selections: WizardSelections };

type Action =
  | { type: "select"; step: SelectableStepId; option: string }
  | { type: "selectFabricFamily"; target: FabricTarget; family: FabricFamilyId }
  | { type: "selectSwatch"; target: FabricTarget; swatch: string }
  | { type: "clear"; step: SelectableStepId | FabricStepId }
  | { type: "setMonogramText"; text: string }
  | { type: "selectMonogramStyle"; style: string }
  | { type: "setTailorNote"; note: string }
  | { type: "saveMeasurements"; values: Partial<Record<MeasurementFieldId, string>> }
  | { type: "clearAll" }
  | { type: "goTo"; step: WizardStepId };

/** True when the step is shown for these selections (conditionalSteps in steps.config.ts). */
function isStepActive(step: WizardStepId, selections: WizardSelections): boolean {
  const rule = conditionalSteps[step];
  return !rule || selections[rule.step] === rule.option;
}

/** The steps the customer goes through, in order, for the current selections. */
function activeSteps(selections: WizardSelections): WizardStepId[] {
  return wizardSteps.filter((step) => isStepActive(step, selections));
}

// The pants-fabric rule lives in src/lib/selections.ts so the server can use it too.
export { effectivePantsFabric };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "select": {
      const selections: WizardSelections = { ...state.selections, [action.step]: action.option };
      // A choice that no longer applies (a waistcoat after leaving 3-Piece, a pants fabric
      // after changing YES to NO) is removed at once.
      for (const step of Object.keys(conditionalSteps) as (keyof WizardSelections)[]) {
        if (!isStepActive(step as WizardStepId, selections)) delete selections[step];
      }
      return { ...state, selections };
    }
    case "selectFabricFamily": {
      // Re-selecting the same family keeps its swatch; a new family starts without one.
      if (state.selections[action.target]?.family === action.family) return state;
      const fabric = { family: action.family } as FabricSelection;
      return { ...state, selections: { ...state.selections, [action.target]: fabric } };
    }
    case "selectSwatch": {
      const current = state.selections[action.target];
      const family = fabricFamilies.find((f) => f.id === current?.family);
      if (!current || !family?.swatches.some((s) => s.id === action.swatch)) return state;
      const fabric = { family: current.family, swatch: action.swatch } as FabricSelection;
      return { ...state, selections: { ...state.selections, [action.target]: fabric } };
    }
    case "clear": {
      const selections = { ...state.selections };
      delete selections[action.step];
      return { ...state, selections };
    }
    case "setMonogramText": {
      // The 10-letter rule is enforced here too, whatever the input field sends.
      const monogramText = sanitizeMonogramText(action.text);
      if (monogramText === state.selections.monogramText) return state;
      return { ...state, selections: { ...state.selections, monogramText } };
    }
    case "selectMonogramStyle": {
      const style = monogramStyles.find((s) => s.id === action.style);
      if (!style) return state;
      return { ...state, selections: { ...state.selections, monogramStyle: style.id } };
    }
    case "setTailorNote":
      return { ...state, selections: { ...state.selections, tailorNote: action.note } };
    case "saveMeasurements": {
      // All or nothing: if any value isn't a valid positive number, nothing is saved.
      const parsed: MeasurementValues = {};
      for (const [field, text] of Object.entries(action.values) as [MeasurementFieldId, string][]) {
        if (!(field in measurementFields)) return state;
        const value = parseMeasurement(field, text);
        if (value === null) return state;
        parsed[field] = value;
      }
      const measurements = { ...state.selections.measurements, ...parsed };
      return { ...state, selections: { ...state.selections, measurements } };
    }
    case "clearAll":
      return { step: wizardSteps[0], selections: {} };
    case "goTo":
      if (action.step === state.step || !isStepActive(action.step, state.selections)) return state;
      return { ...state, step: action.step };
  }
}

function isStepComplete(step: WizardStepId, selections: WizardSelections): boolean {
  if (step === "fabric" || step === "pantsFabric") return selections[step]?.swatch !== undefined;
  // The monogram is optional; once letters are typed, a style must be chosen.
  if (step === "monogram") return !selections.monogramText || selections.monogramStyle !== undefined;
  // The note is optional; the summary has nothing to choose.
  if (step === "tailorNote" || step === "summary") return true;
  // A measurement screen is complete when every value on it is saved.
  if (isMeasurementStep(step)) {
    const config = findMeasurementStep(step);
    return !!config && fieldsOf(config).every((f) => selections.measurements?.[f] !== undefined);
  }
  return selections[step] !== undefined;
}

export type WizardContextValue = {
  selections: WizardSelections;
  /** See effectivePantsFabric(). */
  pantsFabric: FabricSelection | undefined;
  currentStep: WizardStepId;
  /** Position of the current step among the steps shown for the current selections. */
  stepIndex: number;
  stepCount: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  /** True when the current step has a selection, so the customer may continue. */
  canGoNext: boolean;
  select: <S extends SelectableStepId>(step: S, option: SelectionIdFor<S>) => void;
  /** Changes the jacket fabric ("fabric") or the separate pants fabric ("pantsFabric"). */
  selectFabricFamily: (target: FabricTarget, family: FabricFamilyId) => void;
  /** Selects a swatch of the target's selected family. Ignored if it isn't in that family. */
  selectSwatch: (target: FabricTarget, swatch: string) => void;
  clear: (step: SelectableStepId | FabricStepId) => void;
  /** Stores the monogram text, reduced to at most 10 capital letters A-Z. */
  setMonogramText: (text: string) => void;
  /** Ignored for an id that isn't one of the four styles. */
  selectMonogramStyle: (style: string) => void;
  setTailorNote: (note: string) => void;
  /** Saves the typed values of one screen. Nothing is saved if any of them is invalid. */
  saveMeasurements: (values: Partial<Record<MeasurementFieldId, string>>) => void;
  clearAll: () => void;
  next: () => void;
  back: () => void;
  /** Ignored for a step that isn't shown for the current selections. */
  goTo: (step: WizardStepId) => void;
};

const WizardContext = createContext<WizardContextValue | null>(null);

/** Holds the wizard state in memory for the /design route. No persistence yet. */
export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { step: wizardSteps[0], selections: {} });

  const select = useCallback(<S extends SelectableStepId>(step: S, option: SelectionIdFor<S>) => {
    dispatch({ type: "select", step, option });
  }, []);
  const selectFabricFamily = useCallback(
    (target: FabricTarget, family: FabricFamilyId) => dispatch({ type: "selectFabricFamily", target, family }),
    [],
  );
  const selectSwatch = useCallback(
    (target: FabricTarget, swatch: string) => dispatch({ type: "selectSwatch", target, swatch }),
    [],
  );
  const clear = useCallback((step: SelectableStepId | FabricStepId) => dispatch({ type: "clear", step }), []);
  const setMonogramText = useCallback((text: string) => dispatch({ type: "setMonogramText", text }), []);
  const selectMonogramStyle = useCallback((style: string) => dispatch({ type: "selectMonogramStyle", style }), []);
  const setTailorNote = useCallback((note: string) => dispatch({ type: "setTailorNote", note }), []);
  const saveMeasurements = useCallback(
    (values: Partial<Record<MeasurementFieldId, string>>) => dispatch({ type: "saveMeasurements", values }),
    [],
  );
  const clearAll = useCallback(() => dispatch({ type: "clearAll" }), []);
  const goTo = useCallback((step: WizardStepId) => dispatch({ type: "goTo", step }), []);

  const steps = useMemo(() => activeSteps(state.selections), [state.selections]);
  const currentStep = state.step;
  const stepIndex = steps.indexOf(currentStep);
  const canGoNext = isStepComplete(currentStep, state.selections);
  const nextStep = steps[stepIndex + 1];
  const previousStep = steps[stepIndex - 1];

  const next = useCallback(() => {
    if (canGoNext && nextStep) dispatch({ type: "goTo", step: nextStep });
  }, [canGoNext, nextStep]);
  const back = useCallback(() => {
    if (previousStep) dispatch({ type: "goTo", step: previousStep });
  }, [previousStep]);

  const value = useMemo<WizardContextValue>(
    () => ({
      selections: state.selections,
      pantsFabric: effectivePantsFabric(state.selections),
      currentStep,
      stepIndex,
      stepCount: steps.length,
      isFirstStep: stepIndex === 0,
      isLastStep: stepIndex === steps.length - 1,
      canGoNext,
      select,
      selectFabricFamily,
      selectSwatch,
      clear,
      setMonogramText,
      selectMonogramStyle,
      setTailorNote,
      saveMeasurements,
      clearAll,
      next,
      back,
      goTo,
    }),
    [
      state.selections, currentStep, stepIndex, steps, canGoNext, select, selectFabricFamily, selectSwatch, clear,
      setMonogramText, selectMonogramStyle, setTailorNote, saveMeasurements, clearAll, next, back, goTo,
    ],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside <WizardProvider>.");
  return ctx;
}
