"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import { wizardSteps, type OptionIdFor, type OptionStepId, type WizardStepId } from "@/src/config/steps.config";

/**
 * The customer's design choices. One optional field per option step, typed to that step's
 * option ids. Later prompts add fields (fabric, jacket style, pants, measurements...).
 */
export type WizardSelections = { [S in OptionStepId]?: OptionIdFor<S> };

type WizardState = { stepIndex: number; selections: WizardSelections };

type Action =
  | { type: "select"; step: OptionStepId; option: string }
  | { type: "clear"; step: OptionStepId }
  | { type: "clearAll" }
  | { type: "goTo"; index: number };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "select":
      return { ...state, selections: { ...state.selections, [action.step]: action.option } };
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
  clear: (step: OptionStepId) => void;
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
  const clear = useCallback((step: OptionStepId) => dispatch({ type: "clear", step }), []);
  const clearAll = useCallback(() => dispatch({ type: "clearAll" }), []);
  const goTo = useCallback((step: WizardStepId) => {
    dispatch({ type: "goTo", index: wizardSteps.indexOf(step) });
  }, []);

  const currentStep = wizardSteps[state.stepIndex];
  const canGoNext = state.selections[currentStep] !== undefined;

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
      clear,
      clearAll,
      next,
      back,
      goTo,
    }),
    [state, currentStep, canGoNext, select, clear, clearAll, next, back, goTo],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside <WizardProvider>.");
  return ctx;
}
