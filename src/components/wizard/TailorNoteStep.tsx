"use client";

import { useId } from "react";
import { tailorNoteStep } from "@/src/config/steps.config";
import { pillStates, StepNav, StepTitle, trackWide } from "./StepChrome";

type Props = {
  note: string;
  onNoteChange: (note: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  /** Move keyboard focus to the title when the step appears (not on first page load). */
  focusTitle?: boolean;
};

/** Screen 25: a free-text note to the tailor and the SUBMIT pill, which continues the wizard. */
export default function TailorNoteStep({ note, onNoteChange, onNext, onBack, canGoNext, canGoBack, focusTitle }: Props) {
  const titleId = useId();
  const L = tailorNoteStep.layout;

  return (
    <section className="flex flex-col items-center px-4 pb-10" style={{ paddingTop: L.titleTop }}>
      <StepTitle id={titleId} autoFocus={focusTitle}>
        {tailorNoteStep.title}
      </StepTitle>

      <textarea
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        aria-labelledby={titleId}
        className={
          // The design shows the note in capitals; the text is stored as typed.
          "block resize-none rounded-field border-3 border-burgundy bg-transparent " +
          "text-button text-burgundy uppercase outline-none " +
          "focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
        }
        style={{
          marginTop: L.noteTop,
          width: L.noteWidth,
          maxWidth: "100%",
          height: L.noteHeight,
          paddingTop: L.padding.top,
          paddingRight: L.padding.right,
          paddingBottom: L.padding.bottom,
          paddingLeft: L.padding.left,
        }}
      />

      {/* SUBMIT sits 69px left of centre, as in the design; BACK (not in the design) is
          shaped like SUBMIT and lined up under it. */}
      <div className="relative flex flex-col items-center" style={{ left: L.submitOffsetX }}>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className={`${trackWide} h-control-lg w-cta rounded-control-lg bg-burgundy text-button-lg text-paper ${pillStates}`}
          style={{ marginTop: L.submitTop }}
        >
          {tailorNoteStep.submitLabel}
        </button>

        <StepNav onBack={onBack} onNext={onNext} canGoBack={canGoBack} canGoNext={canGoNext} showNext={false} size="large" />
      </div>
    </section>
  );
}
