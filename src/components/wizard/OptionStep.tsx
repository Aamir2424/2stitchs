"use client";

import { useId } from "react";
import { formatPriceDelta, type OptionStepConfig, type StepOption } from "@/src/config/steps.config";
import { DeckPhoto, StepNav, StepTitle, trackLabel } from "./StepChrome";

type Props = {
  config: OptionStepConfig;
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
 * One wizard decision: a title, an optional subtitle and a row of selectable photo tiles
 * (reference screens 13-18).
 * Tiles are native radio buttons, so arrow keys move between options and Space selects.
 */
export default function OptionStep({ config, selected, onSelect, onNext, onBack, canGoNext, canGoBack, focusTitle }: Props) {
  const titleId = useId();
  const groupName = useId();
  const { layout } = config;

  return (
    <section
      className="flex flex-col items-center px-4 pb-10"
      // A negative titleTop (screen 13) pulls the title box up under the promo strip's bottom edge.
      style={{ paddingTop: Math.max(layout.titleTop, 0), marginTop: Math.min(layout.titleTop, 0) }}
    >
      <StepTitle id={titleId} autoFocus={focusTitle}>
        {config.title}
      </StepTitle>
      {config.subtitle && (
        <p className={`${trackLabel} text-center text-option text-ink uppercase`} style={{ marginTop: layout.subtitleTop }}>
          {config.subtitle}
        </p>
      )}

      <div
        role="radiogroup"
        aria-labelledby={titleId}
        className="flex flex-wrap justify-center"
        style={{ marginTop: layout.tilesTop, columnGap: layout.gap, rowGap: 32 }}
      >
        {config.options.map((option, i) => (
          <OptionTile
            key={option.id}
            option={option}
            name={groupName}
            width={option.tileWidth ?? layout.tileWidth}
            height={layout.tileHeight}
            checked={selected === option.id}
            // Without a selection, the first tile is the one Tab lands on.
            tabbable={selected === undefined ? i === 0 : selected === option.id}
            captionClass={config.captionSize === "caption" ? "text-caption" : "text-option"}
            onSelect={onSelect}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} canGoBack={canGoBack} canGoNext={canGoNext} />
    </section>
  );
}

type TileProps = {
  option: StepOption;
  name: string;
  width: number;
  height: number;
  checked: boolean;
  tabbable: boolean;
  /** Type token for the caption (text-option or text-caption). */
  captionClass: string;
  onSelect: (optionId: string) => void;
};

function OptionTile({ option, name, width, height, checked, tabbable, captionClass, onSelect }: TileProps) {
  const price = formatPriceDelta(option.priceDelta);

  return (
    <label className="group flex cursor-pointer flex-col items-center" style={{ width, maxWidth: "100%" }}>
      <input
        type="radio"
        name={name}
        value={option.id}
        checked={checked}
        tabIndex={tabbable ? 0 : -1}
        onChange={() => onSelect(option.id)}
        className="peer sr-only"
      />
      <span
        className={
          "relative block w-full overflow-hidden transition-[outline-color] group-hover:brightness-[1.04] " +
          // Selected: 3px burgundy outline, 5px out (3px is the design's stroke weight, screen 25).
          "outline-3 outline-offset-[5px] outline-transparent peer-checked:outline-burgundy " +
          // Keyboard focus: a separate 2px ink ring outside the selection outline.
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-[11px]"
        }
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <DeckPhoto image={option.image} crop={option.crop} width={width} />
      </span>
      <span
        className={`${trackLabel} mt-[7px] text-center ${captionClass} uppercase ${checked ? "text-burgundy" : "text-ink"}`}
      >
        {option.label}
        {price && <span className="block">{price}</span>}
      </span>
    </label>
  );
}
