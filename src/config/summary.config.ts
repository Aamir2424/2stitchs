// Summary page (reference screen 26; asset-manifest.md, "Screen 26: summary" and "Summary tiles
// for every option"). Tile geometry and the dedicated thumbnails' crops come from deck slide 26.
// Option labels, step images and fabric names are read from steps.config.ts and
// fabrics.config.ts; this file adds only what the summary needs on top of them.

import type { AssetKey } from "@/src/config/assets";
import { optionSteps, type DeckCrop, type OptionIdFor, type OptionStepId } from "@/src/config/steps.config";

/** Copy from the design (screen 26). The price is a placeholder until pricing is wired. */
export const summaryCopy = {
  title: "SUMMARY",
  suitDesign: "SUIT DESIGN",
  jacketFabric: "JACKET FABRIC",
  pantsFabric: "PANTS FABRIC",
  totalPrice: "TOTAL PRICE",
  excVat: "EXC. VAT",
  /** PLACEHOLDER: shown instead of a total until calculatePrice() exists. */
  pricePlaceholder: "AED —",
  pricePlaceholderLabel: "Total price not calculated yet",
  // Not in the design (added for the choices screen 26 has no tile for).
  sameAsJacket: "SAME AS JACKET",
  monogram: "MONOGRAM",
  monogramStyle: "STYLE",
  tailorNote: "NOTE TO THE TAILOR",
  measurements: "MEASUREMENTS",
} as const;

/** Admin production ticket (screen 27). No price, VAT or totals appear on it. */
export const ticketCopy = {
  suitFabric: "SUIT FABRIC",
  /** Shown wherever a swatch has no verified fabric code (asset-manifest.md, screen 27). */
  codeNotOnFile: "CODE NOT ON FILE",
  notes: "NOTES",
  /** Notes line when the customer left no note. */
  noNotes: "—",
} as const;

/** Screen 27, relative to the summary grid: the notes line sits 51.6px below the SUIT DESIGN caption. */
export const ticketLayout = { notesTop: 51.6 } as const;

/**
 * VAT note under the price pill (screen 26). A config value, as the steering file requires.
 * The wording is the design's; whether it applies is for the owner to confirm.
 */
export const vatNote = "VAT PAYABLE BY CUSTOMER AT THE TIME OF SHIPMENT";

/** A region of a photo, in fractions of its width and height (0-1). */
export type PhotoRegion = { x0: number; y0: number; x1: number; y1: number };

/** The part of a photo a tile shows, for a deck crop (insets in % of the tile). */
function visibleRegion(crop: DeckCrop): PhotoRegion {
  const w = 1 - (crop.left + crop.right) / 100;
  const h = 1 - (crop.top + crop.bottom) / 100;
  return {
    x0: -crop.left / 100 / w,
    x1: (1 - crop.left / 100) / w,
    y0: -crop.top / 100 / h,
    y1: (1 - crop.top / 100) / h,
  };
}

/** The deck crop that makes a tile show exactly this region of a photo. */
function cropFor(region: PhotoRegion): DeckCrop {
  const w = 1 / (region.x1 - region.x0);
  const h = 1 / (region.y1 - region.y0);
  const left = -region.x0 * w;
  const top = -region.y0 * h;
  return { left: left * 100, top: top * 100, right: (1 - left - w) * 100, bottom: (1 - top - h) * 100 };
}

/** `inner` (fractions of `outer`) expressed in the coordinates outer is measured in. */
function within(outer: PhotoRegion, inner: PhotoRegion): PhotoRegion {
  const w = outer.x1 - outer.x0;
  const h = outer.y1 - outer.y0;
  return { x0: outer.x0 + inner.x0 * w, x1: outer.x0 + inner.x1 * w, y0: outer.y0 + inner.y0 * h, y1: outer.y0 + inner.y1 * h };
}

type Thumbnail = {
  /** The option this dedicated thumbnail shows. */
  option: string;
  image: AssetKey;
  /** The deck's crop of the thumbnail in its 215.4 x 164 tile (slide 26). */
  crop: DeckCrop;
  /**
   * Where the thumbnail sits inside that option's step photo. Measured by matching the
   * thumbnail against the step photo (normalized cross-correlation 0.996-0.999), so every
   * option of the row can be framed the same way from its own step photo.
   */
  regionInStepPhoto: PhotoRegion;
};

type SummaryRow<S extends OptionStepId> = {
  step: S;
  /** Caption per option. Screen 26 shows six of them; the rest follow the same pattern. */
  captions: Record<OptionIdFor<S>, string>;
} & (
  | { thumbnail: Thumbnail; framing?: never }
  | {
      thumbnail?: never;
      /** Region of each option's step photo, chosen by eye (no reference in the design). */
      framing: PhotoRegion;
    }
);

/** Detail tiles in screen 26's order (column by column), plus the waistcoat for 3-Piece. */
export const summaryRows = {
  lapelThickness: {
    step: "lapelThickness",
    captions: { narrow: "NARROW LAPEL", medium: "MEDIUM LAPEL", wide: "WIDE LAPEL" },
    thumbnail: {
      option: "wide", image: "summary.lapelThickness.wide", // image121, from image101
      crop: { left: 0, top: -13.311, right: 0, bottom: -66.95 },
      regionInStepPhoto: { x0: 0.2765, y0: 0.002, x1: 0.7501, y1: 0.5225 },
    },
  },
  lapelStyle: {
    step: "lapelStyle",
    captions: { notch: "NOTCH LAPEL", peak: "PEAK LAPEL", shawl: "SHAWL LAPEL" },
    thumbnail: {
      option: "peak", image: "summary.lapelStyle.peak", // image122, from image106
      crop: { left: 0, top: -21.225, right: 0, bottom: -58.773 },
      regionInStepPhoto: { x0: 0.0106, y0: 0.0035, x1: 0.9945, y1: 0.9016 },
    },
  },
  waistcoat: {
    step: "waistcoat",
    captions: {
      singleBreasted: "SINGLE BREASTED WAISTCOAT",
      doubleBreasted: "DOUBLE BREASTED WAIST COAT",
      uShaped: "U-SHAPED WAISTCOAT",
    },
    // NEEDS APPROVAL: the design has no waistcoat tile. Same width as the screen 17 tile's view
    // of the photo, centred on the waistcoat, cut to the summary tile's shape.
    framing: { x0: 0.126, y0: 0.236, x1: 0.802, y1: 0.579 },
  },
  backVent: {
    step: "backVent",
    captions: { center: "CENTER VENT", side: "SIDE VENT" },
    thumbnail: {
      option: "side", image: "summary.vent.side", // image123, from image111
      crop: { left: 0, top: -35.795, right: 0, bottom: -35.795 },
      regionInStepPhoto: { x0: 0.2356, y0: 0.2646, x1: 0.7472, y1: 0.7096 },
    },
  },
  rise: {
    step: "rise",
    captions: { high: "HIGH WAISTED PANTS", mid: "MID WAISTED PANTS", low: "LOW WAISTED PANTS" },
    thumbnail: {
      option: "high", image: "summary.rise.high", // image124, from image114
      crop: { left: 0, top: 0, right: 0, bottom: -72.651 },
      regionInStepPhoto: { x0: 0.1489, y0: 0.3179, x1: 0.8256, y1: 0.9108 },
    },
  },
  waistband: {
    step: "waistband",
    captions: { beltLoops: "BELT LOOPS PANTS", sideTabs: "SIDE TABS PANTS" },
    thumbnail: {
      option: "sideTabs", image: "summary.waistband.sideTabs", // image125, from image117
      crop: { left: 0, top: -2.251, right: 0, bottom: -70.194 },
      regionInStepPhoto: { x0: 0.2066, y0: 0.2714, x1: 0.746, y1: 0.7429 },
    },
  },
  cuff: {
    step: "cuff",
    // "ANKLE CUFFS REQUIRED" is the design's; the "without" caption follows it (to confirm).
    captions: { with: "ANKLE CUFFS REQUIRED", without: "NO ANKLE CUFFS" },
    thumbnail: {
      option: "with", image: "summary.cuff.with", // image126, from image119
      crop: { left: 0, top: -71.338, right: 0, bottom: 0 },
      regionInStepPhoto: { x0: 0.2026, y0: 0.496, x1: 0.7734, y1: 0.9919 },
    },
  },
} as const satisfies { [S in OptionStepId]?: SummaryRow<S> };

export type SummaryRowId = keyof typeof summaryRows;

export type SummaryTile = { caption: string; image: AssetKey; crop: DeckCrop };

/**
 * The tile for one chosen option: its dedicated thumbnail where screen 26 has one, otherwise
 * the option's own step photo, cropped to the same region the thumbnail shows.
 */
export function summaryTileFor(row: SummaryRowId, optionId: string): SummaryTile | null {
  const config = summaryRows[row] as SummaryRow<OptionStepId>;
  const option = optionSteps[row].options.find((o) => o.id === optionId);
  const caption = (config.captions as Record<string, string>)[optionId];
  if (!option || !caption) return null;
  if (config.thumbnail?.option === optionId) {
    return { caption, image: config.thumbnail.image, crop: config.thumbnail.crop };
  }
  const region = config.thumbnail
    ? within(config.thumbnail.regionInStepPhoto, visibleRegion(config.thumbnail.crop))
    : config.framing;
  return { caption, image: option.image, crop: cropFor(region!) };
}

/**
 * The deck's crop of the chosen style photo in the tall SUIT DESIGN tile. Slide 26 crops the
 * safari photo (image97) and slide 27 the 2-piece photo (image94); the other styles use the crop
 * of the photo series they belong to (same size and framing).
 */
export const suitDesignCrops: Record<OptionIdFor<"jacketStyle">, DeckCrop> = {
  twoPiece: { left: -0.081, top: 0, right: -0.081, bottom: -4.16 },
  threePiece: { left: -0.081, top: 0, right: -0.081, bottom: -4.16 },
  doubleBreasted: { left: -0.081, top: 0, right: -0.081, bottom: -4.16 },
  safari: { left: -10.932, top: -5.569, right: -10.932, bottom: 0 },
  tuxedo: { left: -10.932, top: -5.569, right: -10.932, bottom: 0 },
};

/**
 * Caption lines under SUIT DESIGN: the style, then the fit. The design shows one fit for both
 * ("SLIM FIT- SUIT AND PANT"); different fits are given a line each.
 */
export function fitCaption(jacketFit: string | undefined, pantsFit: string | undefined): string[] {
  if (!jacketFit && !pantsFit) return [];
  if (jacketFit === pantsFit) return [`${jacketFit}- SUIT AND PANT`];
  return [jacketFit && `${jacketFit}- SUIT`, pantsFit && `${pantsFit}- PANT`].filter((l): l is string => !!l);
}

/** Deck slide 26, CSS px at 1440px. Tops are from the top of the content area. */
export const summaryLayout = {
  /** The SUMMARY title box starts 6.3px above the strip's bottom edge. */
  titleTop: -6.3,
  titleBoxHeight: 47.47,
  /** Top of the first row's captions. */
  gridTop: 92.2,
  /** The grid's left edge (135.8) is 2.95px right of centred. */
  gridOffsetX: 2.95,
  tileWidth: 215.4,
  tileHeight: 164,
  suitDesignWidth: 243.9,
  columnGap: 17.2,
  /** Caption line bottom to tile (deck 2.6 for its 14.4 box; 3.84 for the 13.16 CSS line). */
  captionGap: 3.84,
  /** Tile bottom to the next caption. */
  rowGap: 6.8,
  /** Tile bottom to the SUIT DESIGN caption. */
  suitCaptionTop: 2.2,
  /** Centre of the swatch name on a fabric tile, from the tile top (deck 86.55). */
  swatchLabelCenter: 86.55,
  price: {
    /** TOTAL PRICE caption top; the block's right edge is the 81px gutter. */
    top: 486.4,
    /** Caption line bottom to the pill. */
    pillTop: 5.14,
    /** Pill bottom to the VAT note. */
    noteTop: 0.7,
    /** EXC. VAT: centre 39px left of the pill's right edge (deck 1320.05 vs 1359). */
    excVatRight: 39,
  },
  /** Below the price block: monogram, note and measurements (not in the design). */
  detailsTop: 40,
} as const;
