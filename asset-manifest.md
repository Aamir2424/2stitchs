# 2Stitchs Asset Manifest

This is the verified source of truth for which extracted asset belongs to which screen and option.
Use it together with `image_description.md` and `image_description_json.json`.

- Precedence: when this manifest disagrees with `image_description.md` or
  `image_description_json.json`, this manifest wins. Those two files are the original visual
  catalogue (they agree with each other) and still contain known errors, listed in
  [Corrections](#corrections-to-image_descriptionmd-and-the-json).
- Brand: **2Stitchs** (logo wordmark reads "2 STITCHS"). Use the real logo `image2.png`.
  Ignore the `BRANDNAME` / "do not use image2.png" rule in `image_description.md`; it is obsolete.
- Source folder: `powerpoint assets/` (flat, 153 files). Filenames are the original `ppt/media/`
  names. Do not rename the source files. Prompt 3 copies them into `public/` and
  `src/config/assets.ts` maps keys to the copies. Components never use these paths directly.

## How the mappings were verified

1. Structural: each slide's relationship file and shape positions in the original deck
   (`~/Desktop/twostitchs/suit-extracted/ppt/slides/`) show exactly which media file is drawn in
   which slot and under which label. Slide N is `reference/screen_NN.png` (slide order checked).
   All 153 files in `powerpoint assets/` are byte-identical to the deck's `ppt/media/`.
2. Visual: every asset below was opened and compared with its screenshot. Where two images are
   stacked in one slot, the top layer (the one visible in the screenshot) is listed.
3. Videos: a frame from each MP4 was compared with its poster still and the screenshot.

Status values: **confirmed** = structural and visual match. **decided** = a choice you made where
the deck was ambiguous. **missing** = no asset exists (see [Missing assets](#missing-assets)).

## Inventory

| Type | Count | Notes |
|---|---:|---|
| PNG | 127 | |
| JPEG | 11 | Measurement video poster stills `image132`–`image142` |
| SVG | 4 | Vector icons; each has a PNG twin (see shared UI) |
| MP4 | 11 | Measurement videos, 1000×526, 12–24 s each |
| **Total** | **153** | 142 images + 11 videos |

Every file is described in `image_description.md` and the JSON, and every described file exists.
There are 12 guided measurements but only 11 videos: thigh has none (see screen 36).

---

## Shared UI (all browser screens 02–41)

| Element | Asset | Status | Notes |
|---|---|---|---|
| Header background | `image1.png` | confirmed | Burgundy linen, 2420×2420. The design crops it to a full-width band (about 1440×133) showing the diagonal fold. |
| Logo | `image2.png` | confirmed | Transparent PNG, 639×360, gold "2" plus "STITCHS". Also used centered on screen 01. |
| Page background pattern | `image9.png` | decided | Default on every screen. |
| Page background pattern (alt) | `image73.png` | decided | Screens 11 and 12 only, as in the deck. Near-identical to `image9`. |
| Account icon | `image6.svg` (PNG twin `image5.png`) | confirmed | White icon. Prefer the SVG. |
| Cart icon | `image8.svg` (PNG twin `image7.png`) | confirmed | White icon. Prefer the SVG. |
| Info (i) icon on fabric tiles | `image26.svg` (PNG twin `image25.png`) | confirmed | Prefer the SVG. |
| Free-shipping strip, "AE" badge, buttons, pill inputs | none | n/a | CSS and text. Banner text is a config value. |

## Home and public pages

### Screen 01: splash
| Element | Asset | Status |
|---|---|---|
| Background | `image1.png` | confirmed |
| Logo | `image2.png` | confirmed |

### Screen 02: home hero
| Element | Asset | Status | Notes |
|---|---|---|---|
| Hero photo | `image4.png` | confirmed | Man in a grey three-piece suit beside a wooden screen (the descriptions wrongly say "dark green suit"). 2250×1171. |

### Screen 03: choose your style
| Label | Asset | Status |
|---|---|---|
| 2 PIECE SUITS | `image10.png` | confirmed |
| 3 PIECE SUITS | `image11.png` | confirmed |
| DOUBLE BREASTED SUITS | `image12.png` | confirmed |
| SAFARI SUITS | `image13.png` | confirmed |
| TUXEDO SUITS (design reads "TUXIDO") | `image14.png` | confirmed |
| TWEED SUITS | `image15.png` | confirmed |
| LINEN | `image16.png` | confirmed |

### Screen 04: Stitch Your Dream Suit (three steps)
| Step | Source sprite | Quadrant | Status |
|---|---|---|---|
| 1 SELECT YOUR FABRIC (weave) | `image18.png` | top-left | confirmed source, crop pending |
| 2 PICK YOUR DESIGN (jacket) | `image17.png` | top-right | confirmed source, crop pending |
| 3 GET YOUR MEASURE (tape) | `image17.png` | bottom-left | confirmed source, crop pending |

`image17` and `image18` are 768×512 sheets of four line icons. The deck crops one icon per step;
the exact crop rectangles still need to be extracted (Prompt 3). The spool icon is unused.

---

## Wizard

### Screen 05: pick your material (family tiles)
| Family | Tile image | Hover preview | On-screen text | Status |
|---|---|---|---|---|
| WORSTED WOOL | `image19.png` | none | STARTING FROM AED 799.00 | confirmed |
| LINEN | `image20.png` | `image28.png` | STARTING FROM AED 999.00 | confirmed |
| COTTON | `image21.png` | none | STARTING FROM AED 799.00 | confirmed |
| VELVET | `image22.png` | none | STARTING FROM AED 899.00 | confirmed |
| TWEED | `image23.png` | none | WINTER WEAR / COUNTRY STYLE (no price on this screen) | decided |

All six families are in v1. Tweed's base price is **AED 899**, taken from screen 11 (the only
screen that shows it) and kept in the central pricing config. Screen 05 shows "WINTER WEAR /
COUNTRY STYLE" on the Tweed tile instead of a price.
| POLYESTER BLEND | `image24.png` | none | STARTING FROM AED 699.00 | confirmed |

- Linen hover: `image28.png` (beige linen jacket, 410×615) covers the right ~56% of the Linen tile
  in the design. It is the only family-tile preview. Do not add previews to the other tiles.
- Tweed: the deck draws `image27.png` (near-black) over `image23` at reduced opacity to darken it.
  Recreate that with a CSS overlay. **Do not use `image27.png`.**

### Screens 06–12: swatch grids
Layout: the selected family tile on the left, then a 2×5 grid. Slots are listed top row left to
right, then bottom row left to right. All swatches **confirmed** unless noted.

#### Screen 06: Worsted Wool (family tile `image19.png`)
| # | Swatch | Asset | Extra |
|---:|---|---|---|
| 1 | MIDNIGHT NAVY | `image31.png` | |
| 2 | CHARCOAL GREY | `image33.png` | |
| 3 | MEDIUM GREY | `image35.png` | |
| 4 | LIGHT GREY SHARKSKIN | `image37.png` | |
| 5 | DARK CHOCOLATE BROWN | `image39.png` | |
| 6 | OLIVE GREEN HERRINGBONE | `image32.png` | |
| 7 | DEEP BURGUNDY | `image34.png` | |
| 8 | SAND BEIGE | `image36.png` | |
| 9 | NAVY PRINCE OF WALES CHECK | `image38.png` | +AED 99.00 |
| 10 | NAVY PINSTRIPE | `image40.png` | +AED 99.00 |

#### Screen 07: Worsted Wool hover previews
Same grid as screen 06. In the design, the first three swatches show a garment photo instead of
the flat fabric. These are the only swatch previews in the deck.

| # | Swatch | Hover preview | Status |
|---:|---|---|---|
| 1 | MIDNIGHT NAVY | `image41.png` (model, navy suit) | decided |
| 2 | CHARCOAL GREY | `image42.png` (model, charcoal suit) | decided |
| 3 | MEDIUM GREY | `image43.png` (grey jacket on mannequin) | decided |

Do not invent previews for any other swatch.

#### Screen 08: Linen (family tile `image20.png`)
| # | Swatch | Asset |
|---:|---|---|
| 1 | IVORY | `image44.png` |
| 2 | STONE GREY | `image46.png` |
| 3 | SKY BLUE | `image47.png` |
| 4 | TOBACCO BROWN | `image49.png` |
| 5 | RICH BLACK | `image51.png` |
| 6 | SAND BEIGE | `image45.png` |
| 7 | DEEP BURGUNDY | `image1.png` (same file as the header texture) |
| 8 | OLIVE GREEN | `image48.png` |
| 9 | NAVY | `image50.png` |
| 10 | FOREST GREEN | `image52.png` |

#### Screen 09: Cotton (family tile `image21.png`)
| # | Swatch | Asset |
|---:|---|---|
| 1 | MIDNIGHT NAVY | `image53.png` |
| 2 | KHAKI | `image55.png` |
| 3 | OLIVE GREEN TWILL | `image57.png` |
| 4 | DARK CHOCOLATE BROWN | `image59.png` |
| 5 | RICH BLACK | `image61.png` |
| 6 | CHARCOAL GREY | `image54.png` |
| 7 | STONE BEIGE | `image56.png` |
| 8 | SKY BLUE | `image58.png` |
| 9 | NAVY PINSTRIPE | `image60.png` |
| 10 | DEEP BURGUNDY | `image62.png` |

#### Screen 10: Velvet (family tile `image22.png`)
| # | Swatch | Asset |
|---:|---|---|
| 1 | MIDNIGHT NAVY | `image63.png` |
| 2 | DEEP BURGUNDY | `image65.png` |
| 3 | ROYAL BLUE | `image67.png` |
| 4 | DARK CHOCOLATE BROWN | `image69.png` |
| 5 | PLUM PURPLE | `image71.png` |
| 6 | JET BLACK | `image64.png` |
| 7 | EMERALD GREEN | `image66.png` |
| 8 | FOREST GREEN | `image68.png` |
| 9 | CHARCOAL GREY | `image70.png` |
| 10 | CHAMPAGNE | `image72.png` |

#### Screen 11: Tweed (family tile `image74.png`, decided; background `image73.png`)
The family tile here shows STARTING FROM AED 899.00, unlike screen 05.

| # | Swatch | Asset |
|---:|---|---|
| 1 | BROWN HERRINGBONE | `image75.png` |
| 2 | CHARCOAL GREY HERRINGBONE | `image77.png` |
| 3 | LIGHT GREY DONEGAL | `image79.png` |
| 4 | CAMEL | `image81.png` |
| 5 | BURGUNDY | `image83.png` |
| 6 | OLIVE GREEN ESTATE | `image76.png` |
| 7 | MIDNIGHT NAVY | `image78.png` |
| 8 | BLUE WINDOWPANE | `image80.png` |
| 9 | FOREST GREEN | `image82.png` |
| 10 | PRINCE OF WALES | `image84.png` |

#### Screen 12: Polyester Blend (family tile `image24.png`; background `image73.png`)
| # | Swatch | Asset |
|---:|---|---|
| 1 | MIDNIGHT NAVY | `image85.png` |
| 2 | LIGHT GREY | `image87.png` |
| 3 | DARK CHOCOLATE BROWN | `image89.png` |
| 4 | DEEP BURGUNDY | `image91.png` |
| 5 | NAVY PRINCE OF WALES CHECK | `image38.png` (same file as Wool slot 9) |
| 6 | CHARCOAL GREY | `image86.png` |
| 7 | JET BLACK | `image88.png` |
| 8 | OLIVE GREEN | `image90.png` |
| 9 | NAVY PINSTRIPE | `image92.png` |
| 10 | STONE BEIGE | `image93.png` |

### Screen 13: style your suit jacket
All photos show a beige suit. There are no versions in other fabrics.

| Option | Asset | On-screen extra | Status |
|---|---|---|---|
| 2 PIECE SUITS | `image94.png` | | confirmed |
| 3 PIECE SUITS | `image95.png` | + AED 199.00 | confirmed |
| DOUBLE BREASTED SUITS | `image96.png` | + AED 99.00 | confirmed |
| SAFARI SUITS | `image97.png` | + AED 299.00 | confirmed |
| TUXEDO SUITS (design reads "TUXIDO") | `image98.png` | + AED 299.00 | confirmed |

Customer-facing copy uses "Tuxedo" (decided). The reference screenshots (screens 03, 13) spell it
"TUXIDO"; that is a design typo, not a different product.

All five styles are in v1. The waistcoat step (screen 17) appears only when 3 PIECE SUITS is chosen.

### Screen 14: jacket fit
| Option | Asset | Status |
|---|---|---|
| REGULAR FIT | `image99.png` | confirmed |
| SLIM FIT | `image100.png` | confirmed |

### Screen 15: lapel thickness
| Option | Asset | Status |
|---|---|---|
| NARROW LAPEL | `image102.png` | confirmed |
| MEDIUM LAPEL | `image103.png` | confirmed |
| WIDE LAPEL | `image101.png` | confirmed |

### Screen 16: lapel style
| Option | Asset | Status |
|---|---|---|
| NOTCH LAPEL | `image105.png` | confirmed |
| PEAK LAPEL | `image106.png` | confirmed |
| SHAWL LAPEL | `image104.png` | confirmed |

### Screen 17: waistcoat (subtitle "INCLUDED WITH THE 3-PIECE SUIT")
| Option | Asset | On-screen extra | Status |
|---|---|---|---|
| SINGLE BREASTED WAISTCOAT | `image108.png` | | confirmed |
| DOUBLE BREASTED WAIST COAT | `image109.png` | + AED 29.00 | confirmed |
| U-SHAPED WAISTCOAT | `image107.png` | | confirmed |

### Screen 18: back vent
| Option | Asset | Status |
|---|---|---|
| CENTER VENT | `image110.png` | confirmed |
| SIDE VENT | `image111.png` | confirmed |

### Screen 19: different fabric for your pants?
No images (YES / NO pill buttons).

### Screen 20: pants fit
| Option | Asset | Status |
|---|---|---|
| REGULAR FIT | `image112.png` | confirmed |
| SLIM FIT | `image113.png` | confirmed |

### Screen 21: pants rise (title typo "WOLD" must be "WOULD")
| Option | Asset | Status |
|---|---|---|
| HIGH WAISTED | `image114.png` | confirmed |
| MID WAISTED | `image116.png` | confirmed |
| LOW WAISTED | `image115.png` | confirmed |

### Screen 22: belt loops or side tabs
| Option | Asset | On-screen extra | Status |
|---|---|---|---|
| BELT LOOPS | `image113.png` | | confirmed |
| SIDE TABS | `image117.png` | + AED 59.00 | confirmed |

The deck stacks both images in both slots; the visible top layers are listed. Checked by zooming
in on the waistbands: `image113` shows loops, `image117` shows side-tab buckles. `image113` is also
the slim-fit pants photo on screen 20.

### Screen 23: cuff
| Option | Asset | On-screen extra | Status |
|---|---|---|---|
| WITHOUT CUFF | `image118.png` | | confirmed |
| WITH CUFF | `image119.png` | + AED 10.00 | confirmed |

### Screen 24: monogram
| Element | Asset | Status | Notes |
|---|---|---|---|
| Jacket lining photo | `image120.png` | confirmed | The sample text "AAMIR" is printed into the photo; it cannot be edited out. |
| Four font-style choices ("ABC") | none | missing | Text rendered in fonts. See [Fonts](#fonts). |

On-screen extra: + AED 39.00, maximum 10 letters.

### Screen 25: tell your tailor what you desire
No images (textarea and SUBMIT pill button).

### Screen 26: summary
| Tile | Asset | Status |
|---|---|---|
| JACKET FABRIC (VELVET / DEEP BURGUNDY) | `image65.png` (the chosen swatch) | confirmed |
| PANTS FABRIC (POLYESTER BLEND / MIDNIGHT NAVY) | `image85.png` (the chosen swatch) | confirmed |
| SUIT DESIGN (SAFARI SUITS, SLIM FIT) | `image97.png` (the chosen style photo) | confirmed |
| WIDE LAPEL | `image121.png` | confirmed |
| PEAK LAPEL | `image122.png` | confirmed |
| SIDE VENT | `image123.png` | confirmed |
| HIGH WAISTED PANTS | `image124.png` | confirmed |
| SIDE TABS PANTS | `image125.png` | confirmed |
| ANKLE CUFFS REQUIRED | `image126.png` | confirmed |

Fabric and suit-design tiles reuse the swatch and style images chosen earlier. The six detail tiles
use dedicated small thumbnails (`image121`–`image126`, about 200×260) that exist **only** for the
six options shown.

#### Summary tiles for every option (decided)
Where no dedicated thumbnail exists, the tile reuses that option's own **verified step image**,
cropped (CSS `object-fit: cover` + `object-position`, no edited copies) to the same framing as the
dedicated thumbnail in that row. No new images, no generic placeholders. Crop positions are set
in Prompt 13 by comparing against screen 26.

| Summary row | Option | Image | Source | Framing |
|---|---|---|---|---|
| Lapel thickness | Narrow | `image102.png` | step image, cropped | chest and lapel, like `image121` |
| Lapel thickness | Medium | `image103.png` | step image, cropped | chest and lapel, like `image121` |
| Lapel thickness | Wide | `image121.png` | dedicated | — |
| Lapel style | Notch | `image105.png` | step image, cropped | lapel close-up, like `image122` |
| Lapel style | Peak | `image122.png` | dedicated | — |
| Lapel style | Shawl | `image104.png` | step image, cropped | lapel close-up, like `image122` |
| Vent | Center | `image110.png` | step image, cropped | back of jacket, like `image123` |
| Vent | Side | `image123.png` | dedicated | — |
| Rise | High | `image124.png` | dedicated | — |
| Rise | Mid | `image116.png` | step image, cropped | waist, like `image124` |
| Rise | Low | `image115.png` | step image, cropped | waist, like `image124` |
| Waistband | Belt loops | `image113.png` | step image, cropped | waist, like `image125` |
| Waistband | Side tabs | `image125.png` | dedicated | — |
| Cuff | With | `image126.png` | dedicated | — |
| Cuff | Without | `image118.png` | step image, cropped | hems and shoes, like `image126` |
| Waistcoat (3-Piece only) | Single / Double / U-shaped | `image108` / `image109` / `image107` | step image, cropped | torso. The design has no waistcoat tile, so there is no framing reference; approve visually. |
| Jacket and pants fit | any | none | caption text | Shown as the caption under SUIT DESIGN, as in the design ("SLIM FIT- SUIT AND PANT"). |

The "SIDE TABS PANTS" and "ANKLE CUFFS REQUIRED" captions follow the design; the other options
need equivalent caption text in the config.

The sample total AED 1267.00 equals Velvet 899 + Safari 299 + Side Tabs 59 + Cuff 10, which
matches the spec's additive formula.

### Screen 27: production ticket (admin, no price)
| Tile | Asset | Status |
|---|---|---|
| SUIT FABRIC (WOOL & CASHMERE, code YC676240) | `image31.png` | confirmed (but see missing) |
| PANTS FABRIC (WOOL & CASHMERE, code YC676240) | `image31.png` | confirmed (but see missing) |
| SUIT DESIGN (2 PIECE SUITS, REGULAR FIT) | `image94.png` | confirmed |
| WIDE LAPEL / PEAK LAPEL | `image121.png` / `image122.png` | confirmed |
| SIDE VENT / HIGH WAISTED PANTS | `image123.png` / `image124.png` | confirmed |
| SIDE TABS PANTS / ANKLE CUFFS REQUIRED | `image125.png` / `image126.png` | confirmed |

The deck stacks `image94` over `image97` in the suit-design slot; `image94` is the visible one and
matches the caption. Notes line typo "TEH" must be "THE". `image127`–`image131` are **not** used
here (the descriptions say they are).

**Decided:** the production ticket shows only verified data: the order's real options and
swatches, using the same tile images as the summary, plus the tailor note, with no price.
- The sample on screen 27 is a mockup. "WOOL & CASHMERE" is not one of the six families and has
  no swatch image of its own; the deck borrows `image31.png` (Worsted Wool / Midnight Navy).
  It is **not** offered or shown until the fabric and its image are supplied.
- "YC676240" is the only code in the design, and no code list exists. Every swatch's fabric code
  stays empty, and the ticket shows "CODE NOT ON FILE" in its place so the tailor sees it is
  missing, until a verified code list is supplied. Never guess codes.

### Screen 28: summary previews
| Caption | Asset | Status |
|---|---|---|
| YOUR DESIGNED SUIT | `image127.png` | confirmed |
| FRONT PROFILE | `image128.png` | confirmed |
| BACK PROFILE | `image129.png` | confirmed |
| SIDE PROFILE | `image130.png` | confirmed |
| CLOSE-UP SHOT | `image131.png` | confirmed |

These show one specific design (burgundy velvet safari-style jacket, navy pants). They are not
generic previews; do not show them for other selections.

---

## Measurements

### Screen 29: your digital profile (height, weight, age)
No images. Unit typo "inchs" must be "inches".

### Screens 30–41: guided measurements
Use the MP4 as the video and the JPEG as its `poster`.

| Screen | Measurement | Video | Poster still | Status |
|---|---|---|---|---|
| 30 | SHOULDER WIDTH | `VAHOnh6O22M.mp4` | `image132.jpeg` | confirmed |
| 31 | SLEEVES LENGTH | `VAHOnpZu6vQ.mp4` | `image133.jpeg` | confirmed |
| 32 | STOMACH | `VAHOnn9Sces.mp4` | `image134.jpeg` | confirmed |
| 33 | LEG LENGTH | `VAHOn2011yM.mp4` | `image135.jpeg` | confirmed |
| 34 | PANTS WAIST | `VAHOnyibPYY.mp4` | `image136.jpeg` | confirmed |
| 35 | HIPS | `VAHOnxvG-90.mp4` | `image137.jpeg` | confirmed |
| 36 | THIGH | **none** (hips video not used, see below) | **none** | missing |
| 37 | NECK | `VAHOn-whX8Y.mp4` | `image138.jpeg` | confirmed |
| 38 | BODY LENGTH | `VAHOny7vqiY.mp4` | `image139.jpeg` | confirmed |
| 39 | BICEP | `VAHOn1JRpeU.mp4` | `image140.jpeg` | confirmed |
| 40 | RISE | `VAHOn5XfIns.mp4` | `image141.jpeg` | confirmed |
| 41 | WRIST | `VAHOn5vgeiY.mp4` | `image142.jpeg` | confirmed |

**Thigh (decided, October 2026):** no thigh video or still exists. The deck reuses the hips clip
(`VAHOnxvG-90.mp4` / `image137.jpeg`), but that footage shows the tape and dotted line around the
hips, so on the thigh screen it would teach the wrong measurement. Therefore:
- The thigh screen does **not** show the hips video or still. They stay on the hips screen only.
- The thigh screen uses a **thigh-specific static illustration** (a simple labelled line diagram
  of the tape around the widest part of the thigh). It does not exist yet and must be supplied or
  drawn and approved; it is not a photo and must not be presented as footage.
- Until it exists, the thigh screen shows the screen 36 instruction text and the input, with a
  clearly marked "illustration pending" area. This is a pre-launch item.
- If a real thigh video is supplied later, add it here and to `src/config/assets.ts`.

Instruction text for each measurement comes from the screenshots (see `reference/README.md` for a
summary), not from this manifest.

---

## Unused assets

| Asset | Reason |
|---|---|
| `image3.png` | Dark browser screenshot behind every slide; a deck leftover. |
| `image27.png` | Darkening layer for the Tweed tile; replaced by a CSS overlay. |
| `image29.png`, `image30.svg` | Mouse cursor drawn on the mockups; not a site asset. |
| `image5.png`, `image7.png`, `image25.png` | PNG twins of the SVG icons; keep only as fallbacks. |
| Spool icon in `image17`/`image18` | Not used on screen 04. |

## Missing assets

| Missing | Where | Fallback until supplied |
|---|---|---|
| Thigh video and still | Screen 36 | Hips footage is **not** reused (it would mislead). A thigh-specific static illustration is required; until supplied, text + input + a marked "illustration pending" area. Pre-launch item. |
| Suit-style photos in each fabric | Screen 13 (README says the preview uses the selected fabric colour) | Show the beige photos only. No recolouring or generated images. |
| Wool & Cashmere fabric and its swatch image | Screen 27 | Not offered or shown until supplied. |
| Fabric-code list (only "YC676240" appears in the design) | Screen 27 | Code field empty for every swatch. Never guessed. |
| Dedicated summary thumbnails for options other than the six on screen 26 | Screens 26/27 | Cropped verified step images (decided; see the summary table). |
| Hover previews for any swatch except Wool 1–3, and for any family tile except Linen | Screens 05–12 | No preview (show the swatch only). |
| Monogram font previews | Screen 24 | Render "ABC" in web fonts. See [Fonts](#fonts). |
| Burgundy safari previews for other designs | Screen 28 | Don't show screen 28 previews for other selections. |
| Our Story copy and imagery | `/our-story` | Not in the deck. |

### Fonts
The deck embeds 7 font files (`ppt/fonts/*.fntdata` in
`~/Desktop/twostitchs/suit-extracted/`), not included in `powerpoint assets/`. The deck declares:
Muller, Muller Bold, Libre Baskerville, Arial Bold, Courier Prime Bold, Monotype Corsiva Bold,
Times New Roman Bold. **The embedded `.fntdata` files are never used on the website**: they are
obfuscated PowerPoint embeds, and their web-use rights are unconfirmed.

**Primary typeface: Muller (decided, files pending).**
- Muller is used throughout the design: headings, body text, buttons, prices and labels.
- It is commercial. Before embedding, its **web-use licence must be confirmed**. Once licensed
  web font files are available, put them in `public/fonts/` and load them with `next/font/local`.
- Until then: **font-file integration is pending.** The theme declares Muller as the intended
  family, but no other font is substituted or labelled as Muller, and the site must not claim
  Muller is loaded. Browsers fall back to a generic system font.
- Sizes, weights, line heights, letter-spacing (the very wide tracking on uppercase headings) and
  responsive steps are **measured from the 41 reference screenshots** in Prompt 4, recorded in
  `DESIGN.md`, and declared once as Tailwind v4 `@theme` tokens / CSS variables in
  `app/globals.css`. Not measured yet.

**Monogram font styles (screen 24): free, properly licensed fonts (decided).**
The four "ABC" styles look like sans bold, heavy slab, script and serif. Which deck font drives
each style is **not verified**. Use free fonts whose licence allows web embedding (for example
SIL Open Font License or Apache 2.0), chosen in Prompt 11 by comparing with screen 24:
- Libre Baskerville and Courier Prime are themselves OFL fonts, so they can be used directly if
  they match.
- Arial, Times New Roman and Monotype Corsiva are proprietary; use licensed free alternatives.
- Record each chosen font and its licence in `DESIGN.md`.
- The monogram style chosen on the site is a style label for the tailor, not a guarantee of the
  exact embroidery typeface. Confirm with the tailor which embroidery fonts match.

---

## Corrections to image_description.md and the JSON

The two files agree with each other (the only difference is wording on screen 19), so both carry
these errors. This manifest has the corrected values.

| Topic | Descriptions say | Verified |
|---|---|---|
| Brand | "2 STITCHES"; use `BRANDNAME`; don't use `image2.png` | 2Stitchs; use `image2.png` |
| Asset paths | `public/assets/` example paths | Source is `powerpoint assets/`; Prompt 3 decides `public/` layout |
| `image4` | Dark green/charcoal suit | Grey three-piece suit |
| `image13`–`image16` | Generic style cards | Safari, Tuxedo, Tweed, Linen |
| Screen 05 | `19, 28, 21, 22, 27, 24` | `19, 20, 21, 22, 23, 24`; `28` is the Linen hover; `27` is an overlay |
| Screen 07 | Inspect tile by tile | `41`–`43` replace slots 1–3; rest same as screen 06 |
| Screen 08 | 20, 44, 46, 47, 49, 51, 55, 62, 82, … | See screen 08 table (includes `image1` for Deep Burgundy) |
| Screen 09 | 52, 54, 56–59, 63, 68 | `53`–`62` plus family tile `21` |
| Screen 10 | `62`–`72` | `63`–`72` plus family tile `22` |
| Screen 12 | `85`–`93` | `85`–`93` plus `38` (PoW check) and family tile `24` |
| Screen 15 lapel thickness | `104`–`106` | `101`–`103` |
| Screen 16 lapel style | `101`–`103` / `121`–`122` | `104`–`106` |
| Screen 21 | `112`–`117` or `124`–`125` | `114`, `116`, `115` |
| Screen 22 | No unique side-tab image | `113` belt loops, `117` side tabs |
| Screen 23 | `118`, `119`, `126` | `118`, `119` (`126` is the summary thumbnail) |
| Screen 26 | Assembled from earlier steps | Swatch/style images plus dedicated `121`–`126` |
| Screen 27 | `127`–`131` | `31`, `94`, `121`–`126` |
| Measurement stills | Mostly guessed (e.g. wrist `135`/`140`) | `132`–`142` in order; the deck reuses `137` for thigh, but the site shows it on hips only |
| Measurement videos | Mapping not confirmed | Confirmed (see table) |
| SVGs | Unidentified | `image6` account, `image8` cart, `image26` info, `image30` cursor |

---

## Spec conflicts and how they are resolved

`suit-website-mvp-spec.md` stays the source of truth for flow, data model and pricing. It was
updated in October 2026 so that it agrees with this manifest on every point below.

| # | Conflict | Resolution |
|---|---|---|
| 1 | Spec §5 v1 shortcut: one scrollable page with static diagrams, videos later. | **Resolved:** the videos exist, so v1 has one screen per measurement with its real video (spec §5 updated). |
| 2 | Spec §5 said "11 measurements" but its table lists 15. | **Resolved:** 15 fields = height, weight, age (screen 29) + 12 guided measurements (screens 30–41). |
| 3 | Spec v1 fabric scope was 2 families. | **Resolved:** all 6 families × 10 swatches (spec §4.1 updated). |
| 4 | Spec v1 had the 2-piece style only and no waistcoat step. | **Resolved:** all 5 styles; the waistcoat step only for 3-Piece (spec §4.1 updated). |
| 5 | Spec §7 formula had no waistcoat delta; screen 17 shows + AED 29.00. | **Resolved:** waistcoat delta added to the formula, applied only with 3-Piece (spec §7). |
| 6 | Tweed shows no price on screen 05 but AED 899 on screen 11. | **Resolved:** Tweed base price AED 899 in the central pricing config; screen 05 copy unchanged. |
| 7 | Design spells "TUXIDO". | **Resolved:** customer-facing copy says "Tuxedo". |
| 8 | Thigh reuses the hips footage in the deck. | **Resolved:** not reused on thigh (misleading); thigh uses a static illustration (pending). |
| 9 | Production ticket uses fabric codes, but no code list exists, and screen 27 uses an unlisted Wool & Cashmere fabric. | **Resolved for build:** codes empty ("CODE NOT ON FILE"); Wool & Cashmere not offered. **Needs external data** (below). |
| 10 | Shipping banner says USD 500 while prices are AED. | **Resolved for build:** configurable amount and currency, shown as in the design and marked unconfirmed. No conversion. **Needs confirmation** (below). |
| 11 | README says the screen 13 preview uses the selected fabric colour; no such images exist. | **Resolved:** beige photos only. |

## Requires external confirmation

Nothing in this list may be invented, guessed or converted. Each item stays flagged until it is
confirmed.

| # | Item | Needed from | Current handling | Blocks launch |
|---|---|---|---|---|
| 1 | Muller web-font licence and licensed font files | Font vendor / owner | Font integration pending; no substitute labelled as Muller | Yes (final typography) |
| 2 | Monogram fonts: free licensed choices, and which embroidery fonts the tailor can actually stitch | Tailor | Chosen in Prompt 11, licence recorded in `DESIGN.md` | No |
| 3 | Fabric-code list for the swatches | Fabric supplier / tailor | Codes empty, ticket shows "CODE NOT ON FILE" | No (needed for production) |
| 4 | Wool & Cashmere fabric (swatch image, family, price) | Owner | Not offered | No |
| 5 | Free-shipping threshold amount and currency | Owner | Config value from the design ("USD 500"), marked unconfirmed | Yes |
| 6 | Thigh illustration (or a real thigh video) | Owner / designer | Marked "illustration pending" area | Yes |
| 7 | Publication rights for every photo and video in `powerpoint assets/` | Owner / photographer / video source | Used in development only | **Yes: pre-launch verification requirement** |
| 8 | Our Story copy | Owner | Not in the design | For `/our-story` |

## Still-open product decisions

1. "Choose Your Style" home tiles: preselect a style or fabric family, or always open step 1?
2. Cart and account icons: keep, hide or build?
3. How orders reach the business (email, WhatsApp, database).
