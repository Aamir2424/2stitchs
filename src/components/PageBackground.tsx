import { getAsset } from "@/src/config/assets";

type Props = {
  /** "alt" uses image73 (screens 11-12 only, per asset-manifest.md). */
  variant?: "default" | "alt";
};

// Faint geometric pattern behind the white content area (DESIGN.md, "Background textures").
// The deck shows the pattern at 5% opacity, scaled to page width and fixed relative to the
// viewport (every screen shows the same window of it). The image is not a seamless tile, so it
// stays fixed instead of scrolling; repeat-y only covers very tall viewports.
export default function PageBackground({ variant = "default" }: Props) {
  const pattern = getAsset(variant === "alt" ? "ui.patternAlt" : "ui.pattern");
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-repeat-y opacity-(--pattern-opacity)"
      style={{
        backgroundImage: `url(${pattern.src})`,
        backgroundSize: "100% auto",
        backgroundPosition: "center var(--pattern-offset-y)",
      }}
    />
  );
}
