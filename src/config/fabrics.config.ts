// Fabric families and swatches for the fabric picker (wizard steps 1-2).
// Sources: suit-website-mvp-spec.md section 4.1 (base prices, deltas), reference screens 05-12
// (names, slot order, "+AED 99.00"), asset-manifest.md (images, hover previews, Tweed overlay).
// Image keys are checked against src/config/assets.ts at compile time.

import type { AssetKey } from "@/src/config/assets";
import { priceCurrency, type DeckCrop } from "@/src/config/steps.config";

export type Swatch = {
  /** Stable id, unique within its family. */
  id: string;
  /** Name exactly as shown in the design. */
  label: string;
  image: AssetKey;
  /** Added to the price in AED. 0 shows no price text. */
  priceDelta: number;
  /** Supplier fabric code. None are verified yet (asset-manifest.md), so all are null. Never guess. */
  fabricCode: string | null;
  /** The deck's crop, when it isn't a centred cover crop. */
  crop?: DeckCrop;
  /** Garment photo shown over the swatch on hover (screen 07). Only where the manifest lists one. */
  hover?: { image: AssetKey; crop: DeckCrop };
};

export type FabricFamily = {
  id: string;
  /** Name for prose and alt text. */
  name: string;
  /** Tile caption exactly as shown in the design. */
  label: string;
  /** Base price in AED (spec 4.1). */
  basePrice: number;
  tileImage: AssetKey;
  /** Image for the selected tile when it differs from the screen 05 tile. */
  selectedTileImage?: AssetKey;
  /** Text shown on the screen 05 tile instead of the price. */
  tileNote?: readonly string[];
  /** Darken the screen 05 tile (CSS overlay). */
  tileShade?: boolean;
  /** Image that slides in over the screen 05 tile on hover. */
  tileHover?: { image: AssetKey };
  /** Page pattern while this family's swatches are shown (manifest: image73 on screens 11-12). */
  background?: "alt";
  swatches: readonly Swatch[];
};

export const fabricFamilies = [
  {
    id: "wool",
    name: "Worsted Wool",
    label: "WORSTED WOOL",
    basePrice: 799,
    tileImage: "fabric.wool.tile",
    swatches: [
      { id: "midnightNavy", label: "MIDNIGHT NAVY", image: "fabric.wool.midnightNavy", priceDelta: 0, fabricCode: null, crop: { left: 0, top: -57.707, right: 0, bottom: -52.362 },
        hover: { image: "fabric.wool.hover.midnightNavy", crop: { left: -107.157, top: -32.617, right: -108.207, bottom: -98.499 } } },
      { id: "charcoalGrey", label: "CHARCOAL GREY", image: "fabric.wool.charcoalGrey", priceDelta: 0, fabricCode: null,
        hover: { image: "fabric.wool.hover.charcoalGrey", crop: { left: -67.959, top: -32.187, right: -65.685, bottom: -100.951 } } },
      { id: "mediumGrey", label: "MEDIUM GREY", image: "fabric.wool.mediumGrey", priceDelta: 0, fabricCode: null,
        hover: { image: "fabric.wool.hover.mediumGrey", crop: { left: -6.962, top: -4.925, right: -7.712, bottom: -8.953 } } },
      { id: "lightGreySharkskin", label: "LIGHT GREY SHARKSKIN", image: "fabric.wool.lightGreySharkskin", priceDelta: 0, fabricCode: null },
      { id: "darkChocolateBrown", label: "DARK CHOCOLATE BROWN", image: "fabric.wool.darkChocolateBrown", priceDelta: 0, fabricCode: null },
      { id: "oliveGreenHerringbone", label: "OLIVE GREEN HERRINGBONE", image: "fabric.wool.oliveGreenHerringbone", priceDelta: 0, fabricCode: null },
      { id: "deepBurgundy", label: "DEEP BURGUNDY", image: "fabric.wool.deepBurgundy", priceDelta: 0, fabricCode: null },
      { id: "sandBeige", label: "SAND BEIGE", image: "fabric.wool.sandBeige", priceDelta: 0, fabricCode: null },
      { id: "navyPrinceOfWalesCheck", label: "NAVY PRINCE OF WALES CHECK", image: "fabric.wool.navyPrinceOfWalesCheck", priceDelta: 99, fabricCode: null },
      { id: "navyPinstripe", label: "NAVY PINSTRIPE", image: "fabric.wool.navyPinstripe", priceDelta: 99, fabricCode: null },
    ],
  },
  {
    id: "linen",
    name: "Linen",
    label: "LINEN",
    basePrice: 999,
    tileImage: "fabric.linen.tile",
    // Screen 05: image28 slides in over the tile on hover (manifest: Linen hover preview).
    tileHover: { image: "fabric.linen.tileHover" },
    swatches: [
      { id: "ivory", label: "IVORY", image: "fabric.linen.ivory", priceDelta: 0, fabricCode: null },
      { id: "stoneGrey", label: "STONE GREY", image: "fabric.linen.stoneGrey", priceDelta: 0, fabricCode: null },
      { id: "skyBlue", label: "SKY BLUE", image: "fabric.linen.skyBlue", priceDelta: 0, fabricCode: null },
      { id: "tobaccoBrown", label: "TOBACCO BROWN", image: "fabric.linen.tobaccoBrown", priceDelta: 0, fabricCode: null },
      { id: "richBlack", label: "RICH BLACK", image: "fabric.linen.richBlack", priceDelta: 0, fabricCode: null },
      { id: "sandBeige", label: "SAND BEIGE", image: "fabric.linen.sandBeige", priceDelta: 0, fabricCode: null },
      { id: "deepBurgundy", label: "DEEP BURGUNDY", image: "fabric.linen.deepBurgundy", priceDelta: 0, fabricCode: null },
      { id: "oliveGreen", label: "OLIVE GREEN", image: "fabric.linen.oliveGreen", priceDelta: 0, fabricCode: null },
      { id: "navy", label: "NAVY", image: "fabric.linen.navy", priceDelta: 0, fabricCode: null },
      { id: "forestGreen", label: "FOREST GREEN", image: "fabric.linen.forestGreen", priceDelta: 0, fabricCode: null },
    ],
  },
  {
    id: "cotton",
    name: "Cotton",
    label: "COTTON",
    basePrice: 799,
    tileImage: "fabric.cotton.tile",
    swatches: [
      { id: "midnightNavy", label: "MIDNIGHT NAVY", image: "fabric.cotton.midnightNavy", priceDelta: 0, fabricCode: null },
      { id: "khaki", label: "KHAKI", image: "fabric.cotton.khaki", priceDelta: 0, fabricCode: null },
      { id: "oliveGreenTwill", label: "OLIVE GREEN TWILL", image: "fabric.cotton.oliveGreenTwill", priceDelta: 0, fabricCode: null },
      { id: "darkChocolateBrown", label: "DARK CHOCOLATE BROWN", image: "fabric.cotton.darkChocolateBrown", priceDelta: 0, fabricCode: null },
      { id: "richBlack", label: "RICH BLACK", image: "fabric.cotton.richBlack", priceDelta: 0, fabricCode: null },
      { id: "charcoalGrey", label: "CHARCOAL GREY", image: "fabric.cotton.charcoalGrey", priceDelta: 0, fabricCode: null },
      { id: "stoneBeige", label: "STONE BEIGE", image: "fabric.cotton.stoneBeige", priceDelta: 0, fabricCode: null },
      { id: "skyBlue", label: "SKY BLUE", image: "fabric.cotton.skyBlue", priceDelta: 0, fabricCode: null },
      { id: "navyPinstripe", label: "NAVY PINSTRIPE", image: "fabric.cotton.navyPinstripe", priceDelta: 0, fabricCode: null },
      { id: "deepBurgundy", label: "DEEP BURGUNDY", image: "fabric.cotton.deepBurgundy", priceDelta: 0, fabricCode: null },
    ],
  },
  {
    id: "velvet",
    name: "Velvet",
    label: "VELVET",
    basePrice: 899,
    tileImage: "fabric.velvet.tile",
    swatches: [
      { id: "midnightNavy", label: "MIDNIGHT NAVY", image: "fabric.velvet.midnightNavy", priceDelta: 0, fabricCode: null },
      { id: "deepBurgundy", label: "DEEP BURGUNDY", image: "fabric.velvet.deepBurgundy", priceDelta: 0, fabricCode: null },
      { id: "royalBlue", label: "ROYAL BLUE", image: "fabric.velvet.royalBlue", priceDelta: 0, fabricCode: null },
      { id: "darkChocolateBrown", label: "DARK CHOCOLATE BROWN", image: "fabric.velvet.darkChocolateBrown", priceDelta: 0, fabricCode: null },
      { id: "plumPurple", label: "PLUM PURPLE", image: "fabric.velvet.plumPurple", priceDelta: 0, fabricCode: null },
      { id: "jetBlack", label: "JET BLACK", image: "fabric.velvet.jetBlack", priceDelta: 0, fabricCode: null },
      { id: "emeraldGreen", label: "EMERALD GREEN", image: "fabric.velvet.emeraldGreen", priceDelta: 0, fabricCode: null },
      { id: "forestGreen", label: "FOREST GREEN", image: "fabric.velvet.forestGreen", priceDelta: 0, fabricCode: null },
      { id: "charcoalGrey", label: "CHARCOAL GREY", image: "fabric.velvet.charcoalGrey", priceDelta: 0, fabricCode: null },
      { id: "champagne", label: "CHAMPAGNE", image: "fabric.velvet.champagne", priceDelta: 0, fabricCode: null },
    ],
  },
  {
    id: "tweed",
    name: "Tweed",
    label: "TWEED",
    basePrice: 899,
    tileImage: "fabric.tweed.tile",
    // Screen 05 shows this note instead of the price; the price (screen 11) shows once selected.
    tileNote: ["WINTER WEAR", "COUNTRY STYLE"],
    // The deck darkens the screen 05 tile with a near-black layer at 66% (image27); a CSS overlay here.
    tileShade: true,
    // Screen 11 shows a different image (image74) on the selected Tweed tile.
    selectedTileImage: "fabric.tweed.tileSelected",
    background: "alt",
    swatches: [
      { id: "brownHerringbone", label: "BROWN HERRINGBONE", image: "fabric.tweed.brownHerringbone", priceDelta: 0, fabricCode: null },
      { id: "charcoalGreyHerringbone", label: "CHARCOAL GREY HERRINGBONE", image: "fabric.tweed.charcoalGreyHerringbone", priceDelta: 0, fabricCode: null },
      { id: "lightGreyDonegal", label: "LIGHT GREY DONEGAL", image: "fabric.tweed.lightGreyDonegal", priceDelta: 0, fabricCode: null },
      { id: "camel", label: "CAMEL", image: "fabric.tweed.camel", priceDelta: 0, fabricCode: null },
      { id: "burgundy", label: "BURGUNDY", image: "fabric.tweed.burgundy", priceDelta: 0, fabricCode: null },
      { id: "oliveGreenEstate", label: "OLIVE GREEN ESTATE", image: "fabric.tweed.oliveGreenEstate", priceDelta: 0, fabricCode: null },
      { id: "midnightNavy", label: "MIDNIGHT NAVY", image: "fabric.tweed.midnightNavy", priceDelta: 0, fabricCode: null },
      { id: "blueWindowpane", label: "BLUE WINDOWPANE", image: "fabric.tweed.blueWindowpane", priceDelta: 0, fabricCode: null },
      { id: "forestGreen", label: "FOREST GREEN", image: "fabric.tweed.forestGreen", priceDelta: 0, fabricCode: null },
      { id: "princeOfWales", label: "PRINCE OF WALES", image: "fabric.tweed.princeOfWales", priceDelta: 0, fabricCode: null },
    ],
  },
  {
    id: "polyBlend",
    name: "Polyester Blend",
    label: "POLYESTER BLEND",
    basePrice: 699,
    tileImage: "fabric.polyBlend.tile",
    background: "alt",
    swatches: [
      { id: "midnightNavy", label: "MIDNIGHT NAVY", image: "fabric.polyBlend.midnightNavy", priceDelta: 0, fabricCode: null },
      { id: "lightGrey", label: "LIGHT GREY", image: "fabric.polyBlend.lightGrey", priceDelta: 0, fabricCode: null },
      { id: "darkChocolateBrown", label: "DARK CHOCOLATE BROWN", image: "fabric.polyBlend.darkChocolateBrown", priceDelta: 0, fabricCode: null },
      { id: "deepBurgundy", label: "DEEP BURGUNDY", image: "fabric.polyBlend.deepBurgundy", priceDelta: 0, fabricCode: null },
      { id: "navyPrinceOfWalesCheck", label: "NAVY PRINCE OF WALES CHECK", image: "fabric.polyBlend.navyPrinceOfWalesCheck", priceDelta: 0, fabricCode: null },
      { id: "charcoalGrey", label: "CHARCOAL GREY", image: "fabric.polyBlend.charcoalGrey", priceDelta: 0, fabricCode: null },
      { id: "jetBlack", label: "JET BLACK", image: "fabric.polyBlend.jetBlack", priceDelta: 0, fabricCode: null },
      { id: "oliveGreen", label: "OLIVE GREEN", image: "fabric.polyBlend.oliveGreen", priceDelta: 0, fabricCode: null },
      { id: "navyPinstripe", label: "NAVY PINSTRIPE", image: "fabric.polyBlend.navyPinstripe", priceDelta: 0, fabricCode: null },
      { id: "stoneBeige", label: "STONE BEIGE", image: "fabric.polyBlend.stoneBeige", priceDelta: 0, fabricCode: null },
    ],
  },
] as const satisfies readonly FabricFamily[];

export type FabricFamilyId = (typeof fabricFamilies)[number]["id"];

type FamilyById<F extends FabricFamilyId> = Extract<(typeof fabricFamilies)[number], { id: F }>;

/** Swatch ids allowed for a family, e.g. "ivory" | "stoneGrey" | ... for linen. */
export type SwatchIdFor<F extends FabricFamilyId> = FamilyById<F>["swatches"][number]["id"];

export function getFamily(id: FabricFamilyId): FabricFamily {
  const family = fabricFamilies.find((f) => f.id === id);
  if (!family) throw new Error(`Unknown fabric family ${id}`);
  return family;
}

/** "STARTING FROM" price line on a family tile, e.g. "AED 799.00". */
export function formatBasePrice(amount: number): string {
  return `${priceCurrency} ${amount.toFixed(2)}`;
}

/** Swatch premium exactly as the design writes it (screen 06): "+AED 99.00". */
export function formatSwatchDelta(amount: number): string | null {
  return amount > 0 ? `+${priceCurrency} ${amount.toFixed(2)}` : null;
}

/**
 * Picker geometry at the 1440px design, in CSS px, from the deck (slides 5-12).
 * The row spans x 53.3-1386.7. Components convert these to percentages of the row width.
 */
export const fabricLayout = {
  title: "PICK YOUR MATERIAL",
  /** Content-area top (below the promo strip) to the title box, and title box to tiles. */
  titleTop: 18.2,
  tilesTop: 24.3,
  rowWidth: 1333.4,
  /** Screen 05 family tiles: 215.4 x 323.6, left edges relative to the row. */
  tile: { width: 215.4, height: 323.6, lefts: [0, 223.5, 447.2, 670.8, 894.4, 1118] },
  /** Screens 06-12: the selected tile moves to the row start and grows slightly. */
  selectedTile: { width: 217.9, height: 327.4 },
  /** 2 x 5 swatch grid with no gaps; cells 215.4 x 164 (top row) and 162.5 (bottom row). */
  grid: { left: 226.2, width: 1077, height: 326.6, topRowHeight: 164 },
  /** Swatch name top edge inside its cell (deck text box plus the 3.5px the text sits lower). */
  swatchLabelTop: [83.5, 75.7],
  /** Price block (two lines) starts 150px into the tile; info icon 25.4px, 284.3px down, 31% opacity. */
  priceTop: 150.4,
  infoIcon: { size: 25.4, top: 284.3, opacity: 0.31 },
  /** Family caption sits 6px under its tile. */
  captionGap: 6,
} as const;
