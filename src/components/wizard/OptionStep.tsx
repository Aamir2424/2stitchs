"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { getAsset } from "@/src/config/assets";
import { formatPriceDelta, type OptionStepConfig, type StepOption } from "@/src/config/steps.config";

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

// Wide-tracked text carries its letter-spacing after the last glyph; this left padding
// re-centres it, as in the design (DESIGN.md, type scale).
const trackWide = "pl-[0.463em]";
const trackLabel = "pl-[0.194em]";

/**
 * One wizard decision: a title and a row of selectable photo tiles (reference screens 14-16).
 * Tiles are native radio buttons, so arrow keys move between options and Space selects.
 */
export default function OptionStep({ config, selected, onSelect, onNext, onBack, canGoNext, canGoBack, focusTitle }: Props) {
  const titleId = useId();
  const groupName = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { layout } = config;

  useEffect(() => {
    if (focusTitle) titleRef.current?.focus();
  }, [config, focusTitle]);

  return (
    <section className="flex flex-col items-center px-4 pb-10" style={{ paddingTop: layout.titleTop }}>
      <h1
        id={titleId}
        ref={titleRef}
        tabIndex={-1}
        // translate-y: the deck sets title text 10.5px lower inside its 47px text box
        // (measured on screens 14-16); translating keeps the tiles where they are.
        className={`${trackWide} translate-y-[10.5px] text-center text-heading text-maroon uppercase outline-none`}
      >
        {config.title}
      </h1>

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
            onSelect={onSelect}
          />
        ))}
      </div>

      <nav aria-label="Wizard steps" className="mt-8 flex flex-wrap justify-center gap-6">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          className={`${trackWide} ${pillBase} border-[1.5px] border-burgundy bg-paper text-burgundy`}
        >
          BACK
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className={`${trackWide} ${pillBase} bg-burgundy text-paper`}
        >
          NEXT
        </button>
      </nav>
    </section>
  );
}

const pillBase =
  "h-control w-cta rounded-control text-button uppercase transition-opacity " +
  "hover:enabled:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

type TileProps = {
  option: StepOption;
  name: string;
  width: number;
  height: number;
  checked: boolean;
  tabbable: boolean;
  onSelect: (optionId: string) => void;
};

function OptionTile({ option, name, width, height, checked, tabbable, onSelect }: TileProps) {
  const asset = getAsset(option.image);
  if (asset.kind !== "image") throw new Error(`Asset ${option.image} is not an image.`);
  const price = formatPriceDelta(option.priceDelta);
  const { left, top, right, bottom } = option.crop;
  // Rendered photo width at the design size, for the browser's image-size choice.
  const photoWidth = Math.round(width * (1 - left / 100 - right / 100));

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
        {/* Photo placed exactly as the deck crops it (insets in % of the tile). */}
        <span className="absolute" style={{ left: `${left}%`, top: `${top}%`, right: `${right}%`, bottom: `${bottom}%` }}>
          <Image src={asset.src} alt={asset.alt} fill sizes={`${photoWidth}px`} className="object-cover" />
        </span>
      </span>
      <span
        className={`${trackLabel} mt-[7px] text-center text-option uppercase ${checked ? "text-burgundy" : "text-ink"}`}
      >
        {option.label}
        {price && <span className="block">{price}</span>}
      </span>
    </label>
  );
}
