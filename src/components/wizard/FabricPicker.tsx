"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { getAsset } from "@/src/config/assets";
import {
  fabricFamilies,
  fabricLayout as L,
  formatBasePrice,
  formatSwatchDelta,
  getFamily,
  type FabricFamily,
  type FabricFamilyId,
  type Swatch,
} from "@/src/config/fabrics.config";
import PageBackground from "@/src/components/PageBackground";
import { DeckPhoto, StepNav, StepTitle, trackLabel } from "./StepChrome";
import type { FabricSelection } from "./WizardContext";

type Props = {
  selection: FabricSelection | undefined;
  onSelectFamily: (family: FabricFamilyId) => void;
  onSelectSwatch: (swatch: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  focusTitle?: boolean;
};

// Geometry is in % of the row so the picker keeps the design's proportions at any width.
const pct = (px: number) => `${(px / L.rowWidth) * 100}%`;
const ROW_HEIGHT = L.selectedTile.height + L.captionGap + 12; // tile + gap + one caption line
const motion = "duration-500 ease-out motion-reduce:transition-none";

/**
 * Fabric picker (screens 05-12). Six family tiles; choosing one slides it to the start of the row
 * and reveals that family's 2 x 5 swatch grid beside it. Clicking the selected tile again
 * slides it back and shows all six families.
 */
export default function FabricPicker({ selection, onSelectFamily, onSelectSwatch, onNext, onBack, canGoNext, canGoBack, focusTitle }: Props) {
  const titleId = useId();
  const gridId = useId();
  // Open on the swatches when returning to this step with a family already chosen.
  const [expanded, setExpanded] = useState(selection !== undefined);
  const family: FabricFamily | undefined = selection ? getFamily(selection.family) : undefined;
  const open = expanded && family !== undefined;

  return (
    <section className="flex flex-col items-center px-4 pb-10" style={{ paddingTop: L.titleTop }}>
      {/* Screens 11-12 (Tweed, Polyester Blend) use the alternate pattern (asset-manifest.md). */}
      {open && family.background === "alt" && (
        <>
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-paper" />
          <PageBackground variant="alt" />
        </>
      )}

      <StepTitle id={titleId} autoFocus={focusTitle}>
        {L.title}
      </StepTitle>

      <div
        className="relative w-full"
        style={{ marginTop: L.tilesTop, maxWidth: L.rowWidth, aspectRatio: `${L.rowWidth} / ${ROW_HEIGHT}` }}
      >
        {fabricFamilies.map((f, i) => {
          const isSelected = family?.id === f.id;
          return (
            <FamilyTile
              key={f.id}
              family={f}
              index={i}
              state={open ? (isSelected ? "open" : "hidden") : isSelected ? "selected" : "idle"}
              controls={gridId}
              onClick={() => {
                if (open) {
                  setExpanded(false);
                } else {
                  onSelectFamily(f.id as FabricFamilyId);
                  setExpanded(true);
                }
              }}
            />
          );
        })}

        <div
          id={gridId}
          role="radiogroup"
          aria-label={family ? `${family.name} swatches` : "Swatches"}
          className={`absolute top-0 grid grid-cols-5 transition-[opacity,translate,visibility] ${motion} ${
            open ? "visible translate-x-0 opacity-100 delay-200" : "invisible translate-x-6 opacity-0"
          }`}
          style={{
            left: pct(L.grid.left),
            width: pct(L.grid.width),
            aspectRatio: `${L.grid.width} / ${L.grid.height}`,
            gridTemplateRows: `${L.grid.topRowHeight}fr ${L.grid.height - L.grid.topRowHeight}fr`,
          }}
        >
          {family && (
            <SwatchGrid
              // Remount per family so radios and images reset when the family changes.
              key={family.id}
              family={family}
              selected={selection?.swatch}
              onSelect={onSelectSwatch}
            />
          )}
        </div>
      </div>

      <StepNav onBack={onBack} onNext={onNext} canGoBack={canGoBack} canGoNext={canGoNext} />
    </section>
  );
}

type TileState = "idle" | "selected" | "open" | "hidden";

function FamilyTile({ family, index, state, controls, onClick }: {
  family: FabricFamily;
  index: number;
  state: TileState;
  controls: string;
  onClick: () => void;
}) {
  const open = state === "open";
  const box = open ? L.selectedTile : L.tile;
  const image = open && family.selectedTileImage ? family.selectedTileImage : family.tileImage;
  const info = getAsset("ui.icon.info");
  // Screen 05 shows the note (Tweed) instead of a price; the opened tile always shows the price.
  const note = !open ? family.tileNote : undefined;
  const style: CSSProperties = { left: open ? 0 : pct(L.tile.lefts[index]), width: pct(box.width) };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={state === "selected" || open}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={
        open
          ? `${family.name}, selected. Show all fabric families`
          : `${family.name}, ${note ? note.join(", ").toLowerCase() : `starting from ${formatBasePrice(family.basePrice)}`}`
      }
      tabIndex={state === "hidden" ? -1 : 0}
      className={`group absolute top-0 flex cursor-pointer flex-col items-center text-left transition-[left,width,opacity,visibility] ${motion} ${
        state === "hidden" ? "pointer-events-none invisible opacity-0" : "visible opacity-100"
      } outline-none`}
      style={style}
    >
      <span
        className={
          "relative block w-full overflow-hidden transition-[outline-color] " +
          "outline-3 outline-offset-[2px] " +
          (state === "selected" ? "outline-burgundy " : "outline-transparent ") +
          "group-focus-visible:ring-2 group-focus-visible:ring-ink group-focus-visible:ring-offset-[7px]"
        }
        style={{ aspectRatio: `${box.width} / ${box.height}` }}
      >
        <DeckPhoto image={image} width={box.width} />
        {family.tileShade && !open && <span aria-hidden className="absolute inset-0 bg-tile-shade" />}
        {family.tileHover && !open && (
          // Linen (screen 05): the jacket photo slides in from the right on hover or keyboard focus.
          <span aria-hidden className="absolute inset-0 overflow-hidden">
            <span
              className={`absolute inset-0 translate-x-full transition-transform ${motion} group-hover:translate-x-0 group-focus-visible:translate-x-0`}
            >
              <DeckPhoto image={family.tileHover.image} width={box.width} alt="" />
            </span>
          </span>
        )}
        <span
          aria-hidden
          className={`${trackLabel} absolute inset-x-0 text-center text-paper uppercase ${note ? "text-caption" : "text-label-lg"}`}
          style={{ top: `${(L.priceTop / L.tile.height) * 100}%` }}
        >
          {note ? (
            note.map((line, i) => (
              <span key={line} className="block" style={{ marginTop: i === 0 ? 0 : 9 }}>
                {line}
              </span>
            ))
          ) : (
            <>
              <span className="block">STARTING FROM</span>
              <span className="block">{formatBasePrice(family.basePrice)}</span>
            </>
          )}
        </span>
        {/* Info icon as in the design. Its behaviour isn't defined, so it is decorative. */}
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${(L.infoIcon.top / L.tile.height) * 100}%`, width: `${(L.infoIcon.size / L.tile.width) * 100}%`, opacity: L.infoIcon.opacity }}
        >
          <Image src={info.src} alt="" width={info.width} height={info.height} unoptimized className="h-auto w-full" />
        </span>
      </span>
      <span
        aria-hidden
        className={`${trackLabel} text-center text-label uppercase ${state === "selected" ? "text-burgundy" : "text-ink"}`}
        style={{ marginTop: L.captionGap }}
      >
        {family.label}
      </span>
    </button>
  );
}

function SwatchGrid({ family, selected, onSelect }: { family: FabricFamily; selected: string | undefined; onSelect: (id: string) => void }) {
  const name = useId();
  return (
    <>
      {family.swatches.map((s, i) => (
        <SwatchCell
          key={s.id}
          swatch={s}
          name={name}
          row={i < 5 ? 0 : 1}
          checked={selected === s.id}
          tabbable={selected === undefined ? i === 0 : selected === s.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

function SwatchCell({ swatch, name, row, checked, tabbable, onSelect }: {
  swatch: Swatch;
  name: string;
  row: 0 | 1;
  checked: boolean;
  tabbable: boolean;
  onSelect: (id: string) => void;
}) {
  const delta = formatSwatchDelta(swatch.priceDelta);
  const width = L.grid.width / 5;
  return (
    <label className="group relative block cursor-pointer overflow-hidden">
      <input
        type="radio"
        name={name}
        value={swatch.id}
        checked={checked}
        tabIndex={tabbable ? 0 : -1}
        onChange={() => onSelect(swatch.id)}
        aria-label={delta ? `${swatch.label.toLowerCase()}, ${delta}` : swatch.label.toLowerCase()}
        className="peer sr-only"
      />
      <DeckPhoto image={swatch.image} crop={swatch.crop} width={width} />
      {swatch.hover && (
        // Screen 07: a garment photo replaces the swatch on hover or keyboard focus.
        <span
          aria-hidden
          className={`absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100 peer-focus-visible:opacity-100`}
        >
          <DeckPhoto image={swatch.hover.image} crop={swatch.hover.crop} width={width} alt="" />
        </span>
      )}
      <span
        aria-hidden
        className={`${trackLabel} absolute inset-x-0 flex flex-col items-center text-center text-label text-paper uppercase transition-opacity ${
          swatch.hover ? "group-hover:opacity-0 peer-focus-visible:opacity-0" : ""
        }`}
        style={{ top: `${(L.swatchLabelTop[row] / (row === 0 ? L.grid.topRowHeight : L.grid.height - L.grid.topRowHeight)) * 100}%` }}
      >
        <span>{swatch.label}</span>
        {delta && <span className="mt-[2px]">{delta}</span>}
      </span>
      {/* Selected: burgundy frame with a white inner line, visible on light and dark fabrics. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 border-[3px] border-burgundy shadow-[inset_0_0_0_2px_var(--color-paper)] transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}
      />
      {/* Keyboard focus: a dashed ring inside the cell (cells touch, so it can't go outside). */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[9px] hidden border-2 border-dashed border-paper outline-2 outline-ink peer-focus-visible:block"
      />
    </label>
  );
}
