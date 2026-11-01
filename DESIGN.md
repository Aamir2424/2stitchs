# 2Stitchs Design System

The tokens live once, in `app/globals.css` (`@theme`). This file documents each value and where it
came from. Built for screens 01–04, with prices, labels and inputs checked on other screens.

## Sources and method

- **No `ppt-theme.md` exists.** The deck's `ppt/theme/theme1.xml` holds only the default Office
  palette (Calibri, blue/orange accents), which the design never uses, so it was ignored.
- **Exact values come from the design deck itself.** Every text box and shape in
  `~/Desktop/twostitchs/suit-extracted/ppt/slides/slideN.xml` carries its own font, size,
  tracking, line spacing and fill colour. These are the designer's values, not estimates.
- **Every value was checked against the screenshots** (`reference/screen_NN.png`):
  - Scale: the slide is 1440 × 810 pt and the site area starts at y = 64 (above it is the browser
    chrome). In screens 02–04 the page measures 1905 px across, i.e. 1.3229 screenshot px per pt.
    The header measures 133.8 pt (deck 133.4) and the strip 29.5 pt (deck 30). So **1 deck pt =
    1 CSS px on a 1440 px-wide page**, and every size below is in CSS px at that width.
  - Type: cap heights measure 0.66–0.73 × the deck font size on every style checked (heading,
    hero title, hero price, eyebrow, step labels, tile labels, nav), the normal range for a
    geometric sans like Muller. Glyph gaps confirm the wide tracking (heading: 12.1 px between
    glyphs vs 9.64 px tracking plus side bearings).
  - Colour: the screenshots carry a "Display" ICC profile. Converting the deck colours into
    that profile reproduces the flat screenshot pixels exactly: pill #611921 → #591F23 (every
    pixel inside the GET STARTED and hero pills), strip #545454 → #545454. Heading text is too
    thin and anti-aliased to sample a clean pixel; it uses the deck value #661414 (#5D1B18 in
    the screenshot profile). So raw screenshot pixels must not be copied as hex values; the deck
    sRGB values are the correct CSS values.
- **Estimates** are marked *estimate*. These are only the corner radii (fitted from screenshot
  edge profiles, ±0.5 px) and anything about responsive behaviour.

## Typeface

| | |
|---|---|
| Family | **Muller** for everything: headings, body, buttons, prices, labels |
| Weights | Muller Bold (700) for all uppercase UI text; Muller Regular (400) for running copy |
| Token | `--font-muller` (also `--font-sans`, so it is the page default); utility `font-muller` |
| Files | **Not available. Font-file integration is pending.** |

The site does **not** load Muller, and no other font is loaded in its place or under its name. The
token is `"Muller", ui-sans-serif, system-ui, sans-serif`, so browsers show the generic system
sans-serif until licensed files exist. Because the fallback has different glyph widths, text widths
and line breaks will differ from the screenshots until then; sizes, tracking and line heights are
already correct.

To finish: confirm Muller's web-use licence, put the licensed web font files (Regular 400, Bold
700) in `public/fonts/`, load them in `app/layout.tsx` with `next/font/local`, and point
`--font-muller` at the loaded family. Never use the deck's embedded `.fntdata` files.

Copy is typed in capitals in the design (no `text-transform`). Keep UI copy uppercase in the
config, or apply `uppercase` consistently; the hero paragraph and measurement instructions are
the only sentence-case texts.

## Colours

| Token | Value | Use | Source |
|---|---|---|---|
| `burgundy` | `#611921` | Pill buttons, pill inputs, outlines (1.5 px checkboxes, 3 px textarea), AE badge text, tailor-note text | s02, s04, s19, s24–s26, s29 |
| `maroon` | `#661414` | Section headings and subheadings | s03, s04 (all headings to s41) |
| `ink` | `#000000` | Labels, captions, body text on white | s03, s04, s29 |
| `paper` | `#FFFFFF` | Page background; text on burgundy and on photos | all |
| `strip` | `rgb(0 0 0 / 0.67)` | Promo strip. Renders #545454 on white (verified); over the hero photo it is see-through | s02–s04 |
| `strip-text` | `rgb(255 255 255 / 0.67)` | Promo strip text | s02–s04 |

Other colours come from the artwork: the header linen (`image1`), the pattern lines (about #7D4F4B
inside `image9`, shown at 5% opacity), and the info icon (`image26.svg` at 31% opacity on fabric
tiles, s05–s12).

## Type scale

All sizes are CSS px at 1440 px width; the CSS stores them in rem (px / 16). Each `text-*`
utility also sets line height, tracking and weight. Tracking comes in two families: **0.463em**
for headings, buttons and the strip, and **0.194em** for labels.

| Token | Size | Weight | Tracking | Line height | Used for | Measured on |
|---|---:|---:|---:|---:|---|---|
| `text-input-display` | 25.76 | 700 | 0.463em | 2.28 | Monogram input text | s24 |
| `text-display` | 24.82 | 700 | 0.463em | 2.28 | TAILORED SUITS | **s02** |
| `text-heading` | 20.82 | 700 | 0.463em | 2.28 | Section headings | **s03, s04**; same on s05–s29 |
| `text-button-lg` | 15.82 | 700 | 0.463em | 2.28 | SUBMIT | s25 |
| `text-step-number` | 15.2 | 700 | 0.194em | 1.40 | Step numbers 1, 2, 3 | **s04** |
| `text-subheading` | 14.82 | 700 | 0.463em | 2.28 | YOUR DIGITAL PROFILE, measurement names | s29–s41 |
| `text-tagline` | 13.82 | 700 | 0.463em | 2.28 | STARTING FROM AED 699.00 | **s02** |
| `text-lead` | 12.67 | 400 | 0.062em | 1.85 | Hero paragraph (justified) | **s02** |
| `text-eyebrow` | 12.3 | 700 | 0.194em | 1.40 | THE THREE STEP PROCESS | **s04** |
| `text-button` | 11.82 | 700 | 0.463em | 2.28 | DESIGN YOUR SUIT, GET STARTED, price pill, YES/NO | **s02, s04**, s26 (s19: 11.76) |
| `text-label-lg` | 11.5 | 700 | 0.194em | 1.40 | Step labels; STARTING FROM on fabric tiles | **s04**, s05 (s06–s12: 11.64) |
| `text-nav` | 10.3 | 700 | 0.194em | 1.40 | Header nav, DESIGN YOUR SUIT link, AE badge | **s02–s04**, all screens |
| `text-option` | 10.03 | 700 | 0.194em | 1.40 | Option captions, "+ AED" prices, MAXIMUM OF 10 LETTERS | s18–s24 (s14: 10.4, s15–s17: 9.68) |
| `text-body` | 10.03 | 400 | 0.194em | 1.87 | Measurement instructions | s29–s41 |
| `text-banner` | 9.82 | 700 | 0.463em | 2.28 | FREE SHIPPING strip | **s02–s04**, all screens |
| `text-unit` | 9.82 | 700 | 0 | 1.40 | Input unit suffix (inches, kg, years) | s29 |
| `text-unit-sm` | 7.59 | 700 | 0 | 1.40 | Input unit suffix, compact measurement input | s30–s41 |
| `text-caption` | 9.4 | 700 | 0.195em | 1.40 | Style captions, summary titles, field labels, TOTAL PRICE | s13, s26–s29 (s05 tile note: 9.5) |
| `text-label` | 8.4 | 700 | 0.194em | 1.40 | Tile and swatch names | s06–s12, s26 (**s03**, s05: 8.3) |
| `text-fine` | 7.4 | 700 | 0.195em | 1.40 | EXC. VAT, VAT note | s26 |
| `text-button-sm` | 7.19 | 700 | 0.463em | 2.28 | SAVE | s29 |
| `text-button-xs` | 5.57 | 700 | 0.463em | 2.28 | SAVE, compact measurement layout | s30–s41 |

Notes:
- **Small variants were merged.** The deck repeats some roles at slightly different sizes (for
  example 8.3 vs 8.4, 11.5 vs 11.64, 9.68–10.4 for option captions). These come from groups being
  scaled in PowerPoint, not from a deliberate scale. Each role uses the value listed; the variants
  are in brackets so a fidelity check can tell where ±0.4 px comes from.
- **The compact measurement layout (s30–s41)** draws its input and SAVE smaller than s29, so it
  has its own tokens: `text-unit-sm` (7.59 px) and `text-button-xs` (5.57 px), as in the deck.
- **Typed measurement values** have no style in the design (the inputs are empty); they use
  `text-button` in `paper`. Muller Regular 10.03 px (`text-body`) is used for all instruction text.
- **Monogram "ABC" samples (s24)** use `text-monogram-sample`: 17.82 px, 700, line height 1.40
  (deck 24.95 px). Tracking is `tracking-monogram-wide` 0.137em for samples 1–2 (deck 2.44 px) and
  `tracking-monogram` 0.12em for samples 3–4 (2.13 px). Their fonts are in
  [Monogram fonts](#monogram-fonts).
- **Tailor-note text (s25)** is 11.76 px in the deck; it uses `text-button` (11.82), merged as above.
- **Line height 2.28** on the wide-tracked styles is the deck's line spacing. It matters for
  vertical placement: text sits inside a box about 2.28 × its size tall.

## Controls (pill buttons and inputs)

Fill `burgundy`, text `paper`, label centred. All sizes are deck geometry, checked in the
screenshots (GET STARTED measures 286.5 × 41.6 vs deck 287 × 42).

| Control | Size (w × h) | Radius | Text | Screen |
|---|---|---|---|---|
| Standard pill (DESIGN YOUR SUIT, GET STARTED, price) | 287 × 42 (`w-cta h-control`) | `rounded-control` 18px *estimate* | `text-button` | **s02, s04**, s26 |
| Large pill (YES / NO) | 370 × 59 | `rounded-full` | `text-button` | s19 |
| Monogram input | 730 × 59 | `rounded-full` | `text-input-display` | s24 |
| SUBMIT | 287 × 47.5 (`w-cta h-control-lg`), centred 69px left of the page centre (x 651), as in the deck and screenshot | `rounded-control-lg` 19.25px *estimate* | `text-button-lg` | s25 |
| BACK on s25 (not in the design) | SUBMIT's shape: 287 × 47.5, lined up under SUBMIT; same outline as the other BACK pills (`border-[1.5px]`, which Chrome draws as 1px) | `rounded-control-lg` | `text-button-lg` | s25 |
| Measurement input | 431 × 42, with a 2px white divider 68px from the right and the unit after it | `rounded-control` 18px *estimate* (fit: 17.3) | `text-unit` for the unit | s29 |
| SAVE | 78 × 26 | `rounded-control-sm` 10.5px *estimate* (fit: 11.1) | `text-button-sm` | s29 |
| Compact measurement input | 218.2 × 32, 1.5px white divider 34.3px from the right, centred under the video | `rounded-control-compact` 12.25px (fitted to s30) | `text-unit-sm` for the unit | s30–s41 |
| Compact SAVE | 60 × 20.3, 13.7px right of the input, centred on its height | `rounded-control-xs` 9.3px (fitted to s30) | `text-button-xs` | s30–s41 |
| Measurement video | 702 × 372.4 at x 81, `object-fit: cover` anchored left (the deck crops 0.85% off the right of the 1000 × 526 footage) | — | — | s30–s41 |
| Thigh "ILLUSTRATION PENDING" area | Same box as the video, 2px dashed `burgundy` outline, `text-subheading` in `maroon` | — | — | s36 (not in the design) |
| Tailor-note textarea | 1278 × 395, 3px `burgundy` outline, no fill | `rounded-field` 36px *estimate* | `text-button` in `burgundy` (11.76) | s25 |
| Monogram style checkbox | 34.1 × 34.1, 1.5px `burgundy` outline (an inset shadow, because Chrome rounds a 1.5px border down to 1px), white fill, no selected mark (none in the design) | `rounded-checkbox` 3.8px, fitted to the screenshot (the deck path is drawn as a circle, but the screenshot shows rounded squares) | — | s24 |
| AE badge | 26 × 14, white fill | `rounded-badge` 3px *estimate* | `text-nav` in `burgundy` | s02–s04 |

Radii were fitted to the anti-aliased edge in the screenshots (rms error under 0.65 px). The
42px-high controls are **not** fully round: they fit an 18px radius, not 21px. The 59px-high
controls fit their full half-height (29.25 of 29.5), so they use `rounded-full`.

There are no hover, focus or disabled states in the design. Add a visible focus ring for keyboard
users when the components are built (accessibility requirement, not a design value).

## Layout and spacing (1440 px page)

The deck doesn't follow a uniform spacing grid; gaps differ from screen to screen. So the design
uses fixed measured constants, not a spacing scale. Tailwind's default `--spacing` is unchanged;
the named constants below are tokens.

**Shell (all browser screens; measured on s02–s04)**

| Element | Value |
|---|---|
| Header band (`h-header`) | 133.4px tall, full width, `image1` linen |
| Logo | 138 × 78, centred horizontally, 32px from the top of the header |
| Nav (left) | HOME / OUR STORY / HOW IT WORKS, starting at x = 81 (`px-gutter`), about 20px between items, text top 67px into the header |
| Right cluster | DESIGN YOUR SUIT (x 1203), AE badge (x 1337), cart icon 16.5px (x 1368.5), account icon 16.5px (x 1394.6); 29px right margin |
| Promo strip (`h-strip`) | 30px tall, directly under the header, `strip` colour, `text-banner` in `strip-text`, centred |
| Strip over hero | On s02 the hero photo starts at the top of the strip (y 198), so the strip lies over the photo |

**Screen 01 (splash):** `image1` full bleed; logo 290 × 163 centred both ways.

**Screen 02 (hero):** `image4` fills 1440 × 612 from the top of the strip, scaled to full width
and top-aligned. Copy column: x 951, 408px wide, so its right edge is 81px from the page edge
(`gutter`). Title box at y 352 (56 tall), price at 408 (31), paragraph at 459 (188, justified),
pill at 677, centred in the column.

**Screen 03 (choose your style):** heading box at y 288 (47 tall); seven 197 × 296 photo tiles at
y 362, 8px apart, 6px from the page edges; labels 27px below the tiles (`text-label`).

**Screen 04 (three steps):** heading box at y 267, subtitle at 319; three columns 299px wide
centred at x 345.5, 720.5 and 1094.5 (374.5px apart); numbers at y 361, icons 136.2px square
(`size-step-icon`) at y 392, labels at y 535; GET STARTED pill centred at y 643.

All y values above are deck coordinates, where the top of the header is y = 64. Subtract 64 for
page coordinates (for example, the s04 heading box starts 203px from the top of the page).

**Screen 26 (summary):** title box 6.3px above the strip's bottom edge. Five columns
(215.4 / 243.9 / 215.4 / 215.4 / 215.4, 17.2px apart), left edge x 135.8 (2.95px right of
centred). Captions (`text-caption`) at y 92.2 and 280 from the content top, tiles 215.4 × 164 at
109.2 and 297; SUIT DESIGN 243.9 × 351.8 with its two caption lines 2.2px below. Swatch names
(`text-label`, `paper`) centred 86.55px into the fabric tiles. TOTAL PRICE at y 486.4, standard
pill at 504.7 with its right edge on the 81px gutter, EXC. VAT (`text-fine`) centred 39px from the
pill's right edge, VAT note (`text-fine`) 0.7px below. All within 0.1px of the deck. Tiles and
blocks not in the design (waistcoat, monogram, note, measurements) follow the same grid.

## Background textures

| Texture | Asset key | How it is used |
|---|---|---|
| Header linen | `brand.headerTexture` | Fills the header band. The deck scales it to page width (1440 × 1440) and positions it at about 40.65% vertically (`--header-texture-position`), showing the diagonal fold behind the logo. |
| Geometric pattern | `ui.pattern` (`ui.patternAlt` on screens 11–12) | The white content area, behind everything, at **5% opacity** (`--pattern-opacity`). One image, scaled to page width (1440 × about 1447). Its top edge sits at `--pattern-offset-y` (header bottom minus 26.2% of the width, i.e. −243px at 1440). It is drawn on its own layer (`PageBackground`) with `opacity`, so the content stays fully opaque. |
| Splash | `brand.headerTexture` | Full-bleed under the centred logo (s01). |

**The pattern is not a seamless tile:** its opposite edges don't match. **Decided in Prompt 5:** the
pattern layer is fixed to the viewport, as in the deck, where every screen shows the same window
of it. Long pages scroll over it, so no seam ever appears while scrolling. `repeat-y` only covers
viewports taller than about 1200px at 1440 wide.

## Responsive behaviour

**Not measurable from the design.** All 41 screenshots are desktop at 1440px width; there are no
tablet or phone references. The tokens above are the 1440px values. No responsive type steps or
breakpoints were invented. Prompt 18 (mobile) needs either mobile designs or your approval of a
proposed scaling before any are added.

## Monogram fonts

**Status: approved October 29, 2026 and integrated.** All four are SIL Open Font License 1.1, which
allows web embedding. The files are self-hosted, unmodified (not converted or subset), from each
font's official upstream repository at the commit the Google Fonts repository
([github.com/google/fonts](https://github.com/google/fonts)) builds from. Each font's licence file
sits next to it. The deck's embedded `.fntdata` files are not used.

| # | Style (id) | Deck font (not used) | Font on the site | Designer | Licence | File in `public/fonts/` | Licence file | Official source (pinned commit) |
|---|---|---|---|---|---|---|---|---|
| 1 | Sans serif (`sans`) | Arial Bold | **Arimo Bold** (700, normal) | Steve Matteson | SIL OFL 1.1 | `arimo/Arimo-Bold.woff2` (182 KB) | `arimo/OFL.txt` | [googlefonts/arimo](https://github.com/googlefonts/arimo) @ `4a6255f` |
| 2 | Slab serif (`slab`) | Courier Prime Bold | **Courier Prime Bold** (700, normal) | Alan Dague-Greene | SIL OFL 1.1 | `courier-prime/CourierPrime-Bold.ttf` (73 KB) | `courier-prime/OFL.txt` | [quoteunquoteapps/CourierPrime](https://github.com/quoteunquoteapps/CourierPrime) @ `7fd585a` |
| 3 | Script (`script`) | Monotype Corsiva Bold | **Cormorant Garamond Bold Italic** (700, italic) | Christian Thalmann | SIL OFL 1.1 | `cormorant-garamond/CormorantGaramond-BoldItalic.woff2` (82 KB) | `cormorant-garamond/OFL.txt` | [CatharsisFonts/Cormorant](https://github.com/CatharsisFonts/Cormorant) @ `6d210fd` |
| 4 | Serif (`serif`) | Times New Roman Bold | **Tinos Bold** (700, normal) | Steve Matteson | SIL OFL 1.1 | `tinos/Tinos-Bold.woff2` (202 KB) | `tinos/OFL.txt` | [googlefonts/tinos](https://github.com/googlefonts/tinos) @ `3b4482a` |

Courier Prime's upstream ships no woff2, so its TTF is used as is. The Google Fonts `ofl/tinos`
folder has no licence file; `tinos/OFL.txt` comes from the upstream repository. Licences were
checked in each font's `METADATA.pb` in the Google Fonts repository (`license: "OFL"`) and in the
`OFL.txt` files themselves.

**How they load.** `src/fonts/monogram.ts` declares the four with `next/font/local` (weight 700,
`display: swap`, `preload: false`, no automatic fallback). Each sets a CSS variable
(`--font-arimo`, `--font-courier-prime`, `--font-cormorant-garamond`, `--font-tinos`) on the
monogram step's section. The tokens are declared with `@theme inline` in `app/globals.css`, so the
utilities read those variables where they are used:

| Token | Value | Utility |
|---|---|---|
| `--font-monogram-sans` | `var(--font-arimo), sans-serif` | `font-monogram-sans` |
| `--font-monogram-slab` | `var(--font-courier-prime), monospace` | `font-monogram-slab` |
| `--font-monogram-script` | `var(--font-cormorant-garamond), serif` (sample also `italic`) | `font-monogram-script` |
| `--font-monogram-serif` | `var(--font-tinos), serif` | `font-monogram-serif` |

They are only used by the "ABC" samples, so they aren't preloaded: the files are fetched when the
monogram step first renders. The monogram input itself stays in Muller, as in the design.

The chosen style is a style label for the tailor, not a guarantee of the embroidery typeface.
Confirm with the tailor which embroidery fonts match (asset-manifest.md).

## Pending

1. Muller licence and web font files (Regular 400, Bold 700) → `public/fonts/` + `next/font/local`.
2. Responsive type and layout rules (no references). The measurement screens are laid out for
   1440px; below that the text column wraps under the video.
3. Focus and hover states (none in the design).
4. Thigh illustration (s36), to replace the "ILLUSTRATION PENDING" area.
