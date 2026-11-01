"use client";

import { useId } from "react";
import { formatPriceDelta, monogramStep, monogramStyles } from "@/src/config/steps.config";
import { monogramFontVariables } from "@/src/fonts/monogram";
import { DeckPhoto, StepNav, StepTitle, trackLabel, trackWide } from "./StepChrome";

type Props = {
  text: string;
  style: string | undefined;
  onTextChange: (text: string) => void;
  onSelectStyle: (styleId: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  /** Move keyboard focus to the title when the step appears (not on first page load). */
  focusTitle?: boolean;
};

/**
 * Screen 24: the jacket-lining photo, the monogram input and the four style choices.
 * The photo already shows a sample name ("AAMIR") on the lining; the customer's own text
 * appears only in the input beside it, never over the photo.
 */
export default function MonogramStep({ text, style, onTextChange, onSelectStyle, onNext, onBack, canGoNext, canGoBack, focusTitle }: Props) {
  const titleId = useId();
  const hintId = useId();
  const priceId = useId();
  const stylesLabelId = useId();
  const groupName = useId();
  const L = monogramStep.layout;

  return (
    // monogramFontVariables declares the font variables the "ABC" samples use (font-monogram-*).
    <section className={`${monogramFontVariables} flex flex-col items-center px-4 pb-10`}>
      <div
        className="flex flex-wrap items-start justify-center"
        // The deck's row starts 42.2px from the left and ends 81px from the right; padding the
        // right side by the difference puts the centred row at those positions.
        style={{ paddingRight: L.stylesRight - L.photoLeft, rowGap: 32 }}
      >
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ width: L.photoWidth, maxWidth: "100%", aspectRatio: `${L.photoWidth} / ${L.photoHeight}`, marginTop: L.photoTop, marginRight: L.photoGap }}
        >
          <DeckPhoto image={monogramStep.image} width={L.photoWidth} />
        </div>

        <div className="flex flex-col items-center" style={{ width: L.columnWidth, maxWidth: "100%", marginTop: L.titleTop }}>
          <StepTitle id={titleId} autoFocus={focusTitle}>
            {monogramStep.title}
          </StepTitle>
          <p id={hintId} className={`${trackLabel} text-center text-option text-ink`} style={{ marginTop: L.hintTop }}>
            {monogramStep.hint}
          </p>
          <input
            type="text"
            value={text}
            // The reducer keeps only capital letters A-Z, at most 10 (sanitizeMonogramText).
            onChange={(e) => onTextChange(e.target.value)}
            aria-labelledby={titleId}
            aria-describedby={`${hintId} ${priceId}`}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            className={
              `${trackWide} block w-full rounded-full bg-burgundy text-center text-input-display text-paper caret-paper ` +
              "outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
            }
            style={{ height: L.inputHeight, marginTop: L.inputTop }}
          />
          <p id={priceId} className={`${trackLabel} text-center text-option text-ink`} style={{ marginTop: L.priceTop }}>
            {formatPriceDelta(monogramStep.priceDelta)}
          </p>
        </div>

        <div className="shrink-0" style={{ marginTop: L.stylesTop, marginLeft: L.stylesGap }}>
          <span id={stylesLabelId} className="sr-only">
            MONOGRAM STYLE
          </span>
          <div role="radiogroup" aria-labelledby={stylesLabelId} className="flex flex-col" style={{ gap: L.rowGap }}>
            {monogramStyles.map((s, i) => {
              const checked = style === s.id;
              return (
                <label key={s.id} className="flex cursor-pointer items-center" style={{ gap: L.sampleGap }}>
                  <input
                    type="radio"
                    name={groupName}
                    value={s.id}
                    checked={checked}
                    // Without a selection, the first style is the one Tab lands on.
                    tabIndex={(style === undefined ? i === 0 : checked) ? 0 : -1}
                    onChange={() => onSelectStyle(s.id)}
                    aria-label={`${s.label} STYLE`}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className={
                      // As in the reference: a white rounded square with a 1.5px burgundy outline.
                      // The reference shows no selected state, so none is drawn.
                      // Inset shadow, not border: Chrome rounds a 1.5px border down to 1px.
                      "block shrink-0 rounded-checkbox bg-paper shadow-[inset_0_0_0_1.5px_var(--color-burgundy)] " +
                      "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink"
                    }
                    style={{ width: L.boxSize, height: L.boxSize }}
                  />
                  <span aria-hidden className={`${s.sampleClass} text-monogram-sample text-ink`}>
                    {monogramStep.sample}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <StepNav onBack={onBack} onNext={onNext} canGoBack={canGoBack} canGoNext={canGoNext} />
    </section>
  );
}
