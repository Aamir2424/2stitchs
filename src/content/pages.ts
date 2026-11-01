// Copy for the public pages (home, how it works, our story).
// Home and How It Works copy is taken word for word from the design deck (slides 2-4).

import type { AssetKey } from "@/src/config/assets";
import { fabricFamilies, formatBasePrice } from "@/src/config/fabrics.config";

/** Lowest fabric base price; the hero's "STARTING FROM" line (AED 699.00 in screen 02). */
const lowestBasePrice = Math.min(...fabricFamilies.map((f) => f.basePrice));

export const homeHero = {
  title: "TAILORED SUITS",
  priceLine: `STARTING FROM ${formatBasePrice(lowestBasePrice)}`,
  // Slide 2, verbatim (design copy; claims such as "over 50 premium fabrics" and the
  // "Perfect Fit Guarantee" come from the design and need the owner's confirmation).
  paragraph:
    "Looking for a tailored suit that elevates your style and confidence? At 2Stitchs, every suit is crafted exclusively to your measurements, delivering exceptional quality and a flawless fit. Choose from over 50 premium fabrics and personalize every detail to create a suit that reflects your individual style. With our Perfect Fit Guarantee, your custom-made 2Stitchs suit is tailored to fit you with precision and elegance.",
  cta: { label: "DESIGN YOUR SUIT", href: "/design" },
};

/** Screen 03 tile row, in the design's order. All tiles open the wizard at step 1 (spec section 3). */
export const styleTiles: readonly { label: string; image: AssetKey; href: string }[] = [
  { label: "2 PIECE SUITS", image: "home.style.twoPiece", href: "/design" },
  { label: "3 PIECE SUITS", image: "home.style.threePiece", href: "/design" },
  { label: "DOUBLE BREASTED SUITS", image: "home.style.doubleBreasted", href: "/design" },
  { label: "SAFARI SUITS", image: "home.style.safari", href: "/design" },
  // The design reads "TUXIDO SUITS"; customer-facing copy uses "TUXEDO" (steering file).
  { label: "TUXEDO SUITS", image: "home.style.tuxedo", href: "/design" },
  { label: "TWEED SUITS", image: "home.style.tweed", href: "/design" },
  { label: "LINEN", image: "home.style.linen", href: "/design" },
];

export const styleSectionTitle = "CHOOSE YOUR STYLE";

export const howItWorks = {
  title: "STITCH YOUR DREAM SUIT",
  subtitle: "THE THREE STEP PROCESS",
  steps: [
    { number: "1", label: "SELECT YOUR FABRIC", icon: "home.step.fabric" },
    { number: "2", label: "PICK YOUR DESIGN", icon: "home.step.design" },
    { number: "3", label: "GET YOUR MEASURE", icon: "home.step.measure" },
  ] as const satisfies readonly { number: string; label: string; icon: AssetKey }[],
  cta: { label: "GET STARTED", href: "/design" },
};

/**
 * PLACEHOLDER: the final Our Story copy has not been supplied (no reference screen exists).
 * Replace `paragraphs` with the owner's text and set `isPlaceholder` to false.
 * Keep it free of factual claims until then.
 */
export const ourStory = {
  title: "OUR STORY",
  isPlaceholder: true,
  paragraphs: ["Our story is being written and will be shared here soon."],
  cta: { label: "DESIGN YOUR SUIT", href: "/design" },
};
