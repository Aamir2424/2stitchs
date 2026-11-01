"use client";

import { useId } from "react";
import type { ChoiceStepConfig } from "@/src/config/steps.config";
import { StepNav, StepTitle, trackWide } from "./StepChrome";

type Props = {
  config: ChoiceStepConfig;
  selected: string | undefined;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  /** Move keyboard focus to the title when the step appears (not on first page load). */
  focusTitle?: boolean;
};

/**
 * A question answered with large pill buttons (screen 19, YES / NO). Like OptionStep, the
 * pills are native radio buttons: choosing one selects it, and NEXT continues.
 */
export default function ChoiceStep({ config, selected, onSelect, onNext, onBack, canGoNext, canGoBack, focusTitle }: Props) {
  const titleId = useId();
  const groupName = useId();
  const { layout } = config;

  return (
    <section className="flex flex-col items-center px-4 pb-10" style={{ paddingTop: layout.titleTop }}>
      <StepTitle id={titleId} autoFocus={focusTitle}>
        {config.title}
      </StepTitle>

      <div
        role="radiogroup"
        aria-labelledby={titleId}
        className="flex flex-wrap justify-center"
        style={{ marginTop: layout.pillsTop, gap: layout.gap }}
      >
        {config.options.map((option, i) => {
          const checked = selected === option.id;
          return (
            <label key={option.id} className="cursor-pointer" style={{ width: layout.pillWidth, maxWidth: "100%" }}>
              <input
                type="radio"
                name={groupName}
                value={option.id}
                checked={checked}
                // Without a selection, the first pill is the one Tab lands on.
                tabIndex={(selected === undefined ? i === 0 : checked) ? 0 : -1}
                onChange={() => onSelect(option.id)}
                className="peer sr-only"
              />
              <span
                className={
                  `${trackWide} flex w-full items-center justify-center rounded-full bg-burgundy text-button text-paper uppercase ` +
                  "transition-[opacity,outline-color] hover:opacity-90 " +
                  // Selected and focus states match the photo tiles (OptionStep).
                  "outline-3 outline-offset-[5px] outline-transparent peer-checked:outline-burgundy " +
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-[11px]"
                }
                style={{ height: layout.pillHeight }}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>

      <StepNav onBack={onBack} onNext={onNext} canGoBack={canGoBack} canGoNext={canGoNext} />
    </section>
  );
}
