// Wizard steps and their options. Components render only what is defined here.
// Sources: reference screens 14-16, suit-website-mvp-spec.md section 4.1 and asset-manifest.md.
// Every image key is checked against src/config/assets.ts at compile time.

import type { AssetKey } from "@/src/config/assets";

/** Currency for every price shown in the wizard (steering file: prices are AED). */
export const priceCurrency = "AED";

/**
 * The part of the photo shown in a tile, as the deck crops it (`<a:fillRect>` on the slide,
 * in percent; negative values mean the photo extends past the tile on that side).
 * The tile keeps this framing at any size.
 */
export type DeckCrop = { left: number; top: number; right: number; bottom: number };

export type StepOption = {
  id: string;
  /** Label exactly as shown in the design. */
  label: string;
  image: AssetKey;
  crop: DeckCrop;
  /** Added to the price in AED. 0 shows no price text. */
  priceDelta: number;
  /** Overrides the step's tile width for this option (the deck draws some tiles wider). */
  tileWidth?: number;
};

export type OptionStepConfig = {
  title: string;
  options: readonly StepOption[];
  /** Tile size and spacing at the 1440px design, in CSS px (measured from the deck). */
  layout: {
    tileWidth: number;
    tileHeight: number;
    gap: number;
    /** Space from the top of the content area (below the promo strip) to the title box. */
    titleTop: number;
    /** Space from the bottom of the title box to the top of the tiles. */
    tilesTop: number;
  };
  /** Reference screenshot this step is built from. */
  reference: string;
};

export const optionSteps = {
  jacketFit: {
    title: "HOW WOULD YOU LIKE YOUR FIT?",
    reference: "reference/screen_14.png",
    layout: { tileWidth: 310.9, tileHeight: 405.6, gap: 43.8, titleTop: 13.4, tilesTop: 36.3 },
    options: [
      { id: "regular", label: "REGULAR FIT", image: "jacket.fit.regular", priceDelta: 0,
        crop: { left: 0, top: -0.37, right: -11.279, bottom: -27.824 } },
      { id: "slim", label: "SLIM FIT", image: "jacket.fit.slim", priceDelta: 0,
        crop: { left: -8.219, top: -1.482, right: -7.308, bottom: -31.581 } },
    ],
  },
  lapelThickness: {
    title: "SELECT THE LAPEL THICKNESS",
    reference: "reference/screen_15.png",
    layout: { tileWidth: 276.5, tileHeight: 377.3, gap: 61, titleTop: 18.2, tilesTop: 46.5 },
    options: [
      // The deck draws the first tile on screens 15 and 16 12.7px wider (289.2 vs 276.5).
      { id: "narrow", label: "NARROW LAPEL", image: "lapel.thickness.narrow", priceDelta: 0, tileWidth: 289.2,
        crop: { left: -58.516, top: 0, right: -54.634, bottom: -104.182 } },
      { id: "medium", label: "MEDIUM LAPEL", image: "lapel.thickness.medium", priceDelta: 0,
        crop: { left: -58.613, top: 0, right: -54.16, bottom: -94.867 } },
      { id: "wide", label: "WIDE LAPEL", image: "lapel.thickness.wide", priceDelta: 0,
        crop: { left: -55.791, top: 0, right: -51.356, bottom: -89.714 } },
    ],
  },
  lapelStyle: {
    title: "DESIGN YOUR LAPEL",
    reference: "reference/screen_16.png",
    layout: { tileWidth: 276.5, tileHeight: 377.3, gap: 61, titleTop: 18.2, tilesTop: 46.5 },
    options: [
      { id: "notch", label: "NOTCH LAPEL", image: "lapel.style.notch", priceDelta: 0, tileWidth: 289.2,
        crop: { left: 0, top: 0, right: 0, bottom: -15.178 } },
      { id: "peak", label: "PEAK LAPEL", image: "lapel.style.peak", priceDelta: 0,
        crop: { left: 0, top: 0, right: 0, bottom: -10.119 } },
      { id: "shawl", label: "SHAWL LAPEL", image: "lapel.style.shawl", priceDelta: 0,
        crop: { left: 0, top: 0, right: 0, bottom: -10.14 } },
    ],
  },
} as const satisfies Record<string, OptionStepConfig>;

export type OptionStepId = keyof typeof optionSteps;

/** Option ids allowed for a given step, e.g. "regular" | "slim" for jacketFit. */
export type OptionIdFor<S extends OptionStepId> = (typeof optionSteps)[S]["options"][number]["id"];

/** The fabric picker: family and swatch on one screen (spec steps 1-2, screens 05-12). */
export type FabricStepId = "fabric";

/**
 * Wizard step order. Only the steps built so far are listed. The spec's full order is
 * fabric, swatch, jacket style, fit, lapels..., so jacket style goes in after "fabric" later.
 */
export const wizardSteps = ["fabric", "jacketFit", "lapelThickness", "lapelStyle"] as const satisfies readonly (
  | OptionStepId
  | FabricStepId
)[];

export type WizardStepId = (typeof wizardSteps)[number];

export function formatPriceDelta(amount: number): string | null {
  if (amount <= 0) return null;
  return `+ ${priceCurrency} ${amount.toFixed(2)}`;
}
