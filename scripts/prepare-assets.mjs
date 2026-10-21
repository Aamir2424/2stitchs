// Prepares the website assets from "powerpoint assets/" (Prompt 3 of prompt.md).
//
//   node scripts/prepare-assets.mjs
//
// - Reads originals from "powerpoint assets/" and never modifies them.
// - Writes optimized copies to public/images/ and public/videos/ (both are regenerated).
// - Writes src/config/assets.ts, the typed asset map used by every component.
// - Every mapping below comes from asset-manifest.md. The script checks each
//   (label, file) pair against the manifest and fails if any pair is not found there,
//   if a manifest file is neither mapped nor listed as unused, or if an output is missing.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "powerpoint assets");
const PUBLIC = path.join(ROOT, "public");
const IMG_OUT = path.join(PUBLIC, "images");
const VID_OUT = path.join(PUBLIC, "videos");
const MANIFEST = path.join(ROOT, "asset-manifest.md");
const TS_OUT = path.join(ROOT, "src", "config", "assets.ts");

// Optimization profiles. Images are never enlarged.
const PROFILES = {
  hero: { maxWidth: 1600, quality: 80 },
  texture: { maxWidth: 1600, quality: 78 },
  pattern: { maxWidth: 1600, quality: 80 },
  logo: { maxWidth: null, quality: 90, alphaQuality: 100 },
  tile: { maxWidth: 800, quality: 80 },
  thumb: { maxWidth: null, quality: 82 },
  poster: { maxWidth: null, quality: 75 },
  icon: { maxWidth: null, quality: 90, alphaQuality: 100 },
};

// Screen 04 step icons. Rectangles are the deck's own crops (slide4.xml <a:fillRect>),
// converted to source pixels and rounded: square crops of about 235-243 px.
const CROPS = {
  weave: { left: 119, top: 11, width: 240, height: 240 },
  jacket: { left: 371, top: 18, width: 243, height: 243 },
  tape: { left: 133, top: 244, width: 235, height: 235 },
};

/** @type {Array<{key:string, file:string, out:string, profile:string, label:string, alt:string, crop?:object}>} */
const IMAGES = [];
/** @type {Array<{key:string, file:string, out:string, label:string}>} */
const SVGS = [];
/** @type {Array<{key:string, file:string, out:string, label:string, poster:string}>} */
const VIDEOS = [];

const img = (key, file, out, profile, label, alt, crop) =>
  IMAGES.push({ key, file, out, profile, label, alt, crop });

// "NAVY PRINCE OF WALES CHECK" -> "navyPrinceOfWalesCheck"
const camel = (s) =>
  s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1))).join("");
const kebab = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ---- Shared UI and brand (manifest: Shared UI) ----
img("brand.logo", "image2.png", "brand/logo.webp", "logo", "Logo", "2Stitchs");
img("brand.headerTexture", "image1.png", "brand/header-linen.webp", "texture", "Header background", "");
img("ui.pattern", "image9.png", "ui/pattern.webp", "pattern", "Page background pattern", "");
img("ui.patternAlt", "image73.png", "ui/pattern-alt.webp", "pattern", "Page background pattern (alt)", "");
SVGS.push({ key: "ui.icon.account", file: "image6.svg", out: "ui/icon-account.svg", label: "Account icon" });
SVGS.push({ key: "ui.icon.cart", file: "image8.svg", out: "ui/icon-cart.svg", label: "Cart icon" });
SVGS.push({ key: "ui.icon.info", file: "image26.svg", out: "ui/icon-info.svg", label: "Info (i) icon" });

// ---- Home (screens 02-04) ----
img("home.hero", "image4.png", "brand/hero.webp", "hero", "Hero photo",
  "Man in a grey three-piece suit beside a wooden screen");
[
  ["twoPiece", "2 PIECE SUITS", "image10.png", "2 piece suit"],
  ["threePiece", "3 PIECE SUITS", "image11.png", "3 piece suit"],
  ["doubleBreasted", "DOUBLE BREASTED SUITS", "image12.png", "Double breasted suit"],
  ["safari", "SAFARI SUITS", "image13.png", "Safari suit"],
  ["tuxedo", "TUXEDO SUITS", "image14.png", "Tuxedo"],
  ["tweed", "TWEED SUITS", "image15.png", "Tweed suit"],
  ["linen", "LINEN", "image16.png", "Linen suit"],
].forEach(([k, label, file, alt]) =>
  img(`home.style.${k}`, file, `styles/${kebab(k)}.webp`, "tile", label, `Model wearing a ${alt.toLowerCase()}`));
img("home.step.fabric", "image18.png", "ui/step-fabric.webp", "icon", "1 SELECT YOUR FABRIC", "", CROPS.weave);
img("home.step.design", "image17.png", "ui/step-design.webp", "icon", "2 PICK YOUR DESIGN", "", CROPS.jacket);
img("home.step.measure", "image17.png", "ui/step-measure.webp", "icon", "3 GET YOUR MEASURE", "", CROPS.tape);

// ---- Fabrics (screens 05-12) ----
const FAMILIES = [
  ["wool", "Worsted Wool", "WORSTED WOOL", "image19.png", [
    ["MIDNIGHT NAVY", "image31.png"], ["CHARCOAL GREY", "image33.png"], ["MEDIUM GREY", "image35.png"],
    ["LIGHT GREY SHARKSKIN", "image37.png"], ["DARK CHOCOLATE BROWN", "image39.png"],
    ["OLIVE GREEN HERRINGBONE", "image32.png"], ["DEEP BURGUNDY", "image34.png"], ["SAND BEIGE", "image36.png"],
    ["NAVY PRINCE OF WALES CHECK", "image38.png"], ["NAVY PINSTRIPE", "image40.png"]]],
  ["linen", "Linen", "LINEN", "image20.png", [
    ["IVORY", "image44.png"], ["STONE GREY", "image46.png"], ["SKY BLUE", "image47.png"],
    ["TOBACCO BROWN", "image49.png"], ["RICH BLACK", "image51.png"], ["SAND BEIGE", "image45.png"],
    ["DEEP BURGUNDY", "image1.png"], ["OLIVE GREEN", "image48.png"], ["NAVY", "image50.png"],
    ["FOREST GREEN", "image52.png"]]],
  ["cotton", "Cotton", "COTTON", "image21.png", [
    ["MIDNIGHT NAVY", "image53.png"], ["KHAKI", "image55.png"], ["OLIVE GREEN TWILL", "image57.png"],
    ["DARK CHOCOLATE BROWN", "image59.png"], ["RICH BLACK", "image61.png"], ["CHARCOAL GREY", "image54.png"],
    ["STONE BEIGE", "image56.png"], ["SKY BLUE", "image58.png"], ["NAVY PINSTRIPE", "image60.png"],
    ["DEEP BURGUNDY", "image62.png"]]],
  ["velvet", "Velvet", "VELVET", "image22.png", [
    ["MIDNIGHT NAVY", "image63.png"], ["DEEP BURGUNDY", "image65.png"], ["ROYAL BLUE", "image67.png"],
    ["DARK CHOCOLATE BROWN", "image69.png"], ["PLUM PURPLE", "image71.png"], ["JET BLACK", "image64.png"],
    ["EMERALD GREEN", "image66.png"], ["FOREST GREEN", "image68.png"], ["CHARCOAL GREY", "image70.png"],
    ["CHAMPAGNE", "image72.png"]]],
  ["tweed", "Tweed", "TWEED", "image23.png", [
    ["BROWN HERRINGBONE", "image75.png"], ["CHARCOAL GREY HERRINGBONE", "image77.png"],
    ["LIGHT GREY DONEGAL", "image79.png"], ["CAMEL", "image81.png"], ["BURGUNDY", "image83.png"],
    ["OLIVE GREEN ESTATE", "image76.png"], ["MIDNIGHT NAVY", "image78.png"], ["BLUE WINDOWPANE", "image80.png"],
    ["FOREST GREEN", "image82.png"], ["PRINCE OF WALES", "image84.png"]]],
  ["polyBlend", "Polyester Blend", "POLYESTER BLEND", "image24.png", [
    ["MIDNIGHT NAVY", "image85.png"], ["LIGHT GREY", "image87.png"], ["DARK CHOCOLATE BROWN", "image89.png"],
    ["DEEP BURGUNDY", "image91.png"], ["NAVY PRINCE OF WALES CHECK", "image38.png"],
    ["CHARCOAL GREY", "image86.png"], ["JET BLACK", "image88.png"], ["OLIVE GREEN", "image90.png"],
    ["NAVY PINSTRIPE", "image92.png"], ["STONE BEIGE", "image93.png"]]],
];
for (const [fam, famName, famLabel, tile, swatches] of FAMILIES) {
  img(`fabric.${fam}.tile`, tile, `fabrics/${kebab(fam)}/tile.webp`, "tile", famLabel, `${famName} fabric`);
  for (const [label, file] of swatches) {
    const name = label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    img(`fabric.${fam}.${camel(label)}`, file, `fabrics/${kebab(fam)}/${kebab(label)}.webp`, "tile", label,
      `${famName} fabric swatch: ${name}`);
  }
}
img("fabric.tweed.tileSelected", "image74.png", "fabrics/tweed/tile-selected.webp", "tile", "Tweed", "Tweed fabric");
img("fabric.linen.tileHover", "image28.png", "fabrics/previews/linen-tile-hover.webp", "tile", "LINEN",
  "Beige linen suit jacket");
img("fabric.wool.hover.midnightNavy", "image41.png", "fabrics/previews/wool-midnight-navy.webp", "tile",
  "MIDNIGHT NAVY", "Model wearing a midnight navy worsted wool suit");
img("fabric.wool.hover.charcoalGrey", "image42.png", "fabrics/previews/wool-charcoal-grey.webp", "tile",
  "CHARCOAL GREY", "Model wearing a charcoal grey worsted wool suit");
img("fabric.wool.hover.mediumGrey", "image43.png", "fabrics/previews/wool-medium-grey.webp", "tile",
  "MEDIUM GREY", "Medium grey worsted wool jacket on a mannequin");

// ---- Jacket, lapel, waistcoat, vent (screens 13-18) ----
[
  ["jacket.style.twoPiece", "image94.png", "jackets/style-2-piece.webp", "2 PIECE SUITS", "Beige 2 piece suit"],
  ["jacket.style.threePiece", "image95.png", "jackets/style-3-piece.webp", "3 PIECE SUITS", "Beige 3 piece suit with waistcoat"],
  ["jacket.style.doubleBreasted", "image96.png", "jackets/style-double-breasted.webp", "DOUBLE BREASTED SUITS", "Beige double breasted suit"],
  ["jacket.style.safari", "image97.png", "jackets/style-safari.webp", "SAFARI SUITS", "Beige safari suit"],
  ["jacket.style.tuxedo", "image98.png", "jackets/style-tuxedo.webp", "TUXEDO SUITS", "Beige tuxedo with shawl lapel"],
  ["jacket.fit.regular", "image99.png", "jackets/fit-regular.webp", "REGULAR FIT", "Beige suit, regular fit"],
  ["jacket.fit.slim", "image100.png", "jackets/fit-slim.webp", "SLIM FIT", "Beige suit, slim fit"],
  ["lapel.thickness.narrow", "image102.png", "lapels/thickness-narrow.webp", "NARROW LAPEL", "Beige jacket with a narrow lapel"],
  ["lapel.thickness.medium", "image103.png", "lapels/thickness-medium.webp", "MEDIUM LAPEL", "Beige jacket with a medium lapel"],
  ["lapel.thickness.wide", "image101.png", "lapels/thickness-wide.webp", "WIDE LAPEL", "Beige jacket with a wide lapel"],
  ["lapel.style.notch", "image105.png", "lapels/style-notch.webp", "NOTCH LAPEL", "Close-up of a notch lapel"],
  ["lapel.style.peak", "image106.png", "lapels/style-peak.webp", "PEAK LAPEL", "Close-up of a peak lapel"],
  ["lapel.style.shawl", "image104.png", "lapels/style-shawl.webp", "SHAWL LAPEL", "Close-up of a shawl lapel"],
  ["waistcoat.singleBreasted", "image108.png", "waistcoats/single-breasted.webp", "SINGLE BREASTED WAISTCOAT", "Beige single breasted waistcoat"],
  ["waistcoat.doubleBreasted", "image109.png", "waistcoats/double-breasted.webp", "DOUBLE BREASTED WAIST COAT", "Beige double breasted waistcoat"],
  ["waistcoat.uShaped", "image107.png", "waistcoats/u-shaped.webp", "U-SHAPED WAISTCOAT", "Beige U-shaped waistcoat"],
  ["vent.center", "image110.png", "vents/center.webp", "CENTER VENT", "Back of a beige jacket with a center vent"],
  ["vent.side", "image111.png", "vents/side.webp", "SIDE VENT", "Back of a beige jacket with side vents"],
  // ---- Pants (screens 20-23) ----
  ["pants.fit.regular", "image112.png", "pants/fit-regular.webp", "REGULAR FIT", "Beige trousers, regular fit"],
  ["pants.fit.slim", "image113.png", "pants/fit-slim.webp", "SLIM FIT", "Beige trousers, slim fit"],
  ["pants.rise.high", "image114.png", "pants/rise-high.webp", "HIGH WAISTED", "Beige trousers, high waisted"],
  ["pants.rise.mid", "image116.png", "pants/rise-mid.webp", "MID WAISTED", "Beige trousers, mid waisted"],
  ["pants.rise.low", "image115.png", "pants/rise-low.webp", "LOW WAISTED", "Beige trousers, low waisted"],
  ["pants.waistband.beltLoops", "image113.png", "pants/fit-slim.webp", "BELT LOOPS", "Beige trousers with belt loops"],
  ["pants.waistband.sideTabs", "image117.png", "pants/waistband-side-tabs.webp", "SIDE TABS", "Beige trousers with side tabs"],
  ["pants.cuff.without", "image118.png", "pants/cuff-without.webp", "WITHOUT CUFF", "Trouser hems without cuffs"],
  ["pants.cuff.with", "image119.png", "pants/cuff-with.webp", "WITH CUFF", "Trouser hems with cuffs"],
  // ---- Monogram (screen 24) ----
  ["monogram.lining", "image120.png", "monogram/lining.webp", "Jacket lining photo", "Open beige jacket showing a monogram on the lining"],
].forEach(([key, file, out, label, alt]) => img(key, file, out, "tile", label, alt));

// ---- Summary (screens 26-28): dedicated thumbnails and previews ----
[
  ["summary.lapelThickness.wide", "image121.png", "summary/lapel-wide.webp", "WIDE LAPEL", "Wide lapel"],
  ["summary.lapelStyle.peak", "image122.png", "summary/lapel-peak.webp", "PEAK LAPEL", "Peak lapel"],
  ["summary.vent.side", "image123.png", "summary/vent-side.webp", "SIDE VENT", "Side vent"],
  ["summary.rise.high", "image124.png", "summary/rise-high.webp", "HIGH WAISTED PANTS", "High waisted pants"],
  ["summary.waistband.sideTabs", "image125.png", "summary/side-tabs.webp", "SIDE TABS PANTS", "Side tabs"],
  ["summary.cuff.with", "image126.png", "summary/cuff-with.webp", "ANKLE CUFFS REQUIRED", "Trousers with cuffs"],
].forEach(([key, file, out, label, alt]) => img(key, file, out, "thumb", label, alt));
[
  ["designed", "YOUR DESIGNED SUIT", "image127.png", "Model in a burgundy velvet jacket and navy trousers"],
  ["front", "FRONT PROFILE", "image128.png", "Front view of the burgundy velvet suit"],
  ["back", "BACK PROFILE", "image129.png", "Back view of the burgundy velvet suit"],
  ["side", "SIDE PROFILE", "image130.png", "Side view of the burgundy velvet suit"],
  ["closeUp", "CLOSE-UP SHOT", "image131.png", "Close-up of the burgundy velvet jacket"],
].forEach(([k, label, file, alt]) => img(`summary.preview.${k}`, file, `summary/preview-${kebab(k)}.webp`, "tile", label, alt));

// ---- Measurements (screens 30-41). Thigh has no asset (see MISSING). ----
[
  ["shoulderWidth", "SHOULDER WIDTH", "VAHOnh6O22M.mp4", "image132.jpeg"],
  ["sleeveLength", "SLEEVES LENGTH", "VAHOnpZu6vQ.mp4", "image133.jpeg"],
  ["stomach", "STOMACH", "VAHOnn9Sces.mp4", "image134.jpeg"],
  ["legLength", "LEG LENGTH", "VAHOn2011yM.mp4", "image135.jpeg"],
  ["pantsWaist", "PANTS WAIST", "VAHOnyibPYY.mp4", "image136.jpeg"],
  ["hips", "HIPS", "VAHOnxvG-90.mp4", "image137.jpeg"],
  ["neck", "NECK", "VAHOn-whX8Y.mp4", "image138.jpeg"],
  ["bodyLength", "BODY LENGTH", "VAHOny7vqiY.mp4", "image139.jpeg"],
  ["bicep", "BICEP", "VAHOn1JRpeU.mp4", "image140.jpeg"],
  ["rise", "RISE", "VAHOn5XfIns.mp4", "image141.jpeg"],
  ["wrist", "WRIST", "VAHOn5vgeiY.mp4", "image142.jpeg"],
].forEach(([m, label, video, poster]) => {
  img(`measurement.${m}.poster`, poster, `measurements/${kebab(m)}-poster.webp`, "poster", label,
    `How to measure: ${label.toLowerCase()}`);
  VIDEOS.push({ key: `measurement.${m}.video`, file: video, out: `measurements/${kebab(m)}.mp4`, label,
    poster: `measurement.${m}.poster` });
});

// Summary tiles: dedicated thumbnail where one exists, otherwise the verified step image,
// cropped by CSS to the framing given in asset-manifest.md (positions are set in Prompt 13).
// [tile key, asset key, framing or null when the thumbnail is dedicated]
const WAISTCOAT_FRAMING = "torso; the design has no waistcoat summary tile, approve visually";
const SUMMARY_TILES = [
  ["lapelThickness.narrow", "lapel.thickness.narrow", "chest and lapel, like summary.lapelThickness.wide"],
  ["lapelThickness.medium", "lapel.thickness.medium", "chest and lapel, like summary.lapelThickness.wide"],
  ["lapelThickness.wide", "summary.lapelThickness.wide", null],
  ["lapelStyle.notch", "lapel.style.notch", "lapel close-up, like summary.lapelStyle.peak"],
  ["lapelStyle.peak", "summary.lapelStyle.peak", null],
  ["lapelStyle.shawl", "lapel.style.shawl", "lapel close-up, like summary.lapelStyle.peak"],
  ["vent.center", "vent.center", "back of jacket, like summary.vent.side"],
  ["vent.side", "summary.vent.side", null],
  ["rise.high", "summary.rise.high", null],
  ["rise.mid", "pants.rise.mid", "waist, like summary.rise.high"],
  ["rise.low", "pants.rise.low", "waist, like summary.rise.high"],
  ["waistband.beltLoops", "pants.waistband.beltLoops", "waist, like summary.waistband.sideTabs"],
  ["waistband.sideTabs", "summary.waistband.sideTabs", null],
  ["cuff.with", "summary.cuff.with", null],
  ["cuff.without", "pants.cuff.without", "hems and shoes, like summary.cuff.with"],
  ["waistcoat.singleBreasted", "waistcoat.singleBreasted", WAISTCOAT_FRAMING],
  ["waistcoat.doubleBreasted", "waistcoat.doubleBreasted", WAISTCOAT_FRAMING],
  ["waistcoat.uShaped", "waistcoat.uShaped", WAISTCOAT_FRAMING],
];

// Known missing assets (asset-manifest.md "Missing assets"). Never fill these in.
const MISSING = {
  "measurement.thigh.video": "No thigh video exists. The hips video must not be shown on the thigh screen.",
  "measurement.thigh.illustration": "Thigh-specific static illustration required; not supplied yet.",
  "fabric.woolCashmere.swatch": "Wool & Cashmere fabric (screen 27) has no swatch image and is not offered.",
};

// Files deliberately not copied (asset-manifest.md "Unused assets").
const UNUSED = new Set(["image3.png", "image27.png", "image29.png", "image30.svg", "image5.png", "image7.png", "image25.png"]);

// ---------------------------------------------------------------------------

const fail = (msg) => { console.error(`\nERROR: ${msg}`); process.exit(1); };
const stem = (f) => f.replace(/\.(png|jpe?g|svg|mp4)$/i, "");

function verifyAgainstManifest() {
  const lines = fs.readFileSync(MANIFEST, "utf8").split("\n");
  const problems = [];
  const all = [...IMAGES, ...SVGS, ...VIDEOS];
  for (const e of all) {
    const re = new RegExp(`\\b${stem(e.file).replace(/[-]/g, "\\-")}(?![\\w-])`);
    const label = e.label.toLowerCase();
    const ok = lines.some((l) => re.test(l) && l.toLowerCase().includes(label));
    if (!ok) problems.push(`${e.key}: no manifest line pairs "${e.label}" with ${e.file}`);
  }
  for (const [, target] of SUMMARY_TILES) {
    if (!all.some((e) => e.key === target)) problems.push(`summary tile points to unknown key ${target}`);
  }
  // Swatch keys must spell the full label: every word of the label appears in the key.
  for (const e of IMAGES.filter((i) => /^fabric\.\w+\.\w+$/.test(i.key) && !/\.(tile|tileSelected|tileHover)$/.test(i.key))) {
    const tail = e.key.split(".").pop().toLowerCase();
    const words = e.label.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    if (tail !== words.join("")) problems.push(`key ${e.key} does not spell label "${e.label}"`);
  }
  const keys = all.map((e) => e.key);
  const dupes = keys.filter((k, i) => keys.indexOf(k) !== i);
  if (dupes.length) problems.push(`duplicate keys: ${dupes.join(", ")}`);
  const text = lines.join("\n");
  const referenced = new Set(text.match(/\b(?:image\d+\.(?:png|jpeg|svg)|VAHOn[\w-]+\.mp4)/g));
  const mapped = new Set(all.map((e) => e.file));
  for (const f of referenced) if (!mapped.has(f) && !UNUSED.has(f)) problems.push(`manifest file ${f} is neither mapped nor unused`);
  for (const f of mapped) if (!referenced.has(f)) problems.push(`mapped file ${f} is not in the manifest`);
  for (const f of mapped) if (!fs.existsSync(path.join(SRC_DIR, f))) problems.push(`source missing: ${f}`);
  if (problems.length) fail(`manifest check failed:\n  ${problems.join("\n  ")}`);
  return { pairs: all.length, referenced: referenced.size };
}

async function processImages() {
  const done = new Map(); // "file|profile|crop" -> output record (dedupe identical outputs)
  const results = {};
  for (const e of IMAGES) {
    const sig = `${e.file}|${e.profile}|${JSON.stringify(e.crop ?? null)}`;
    if (done.has(sig)) { results[e.key] = { ...done.get(sig), alt: e.alt }; continue; }
    const p = PROFILES[e.profile];
    const dest = path.join(IMG_OUT, e.out);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    let pipe = sharp(path.join(SRC_DIR, e.file));
    if (e.crop) pipe = pipe.extract(e.crop);
    if (p.maxWidth) pipe = pipe.resize({ width: p.maxWidth, withoutEnlargement: true });
    const info = await pipe
      .webp({ quality: p.quality, alphaQuality: p.alphaQuality ?? 100, effort: 6 })
      .toFile(dest);
    const rec = { src: `/images/${e.out}`, width: info.width, height: info.height, source: e.file,
      bytes: info.size, originalBytes: fs.statSync(path.join(SRC_DIR, e.file)).size };
    done.set(sig, rec);
    results[e.key] = { ...rec, alt: e.alt };
  }
  return results;
}

function copyFiles(list, outDir) {
  const results = {};
  for (const e of list) {
    const dest = path.join(outDir, e.out);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(SRC_DIR, e.file), dest);
    results[e.key] = { ...e, bytes: fs.statSync(dest).size };
  }
  return results;
}

function svgSize(file) {
  const s = fs.readFileSync(path.join(SRC_DIR, file), "utf8");
  const w = parseFloat(/\bwidth="([\d.]+)"/.exec(s)?.[1] ?? "0");
  const h = parseFloat(/\bheight="([\d.]+)"/.exec(s)?.[1] ?? "0");
  return { width: Math.round(w), height: Math.round(h) };
}

function writeTs(images, videos) {
  const q = JSON.stringify;
  const out = [];
  out.push(`// GENERATED by scripts/prepare-assets.mjs from asset-manifest.md. Do not edit by hand.`);
  out.push(`// Re-run: node scripts/prepare-assets.mjs`);
  out.push(``);
  out.push(`export type ImageAsset = {`);
  out.push(`  kind: "image";`);
  out.push(`  src: string;`);
  out.push(`  width: number;`);
  out.push(`  height: number;`);
  out.push(`  /** Alt text. Empty string means decorative. */`);
  out.push(`  alt: string;`);
  out.push(`  /** Original file in "powerpoint assets/". */`);
  out.push(`  source: string;`);
  out.push(`};`);
  out.push(``);
  out.push(`export type SvgAsset = { kind: "svg"; src: string; width: number; height: number; source: string };`);
  out.push(``);
  out.push(`export type VideoAsset = {`);
  out.push(`  kind: "video";`);
  out.push(`  src: string;`);
  out.push(`  type: "video/mp4";`);
  out.push(`  /** Key of the poster image in \`assets\`. */`);
  out.push(`  poster: string;`);
  out.push(`  bytes: number;`);
  out.push(`  source: string;`);
  out.push(`};`);
  out.push(``);
  out.push(`export type Asset = ImageAsset | SvgAsset | VideoAsset;`);
  out.push(``);
  out.push(`export const assets = {`);
  for (const e of IMAGES) {
    const r = images[e.key];
    out.push(`  ${q(e.key)}: { kind: "image", src: ${q(r.src)}, width: ${r.width}, height: ${r.height}, alt: ${q(r.alt)}, source: ${q(r.source)} },`);
  }
  for (const e of SVGS) {
    const { width, height } = svgSize(e.file);
    out.push(`  ${q(e.key)}: { kind: "svg", src: ${q(`/images/${e.out}`)}, width: ${width}, height: ${height}, source: ${q(e.file)} },`);
  }
  for (const e of VIDEOS) {
    out.push(`  ${q(e.key)}: { kind: "video", src: ${q(`/videos/${e.out}`)}, type: "video/mp4", poster: ${q(e.poster)}, bytes: ${videos[e.key].bytes}, source: ${q(e.file)} },`);
  }
  out.push(`} as const satisfies Record<string, Asset>;`);
  out.push(``);
  out.push(`export type AssetKey = keyof typeof assets;`);
  out.push(``);
  out.push(`export type SummaryTile = {`);
  out.push(`  asset: AssetKey;`);
  out.push(`  /** True when the design has a dedicated summary thumbnail for this option. */`);
  out.push(`  dedicated: boolean;`);
  out.push(`  /** For reused step images: the framing to crop to with CSS (set in Prompt 13). */`);
  out.push(`  framing: string | null;`);
  out.push(`};`);
  out.push(``);
  out.push(`/** Summary and production-ticket tiles (asset-manifest.md, "Summary tiles for every option"). */`);
  out.push(`export const summaryTiles = {`);
  for (const [k, target, framing] of SUMMARY_TILES) {
    out.push(`  ${q(k)}: { asset: ${q(target)}, dedicated: ${framing === null}, framing: ${q(framing)} },`);
  }
  out.push(`} as const satisfies Record<string, SummaryTile>;`);
  out.push(``);
  out.push(`/** Assets that do not exist. Show a clearly marked placeholder; never substitute another file. */`);
  out.push(`export const missingAssets = {`);
  for (const [k, why] of Object.entries(MISSING)) out.push(`  ${q(k)}: ${q(why)},`);
  out.push(`} as const;`);
  out.push(``);
  out.push(`export type MissingAssetKey = keyof typeof missingAssets;`);
  out.push(``);
  out.push(`export function getAsset<K extends AssetKey>(key: K): (typeof assets)[K] {`);
  out.push(`  return assets[key];`);
  out.push(`}`);
  out.push(``);
  fs.mkdirSync(path.dirname(TS_OUT), { recursive: true });
  fs.writeFileSync(TS_OUT, out.join("\n"));
}

function verifyOutputs() {
  const ts = fs.readFileSync(TS_OUT, "utf8");
  const srcs = [...ts.matchAll(/src: "([^"]+)"/g)].map((m) => m[1]);
  const missing = srcs.filter((s) => !fs.existsSync(path.join(PUBLIC, s)));
  if (missing.length) fail(`assets.ts references files that do not exist:\n  ${missing.join("\n  ")}`);
  return srcs.length;
}

const mb = (n) => `${(n / 1e6).toFixed(2)} MB`;

const check = verifyAgainstManifest();
fs.rmSync(IMG_OUT, { recursive: true, force: true });
fs.rmSync(VID_OUT, { recursive: true, force: true });
const images = await processImages();
const svgs = copyFiles(SVGS, IMG_OUT);
const videos = copyFiles(VIDEOS, VID_OUT);
writeTs(images, videos);
const refs = verifyOutputs();

// Size report: each source and each output counted once.
const uniqOut = new Map(Object.values(images).map((r) => [r.src, r]));
const usedSources = new Map([...uniqOut.values()].map((r) => [r.source, r.originalBytes]));
const origImg = [...usedSources.values()].reduce((a, b) => a + b, 0);
const optImg = [...uniqOut.values()].reduce((a, r) => a + r.bytes, 0);
const svgBytes = Object.values(svgs).reduce((a, r) => a + r.bytes, 0);
const vidBytes = Object.values(videos).reduce((a, r) => a + r.bytes, 0);

console.log(`Manifest check: ${check.pairs} label/file pairs verified; ${check.referenced} files referenced in the manifest.`);
console.log(`Keys: ${Object.keys(images).length + SVGS.length + VIDEOS.length} assets, ${SUMMARY_TILES.length} summary tiles, ${Object.keys(MISSING).length} missing.`);
console.log(`Output files referenced by assets.ts: ${refs} (all exist).`);
console.log(`Raster images: ${usedSources.size} sources ${mb(origImg)} -> ${uniqOut.size} WebP files ${mb(optImg)} (${(100 - (optImg / origImg) * 100).toFixed(1)}% smaller)`);
console.log(`SVG icons copied: ${SVGS.length} (${(svgBytes / 1024).toFixed(1)} KB)`);
console.log(`Videos copied: ${VIDEOS.length} (${mb(vidBytes)}); largest ${mb(Math.max(...Object.values(videos).map((v) => v.bytes)))}`);
for (const v of Object.values(videos)) console.log(`  ${v.out.padEnd(34)} ${mb(v.bytes)}${v.bytes > 30e6 ? "  OVER 30 MB" : ""}`);
const big = [...uniqOut.values()].sort((a, b) => b.bytes - a.bytes).slice(0, 5);
console.log(`Largest WebP outputs:`);
for (const r of big) console.log(`  ${r.src.padEnd(44)} ${(r.bytes / 1024).toFixed(0)} KB  (${r.width}x${r.height}, from ${r.source} ${mb(r.originalBytes)})`);
