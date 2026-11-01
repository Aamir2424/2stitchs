"use client";

import { useId } from "react";
import { MeasurementsBlock, MonogramBlock, SummaryGrid, summaryGridWidth, TextBlock } from "@/src/components/summary/SummaryGrid";
import { summaryCopy, summaryLayout as L, vatNote } from "@/src/config/summary.config";
import { monogramFontVariables } from "@/src/fonts/monogram";
import { StepNav, StepTitle, trackLabel, trackWide } from "./StepChrome";
import { useWizard } from "./WizardContext";

type Props = {
  onBack: () => void;
  canGoBack: boolean;
  /** Move keyboard focus to the title when the step appears (not on first page load). */
  focusTitle?: boolean;
};

/**
 * Screen 26: every choice the customer made, read from WizardContext. Steps that weren't shown
 * (the waistcoat unless 3-Piece, the pants fabric picker after NO) have no tile.
 * The total is a placeholder until calculatePrice() exists.
 */
export default function SummaryStep({ onBack, canGoBack, focusTitle }: Props) {
  const titleId = useId();
  const { selections, pantsFabric } = useWizard();
  const note = selections.tailorNote?.trim();

  return (
    // No side padding: the price block's right edge is measured from the page edge (81px).
    <section className={`${monogramFontVariables} flex flex-col items-center pb-10`}>
      <div style={{ marginTop: L.titleTop }}>
        <StepTitle id={titleId} autoFocus={focusTitle}>
          {summaryCopy.title}
        </StepTitle>
      </div>

      <div className="relative w-full max-w-[1440px]" style={{ minHeight: priceBottom() - L.titleTop - L.titleBoxHeight }}>
        <SummaryGrid
          selections={selections}
          pantsFabric={pantsFabric}
          variant="summary"
          marginTop={L.gridTop - (L.titleTop + L.titleBoxHeight)}
        />
        <PriceBlock />
      </div>

      <div className="mx-auto flex flex-col" style={{ width: summaryGridWidth, maxWidth: "100%", marginTop: L.detailsTop, gap: 32 }}>
        <MonogramBlock selections={selections} />
        {note && (
          <TextBlock caption={summaryCopy.tailorNote}>
            <p className="whitespace-pre-line text-button text-burgundy uppercase">{note}</p>
          </TextBlock>
        )}
        <MeasurementsBlock selections={selections} />
      </div>

      <StepNav onBack={onBack} onNext={() => {}} canGoBack={canGoBack} canGoNext={false} showNext={false} />
    </section>
  );
}

/** Bottom of the price block, from the top of the content area. */
function priceBottom() {
  return L.price.top + 13.16 + L.price.pillTop + 42 + L.price.noteTop + 10.36;
}

/** TOTAL PRICE pill, EXC. VAT and the VAT note (screen 26). Right edge on the 81px gutter. */
function PriceBlock() {
  const P = L.price;
  return (
    <div
      className="absolute right-gutter flex w-cta flex-col items-center"
      style={{ top: P.top - L.titleTop - L.titleBoxHeight }}
    >
      <p className={`${trackLabel} text-center text-caption text-ink`}>{summaryCopy.totalPrice}</p>
      <div
        className="relative flex h-control w-cta items-center justify-center rounded-control bg-burgundy text-paper"
        style={{ marginTop: P.pillTop }}
      >
        {/* PLACEHOLDER: no total until calculatePrice() exists. */}
        <span className={`${trackWide} text-button`} aria-hidden>
          {summaryCopy.pricePlaceholder}
        </span>
        <span className="sr-only">{summaryCopy.pricePlaceholderLabel}</span>
        <span
          className={`${trackLabel} absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-fine whitespace-nowrap`}
          style={{ left: `calc(100% - ${P.excVatRight}px)` }}
        >
          {summaryCopy.excVat}
        </span>
      </div>
      <p className={`${trackLabel} text-center text-fine whitespace-nowrap text-ink`} style={{ marginTop: P.noteTop }}>
        {vatNote}
      </p>
    </div>
  );
}
