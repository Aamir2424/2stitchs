// Site-wide content for the shared shell (header and promo strip).
// Values come from the design (reference/screen_02.png) and suit-website-mvp-spec.md.

export type NavLink = { label: string; href: string };

/**
 * Header navigation. Routes follow the spec's site map (section 3).
 * Only "/" exists so far; the others are built in later prompts.
 */
export const mainNav: readonly NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "OUR STORY", href: "/our-story" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
];

export const designCta: NavLink = { label: "DESIGN YOUR SUIT", href: "/design" };

/** Region badge shown in the header ("AE" in the design). Display only. */
export const regionBadge = "AE";

/**
 * Free-shipping promo strip.
 * UNCONFIRMED: the design shows "USD 500" while all prices are AED. Keep the design's value
 * and currency as-is until the owner confirms them. Do not convert the amount.
 */
export const freeShipping = {
  amount: 500,
  currency: "USD",
  confirmed: false,
} as const;

export function freeShippingMessage(): string {
  return `FREE SHIPPING ON ORDERS OVER ${freeShipping.currency} ${freeShipping.amount}`;
}

/**
 * Cart and account icons are shown as in the design, but their behaviour is undecided
 * (asset-manifest.md, "Still-open product decisions"). They render as non-interactive images.
 */
export const headerIcons = { cartEnabled: false, accountEnabled: false } as const;
