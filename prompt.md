# PROMPTS.md (v3) — 2Stitchs Build Runbook for Kiro

This version replaces v2. What changed since v2:

1. **The brand is 2Stitchs**, taken from the logo, the copy and the domain (twostitchs.com)
   in the PPT. The old "BRANDNAME" placeholder is gone.
2. **We use the real images and videos** extracted from the PPT, in `powerpoint assets/`.
3. **`asset-manifest.md` now exists** and is the verified asset map. It overrides
   `image_description.md` and `image_description_json.json` where they disagree. Prompts 1 and 2
   are done.
4. **Tailwind is v4**, compiled by `@tailwindcss/postcss` (`postcss.config.mjs`). Tokens are
   declared with `@theme` in `app/globals.css`. There is no `tailwind.config.ts`. `DESIGN.md` is
   created in Prompt 4; nothing refers to it before then. The setup was tested (dev render,
   production build, lint).
5. **v1 product decisions are made** (October 2026): all 6 fabric families, all 5 jacket
   styles with the waistcoat only for 3-Piece, Tweed at AED 899, "Tuxedo" in the UI, Muller as
   the primary font (files pending), and thigh with a static illustration instead of the hips
   video. The spec and `asset-manifest.md` agree on all of them. Items that need outside
   confirmation are in the manifest's "Requires external confirmation" table.

Each prompt lists the **mode**, **model**, **screenshots to attach**, the **prompt to paste**,
and a **check** to do before moving on.

---

## Models (credit cost from your Kiro list)

| Model | Cost | Use for |
|---|---|---|
| Claude Opus 5.5 | 2x | Asset verification, tokens, shell, reusable components, fabric picker, planning |
| Claude Sonnet 5.5 | 1.3x | Repeating screens, forms, running written task lists |
| Auto | 1x | Tiny fixes, copy changes |
| Opus 5 | 2.2x | Fallback if Opus 5.5 (experimental preview) misbehaves |

Skip GPT 5.6 Sol (4.4x) and the older Opus versions.

---

## Rules for the whole build

1. **One prompt at a time.** Wait, check the result, commit, then continue.
2. **Attach only the screenshots listed** for that prompt (1 to 3).
3. **Commit after every prompt that works:** `git add . && git commit -m "prompt N done"`.
4. **If a prompt makes a mess:** `git reset --hard`, then re-send it with a narrower scope.
5. **Never let the agent build several screens in one prompt.**
6. **Images come from `asset-manifest.md` only**, through `src/config/assets.ts`. The agent must
   never guess an image, invent one, or hardcode a path in a component.

---

## Phase 0 — Setup (done)

### 0.1 Project layout

```
suit-site/
├── .kiro/steering/project.md        (updated; see 0.2)
├── reference/
│   ├── README.md
│   └── screen_01.png … screen_41.png
├── powerpoint assets/               (153 extracted files: 142 images + 11 videos; don't edit)
├── suit-website-mvp-spec.md
├── asset-manifest.md                (verified asset map; overrides the two description files)
├── image_description.md             (original visual catalogue)
└── image_description_json.json      (same catalogue as JSON)
```

### 0.2 `.kiro/steering/project.md`

Done. The steering file now uses the 2Stitchs brand and real assets, points to
`asset-manifest.md` as the asset source of truth (with `image_description.md` and
`image_description_json.json` as the descriptive catalogue), and uses Tailwind v4 `@theme`
tokens. Edit that file directly; don't keep a second copy here.

### 0.3 `reference/README.md`

Nothing to patch. It has no "BRANDNAME" or "placeholder" mentions and no "How the agent must use
these images" section. Where the README and the manifest disagree (for example, the README says
the screen 13 previews use the selected fabric colour), the manifest is correct.

### 0.4 Things to gather (optional but they improve the result)

- **Muller font files.** Muller is the primary typeface. Confirm its web-use licence and get
  the licensed web font files (woff2). Put them in `public/fonts/`; they will be loaded with
  `next/font/local`. The fonts embedded in the PowerPoint must not be used on the website.
- **Exact hex colours.** Look in `~/Desktop/twostitchs/suit-extracted/ppt/theme/theme1.xml` and
  save them in `ppt-theme.md`. Exact values beat estimates from screenshots.
- **Our Story text.** The screenshots don't show it. Write a few lines or ask your friend.
- **Fabric codes.** The production ticket (screen 27) shows codes like "YC676240" for a
  "Wool & Cashmere" fabric that isn't in the swatch lists. Ask your friend for the code list.
- **Shipping threshold.** Confirm the free-shipping amount and currency (the design says USD 500).
- **Thigh illustration.** A simple labelled diagram of measuring the thigh (the deck has no
  thigh video).
- **Publication rights** for every photo and video in `powerpoint assets/`. Required before launch.

The logo (`image2.png`), the burgundy linen texture (`image1.png`) and the geometric pattern
(`image9.png`, `image73.png`) all exist as separate files; see the manifest.

---

## Phase 1 — Asset audit (done)

### Prompt 1 — Orientation and asset audit (done)
Result: `asset-manifest.md`. Kept here for reference if the assets change.

```
Read these before doing any implementation:
- asset-manifest.md
- image_description.md and image_description_json.json
- suit-website-mvp-spec.md
- reference/README.md
- .kiro/steering/project.md

Verify the mappings in asset-manifest.md against the actual files in
"powerpoint assets" and the reference screenshots. If a mapping is uncertain,
inspect the asset rather than guessing. Do not start implementing yet. Report
what changed, what is uncertain, and what is missing. Wait for my approval.
```

### Prompt 2 — Resolve uncertainties (done)
Decisions applied in the manifest: Tweed tile `image23` (screen 05) and `image74` (screen 11);
only the verified hover previews (`image28` on Linen, `image41`–`image43` on Wool swatches 1–3);
`image9` background with `image73` on screens 11–12; the Tweed darkening is a CSS overlay, not
`image27`. Later decision: thigh does **not** reuse the hips video (it would mislead); it gets a
static illustration. Remaining items are in the manifest's "Requires external confirmation".

### Prompt 3 — Organize and optimize assets
- **Mode:** Vibe
- **Model:** Sonnet 5.5
- **Attach:** nothing

```
Prepare the assets for the website, based only on asset-manifest.md:
1. Copy the images from "powerpoint assets" into public/images/ in folders by
   purpose (brand, fabrics, styles, jackets, lapels, waistcoats, vents, pants,
   summary, monogram, measurements, ui) and the videos into public/videos/.
   Keep "powerpoint assets" untouched. Skip the files listed as unused.
2. Crop the three step icons for screen 04 out of image18.png (weave) and
   image17.png (jacket, tape measure) as described in the manifest.
3. Convert large images to WebP at a sensible web size (about 1600px wide for
   hero images, 800px for tiles). Tell me the total size before and after.
4. Create src/config/assets.ts exporting a typed map from keys (like
   "jacket.fit.slim", "fabric.velvet.deepBurgundy",
   "measurement.neck.video", "measurement.neck.poster") to file paths. Include
   the hover previews and the summary thumbnails exactly as in the manifest.
   Mark missing assets as missing; don't fill them.
5. List the videos with their file sizes, and tell me if any is over 30 MB.
Don't build any screens yet.
```

**Check:** open `src/config/assets.ts`, spot check a few keys against the manifest. Commit.

---

## Phase 2 — Foundation

### Prompt 4 — Design tokens
- **Mode:** Vibe
- **Model:** Opus 5.5
- **Attach:** screens 01, 02, 03, 04

```
Extract the design system from the reference screenshots. Don't build pages yet.
If ppt-theme.md exists, use its hex values as exact values and use the
screenshots to check them. Otherwise estimate from the screenshots and say which
values are estimates.
Typography: Muller is the primary typeface for headings, body, buttons, prices
and labels. Measure font sizes, weights, line heights, letter-spacing (the very
wide tracking on uppercase headings) and responsive steps by inspecting the
reference screenshots (the attached ones, plus others in reference/ for prices,
labels and inputs). Don't choose sizes without comparing against them.
Create DESIGN.md with the hex colors, the typography scale (and which screenshot
each value came from), pill button dimensions, spacing rhythm, and how the
geometric background pattern is used.
This project uses Tailwind CSS v4: declare the tokens once with @theme in
app/globals.css (don't create tailwind.config.ts). Declare Muller as the font
family token. If licensed Muller files are in public/fonts/, load them with
next/font/local. If they are not there, don't load another font in its place
or under its name: remove the create-next-app Geist fonts from app/layout.tsx
and the Arial body rule from app/globals.css, let the Muller token fall back to
a generic system font, and report clearly that Muller font-file integration is
pending.
```

**Check:** compare the hex colors in `DESIGN.md` to the screenshots yourself. Commit.

### Prompt 5 — Shared shell
- **Mode:** Vibe
- **Model:** Opus 5.5
- **Attach:** screen 02

```
Build the shared shell from the screenshot: burgundy linen-textured header
(nav left: HOME, OUR STORY, HOW IT WORKS; centered 2Stitchs logo; right side:
DESIGN YOUR SUIT, currency badge, cart icon, account icon), the gray promo
strip, and the white content area with the faint geometric pattern. Use the
real logo, linen texture, pattern and icons from src/config/assets.ts (see the
"Shared UI" section of asset-manifest.md). The promo strip text comes from
config: the free-shipping amount and currency are unconfirmed, so keep the
design's value there and don't convert it. Make it a Header component plus a
shared layout. Then run the dev server and tell me the URL.
```

**Check:** run the fidelity loop (below) 2 to 3 times. Commit.

### Prompt 6 — Wizard foundation
- **Mode:** Vibe
- **Model:** Opus 5.5
- **Attach:** screens 14, 15, 16

```
Build a WizardContext, a reusable OptionStep component (title plus a row of
image tiles with label, optional "+ price" text, selection, next/back), and
the steps for jacket fit, lapel thickness and lapel style. Put all options and
their image keys in src/config/steps.config.ts, and take every image from
src/config/assets.ts. Before using each image, open it and confirm it matches
the option label and asset-manifest.md. List any image you were not sure about.
```

**Check:** tiles select, next/back works, options come from config, each tile shows the right photo
(lapel thickness is `image101`–`103`, lapel style is `image104`–`106`). Fidelity loop. Commit.

### Prompt 7 — Fabric picker
- **Mode:** Vibe
- **Model:** Opus 5.5
- **Attach:** screens 05, 06, 07

```
Build the fabric picker. Screen 05 is the fabric-family tiles. Screen 06
shows the interaction: clicking a family slides that tile to the left and
reveals a 2x5 grid of color swatches on the right, in the same row. Some
swatches show a "+ AED 99" extra. All six families are in v1: Worsted Wool,
Linen, Cotton, Velvet, Tweed, Polyester Blend, with 10 swatches each.
Use the real fabric images from src/config/assets.ts and the slot order in
asset-manifest.md. Add only the hover previews listed in the manifest
(image28 on the Linen family tile, image41-43 on Worsted Wool swatches 1-3);
no others. Recreate the Tweed tile darkening with a CSS overlay. Put the
fabric and swatch data (names, base prices and deltas from spec section 4.1,
image keys) in the config file. Tweed's base price is AED 899 (from screen
11); its screen 05 tile shows "WINTER WEAR / COUNTRY STYLE" instead of a
price, as in the design. Leave each swatch's fabric code empty. Check
screenshots 08 to 12 for the other families' swatch names. Reuse the shell.
```

**Check:** the slide-and-reveal works, swatch names match the images, previews appear only where
the manifest lists them. Fidelity loop. Commit.

---

## Phase 3 — Public pages

### Prompt 8 — Homepage, How it works, Our story
- **Mode:** Vibe
- **Model:** Sonnet 5.5
- **Attach:** screens 02, 03, 04

```
Build three pages using the existing shell, with the real photos from
src/config/assets.ts: the homepage (hero with title, "starting from" price,
paragraph and a pill "DESIGN YOUR SUIT" button, then the "choose your style"
tile row), a How It Works page (three steps with the cropped line icons and a
GET STARTED pill button), and an Our Story page. For Our Story use this text:
[paste your text, or write "short placeholder text and list it so I can
replace it"]. The buttons link to the wizard.
```

**Check:** all three pages render inside the shell with the right photos. Fidelity loop. Commit.

---

## Phase 4 — Wizard screens (Sonnet 5.5)

### Prompt 9 — Jacket style, waistcoat, vent
- **Attach:** screens 13, 17, 18

```
Add three steps using the existing OptionStep component and real images from
src/config/assets.ts: jacket style (all 5 tiles: 2-Piece, 3-Piece,
Double-Breasted, Safari, Tuxedo, with the price deltas from spec section 4.1;
label it "TUXEDO", not the design's "TUXIDO"), waistcoat style (only shown when
3-Piece was chosen, otherwise skipped, with its +29 double-breasted delta), and
back vent. If the user changes the style away from 3-Piece, clear the waistcoat
choice. Add the options to the config. Confirm each image matches its label and
asset-manifest.md.
```

**Check:** choosing 3-piece shows the waistcoat step; anything else skips it, and switching away
clears it. Commit.

### Prompt 10 — Pants steps
- **Attach:** screens 19, 21, 22

```
Add the pants steps using real images from src/config/assets.ts: the yes/no
"different fabric for your pants?" screen (screen 19, two large pill buttons;
YES reruns the fabric picker for pants, NO reuses the jacket fabric), then
pants fit, rise, waistband and cuff, with OptionStep. Fix the typo in the
rise title ("WOULD", not "WOLD"). Put the data in the config.
```

**Check:** YES leads to a second fabric pick, NO skips it. Belt loops is `image113`, side tabs is
`image117`. Commit.

### Prompt 11 — Monogram and tailor note
- **Attach:** screens 24, 25

```
Build the monogram step (text input with a 10-letter max, 4 font-style
choices, +price shown) and the tailor-note step (large rounded textarea with a
pill SUBMIT-style button). Use the real jacket-interior photo from
src/config/assets.ts. It has "AAMIR" printed in it, so show the typed text next
to the photo, not on the lining. For the four "ABC" styles, compare screen 24
and propose free fonts whose licence allows web embedding (OFL or Apache 2.0;
don't use the PowerPoint-embedded fonts). List each font and its licence and
wait for my approval before adding them. Record them in DESIGN.md.
```

**Check:** the 10-letter limit is enforced. Commit.

### Prompt 12 — Measurements (one screen per measurement, with videos)
- **Attach:** screens 29, 30, 31

```
Build the measurement flow as in the screenshots. Screen 29 is the first
screen (height, weight, age, with the "Your digital profile" text). Then one
screen per measurement: shoulder width, sleeves length, stomach, leg length,
pants waist, hips, thigh, neck, body length, bicep, rise, wrist. Each screen has
the real instruction video for that measurement on the left (use <video>
with controls, preload="metadata" and the poster still), the name and
instructions on the right, and the pill number input with an "inches" unit
label and a SAVE button below. Use one reusable MeasurementStep component
driven by a config file. Take video and poster keys from src/config/assets.ts
(mapped in asset-manifest.md) and the instruction text from the screenshots.
Thigh has no video. Do not show the hips video on the thigh screen: show the
thigh instructions from screen 36 and the input, with a clearly marked
"illustration pending" area where the thigh illustration will go.
```

**Check:** all 15 inputs exist, each video matches its screen, thigh shows no hips footage,
values save. Commit.

### Prompt 13 — Summary page
- **Attach:** screen 26

```
Build the summary page: a grid of labeled tiles for every choice the user
made, and a large price pill at the bottom with "EXC. VAT" and a small VAT
note. Fabric and suit-design tiles use the chosen swatch and style images.
Use the dedicated summary thumbnails from asset-manifest.md where they exist
(image121-126). For every other option, reuse the option's own verified step
image, cropped with CSS to the framing listed in the manifest's summary table,
and match the crops against screen 26. Show the jacket and pants fit as the
caption under SUIT DESIGN. Read the choices from WizardContext. Show the price
as a placeholder for now; we'll wire it next.
```

**Check:** every earlier choice appears as a tile. Commit.

### Prompt 14 — Admin production ticket
- **Attach:** screen 27

```
Build a password-gated /admin page that shows a submitted order in the
"production ticket" layout: customer name as the title, the same tile grid,
the swatch names, and a notes line. Fabric codes come only from the config;
none are verified yet, so show "CODE NOT ON FILE". Don't add the Wool &
Cashmere fabric from the mockup. No price on this page.
```

**Check:** password protected, no price shown. Commit.

---

## Phase 5 — Wiring the logic

### Prompt 15 — Write the spec
- **Mode:** Spec
- **Model:** Opus 5.5

```
Using suit-website-mvp-spec.md sections 4, 6 and 7, and the "Spec conflicts"
section of asset-manifest.md, create a spec for wiring the existing screens
into one wizard flow: step order, the waistcoat conditional, the pants-fabric
branch, the measurement screens (15 fields), the single calculatePrice()
function (used on client and server), and submitting an order. Don't change
the visuals.
```

Read `requirements.md`, `design.md` and `tasks.md`. Correct anything that doesn't match the spec file,
especially the step order and the pricing formula.

### Prompt 16 — Run the tasks
- **Mode:** Spec
- **Model:** Sonnet 5.5

Run the tasks from `tasks.md` one at a time. Review and commit after each.

### Prompt 17 — Pricing tests
- **Mode:** Vibe
- **Model:** Sonnet 5.5

```
Write tests for calculatePrice(): a base order with no extras, an order with a
+99 swatch and side tabs, an order with a different pants fabric, and an
order with a monogram. Show the expected totals in a table, then run the tests.
```

**Check:** the totals match what you calculate by hand from the config prices. Screen 26's sample
(Velvet 899 + Safari 299 + Side Tabs 59 + Cuff 10 = AED 1267) is a good extra case.

---

## Fidelity loop (after Prompts 5, 6, 7, 8 and any screen that looks off)

If Kiro can't screenshot your running app by itself:

1. Screenshot your page on `localhost:3000`.
2. Attach it with the matching reference screenshot.
3. Send:

```
Image 1 is my page, image 2 is the reference screenshot. List every visual
difference (spacing, font size, letter-spacing, tile proportions, colors,
alignment, wrong or missing images). Then fix them. Don't change anything else.
```

Repeat 2 to 3 times per screen, then commit.
Use Opus 5.5 for the shell and foundation screens, Sonnet 5.5 for the rest.

---

## Fix-it prompts

**Wrong image on a tile:**
```
The image on [screen / option] is wrong. Open asset-manifest.md and the image,
find the correct file, fix the mapping in assets.ts, and update the manifest.
```

**Colors or spacing drifted (after Prompt 4):**
```
Re-read DESIGN.md and the @theme tokens in app/globals.css, and compare against
reference/screen_XX.png. Fix only the differences. Don't touch other files.
```

**One specific detail is wrong (Auto is fine):**
```
In the screenshot the title letter-spacing is much wider than in my page.
Fix only that.
```

**Agent built too much:**
```
You changed more than I asked. Revert everything except [the one thing I asked
for] and keep that change.
```

**It stopped following the rules:**
```
Re-read .kiro/steering/project.md and follow it. Look at the matching
screenshot in /reference and use images only through src/config/assets.ts,
as mapped in asset-manifest.md.
```

---

## Phase 6 — Polish and ship

### Prompt 18 — Mobile
- **Model:** Sonnet 5.5

```
Make every page responsive for phone and tablet widths. Tile rows should wrap or
scroll, the header should collapse sensibly, the measurement screens should
stack the video above the instructions, and pill inputs should fit the
screen. Don't change the desktop look.
```

### Prompt 19 — Deploy
- **Model:** Sonnet 5.5

```
Prepare this project for deployment on Vercel: check the build passes, list any
environment variables needed, tell me whether the video files are too large
to ship inside the repository, and write short deploy steps in DEPLOY.md.
```

If the videos are too big for the repo, host them separately (for example, Cloudflare R2,
Cloudinary or YouTube unlisted) and point `assets.ts` at those URLs.

---

## Decisions to make soon

Product decisions for v1 are made (see the top of this file). What's left is in
`asset-manifest.md` under "Requires external confirmation" and "Still-open product decisions":

| Item | Status | Blocks |
|---|---|---|
| Muller web-font licence and files | Needs confirmation | Final typography (Prompt 4 reports it as pending) |
| Monogram fonts (free, licensed) | Proposed in Prompt 11, needs your approval | Prompt 11 |
| Fabric-code list; Wool & Cashmere fabric | Needs data | Production codes only |
| Free-shipping threshold amount and currency | Needs confirmation | Launch |
| Thigh illustration | Needs artwork | Launch |
| Photo and video publication rights | Pre-launch verification requirement | Launch |
| Our Story copy | Needs text | Prompt 8 |
| "Choose Your Style" tiles: preselect or always open step 1? | Open | Prompt 8 |
| Cart and account icons: keep, hide or build? | Open | Prompt 5 |
| How do orders reach you (email, WhatsApp, database)? | Open | Submit button and /admin |

---

## Later (not for v1)

- Online payment and a real cart
- User accounts and saved measurements
- More jacket styles and fabric families (if not enabled in v1)
- Multiple-angle preview images (screen 28 has them for one design only)
- A real thigh measurement video

---

## Order of work at a glance

```
Setup (done) -> 1 Audit (done) -> 2 Resolve (done) -> 3 Optimize assets -> 4 Tokens
-> 5 Shell -> 6 Wizard foundation -> 7 Fabric picker -> 8 Public pages
-> 9 Jacket -> 10 Pants -> 11 Monogram/note -> 12 Measurements -> 13 Summary -> 14 Admin
-> 15 Spec -> 16 Run tasks -> 17 Pricing tests -> 18 Mobile -> 19 Deploy
```
