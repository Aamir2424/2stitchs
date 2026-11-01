import localFont from "next/font/local";

// Monogram style fonts (screen 24), approved October 29, 2026. Self-hosted, unmodified files from
// each font's official upstream repository, with their licence files, in public/fonts/
// (DESIGN.md, "Monogram fonts"). All four are SIL Open Font License 1.1.
// Only the "ABC" samples use them, so they aren't preloaded with the /design page; they load
// when the monogram step first renders.
//
// Each font sets a CSS variable on the element given its `.variable` class (MonogramStep);
// the font-monogram-* tokens in app/globals.css (@theme inline) read those variables.

export const arimoBold = localFont({
  src: "../../public/fonts/arimo/Arimo-Bold.woff2",
  weight: "700",
  style: "normal",
  variable: "--font-arimo",
  preload: false,
  adjustFontFallback: false,
});

export const courierPrimeBold = localFont({
  src: "../../public/fonts/courier-prime/CourierPrime-Bold.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-courier-prime",
  preload: false,
  adjustFontFallback: false,
});

export const cormorantGaramondBoldItalic = localFont({
  src: "../../public/fonts/cormorant-garamond/CormorantGaramond-BoldItalic.woff2",
  weight: "700",
  style: "italic",
  variable: "--font-cormorant-garamond",
  preload: false,
  adjustFontFallback: false,
});

export const tinosBold = localFont({
  src: "../../public/fonts/tinos/Tinos-Bold.woff2",
  weight: "700",
  style: "normal",
  variable: "--font-tinos",
  preload: false,
  adjustFontFallback: false,
});

/** Class names that declare the four font variables; put them on an ancestor of the samples. */
export const monogramFontVariables = [arimoBold, courierPrimeBold, cormorantGaramondBoldItalic, tinosBold]
  .map((font) => font.variable)
  .join(" ");
