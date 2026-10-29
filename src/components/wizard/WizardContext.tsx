"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import { fabricFamilies, type FabricFamilyId, type SwatchIdFor } from "@/src/config/fabrics.config";
import { wizardSteps, type OptionIdFor, type OptionStepId, type WizardStepId } from "@/src/config/steps.config";

/** The chosen fabric: a family, then one of that family's swatches. */
export type FabricSelection = {
  [F in FabricFamilyId]: { family: F; swatch?: SwatchIdFor<F> };
}[FabricFamilyId];

/**
 * The customer's design choices. One optional field per option step, typed to that step's
 * option ids, plus the fabric. Later prompts add fields (jacket style, pants, measurements...).
 */
export type WizardSelections = { [S in OptionStepId]?: OptionIdFor<S> } & { fabric?: FabricSelection };

type WizardState = { stepIndex: number; selections: WizardSelections };

type Action =
  | { type: "select"; step: OptionStepId; option: string }
  | { type: "selectFabricFamily"; family: FabricFamilyId }
  | { type: "selectSwatch"; swatch: string }
  | { type: "clear"; step: OptionStepId | "fabric" }
  | { type: "clearAll" }
  | { type: "goTo"; index: number };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "select":
      return { ...state, selections: { ...state.selections, [action.step]: action.option } };
    case "selectFabricFamily": {
      // Re-selecting the same family keeps its swatch; a new family starts without one.
      if (state.selections.fabric?.family === action.family) return state;
      return { ...state, selections: { ...state.selections, fabric: { family: action.family } as FabricSelection } };
    }
    case "selectSwatch": {
      const current = state.selections.fabric;
      const family = fabricFamilies.find((f) => f.id === current?.family);
      if (!current || !family?.swatches.some((s) => s.id === action.swatch)) return state;
      const fabric = { family: current.family, swatch: action.swatch } as FabricSelection;
      return { ...state, selections: { ...state.selections, fabric } };
    }
    case "clear": {
      const selections = { ...state.selections };
      delete selections[action.step];
      return { ...state, selections };
    }
    case "clearAll":
      return { stepIndex: 0, selections: {} };
    case "goTo": {
      const index = Math.min(Math.max(action.index, 0), wizardSteps.length - 1);
      return index === state.stepIndex ? state : { ...state, stepIndex: index };
    }
  }
}

function isStepComplete(step: WizardStepId, selections: WizardSelections): boolean {
  if (step === "fabric") return selections.fabric?.swatch !== undefined;
  return selections[step] !== undefined;
}

export type WizardContextValue = {
  selections: WizardSelections;
  currentStep: WizardStepId;
  stepIndex: number;
  stepCount: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  /** True when the current step has a selection, so the customer may continue. */
  canGoNext: boolean;
  select: <S extends OptionStepId>(step: S, option: OptionIdFor<S>) => void;
  selectFabricFamily: (family: FabricFamilyId) => void;
  /** Selects a swatch of the currently selected family. Ignored if it isn't in that family. */
  selectSwatch: (swatch: string) => void;
  clear: (step: OptionStepId | "fabric") => void;
  clearAll: () => void;
  next: () => void;
  back: () => void;
  goTo: (step: WizardStepId) => void;
};

const WizardContext = createContext<WizardContextValue | null>(null);

/** Holds the wizard state in memory for the /design route. No persistence yet. */
export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { stepIndex: 0, selections: {} });

  const select = useCallback(<S extends OptionStepId>(step: S, option: OptionIdFor<S>) => {
    dispatch({ type: "select", step, option });
  }, []);
  const selectFabricFamily = useCallback((family: FabricFamilyId) => dispatch({ type: "selectFabricFamily", family }), []);
  const selectSwatch = useCallback((swatch: string) => dispatch({ type: "selectSwatch", swatch }), []);
  const clear = useCallback((step: OptionStepId | "fabric") => dispatch({ type: "clear", step }), []);
  const clearAll = useCallback(() => dispatch({ type: "clearAll" }), []);
  const goTo = useCallback((step: WizardStepId) => {
    dispatch({ type: "goTo", index: wizardSteps.indexOf(step) });
  }, []);

  const currentStep = wizardSteps[state.stepIndex];
  const canGoNext = isStepComplete(currentStep, state.selections);

  const next = useCallback(() => {
    if (canGoNext) dispatch({ type: "goTo", index: state.stepIndex + 1 });
  }, [canGoNext, state.stepIndex]);
  const back = useCallback(() => dispatch({ type: "goTo", index: state.stepIndex - 1 }), [state.stepIndex]);

  const value = useMemo<WizardContextValue>(
    () => ({
      selections: state.selections,
      currentStep,
      stepIndex: state.stepIndex,
      stepCount: wizardSteps.length,
      isFirstStep: state.stepIndex === 0,
      isLastStep: state.stepIndex === wizardSteps.length - 1,
      canGoNext,
      select,
      selectFabricFamily,
      selectSwatch,
      clear,
      clearAll,
      next,
      back,
      goTo,
    }),
    [state, currentStep, canGoNext, select, selectFabricFamily, selectSwatch, clear, clearAll, next, back, goTo],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside <WizardProvider>.");
  return ctx;
}
