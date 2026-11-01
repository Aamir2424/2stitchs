// The screen 26 tile grid and the text blocks below it, shared by the customer's summary
// (a Client Component in the wizard) and the admin production ticket (screen 27, rendered on the
// server). No hooks and no "use client": it renders from the data it is given.

import type { ReactNode } from "react";
import type { WizardSelections, FabricSelection } from "@/src/components/wizard/WizardContext";
import { DeckPhoto } from "@/src/components/wizard/StepChrome";
import { trackLabel, trackWide } from "@/src/components/wizard/tracking";
import type { AssetKey } from "@/src/config/assets";
import { getFamily } from "@/src/config/fabrics.config";
import { measurementFields, type MeasurementFieldId } from "@/src/config/measurements.config";
import { monogramStyles, optionSteps, type DeckCrop, type OptionStepId } from "@/src/config/steps.config";
import {
  fitCaption,
  suitDesignCrops,
  summaryCopy,
  summaryLayout as L,
  summaryTileFor,
  ticketCopy,
  type SummaryRowId,
  type SummaryTile,
} from "@/src/config/summary.config";

/** Grid columns at 1440px (deck slides 26 and 27): fabrics, suit design, then three detail columns. */
export const summaryColumns = `${L.tileWidth}px ${L.suitDesignWidth}px ${L.tileWidth}px ${L.tileWidth}px ${L.tileWidth}px`;
export const summaryGridWidth = 4 * L.tileWidth + L.suitDesignWidth + 4 * L.columnGap;

type GridProps = {
  selections: WizardSelections;
  /** The fabric the pants are made in (effectivePantsFabric). */
  pantsFabric: FabricSelection | undefined;
  /**
   * "summary" (screen 26): JACKET FABRIC captions, swatch names on the fabric tiles.
   * "ticket" (screen 27): SUIT FABRIC captions, swatch names and fabric codes.
   */
  variant: "summary" | "ticket";
  /** Space above the first row of captions. */
  marginTop: number;
};

/**
 * The tiles for every choice made. Steps that weren't shown (the waistcoat unless 3-Piece)
 * have no tile; after NO the pants tile shows the jacket fabric, marked as such.
 */
export function SummaryGrid({ selections, pantsFabric, variant, marginTop }: GridProps) {
  const optionLabel = (step: OptionStepId) => optionSteps[step].options.find((o) => o.id === selections[step])?.label;
  const detail = (row: SummaryRowId) => {
    const option = selections[row];
    return option ? summaryTileFor(row, option) : null;
  };

  const style = optionSteps.jacketStyle.options.find((o) => o.id === selections.jacketStyle);
  const suitCaption = [style?.label, ...fitCaption(optionLabel("jacketFit"), optionLabel("pantsFit"))].filter(Boolean) as string[];
  const reusesJacketFabric = selections.pantsFabricChoice === "no";
  const waistcoat = detail("waistcoat");
  const jacketCaption = variant === "ticket" ? ticketCopy.suitFabric : summaryCopy.jacketFabric;
  const gridStyle = { width: summaryGridWidth, maxWidth: "100%", transform: `translateX(${L.gridOffsetX}px)` };

  return (
    <>
      <div className="mx-auto grid" style={{ ...gridStyle, gridTemplateColumns: summaryColumns, columnGap: L.columnGap, marginTop }}>
        <div className="flex flex-col" style={{ gap: L.rowGap }}>
          {selections.fabric && <FabricTile caption={jacketCaption} fabric={selections.fabric} variant={variant} />}
          {pantsFabric && (
            <FabricTile caption={summaryCopy.pantsFabric} fabric={pantsFabric} variant={variant} sameAsJacket={reusesJacketFabric} />
          )}
        </div>

        {style && (
          <Tile
            caption={summaryCopy.suitDesign}
            image={style.image}
            crop={suitDesignCrops[style.id]}
            width={L.suitDesignWidth}
            height={2 * L.tileHeight + L.rowGap + 13.16 + L.captionGap}
            below={suitCaption}
          />
        )}

        {(
          [
            ["lapelThickness", "lapelStyle"],
            ["backVent", "rise"],
            ["waistband", "cuff"],
          ] as const
        ).map((pair) => (
          <div key={pair[0]} className="flex flex-col" style={{ gap: L.rowGap }}>
            {pair.map((row) => {
              const tile = detail(row);
              return tile && <DetailTile key={row} tile={tile} />;
            })}
          </div>
        ))}
      </div>

      {waistcoat && (
        // 3-Piece only. The design has no waistcoat tile; it goes under the fabrics column.
        <div className="mx-auto" style={{ ...gridStyle, marginTop: L.rowGap }}>
          <DetailTile tile={waistcoat} />
        </div>
      )}
    </>
  );
}

/** Monogram text in its chosen font, with the style name. Nothing if no letters were typed. */
export function MonogramBlock({ selections }: { selections: WizardSelections }) {
  if (!selections.monogramText) return null;
  const style = monogramStyles.find((s) => s.id === selections.monogramStyle);
  return (
    <TextBlock caption={summaryCopy.monogram}>
      <p className={`${style?.sampleClass ?? ""} text-monogram-sample text-ink`}>{selections.monogramText}</p>
      {style && (
        <p className={`${trackLabel} mt-1 text-caption text-ink`}>
          {summaryCopy.monogramStyle}: {style.label} ({style.font.toUpperCase()})
        </p>
      )}
    </TextBlock>
  );
}

/** All saved measurements with their units, five to a row like the tile grid. */
export function MeasurementsBlock({ selections }: { selections: WizardSelections }) {
  return (
    <TextBlock caption={summaryCopy.measurements}>
      <dl className="grid gap-y-4" style={{ gridTemplateColumns: summaryColumns, columnGap: L.columnGap }}>
        {(Object.keys(measurementFields) as MeasurementFieldId[]).map((field) => {
          const value = selections.measurements?.[field];
          if (value === undefined) return null;
          return (
            <div key={field}>
              <dt className={`${trackLabel} text-caption text-ink`}>{measurementFields[field].label}</dt>
              <dd className={`${trackLabel} text-label text-ink`}>
                {value} {measurementFields[field].unit.toUpperCase()}
              </dd>
            </div>
          );
        })}
      </dl>
    </TextBlock>
  );
}

/** A captioned block of text for choices without a photo (not in the design). */
export function TextBlock({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <section>
      <h2 className={`${trackWide} text-subheading text-maroon`}>{caption}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Caption({ children }: { children: ReactNode }) {
  // One line, centred, even when wider than the tile (the deck widens the PANTS FABRIC box).
  return <figcaption className={`${trackLabel} text-center text-caption whitespace-nowrap text-ink`}>{children}</figcaption>;
}

type TileProps = {
  caption: string;
  image: AssetKey;
  crop?: DeckCrop;
  width?: number;
  height?: number;
  /** Text over the photo (swatch names, fabric codes). */
  overlay?: ReactNode;
  /** Caption lines under the photo (SUIT DESIGN). */
  below?: string[];
};

/** A captioned photo tile (screens 26-27): caption above, photo in the deck's crop. */
function Tile({ caption, image, crop, width = L.tileWidth, height = L.tileHeight, overlay, below }: TileProps) {
  return (
    <figure className="flex flex-col items-center" style={{ width, maxWidth: "100%" }}>
      <Caption>{caption}</Caption>
      <span className="relative block w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}`, marginTop: L.captionGap }}>
        <DeckPhoto image={image} crop={crop} width={width} />
        {overlay}
      </span>
      {below && below.length > 0 && (
        <p className={`${trackLabel} text-center text-caption text-ink`} style={{ marginTop: L.suitCaptionTop }}>
          {below.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      )}
    </figure>
  );
}

function DetailTile({ tile }: { tile: SummaryTile }) {
  return <Tile caption={tile.caption} image={tile.image} crop={tile.crop} />;
}

type FabricTileProps = { caption: string; fabric: FabricSelection; variant: GridProps["variant"]; sameAsJacket?: boolean };

/**
 * Fabric tile: the chosen swatch photo with its name on it (screen 26). On the ticket it also
 * shows the swatch's fabric code from fabrics.config.ts, or CODE NOT ON FILE (screen 27).
 */
function FabricTile({ caption, fabric, variant, sameAsJacket }: FabricTileProps) {
  const family = getFamily(fabric.family);
  const swatch = family.swatches.find((s) => s.id === fabric.swatch);
  if (!swatch) return null;
  return (
    <Tile
      caption={`${caption}- ${family.label}`}
      image={swatch.image}
      overlay={
        <span
          className={`${trackLabel} absolute inset-x-0 -translate-y-1/2 text-center text-label text-paper`}
          style={{ top: `${(L.swatchLabelCenter / L.tileHeight) * 100}%` }}
        >
          <span className="block">{swatch.label}</span>
          {variant === "ticket" && <span className="block">{swatch.fabricCode ?? ticketCopy.codeNotOnFile}</span>}
          {sameAsJacket && <span className="block">({summaryCopy.sameAsJacket})</span>}
        </span>
      }
    />
  );
}
