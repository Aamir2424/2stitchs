// Wizard steps and their options. Components render only what is defined here.
// Sources: reference screens 13-25, suit-website-mvp-spec.md section 4.1 and asset-manifest.md.
// Tile geometry and crops come from the deck slides of the same number.
// Every image key is checked against src/config/assets.ts at compile time.

import type { AssetKey } from "@/src/config/assets";
import { measurementSteps, type MeasurementStepId } from "@/src/config/measurements.config";

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
  /** Line under the title (screen 17). */
  subtitle?: string;
  /** Caption type token. Default "option" (text-option); screen 13 uses "caption" (text-caption). */
  captionSize?: "option" | "caption";
  options: readonly StepOption[];
  /** Tile size and spacing at the 1440px design, in CSS px (measured from the deck). */
  layout: {
    tileWidth: number;
    tileHeight: number;
    gap: number;
    /**
     * Space from the top of the content area (below the promo strip) to the title box.
     * Negative when the deck's title box starts above the strip's bottom edge (screen 13).
     */
    titleTop: number;
    /** Space from the bottom of the title box (or the subtitle, if any) to the top of the tiles. */
    tilesTop: number;
    /** Space from the bottom of the title box to the top of the subtitle box. */
    subtitleTop?: number;
  };
  /** Reference screenshot this step is built from. */
  reference: string;
};

export const optionSteps = {
  jacketStyle: {
    title: "STYLE YOUR SUIT JACKET",
    reference: "reference/screen_13.png",
    captionSize: "caption",
    // Deck slide 13: five 243.9 x 366.5 tiles, 32.2px apart; the title box starts 6.7px above
    // the strip's bottom edge.
    layout: { tileWidth: 243.9, tileHeight: 366.5, gap: 32.2, titleTop: -6.7, tilesTop: 32.2 },
    options: [
      // Prices: spec section 4.1, step 3 (screen 13). The design's "TUXIDO" is a typo.
      { id: "twoPiece", label: "2 PIECE SUITS", image: "jacket.style.twoPiece", priceDelta: 0,
        crop: { left: -0.081, top: 0, right: -0.081, bottom: 0 } },
      { id: "threePiece", label: "3 PIECE SUITS", image: "jacket.style.threePiece", priceDelta: 199,
        crop: { left: -8.991, top: 0, right: -6.592, bottom: -15.396 } },
      { id: "doubleBreasted", label: "DOUBLE BREASTED SUITS", image: "jacket.style.doubleBreasted", priceDelta: 99,
        crop: { left: -0.081, top: 0, right: -0.081, bottom: 0 } },
      { id: "safari", label: "SAFARI SUITS", image: "jacket.style.safari", priceDelta: 299,
        crop: { left: -10.119, top: 0, right: -10.119, bottom: 0 } },
      { id: "tuxedo", label: "TUXEDO SUITS", image: "jacket.style.tuxedo", priceDelta: 299,
        crop: { left: -10.119, top: 0, right: -10.119, bottom: 0 } },
    ],
  },
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
  waistcoat: {
    title: "ADD A WAIST COAT",
    subtitle: "INCLUDED WITH THE 3-PIECE SUIT",
    reference: "reference/screen_17.png",
    // Deck slide 17: same tile sizes as screens 15-16 (first tile 289.2 wide).
    layout: { tileWidth: 276.5, tileHeight: 377.3, gap: 61, titleTop: 11.7, subtitleTop: 14.5, tilesTop: 17.3 },
    options: [
      // Prices: spec section 4.1, step 7 (screen 17). Labels as in the design.
      { id: "singleBreasted", label: "SINGLE BREASTED WAISTCOAT", image: "waistcoat.singleBreasted", priceDelta: 0,
        tileWidth: 289.2, crop: { left: -18.661, top: -19.568, right: -29.312, bottom: -50.866 } },
      { id: "doubleBreasted", label: "DOUBLE BREASTED WAIST COAT", image: "waistcoat.doubleBreasted", priceDelta: 29,
        crop: { left: -23.856, top: -18.154, right: -26.456, bottom: -47.369 } },
      { id: "uShaped", label: "U-SHAPED WAISTCOAT", image: "waistcoat.uShaped", priceDelta: 0,
        crop: { left: -21.687, top: -17.544, right: -27.885, bottom: -47.164 } },
    ],
  },
  backVent: {
    title: "NOW HOW WOULD YOU LIKE YOUR BACK?",
    reference: "reference/screen_18.png",
    layout: { tileWidth: 299.8, tileHeight: 391.1, gap: 42.2, titleTop: 27.3, tilesTop: 32.2 },
    options: [
      // No surcharges in the design or spec section 4.1 (step 8).
      { id: "center", label: "CENTER VENT", image: "vent.center", priceDelta: 0,
        crop: { left: -44.965, top: -62.64, right: -53.807, bottom: -66.303 } },
      { id: "side", label: "SIDE VENT", image: "vent.side", priceDelta: 0,
        crop: { left: -44.481, top: -58.502, right: -48.588, bottom: -63.873 } },
    ],
  },
  // Screens 20-23 all use 299.8 x 391.1 tiles (deck slides 20-23).
  pantsFit: {
    title: "HOW WOULD YOU LIKE TO FIT IN YOUR PANTS?",
    reference: "reference/screen_20.png",
    layout: { tileWidth: 299.8, tileHeight: 391.1, gap: 42.2, titleTop: 10.9, tilesTop: 46.5 },
    options: [
      { id: "regular", label: "REGULAR FIT", image: "pants.fit.regular", priceDelta: 0,
        crop: { left: -14.205, top: -52.348, right: -18.065, bottom: 0 } },
      { id: "slim", label: "SLIM FIT", image: "pants.fit.slim", priceDelta: 0,
        crop: { left: -14.155, top: -53.933, right: -19.492, bottom: 0 } },
    ],
  },
  rise: {
    // The design reads "WOLD"; fixed per the steering file.
    title: "WHERE WOULD YOU LIKE YOUR PANTS TO SIT",
    reference: "reference/screen_21.png",
    layout: { tileWidth: 299.8, tileHeight: 391.1, gap: 39.2, titleTop: 28.8, tilesTop: 46.5 },
    options: [
      { id: "high", label: "HIGH WAISTED", image: "pants.rise.high", priceDelta: 0,
        crop: { left: -20.403, top: -52.729, right: -24.646, bottom: -14.336 } },
      { id: "mid", label: "MID WAISTED", image: "pants.rise.mid", priceDelta: 0,
        crop: { left: -14.402, top: -45.174, right: -20.693, bottom: -10.427 } },
      { id: "low", label: "LOW WAISTED", image: "pants.rise.low", priceDelta: 0,
        crop: { left: -17.918, top: -47.879, right: -22.637, bottom: -14.041 } },
    ],
  },
  waistband: {
    title: "BELT LOOPS OR SIDE TABS?",
    reference: "reference/screen_22.png",
    layout: { tileWidth: 299.8, tileHeight: 391.1, gap: 42.2, titleTop: 27.3, tilesTop: 46.5 },
    options: [
      // Belt loops use image113 (also the slim-fit pants photo), side tabs image117
      // (asset-manifest.md, screen 22). Price: spec section 4.1, step 12.
      { id: "beltLoops", label: "BELT LOOPS", image: "pants.waistband.beltLoops", priceDelta: 0,
        crop: { left: -48.161, top: -67.995, right: -56.276, bottom: -67.473 } },
      { id: "sideTabs", label: "SIDE TABS", image: "pants.waistband.sideTabs", priceDelta: 59,
        crop: { left: -36.806, top: -56.933, right: -45.977, bottom: -53.594 } },
    ],
  },
  cuff: {
    title: "CUFF OR NO CUFF?",
    reference: "reference/screen_23.png",
    layout: { tileWidth: 299.8, tileHeight: 391.1, gap: 42.2, titleTop: 27.3, tilesTop: 46.5 },
    options: [
      // Price: spec section 4.1, step 13.
      { id: "without", label: "WITHOUT CUFF", image: "pants.cuff.without", priceDelta: 0,
        crop: { left: -30.46, top: -93.574, right: -37.604, bottom: 0 } },
      { id: "with", label: "WITH CUFF", image: "pants.cuff.with", priceDelta: 10,
        crop: { left: -33.361, top: -97.062, right: -37.731, bottom: 0 } },
    ],
  },
} as const satisfies Record<string, OptionStepConfig>;

export type OptionStepId = keyof typeof optionSteps;

/** Option ids allowed for a given step, e.g. "regular" | "slim" for jacketFit. */
export type OptionIdFor<S extends OptionStepId> = (typeof optionSteps)[S]["options"][number]["id"];

/** A question answered with large pill buttons instead of photo tiles (screen 19). */
export type ChoiceStepConfig = {
  title: string;
  options: readonly { id: string; label: string }[];
  /** Pill size and spacing at the 1440px design, in CSS px (measured from the deck). */
  layout: { pillWidth: number; pillHeight: number; gap: number; titleTop: number; pillsTop: number };
  reference: string;
};

export const choiceSteps = {
  pantsFabricChoice: {
    // Spec section 4.1, step 9. YES shows the fabric picker again for the pants; NO reuses
    // the jacket fabric. No price of its own.
    title: "WOULD YOU LIKE A DIFFERENT FABRIC FOR YOUR PANTS?",
    reference: "reference/screen_19.png",
    // Deck slide 19: two 370.4 x 59.1 pills, 14.8px apart.
    layout: { pillWidth: 370.4, pillHeight: 59.1, gap: 14.8, titleTop: 188.2, pillsTop: 46.5 },
    options: [
      { id: "yes", label: "YES" },
      { id: "no", label: "NO" },
    ],
  },
} as const satisfies Record<string, ChoiceStepConfig>;

export type ChoiceStepId = keyof typeof choiceSteps;
export type ChoiceIdFor<S extends ChoiceStepId> = (typeof choiceSteps)[S]["options"][number]["id"];

/** Steps whose answer is one option id: photo-tile steps and pill-button questions. */
export type SelectableStepId = OptionStepId | ChoiceStepId;
export type SelectionIdFor<S extends SelectableStepId> = S extends OptionStepId
  ? OptionIdFor<S>
  : S extends ChoiceStepId
    ? ChoiceIdFor<S>
    : never;

/**
 * The fabric picker: family and swatch on one screen (spec steps 1-2, screens 05-12).
 * "pantsFabric" is the same picker run again for the pants (spec step 9, YES).
 */
export type FabricStepId = "fabric" | "pantsFabric";

/** Free-text steps: the monogram (screen 24) and the note to the tailor (screen 25). */
export type TextStepId = "monogram" | "tailorNote";

/**
 * The four monogram styles on screen 24, in the design's order. The design labels them only
 * with an "ABC" sample; `label` is the accessible name and the style name for the tailor.
 * `deckFont` is the font the deck uses (slide 24); it is never loaded on the site.
 * `font` is the approved free font that renders the sample (src/fonts/monogram.ts; licences in
 * DESIGN.md, "Monogram fonts").
 */
export const monogramStyles = [
  { id: "sans", label: "SANS SERIF", deckFont: "Arial Bold", font: "Arimo Bold",
    sampleClass: "font-monogram-sans tracking-monogram-wide" },
  { id: "slab", label: "SLAB SERIF", deckFont: "Courier Prime Bold", font: "Courier Prime Bold",
    sampleClass: "font-monogram-slab tracking-monogram-wide" },
  { id: "script", label: "SCRIPT", deckFont: "Monotype Corsiva Bold", font: "Cormorant Garamond Bold Italic",
    sampleClass: "font-monogram-script tracking-monogram italic" },
  { id: "serif", label: "SERIF", deckFont: "Times New Roman Bold", font: "Tinos Bold",
    sampleClass: "font-monogram-serif tracking-monogram" },
] as const;

export type MonogramStyleId = (typeof monogramStyles)[number]["id"];

export const monogramStep = {
  title: "DESIGN YOUR MONOGRAM",
  hint: "MAXIMUM OF 10 LETTERS",
  maxLetters: 10,
  /** Added when the monogram text isn't empty (spec section 4.1, step 14). */
  priceDelta: 39,
  /** The sample "AAMIR" is printed into this photo; the typed text is shown beside it. */
  image: "monogram.lining" satisfies AssetKey,
  sample: "ABC",
  reference: "reference/screen_24.png",
  /** Deck slide 24, CSS px at 1440px. Tops are from the top of the content area. */
  layout: {
    photoLeft: 42.2,
    photoTop: 39.9,
    photoWidth: 394.8,
    photoHeight: 493.3,
    /** Photo right edge to the title / input column. */
    photoGap: 19.7,
    columnWidth: 729.7,
    titleTop: 154.7,
    /** Title box bottom to the MAXIMUM OF 10 LETTERS box. */
    hintTop: 26.6,
    /**
     * Hint line bottom to the input pill. The deck's hint box is 15.9 tall and 8.4 above the
     * pill; the CSS line (text-option, 14.04 tall) needs 10.3 to keep the pill in place.
     */
    inputTop: 10.3,
    inputHeight: 59.1,
    /** Input bottom to the price box. */
    priceTop: 3.8,
    /** Column right edge to the style checkboxes. */
    stylesGap: 63.5,
    stylesTop: 202,
    /** Space from the end of the "ABC" samples to the page's right edge. */
    stylesRight: 81,
    boxSize: 34.1,
    /** Checkbox to "ABC" sample. */
    sampleGap: 29.1,
    rowGap: 8.2,
  },
} as const;

/**
 * Keeps only Latin letters A-Z, in capitals, up to the 10-letter maximum. Capitals because the
 * design shows the monogram in capitals and the tailor stitches what the customer sees.
 * Letters only, per "MAXIMUM OF 10 LETTERS" (spaces, digits and accents: to be confirmed).
 */
export function sanitizeMonogramText(input: string): string {
  return input.toUpperCase().replace(/[^A-Z]/g, "").slice(0, monogramStep.maxLetters);
}

export const tailorNoteStep = {
  // Copy as in the design, with its full stop.
  title: "TELL YOUR TAILOR WHAT YOU DESIRE.",
  submitLabel: "SUBMIT",
  reference: "reference/screen_25.png",
  /** Deck slide 25, CSS px at 1440px. */
  layout: {
    titleTop: 16.9,
    /** Title box bottom to the textarea. */
    noteTop: 52.1,
    noteWidth: 1278,
    noteHeight: 395.3,
    /** Text inset inside the 3px outline (deck text box, adjusted for CSS line placement). */
    padding: { top: 9, right: 35.6, bottom: 9, left: 37 },
    /** Textarea bottom to SUBMIT. */
    submitTop: 14.3,
    /**
     * SUBMIT's centre relative to the page centre: the deck puts it at x 651 (69px left of
     * centre); the screenshot measures 69.5px.
     */
    submitOffsetX: -69,
  },
} as const;

/** Design steps in order (spec section 4.1, steps 1-15; fabric and swatch share one screen). */
const designSteps = [
  "fabric",
  "jacketStyle",
  "jacketFit",
  "lapelThickness",
  "lapelStyle",
  "waistcoat",
  "backVent",
  "pantsFabricChoice",
  "pantsFabric",
  "pantsFit",
  "rise",
  "waistband",
  "cuff",
  "monogram",
  "tailorNote",
] as const satisfies readonly (SelectableStepId | FabricStepId | TextStepId)[];

/** The summary (spec step 17, screen 26). */
export type SummaryStepId = "summary";

export type WizardStepId = (typeof designSteps)[number] | MeasurementStepId | SummaryStepId;

/**
 * Wizard step order: the design steps, the measurement screens (spec step 16), whose order
 * lives in measurements.config.ts, then the summary.
 */
export const wizardSteps: readonly WizardStepId[] = [
  ...designSteps,
  ...measurementSteps.map((s) => s.step),
  "summary",
];

type StepCondition = { [D in SelectableStepId]: { step: D; option: SelectionIdFor<D> } }[SelectableStepId];

/**
 * Steps shown only for one option of an earlier step. Changing that earlier step to another
 * option clears the conditional step's choice (spec section 4.1 and the notes under it).
 */
export const conditionalSteps: { [S in WizardStepId]?: StepCondition } = {
  waistcoat: { step: "jacketStyle", option: "threePiece" },
  pantsFabric: { step: "pantsFabricChoice", option: "yes" },
};

export function formatPriceDelta(amount: number): string | null {
  if (amount <= 0) return null;
  return `+ ${priceCurrency} ${amount.toFixed(2)}`;
}
