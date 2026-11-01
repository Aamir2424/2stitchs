# KIRO_HANDOFF.md — 2Stitchs project handoff

**Written:** October 2026, from direct inspection of the repository (`git status`, source files,
config, docs). Where something comes only from earlier conversation and can't be seen in the repo, it
is marked **(conversation record)**.

**Read this file first.** It tells a new Kiro account what the project is, which documents rule it,
what is built, where things live, what is decided, what is open, and what to do next.

> **Corrections to the brief this file was written from.** Repository inspection shows:
> - Prompts **12, 13, 14 and 15 are already done**, not remaining (section 3).
> - The four monogram fonts are **already self-hosted and integrated**, not pending (section 6).
> - **Commits do exist:** the last is `d1abc3a prompt 7 done`. Everything after Prompt 7 is
>   uncommitted (section 10).
> - The next prompt is **Prompt 16**, and it is paused on a commit-strategy question for the owner
>   (section 8).

---

## 0. Quick status

| Item | State |
|---|---|
| Last commit | `d1abc3a` "prompt 7 done", branch `main` |
| Uncommitted | Prompts 8–15 (12 modified files, 32 untracked files; section 10) |
| Implemented (code present) | Prompts 3–14, plus the Prompt 14 follow-up (monogram and measurement blocks removed from `/admin`) |
| Spec written | Prompt 15: `.kiro/specs/wizard-flow-pricing-orders/{requirements,design,tasks}.md` |
| Next | Prompt 16 (run the spec tasks). **Paused before any code change.** The owner must choose how commits are handled (section 8.1). |
| Then | Prompt 17 (pricing tests), Prompt 18 (mobile), Prompt 19 (deploy), then the final comprehensive validation and visual pass |
| Last full typecheck, lint and build | Passed after the Prompt 14 follow-up. No application code has changed since. |

---

## 1. Project overview

### What it is
**2Stitchs** (spelled exactly that way; domain twostitchs.com) is a made-to-measure suit website. A
customer designs a suit in a step-by-step wizard (fabric, jacket style, fit, lapels, waistcoat for
3-Piece, vent, pants fabric, pants options, monogram, note to the tailor), enters 15 body
measurements with instructional videos, sees a summary with a total price in AED (VAT excluded) and
submits the order. An admin page shows each submitted order as a production ticket for the tailor
(no price). The tagline in the design is "Stitch Your Dream Suit".

### Expected final functionality (v1, from `suit-website-mvp-spec.md`)
- Public pages: `/` (hero plus the "Choose Your Style" row), `/how-it-works`, `/our-story`.
- `/design`: the configurator wizard: 6 fabric families × 10 swatches, 5 jacket styles, the
  conditional waistcoat, the pants-fabric branch, pants options, the monogram, the tailor note, 15
  measurements and the summary.
- One pure `calculatePrice()` shared by the client (summary) and the server (submission).
- Order submission, then a confirmation page (`/order/:id/confirmation` in spec §3).
- `/admin`: a password-gated production ticket.
- Manual checkout (no payment gateway), no 3D preview, no accounts in v1.

### Technology stack (verified versions)

| Tool | Version | Notes |
|---|---|---|
| Next.js | 16.4.2 | App Router; `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts` |
| React / React DOM | 19.3.0 | |
| TypeScript | 5.9.3 | |
| Tailwind CSS | 4.3.3 | Compiled by `@tailwindcss/postcss` 4.3.3 (`postcss.config.mjs`). **No `tailwind.config.ts`.** |
| ESLint | 9.39.5 | `eslint-config-next` 16.4.2 |
| Node / npm | 23.4.0 / 10.9.2 | |
| Database | none | Interim JSON-file order store (section 4.10) |
| Test runner | none installed | Prompt 17 must choose one, which needs the owner's approval |

**This Next.js version differs from older versions.** `AGENTS.md` says to read
`node_modules/next/dist/docs/` before writing Next code. Points that already mattered:
- `PageProps<"/route">` and `LayoutProps` are global types. Run `npx next typegen` if `tsc`
  complains about new routes.
- With Cache Components, dynamic server work must sit behind `<Suspense>` and call
  `await connection()` (see `app/admin/page.tsx`).

### Folder structure (what matters)

```
suit-site/
├── AGENTS.md                     Next.js agent rules (read node_modules/next/dist/docs first)
├── KIRO_HANDOFF.md               this file
├── prompt.md                     THE RUNBOOK (titled "PROMPTS.md (v3)"; no file named PROMPTS.md exists)
├── suit-website-mvp-spec.md      product spec: flow, data model, pricing formula (source of truth)
├── asset-manifest.md             verified asset map (source of truth for assets)
├── DESIGN.md                     design tokens and measurements (documents app/globals.css)
├── README.md                     create-next-app README plus an "Admin production ticket" section
├── image_description.md / image_description_json.json   original visual catalogue (descriptions only)
├── reference/README.md + screen_01.png … screen_41.png  design screenshots (PNGs are gitignored)
├── powerpoint assets/            153 extracted deck files (gitignored, never edit or rename)
├── .kiro/steering/project.md     always-on project rules for Kiro
├── .kiro/specs/wizard-flow-pricing-orders/   Prompt 15 spec (requirements, design, tasks)
├── app/
│   ├── layout.tsx                root layout: PageBackground, Header, PromoStrip, <main>; site metadata
│   ├── globals.css               ALL design tokens (@theme and @theme inline)
│   ├── page.tsx                  home (hero and style row)
│   ├── how-it-works/page.tsx     screen 04
│   ├── our-story/page.tsx        placeholder copy
│   ├── design/page.tsx           <WizardProvider><Wizard/></WizardProvider>
│   └── admin/{page.tsx, actions.ts, LoginForm.tsx}   production ticket and login
├── src/
│   ├── config/
│   │   ├── assets.ts             GENERATED asset map (do not hand-edit; see 2.4)
│   │   ├── site.ts               nav, CTA, AE badge, free-shipping config, header-icon flags
│   │   ├── steps.config.ts       option, choice, monogram and tailor-note steps; step order; conditions
│   │   ├── fabrics.config.ts     6 families × 10 swatches, prices, picker geometry
│   │   ├── measurements.config.ts 15 fields, 13 screens, input rules, media, layout
│   │   └── summary.config.ts     summary and ticket copy, tile mapping, crops, layout, VAT note
│   ├── components/
│   │   ├── Header.tsx, PromoStrip.tsx, PageBackground.tsx   shared shell
│   │   ├── site/PageParts.tsx    SectionHeading, PillLink (public pages)
│   │   ├── summary/SummaryGrid.tsx  grid shared by the summary and the admin ticket
│   │   └── wizard/               Wizard, WizardContext, StepChrome, OptionStep, ChoiceStep,
│   │                             FabricPicker, MonogramStep, TailorNoteStep, MeasurementStep,
│   │                             SummaryStep, tracking.ts
│   ├── content/pages.ts          home, how-it-works and our-story copy
│   ├── fonts/monogram.ts         next/font/local for the 4 monogram fonts
│   ├── lib/selections.ts         shared selection rules (client and server)
│   └── server/{admin-auth.ts, orders.ts}   server-only auth and order store
├── public/images/…  public/videos/measurements/…  public/fonts/…   prepared assets
└── scripts/
    ├── prepare-assets.mjs        builds public/images, public/videos and src/config/assets.ts from the manifest
    └── hash-admin-password.mjs   prints ADMIN_PASSWORD_HASH for a password
```

Outside the repo, in `~/Desktop/twostitchs/`: `suit-extracted/` (the unzipped deck; slide XML at
`suit-extracted/ppt/slides/slideN.xml`, which is where exact geometry was measured), the `.pptx`
files, `2Stitchs.pdf`, two feature-checklist PDFs and an older `prompt.md` (v2, superseded).

### Design system (summary; full detail in `DESIGN.md` and `app/globals.css`)
- **Scale.** The deck slide is 1440 wide, and **1 deck pt = 1 CSS px on a 1440 px page**. Every
  size is a measured deck value. Page y = deck y − 64.8 (the deck has browser chrome above the
  site; DESIGN.md also states it as 64).
- **Colours** (`@theme`):

  | Token | Value |
  |---|---|
  | `burgundy` | `#611921` (pills, inputs, outlines) |
  | `maroon` | `#661414` (headings) |
  | `ink` | `#000` |
  | `paper` | `#fff` |
  | `strip` | `rgb(0 0 0 / .67)` |
  | `strip-text` | `rgb(255 255 255 / .67)` |
  | `tile-shade` | `rgb(0 0 0 / .66)` (Tweed tile) |

  Never copy screenshot pixels as hex: the screenshots carry a display ICC profile.
- **Type.** Each `text-*` token sets size, line height, tracking and weight. Wide-tracked styles
  use 0.463em and labels 0.194em. Tokens: `display`, `heading`, `subheading`, `tagline`,
  `button-lg`, `button`, `banner`, `button-sm`, `button-xs`, `input-display`, `monogram-sample`,
  `step-number`, `eyebrow`, `label-lg`, `nav`, `option`, `caption`, `unit`, `unit-sm`, `label`,
  `fine`, `lead`, `body`. Wide-tracked text is re-centred with left padding: `trackWide` =
  `pl-[0.463em]` and `trackLabel` = `pl-[0.194em]` in `src/components/wizard/tracking.ts`.
- **Font.** `--font-muller: "Muller", ui-sans-serif, system-ui, sans-serif` is also `--font-sans`.
  **Muller files are not available.** Nothing else is loaded as Muller, so the browser shows a
  system sans-serif and text widths differ from the screenshots until Muller arrives.
- **Radii:** `badge` 3, `control-sm` 10.5, `control-compact` 12.25, `control-xs` 9.3, `control` 18,
  `field` 36, `control-lg` 19.25, `checkbox` 3.8. Fully round pills use `rounded-full`.
- **Spacing constants:** `header` 133.4px, `strip` 30, `gutter` 81, `control` 42, `control-lg`
  47.5, `cta` 287, `step-icon` 136.2. There is no spacing scale: the deck has none, so layouts use
  measured constants kept in config `layout` objects.
- **Background.** The geometric pattern (`ui.pattern`, or `ui.patternAlt` on the Tweed and
  Polyester Blend swatch screens) sits at 5% opacity, fixed to the viewport, in `PageBackground`.
  The header uses the linen texture `brand.headerTexture`.
- **Responsive.** All 41 references are 1440px desktop. No breakpoints were invented; Prompt 18
  needs mobile designs or the owner's approval of a proposal.
- **Not in the design, added for usability.** BACK and NEXT pills (`StepNav`), focus rings, and the
  disabled state at 40% opacity.

### Run locally
```
npm install            # only if node_modules is missing
npm run dev            # http://localhost:3000  (start it yourself; agents must not run blocking servers)
npx tsc --noEmit -p .  # typecheck (run `npx next typegen` first if route types are missing)
npm run lint
npm run build
```
`/admin` needs three server environment variables (see `README.md`, "Admin production ticket"):
- `ADMIN_PASSWORD_HASH`: from `node scripts/hash-admin-password.mjs`, which reads the password from
  stdin and requires at least 12 characters.
- `ADMIN_SESSION_SECRET`: at least 32 bytes.
- `ORDERS_DIR`: an absolute directory of `<id>.json` orders.

Without them `/admin` shows "ADMIN ACCESS IS NOT CONFIGURED." There is no `.env` file in the repo;
`.env*` is gitignored. Never commit secrets.

---

## 2. Sources of truth and project rules

### 2.1 Documents and precedence

| Path | Role | Precedence |
|---|---|---|
| `.kiro/steering/project.md` | Always-on rules: brand, stack, assets, typography, copy fixes, conventions | Binding |
| `suit-website-mvp-spec.md` | Flow (§4), measurements (§5), data model (§6), pricing formula (§7), open decisions (§10) | Source of truth for flow, data and pricing. Don't change product scope without asking. |
| `asset-manifest.md` | Which file belongs to which screen and option; crops; hover previews; missing assets; "Spec conflicts" table; "Requires external confirmation"; "Still-open product decisions" | Overrides `image_description.md` and the JSON when they disagree |
| `src/config/assets.ts` | Generated typed map of asset keys to `public/` files | Built only from the manifest by `scripts/prepare-assets.mjs` |
| `DESIGN.md` + `app/globals.css` | Every design token and measured value | Tokens only in `@theme` in `globals.css`; DESIGN.md documents them |
| `reference/README.md` + `reference/screen_NN.png` | 41 screenshots of the finished design | For layout comparison only. Never paste their pixels into the site. |
| `prompt.md` ("PROMPTS.md (v3)") | Prompt-by-prompt runbook: mode, model, screenshots, prompt text, check | Defines the order of work |
| `image_description.md`, `image_description_json.json` | Original catalogue | Descriptions only; ignore their obsolete `BRANDNAME` rule |
| `.kiro/specs/wizard-flow-pricing-orders/*` | Prompt 15 spec for wiring pricing and submission | The plan for Prompt 16 |
| `AGENTS.md` | Read the bundled Next docs before writing Next code | Binding for Next APIs |

When sources conflict:
1. Steering rules come first.
2. The spec decides flow, data and pricing.
3. The manifest decides assets, including over the description files and over `reference/README.md`.
4. Measured deck geometry, checked against the screenshots, decides layout.

One known stale line: the steering file says "DESIGN.md does not exist yet". It now exists
(Prompt 4). Its other rules still hold.

### 2.2 Rules from the steering file (paraphrased; read the file)
- **Brand.** The name is "2Stitchs". The logo is `image2.png` (`brand.logo`). Currency is AED. The
  free-shipping banner and the VAT note are config values.
- **Wizard data.** Options and prices live in config files and are never hardcoded in JSX. Prices
  are summed only by `calculatePrice()`, which doesn't exist yet (Prompt 16, task 2).
- **Assets:**
  - Use only the real deck assets, through `src/config/assets.ts`.
  - Never hardcode an asset path in a component, and never invent or substitute an image.
  - Open an image and confirm it against the label and the manifest before using it. If unsure,
    ask.
  - For a missing asset, show a clearly marked placeholder and list it in your reply.
- **Visual rule.** Before any UI work, open the matching screenshot(s) and actually look at them.
  Afterwards, compare and fix every difference.
- **Copy fixes, never copied from the design:**
  - "WOLD" becomes "WOULD".
  - "inchs" becomes "inches".
  - "TEH" becomes "THE".
  - "TUXIDO" becomes "TUXEDO".
  - "TELL YOUR TAILOR WHAT YOU DESIRE" stays as it is.
  - "USD 500" stays as it is (unconfirmed, never converted).
- **Typography.** Muller is the primary face, with no substitute. It is never reported as loaded
  while it isn't, and never loaded from the PowerPoint `.fntdata` files. Monogram fonts are free
  and licensed for web embedding.
- **Never invent** missing assets, fabric codes, prices or business rules. Ask, and list them.
- **One prompt (one screen or feature) per task.**

### 2.3 Image, video, crop and hover rules (from the manifest, as implemented)
- **Crops** are the deck's `<a:fillRect>` insets in percent (`DeckCrop {left, top, right, bottom}`;
  negative means the photo extends past the tile). `DeckPhoto` in `StepChrome.tsx` places an image
  by those insets. No edited copies of images are made.
- **Hover previews**, only where the manifest lists them:
  - Linen family tile: `image28`, key `fabric.linen.tileHover`, slides in from the right.
  - Worsted Wool swatches 1–3 (Midnight Navy, Charcoal Grey, Medium Grey): `image41`–`43`, keys
    `fabric.wool.hover.*`, fade in.

  They show on hover and on keyboard focus. **No other previews may be added.**
- **Tweed tile.** It is darkened by a CSS overlay (`tile-shade`), never with `image27`. When Tweed
  is selected, the tile image becomes `image74` (`fabric.tweed.tileSelected`).
- **Summary tiles.** Six dedicated thumbnails exist (`image121`–`126`). Every other option reuses
  its own verified step image, cropped with CSS (`regionInStepPhoto` in `summary.config.ts`).
- **Videos.** There are 11 MP4s in `public/videos/measurements/`, 25 MB in total; the largest,
  `sleeve-length.mp4`, is 2.9 MB. They play with `controls`, `preload="metadata"` and the JPEG
  still as `poster`. **The thigh screen never shows the hips video.**
- **Never use:**
  - the screen 28 previews (`image127`–`131`) for other designs;
  - `image3`, `image27`, `image29`/`30`, or the PNG twins of the SVG icons;
  - the spool icon.

### 2.4 Working rules agreed with the owner (conversation record)
- **One prompt at a time.** Report and wait for the owner's review before continuing.
- **Commits.** The owner said: "Do not commit yet. We will perform the comprehensive validation and
  commits after all implementation prompts are complete." The runbook says to commit after every
  prompt, and Prompt 16 asks for a commit per task. That conflict is the open question in 8.1.
  **Don't commit unless the owner explicitly tells you to.**
- **Validation.** Finish all implementation prompts, then run one comprehensive validation and
  visual-fidelity pass. Per prompt, run only the smallest relevant checks.
- **Credits.** Keep usage efficient: don't re-read or re-test what is documented here without
  cause.
- **Ask only** when a real decision or missing source detail blocks the work.
- **Reuse** the existing components (`OptionStep`, `ChoiceStep`, `StepChrome`, `FabricPicker`,
  `SummaryGrid`, `PageParts`) and configs. No unrequested refactors.
- **Regenerating assets.** `src/config/assets.ts` says "GENERATED … Do not edit by hand". To change
  assets, update the manifest and re-run `node scripts/prepare-assets.mjs`.

---

## 3. Work completed, prompt by prompt (verified in the repository)

Legend: **Implemented** means the code is present and was checked in its session. **Partial**
means some parts are deliberately missing or pending. **Not implemented** means no code exists.

### Prompts 1–2: Asset audit and decisions. Implemented (documents)
`asset-manifest.md` (153 files: 127 PNG, 11 JPEG, 4 SVG, 11 MP4) and the decisions recorded in it.
Committed in `825c545`.

### Prompt 3: Prepare assets. Implemented, committed (`a2e88d4`)
- `scripts/prepare-assets.mjs` copies and converts the manifest's assets to WebP in `public/images/`
  (by purpose: brand, fabrics, jackets, lapels, waistcoats, vents, pants, styles, summary, monogram,
  measurements, ui) and the MP4s to `public/videos/measurements/`.
- It crops the three screen 04 icons out of `image17` and `image18`, and generates
  `src/config/assets.ts`.
- `assets.ts` holds 150 typed asset keys, plus:
  - `summaryTiles`: which image each summary option uses;
  - `missingAssets`: `measurement.thigh.video`, `measurement.thigh.illustration`,
    `fabric.woolCashmere.swatch`;
  - `getAsset(key)`.
- Asset kinds are `ImageAsset {src, width, height, alt, source}`, `SvgAsset` and
  `VideoAsset {src, poster, bytes}`.

### Prompt 4: Design tokens. Implemented, committed (`d6fce76`)
`DESIGN.md` and the `@theme` tokens in `app/globals.css` (section 1). The Geist fonts and the Arial
body rule were removed. Muller is pending.

### Prompt 5: Shared shell. Implemented, committed (`a2e88d4`)
- `src/components/Header.tsx`:
  - linen texture background;
  - centred logo, 138px wide, 32px from the top;
  - left nav from `mainNav` (HOME, OUR STORY, HOW IT WORKS);
  - right side: the DESIGN YOUR SUIT link (`designCta`), the AE badge (`regionBadge`, display only),
    and cart and account icons. The icons are images only, not interactive
    (`headerIcons` flags are `false`).
- `src/components/PromoStrip.tsx`: shows `freeShippingMessage()` from `src/config/site.ts`
  (`freeShipping = { amount: 500, currency: "USD", confirmed: false }`).
- `src/components/PageBackground.tsx`: the fixed pattern layer, variant `default` or `alt`.
- `app/layout.tsx` renders `PageBackground`, `Header`, `PromoStrip` and `<main>`.

### Prompt 6: Wizard foundation. Implemented, committed (`a1ae9e1`); extended later
- `WizardContext` (reducer), `Wizard` (step switch), `OptionStep`, and the `jacketFit`,
  `lapelThickness` and `lapelStyle` steps in `steps.config.ts`.
- Assets:
  - jacket fit: `image99` regular, `image100` slim;
  - lapel thickness: `image102` narrow, `image103` medium, `image101` wide;
  - lapel style: `image105` notch, `image106` peak, `image104` shawl.
- All three steps have price delta 0.
- Route: `app/design/page.tsx`.

### Prompt 7: Fabric picker. Implemented, committed (`d1abc3a`)
- `src/config/fabrics.config.ts` (`fabricFamilies`, `getFamily`, `formatBasePrice`,
  `formatSwatchDelta`, `fabricLayout`) and `src/components/wizard/FabricPicker.tsx`.
- `StepChrome.tsx` (`StepTitle`, `StepNav`, `DeckPhoto`, `pillStates`) was extracted then.
- Behaviour:
  - Six family tiles. Clicking one slides it to the start of the row and reveals its 2×5 swatch
    grid. Clicking the selected tile again slides it back and shows all families.
  - Returning to the step with a family chosen opens it on the swatches.
  - Choosing the same family again keeps its swatch; a new family clears the swatch.
  - Tiles show "STARTING FROM AED nnn.00" (Tweed's screen 05 tile shows "WINTER WEAR / COUNTRY
    STYLE"). Swatches with an extra charge show "+AED 99.00". Info icon `ui.icon.info` at 31%.
  - The Tweed and Polyester Blend swatch views switch the page pattern to `ui.patternAlt`
    (`image73`).
- Prices and swatches: see section 5. All `fabricCode` values are `null`.

### Prompt 8: Home, How It Works, Our Story. Implemented; **uncommitted**
- **Files.** Modified: `app/page.tsx`. New: `app/how-it-works/page.tsx`, `app/our-story/page.tsx`,
  `src/components/site/PageParts.tsx` (`SectionHeading`, `PillLink`) and `src/content/pages.ts`.
- **Home.**
  - The hero (`home.hero`, `image4`) starts under the translucent strip.
  - Copy: "TAILORED SUITS"; "STARTING FROM AED 699.00", computed from the lowest `basePrice`; the
    deck's paragraph, verbatim; and a DESIGN YOUR SUIT pill.
  - Then "CHOOSE YOUR STYLE" with 7 tiles (`home.style.*`, `image10`–`16`). **All 7 link to
    `/design` at step 1**; whether a tile should preselect its style is undecided. "TUXEDO SUITS"
    replaces the design's "TUXIDO".
- **How It Works.** Screen 04: "STITCH YOUR DREAM SUIT", "THE THREE STEP PROCESS", three numbered
  steps with the cropped icons (`home.step.fabric`, `home.step.design`, `home.step.measure`), and a
  GET STARTED pill to `/design`.
- **Our Story.** There is no reference screen. It reuses the screen 01 composition (linen with the
  logo) and **placeholder copy** (`ourStory.isPlaceholder: true`).
- **Metadata.** `app/layout.tsx` has the title "2Stitchs | Stitch Your Dream Suit" and the
  description "Design a made-to-measure suit with 2Stitchs, tailored to your measurements." Pages set
  their own titles ("How it works | 2Stitchs", "Our story | 2Stitchs", "Design your suit | 2Stitchs",
  "Production tickets | 2Stitchs").

### Prompt 9: Jacket style, waistcoat, back vent. Implemented; **uncommitted**
- Added to `optionSteps` in `src/config/steps.config.ts`:
  - `jacketStyle` (screen 13; images `image94`–`98`);
  - `waistcoat` (screen 17; `image108` single, `image109` double, `image107` U-shaped; subtitle
    "INCLUDED WITH THE 3-PIECE SUIT");
  - `backVent` (screen 18; `image110` center, `image111` side).
- `conditionalSteps.waistcoat` is `{ step: "jacketStyle", option: "threePiece" }`.
- The `select` reducer deletes every conditional step that is no longer active, so leaving
  3-Piece clears the waistcoat immediately.
- Prices: see section 5. The label "TUXEDO SUITS" is used.

### Prompt 10: Pants steps and separate pants fabric. Implemented; **uncommitted**
- `choiceSteps.pantsFabricChoice` (screen 19, YES/NO pills) is rendered by the new `ChoiceStep.tsx`.
- `pantsFabric` reuses `FabricPicker` and writes only to `selections.pantsFabric`.
  `conditionalSteps.pantsFabric` is `{ step: "pantsFabricChoice", option: "yes" }`, so switching to
  NO clears it.
- `effectivePantsFabric()` returns `pantsFabric` after YES, `fabric` after NO, and `undefined`
  before an answer. It now lives in `src/lib/selections.ts` and is re-exported by `WizardContext`.
- Option steps:
  - `pantsFit`: `image112` regular, `image113` slim;
  - `rise`: `image114` high, `image116` mid, `image115` low; the title is fixed to
    "WHERE WOULD YOU LIKE YOUR PANTS TO SIT";
  - `waistband`: `image113` belt loops, `image117` side tabs (+59);
  - `cuff`: `image118` without, `image119` with (+10).

### Prompt 11: Monogram and tailor note. Implemented; **uncommitted**
- **Monogram** (`MonogramStep.tsx`, `monogramStep` and `monogramStyles` in `steps.config.ts`;
  screen 24):
  - The lining photo `monogram.lining` (`image120`) has "AAMIR" printed in it. It is shown
    unmodified; the typed text appears only in the burgundy input beside it, never over the photo.
  - The hint reads "MAXIMUM OF 10 LETTERS", and the input sanitises to A–Z, uppercase, at most 10
    letters (`sanitizeMonogramText`).
  - "+ AED 39.00" is always displayed, as in the design. It is charged only when text is entered.
  - Four styles are shown as checkbox-like radios with "ABC" samples in the approved fonts
    (section 6). The checkbox is a 34.1px white rounded square with a 1.5px burgundy inset shadow.
  - **No selected mark is drawn.** The design shows none, and the owner had a selected square
    removed.
  - The monogram is optional, but once letters are typed a style is required before NEXT.
- **Tailor note** (`TailorNoteStep.tsx`, `tailorNoteStep`; screen 25):
  - Title "TELL YOUR TAILOR WHAT YOU DESIRE." with its full stop, as in the design.
  - A 1278×395 textarea with a 3px burgundy outline; the text shows uppercase but is stored as typed.
    No length limit.
  - The SUBMIT pill (287×47.5, centred 69px left of the page centre) **continues to the
    measurements; it does not submit an order**. A BACK pill in SUBMIT's shape sits under it. There
    is no NEXT pill.
- **Fonts:** `src/fonts/monogram.ts` and `public/fonts/*` (section 6).

### Prompt 12: Measurements. Implemented; **uncommitted**
- `src/config/measurements.config.ts` defines:
  - `measurementFields`: the 15 fields with label, unit, `maxIntegerDigits` and `maxDecimals`;
  - `measurementSteps`: 13 screens;
  - `measurementTitle` "MEASUREMENT", `measurementLayout`;
  - `isAllowedMeasurementInput`, `parseMeasurement`, `findMeasurementStep`, `isMeasurementStep`,
    `fieldsOf`.
- Rendered by `src/components/wizard/MeasurementStep.tsx`.
- **Screens, in order.**
  1. `measurementProfile` (screen 29): height (inches), weight (kg), age (years, whole number), with
     the "YOUR DIGITAL PROFILE" copy.
  2. 12 guided screens, each with its video and poster:

     | Step | Video | Poster |
     |---|---|---|
     | `measureShoulderWidth` | `VAHOnh6O22M` | `image132` |
     | `measureSleeveLength` ("SLEEVES LENGTH") | `VAHOnpZu6vQ` | `image133` |
     | `measureStomach` | `VAHOnn9Sces` | `image134` |
     | `measureLegLength` | `VAHOn2011yM` | `image135` |
     | `measurePantsWaist` | `VAHOnyibPYY` | `image136` |
     | `measureHips` | `VAHOnxvG-90` | `image137` |
     | `measureThigh` | **none**: dashed "ILLUSTRATION PENDING" area | none |
     | `measureNeck` | `VAHOn-whX8Y` | `image138` |
     | `measureBodyLength` | `VAHOny7vqiY` | `image139` |
     | `measureBicep` | `VAHOn1JRpeU` | `image140` |
     | `measureRise` | `VAHOn5XfIns` | `image141` |
     | `measureWrist` | `VAHOn5vgeiY` | `image142` |

  Keys are `measurement.<field>.video` and `measurement.<field>.poster`. Instruction text is word
  for word from the screenshots.
- **Input rules:**
  - The input accepts digits only: up to 3 before the decimal point and up to 2 after; age allows
    no decimals.
  - The value must be greater than 0.
  - SAVE is enabled only for valid, changed values, and saves all of the screen's values or none.
  - NEXT waits until the screen's values are saved and unchanged.
  - There are no minimum or maximum limits (to confirm with the tailor).

### Prompt 13: Summary. Implemented with a placeholder price; **uncommitted**
- `src/config/summary.config.ts` holds:
  - `summaryCopy`, `ticketCopy`, `ticketLayout`, and `vatNote` = "VAT PAYABLE BY CUSTOMER AT THE
    TIME OF SHIPMENT";
  - `summaryRows`: thumbnails and `regionInStepPhoto` crops, found by normalized cross-correlation
    (0.996–0.999);
  - `summaryTileFor`, `suitDesignCrops`, `fitCaption`, `summaryLayout`.
- Rendering: `src/components/summary/SummaryGrid.tsx` (shared; see 4.9) and
  `src/components/wizard/SummaryStep.tsx`.
- Screen 26 layout:
  - Fabric column: JACKET FABRIC and PANTS FABRIC with the swatch images and names. After NO, the
    pants tile shows the jacket fabric with "(SAME AS JACKET)".
  - SUIT DESIGN: the style photo, with the caption style name plus `fitCaption`, e.g. "SLIM FIT- SUIT
    AND PANT".
  - Detail tiles: lapel thickness, lapel style, vent, rise, waistband, cuff.
  - **Waistcoat tile (3-Piece only)** under the fabric column. It isn't in the design and needs
    visual approval.
  - TOTAL PRICE pill showing the **placeholder "AED —"**, then "EXC. VAT" and the VAT note.
  - Below the price, the monogram, tailor-note and measurements blocks. These aren't in the design.
  - BACK only, no NEXT. There is no submit control (see 8.1, Q1).
- Layout was measured within 0.1px of the deck (conversation record).

### Prompt 14: Admin production ticket. Implemented; **uncommitted**
- Files:
  - `app/admin/page.tsx`, `app/admin/actions.ts` (`login`, `logout`), `app/admin/LoginForm.tsx`;
  - `src/server/admin-auth.ts`, `src/server/orders.ts`;
  - `scripts/hash-admin-password.mjs`.
- Refactors for reuse (behaviour unchanged):
  - `SummaryGrid.tsx` was extracted from `SummaryStep`;
  - `tracking.ts` was split out of `StepChrome`, which re-exports it;
  - `effectivePantsFabric` and the new `parseSelections` live in `src/lib/selections.ts`.
- Auth and orders: section 4.10.
- Ticket (screen 27):
  - Title: the customer name.
  - `SummaryGrid variant="ticket"`, with the caption "SUIT FABRIC". Each fabric tile shows the
    swatch name plus `fabricCode ?? "CODE NOT ON FILE"`.
  - "NOTES: <tailor note>", or "—".
  - Then ALL ORDERS and LOG OUT. These aren't in screen 27 and were kept on purpose.
  - No price, VAT, monogram block or measurements block. Those two blocks were removed in the
    follow-up.
- `README.md` got the admin environment-variable section.

### Prompt 15: Implementation spec. Written; **uncommitted**
- `.kiro/specs/wizard-flow-pricing-orders/` holds:
  - `requirements.md`: 11 requirements, assumptions A1–A7, open questions Q1–Q12;
  - `design.md`: interfaces, the `calculatePrice` algorithm, worked examples E1–E10, the data
    mapping, error handling, security;
  - `tasks.md`: 10 tasks, **all unchecked**.
- No code was changed in Prompt 15. The owner hasn't explicitly approved the spec documents; the
  Prompt 16 request calls them "approved".

### Not implemented yet
- `calculatePrice()` and the real total on the summary.
- Order submission, the order write path, the confirmation page, and clearing the wizard after
  submission.
- Pricing tests, the mobile layout, deployment, Muller fonts, the thigh illustration, real fabric
  codes and the Our Story copy.

---

## 4. Current application architecture

### 4.1 Component hierarchy
```
app/layout.tsx  (Server)
├── PageBackground           fixed 5% pattern layer
├── Header                   linen header, logo, nav, CTA, AE badge, icons
├── PromoStrip               free-shipping text from site.ts
└── <main>
    ├── app/page.tsx         Hero (DeckPhoto home.hero) + StyleRow
    ├── app/how-it-works     SectionHeading, icons, PillLink
    ├── app/our-story        placeholder
    ├── app/design/page.tsx  WizardProvider ─ Wizard ("use client")
    │     Wizard picks one component for state.step:
    │       "fabric" | "pantsFabric"      → FabricPicker   (key = step, target = step)
    │       "monogram"                    → MonogramStep
    │       "tailorNote"                  → TailorNoteStep
    │       "summary"                     → SummaryStep → SummaryGrid + PriceBlock (+ blocks)
    │       measurement step ids          → MeasurementStep (config from findMeasurementStep)
    │       choiceSteps ids               → ChoiceStep
    │       otherwise (optionSteps ids)   → OptionStep
    └── app/admin/page.tsx   Suspense → AdminContent (server) → LoginForm | order list | ProductionTicket → SummaryGrid
```
Every step receives `onNext`, `onBack`, `canGoNext`, `canGoBack` and `focusTitle`. Focus moves to
the new title only after the customer has navigated, not on first load. `canGoNext` is forced
`false` on the last step (the summary). `Wizard.tsx` passes options through `selectOption()`, which
checks the id exists in the step config before calling `select`.

### 4.2 WizardContext (`src/components/wizard/WizardContext.tsx`)
- **State:** `{ step: WizardStepId; selections: WizardSelections }`, held in `useReducer`, in memory
  only. **Nothing persists: a reload loses everything.** It starts at `wizardSteps[0]` (`"fabric"`).
- **`WizardSelections`:**
  - one optional field per `SelectableStepId`, i.e. every `optionSteps` and `choiceSteps` key,
    typed to its option ids;
  - `fabric?` and `pantsFabric?`: `FabricSelection = { family, swatch? }`;
  - `monogramText?` (sanitised), `monogramStyle?` (`sans` | `slab` | `script` | `serif`);
  - `tailorNote?` (stored as typed);
  - `measurements?`: `Partial<Record<MeasurementFieldId, number>>`.
- **Actions:**
  - `select`: also deletes inactive conditional steps;
  - `selectFabricFamily`: a same family keeps its swatch, a new family drops it;
  - `selectSwatch`: ignored if the swatch isn't in the selected family;
  - `clear`;
  - `setMonogramText`: re-sanitised;
  - `selectMonogramStyle`: only the 4 known ids;
  - `setTailorNote`;
  - `saveMeasurements`: all or nothing, each value through `parseMeasurement`;
  - `clearAll`;
  - `goTo`: only to steps active for the current selections.
- **Value exposed by `useWizard()`:** `selections`, `pantsFabric` (= `effectivePantsFabric`),
  `currentStep`, `stepIndex`, `stepCount`, `isFirstStep`, `isLastStep`, `canGoNext`, plus all the
  action functions, `next` and `back`.
- **Private helpers** (Prompt 16 task 1 moves them to `src/lib/selections.ts`):
  - `isStepActive`, `activeSteps`;
  - `isStepComplete`:
    - a fabric step needs a swatch;
    - the monogram is complete with no text, or with a style;
    - the tailor note and the summary are always complete;
    - a measurement step is complete when all its fields are saved;
    - any other step needs a selection.
- `goTo` is exposed but no UI calls it, and it doesn't check completeness.

### 4.3 Step configuration and order (`src/config/steps.config.ts`)
- **Step definitions:**
  - `optionSteps`: `jacketStyle`, `jacketFit`, `lapelThickness`, `lapelStyle`, `waistcoat`,
    `backVent`, `pantsFit`, `rise`, `waistband`, `cuff`. Each is an `OptionStepConfig` with
    `title`, `subtitle?`, `captionSize?`, `reference`, `layout {tileWidth, tileHeight, gap,
    titleTop, tilesTop, subtitleTop?}` and `options: StepOption[]`. Each option has `id`, `label`,
    an `image: AssetKey`, `crop`, `priceDelta` and an optional `tileWidth`.
  - `choiceSteps`: `pantsFabricChoice`, with `layout {pillWidth, pillHeight, gap, titleTop,
    pillsTop}`.
  - `monogramStyles`, `monogramStep`, `sanitizeMonogramText`, `tailorNoteStep`, `priceCurrency`
    (`"AED"`), and `formatPriceDelta`, which gives "+ AED 29.00" or null for 0.
- **Order:** `designSteps` is fabric, jacketStyle, jacketFit, lapelThickness, lapelStyle,
  waistcoat, backVent, pantsFabricChoice, pantsFabric, pantsFit, rise, waistband, cuff, monogram,
  tailorNote. Then `wizardSteps` = `designSteps` + the 13 `measurementSteps` ids + `"summary"`.
  That's 27 shown steps, 28 with either conditional step and 29 with both.
- **Conditions:** `conditionalSteps` is `{ waistcoat: jacketStyle = threePiece, pantsFabric:
  pantsFabricChoice = yes }`.

### 4.4 Navigation, conditional steps and preservation
- `steps = activeSteps(selections)` is recomputed on every change.
- `next()` moves to `steps[index + 1]` only if `isStepComplete(current)`. `back()` moves to
  `steps[index - 1]`.
- Inactive steps are not in `steps`, so they are skipped. Their stale values are deleted by the
  `select` reducer.
- **Preservation.** Selections stay in context while the customer moves between steps. Revisiting a
  step shows the saved choice: tiles are checked, the fabric picker opens on its family, and
  measurement drafts start from the saved values.

### 4.5 FabricPicker (`src/components/wizard/FabricPicker.tsx`)
- **Props:** `selection`, `onSelectFamily`, `onSelectSwatch`, plus the nav props. `Wizard` renders
  one instance per target (`key={currentStep}`).
- **Layout.** Geometry comes from `fabricLayout` (deck px), converted to % of the 1333.4px row.
  There are 6 family tiles (215.4×323.6). When selected, a tile grows to 217.9×327.4, and the grid
  is 1077×326.6 at left 226.2.
- **Expanded state.** Local `expanded` state, initialised to whether a family is selected. The
  selected family tile has `aria-pressed` and `aria-expanded`; swatches form a `role="radiogroup"`.
- **Hover:**
  - Linen: `tileHover` slides in on hover or focus.
  - Wool 1–3: `swatch.hover` fades in on hover or focus.
  - Tweed: `tileShade`, `tileNote` and `selectedTileImage`.
- When an open family has `background: "alt"` (Tweed, Polyester Blend), the picker renders
  `<PageBackground variant="alt" />`.

### 4.6 Shared step chrome
- **`StepChrome.tsx`** (client):
  - `StepTitle`: an `h1` with `tabIndex=-1` and a 10.5px translate.
  - `StepNav`: BACK and NEXT pills, with `showNext` and `size` set to `"standard"` or `"large"`.
  - `DeckPhoto({ image, crop, width, alt?, className? })`: `next/image` with `fill`, positioned by
    the crop.
  - `pillStates`; re-exports `trackWide` and `trackLabel`.
- **`OptionStep.tsx`.** Tiles are native radio inputs (`sr-only`, so arrow keys and Space work).
  The selected tile gets a 3px burgundy outline offset 5px, and its caption turns burgundy. Focus
  adds a 2px ink ring. The price line comes from `formatPriceDelta`.
- **`ChoiceStep.tsx`.** The same radio pattern with 370×59 `rounded-full` pills.

### 4.7 Routes and shell
- Routes: `/`, `/how-it-works`, `/our-story`, `/design`, `/admin`.
- `/order/[id]/confirmation` doesn't exist yet; it is blocked (Q1).
- `/design/summary` from spec §3 isn't used: the summary is a wizard step (spec assumption A7, Q6).
- Every route renders inside the shell from `app/layout.tsx`. `/admin` too, though screen 27 shows
  no header.

### 4.8 How images are referenced
- Components use only `getAsset(key)` or `DeckPhoto image={key}` with an `AssetKey` from config.
  Config files type their image fields as `AssetKey`, so a wrong key fails at compile time.
- `next/image` is used with `fill` and `sizes` from the deck width. SVG icons use `unoptimized`.
- Videos use `<video src poster controls preload="metadata">`.
- Summary tiles use `summaryTileFor(row, optionId)`: a dedicated thumbnail, or a step image with a
  `regionInStepPhoto` crop.

### 4.9 SummaryGrid (`src/components/summary/SummaryGrid.tsx`)
- No hooks and no `"use client"`, so it renders on the client (summary) and the server (ticket).
- Exports:
  - `SummaryGrid({ selections, pantsFabric, variant: "summary" | "ticket", marginTop })`;
  - `MonogramBlock`, `MeasurementsBlock`, `TextBlock`;
  - `summaryColumns`, `summaryGridWidth`.
- `SummaryStep` uses the grid plus the price block and the extra blocks. The admin ticket uses the
  grid only.

### 4.10 Server side (`src/server/`, `app/admin/`)
- **`admin-auth.ts`** (`import "server-only"`):
  - Exports `isAdminConfigured`, `verifyAdminPassword`, `startAdminSession`, `endAdminSession`,
    `hasAdminSession`, `requireAdminSession`.
  - `ADMIN_PASSWORD_HASH` has the format `scrypt:N:r:p:salt:key`, with base64url parts and no `$`.
    The comparison is constant-time.
  - The session cookie `twostitchs_admin` is a stateless `expiry.nonce.sig` signed with HMAC-SHA256
    using `ADMIN_SESSION_SECRET`. Flags: HttpOnly, Secure in production, SameSite=Strict, path
    `/admin`, 8 hours.
  - Missing configuration fails closed, and a failed login waits 750 ms.
  - There is no rate limiting and no session revocation.
- **`orders.ts`** (`server-only`):
  - Exports `listOrders()`, `getOrder(id)`, `isOrderId` (`^[A-Za-z0-9_-]{1,64}$`), and the types
    `ProductionOrder {id, customerName, submittedAt, selections}` and `OrderStoreResult`.
  - Every read calls `requireAdminSession()`.
  - **Interim store:** `<ORDERS_DIR>/<id>.json` files shaped `{customerName, submittedAt,
    selections}`. Nothing writes them yet.
- **`src/lib/selections.ts`:**
  - `effectivePantsFabric`;
  - `parseSelections(raw)`: rejects unknown ids, a waistcoat without 3-Piece, a pants fabric without
    YES, invalid measurements, unknown families (so Wool & Cashmere is impossible) and notes over
    `maxStoredNoteLength` (10,000). It **accepts incomplete selections**; Prompt 16 task 1 adds
    `parseCompleteSelections`.
- **`app/admin/page.tsx`:**
  - `<Suspense>` with "LOADING…", then `await connection()`, so every check runs per request.
  - Metadata sets robots noindex.
  - States: not configured, login form, order list, ticket (`?order=<id>`), "ORDER NOT FOUND",
    "NO ORDER STORE".
  - Links use `prefetch={false}`.

---

## 5. Decisions already made (do not reverse without the owner)

### Brand and copy
- "2Stitchs". The UI says **TUXEDO**, never TUXIDO, on the home tile and the jacket style.
- Fixed copy: "WOULD", "inches", "THE". "TELL YOUR TAILOR WHAT YOU DESIRE." keeps its full stop.
- The free-shipping strip shows **USD 500 as in the design**, unconverted, marked `confirmed: false`
  in `src/config/site.ts`.
- The VAT note is a config value: "VAT PAYABLE BY CUSTOMER AT THE TIME OF SHIPMENT". The summary
  shows "EXC. VAT".
- The home metadata is 2Stitchs-branded (section 3, Prompt 8).
- **Our Story** uses placeholder copy (`ourStory.isPlaceholder: true`) with no factual claims.
- The home hero paragraph is the deck's text, verbatim, **including unconfirmed claims** (see 7).
- All "Choose Your Style" tiles open `/design` at step 1.

### Fabrics (`src/config/fabrics.config.ts`)
- **Six families**, with ids `wool`, `linen`, `cotton`, `velvet`, `tweed`, `polyBlend`. Base prices
  in AED:

  | Family | Base price |
  |---|---:|
  | Worsted Wool | 799 |
  | Linen | 999 |
  | Cotton | 799 |
  | Velvet | 899 |
  | **Tweed** | **899** (from screen 11; screen 05 shows "WINTER WEAR / COUNTRY STYLE" instead of a price) |
  | Polyester Blend | 699 |

- **10 swatches each** (60 in total), in the manifest's slot order. Only two swatches cost extra:
  Wool **Navy Prince of Wales Check +99** and Wool **Navy Pinstripe +99**. All others are 0,
  including Polyester Blend's Navy Prince of Wales Check and Cotton's Navy Pinstripe.
- **All `fabricCode` values are `null`.** The ticket shows "CODE NOT ON FILE". Never guess a code.
- **No Wool & Cashmere.** `parseSelections` rejects unknown families.

### Prices (`src/config/steps.config.ts`; spec §4.1)

| Step | Option prices |
|---|---|
| Jacket style | 2-Piece 0, **3-Piece +199** (includes the waistcoat), Double-Breasted +99, Safari +299, Tuxedo +299 |
| Waistcoat (3-Piece only) | Single-Breasted 0, **Double-Breasted +29**, U-Shaped 0 |
| Waistband | Belt Loops 0, Side Tabs +59 |
| Cuff | Without 0, With +10 |
| Monogram | **+39, only when monogram text is non-empty** (`monogramStep.priceDelta`) |
| Fit, lapels, vent, pants fit, rise | 0 |

### Pricing formula
Spec §7, not implemented yet:

```
jacket family base
+ jacket swatch delta
+ jacket style delta
+ waistcoat delta (3-Piece only)
+ pants swatch delta (YES only; the pants family adds no base price)
+ waistband delta
+ cuff delta
+ monogram 39 (if text)
```

- VAT-exclusive. No shipping.
- Screen 26 check: 899 + 299 + 59 + 10 = **AED 1267.00**.
- Worked examples E1–E10 are in the spec's `design.md`.

### Wizard behaviour
- The waistcoat step is shown only for 3-Piece. **Changing away from 3-Piece clears the waistcoat.**
- **Pants fabric:**
  - YES runs the fabric picker again and stores `pantsFabric` **independently** of the jacket
    fabric.
  - **NO reuses the jacket fabric** and stores no `pantsFabric`.
  - Switching YES to NO clears `pantsFabric`.
- **Monogram:**
  - optional;
  - **at most 10 letters A–Z, uppercase**;
  - a style is required once letters are typed;
  - the "AAMIR" lining photo is never edited or overlaid, and the typed text appears separately in
    the input beside it;
  - no selected mark on the style checkboxes (owner's decision);
  - the "+ AED 39.00" label is always visible, as in the design.
- **Tailor note:** optional, no wizard limit. SUBMIT continues to the measurements, and BACK sits
  under SUBMIT in the same shape.
- **Measurements:**
  - 15 fields on 13 screens;
  - height in inches, weight in kg, age in whole years; everything else in inches;
  - at most 3 integer digits and 2 decimals, and greater than 0;
  - NEXT waits for SAVE.
- **Thigh never shows the hips video.** It shows "ILLUSTRATION PENDING" until an illustration
  exists.
- **Summary:**
  - The price is the placeholder "AED —" until Prompt 16.
  - The waistcoat tile sits under the fabric column (needs visual approval).
  - After NO, the pants tile is marked "(SAME AS JACKET)".
  - The monogram, note and measurement blocks sit below, though they aren't in the design.
- **Admin ticket:**
  - Server-side auth only.
  - No price, VAT, monogram or measurements.
  - "SUIT FABRIC" caption, "CODE NOT ON FILE", and a "NOTES:" line.
  - ALL ORDERS and LOG OUT links are kept.
- The "WAIST COAT" spelling from the design is kept for now (see 7).
- Header cart and account icons are display only.

---

## 6. Monogram fonts: approved **and implemented** (verified)

Approved by the owner: Arimo Bold, Courier Prime Bold, Cormorant Garamond Bold Italic and Tinos
Bold, all SIL OFL 1.1, self-hosted with `next/font/local` and with licence files. **The repository
shows this is done** (untracked, uncommitted):

| Style id | Font | File | Licence file |
|---|---|---|---|
| `sans` | Arimo Bold | `public/fonts/arimo/Arimo-Bold.woff2` | `public/fonts/arimo/OFL.txt` |
| `slab` | Courier Prime Bold | `public/fonts/courier-prime/CourierPrime-Bold.ttf` (upstream ships no woff2) | `public/fonts/courier-prime/OFL.txt` |
| `script` | Cormorant Garamond Bold Italic | `public/fonts/cormorant-garamond/CormorantGaramond-BoldItalic.woff2` | `public/fonts/cormorant-garamond/OFL.txt` |
| `serif` | Tinos Bold | `public/fonts/tinos/Tinos-Bold.woff2` | `public/fonts/tinos/OFL.txt` |

- **Loading.** `src/fonts/monogram.ts` declares the fonts with `next/font/local`: weight 700,
  `display: swap`, `preload: false`. It sets the variables `--font-arimo`, `--font-courier-prime`,
  `--font-cormorant-garamond` and `--font-tinos` through `monogramFontVariables`, which is applied
  on the monogram step and the summary section.
- **Tokens.** `@theme inline` in `globals.css` maps them to `font-monogram-sans`, `-slab`,
  `-script` and `-serif`.
- **Records.** The source repositories and pinned commits are listed in `DESIGN.md`, "Monogram
  fonts". The PowerPoint `.fntdata` files are not used.
- The style is a label for the tailor, not a guarantee of the embroidery typeface; confirm with the
  tailor.
- **Muller (the primary font) is still pending.** No files exist, and none may be substituted.

---

## 7. Outstanding issues and unresolved decisions (not resolved; do not resolve silently)

### Content and copy
1. **"WAIST COAT" or "WAISTCOAT".** The design writes the step title "ADD A WAIST COAT" and the
   label "DOUBLE BREASTED WAIST COAT", but "SINGLE BREASTED WAISTCOAT" and "U-SHAPED WAISTCOAT". The
   code keeps the design's spelling. The owner hasn't decided.
2. **Marketing claims.** The home paragraph says "over 50 premium fabrics" (v1 has 60 swatches in 6
   families) and "Perfect Fit Guarantee". Both need the owner's confirmation (comment in
   `src/content/pages.ts`).
3. **Our Story copy** is a placeholder. The real text isn't supplied, and the page design is
   improvised (no reference screen).
4. **Monogram characters.** Spaces, digits and accents are blocked (A–Z only); to be confirmed.
5. **VAT note** wording and treatment, and whether shipping is charged below the threshold (Q10).
6. **Free-shipping threshold** "USD 500" while prices are AED; unconfirmed.

### Source data and assets
7. **Fabric codes:** none exist. All are `null` and the ticket shows "CODE NOT ON FILE".
8. **Wool & Cashmere** (screen 27 mockup) isn't in the fabric data and has no swatch image. Its
   intended role (a 7th family, a swatch, or just a mockup) needs the owner's confirmation. It isn't
   offered.
9. **Thigh illustration** is missing; the screen shows "ILLUSTRATION PENDING" (launch blocker).
10. **Muller font licence and files** are missing (final typography; launch blocker).
11. **Publication rights** for every deck photo and video (pre-launch requirement).
12. **Hover previews.** Only Linen and Wool 1–3 have them, as the manifest decides. Previews show
    on hover and keyboard focus only, so **touch devices have no equivalent**; review in Prompt 18.
    The screen 28 multi-angle previews are unused.
13. **Measurement ranges** (minimum and maximum per field) aren't specified.

### Product and UX decisions
14. **Choose Your Style tiles:** preselect a style or family, or always step 1 (currently step 1)?
15. **Cart and account icons:** keep, hide or build (currently inert)?
16. **How orders reach the business** (email, WhatsApp, database), and where production orders are
    stored (spec Q3). The interim file store can't work on Vercel's read-only file system.
17. **Summary submit control, customer-details capture and confirmation page:** no design exists
    (Q1). Which contact fields to collect beyond name and email (Q2).
18. **Customer name.** The wizard doesn't collect it, but the ticket title needs it.
19. **Pricing questions:**
    - Q4: pants YES with the same swatch as the jacket. Does the swatch's extra charge apply again?
    - Q11: a pants fabric from a pricier family adds no base price. Confirm this is intended.
20. **Ticket:** how does the tailor receive the measurements and monogram, which screen 27 doesn't
    show (Q5)?
21. **Summary route:** keep the summary inside `/design`, or move it to `/design/summary` (Q6)?
22. **Tailor-note limit:** none in the wizard, 10,000 characters accepted on the server (Q7).
23. **Spam and abuse protection** for public submission (Q12). Admin login has no rate limiting
    and sessions can't be revoked individually.
24. **Waistcoat summary tile** position and crop need visual approval. The summary's monogram, note
    and measurement blocks aren't in the design.
25. **Monogram style selection** shows no visual mark, per the owner's request. Flag it during final
    UX review only if needed.

### Technical and UI
26. **No persistence.** A reload loses the whole wizard.
27. **Responsive.** There are no mobile references (Prompt 18). Some components have basic wrapping
    (the home tiles at 4 and 2 columns, a measurement column that wraps), but nothing is designed.
28. **Muller fallback.** The system sans-serif changes text widths, so the final visual pass must
    happen after Muller arrives, or accept the differences.
29. **Steering file staleness.** `.kiro/steering/project.md` still says DESIGN.md doesn't exist.
    Don't edit it without the owner.
30. **Untracked assets.** `reference/*.png` and `powerpoint assets/` are gitignored. They exist only
    on this machine (41 PNGs in `reference/`, 153 files in `powerpoint assets/`), so a fresh clone
    won't have them.
31. **`prompt.md` "Decisions to make soon" table** is partly out of date (it still lists Prompt 8 and
    Prompt 5 dependencies). Informational only.

---

## 8. Remaining prompts and roadmap (exact order from `prompt.md`)

Prompts 1–15 are done (section 3). Remaining, in order: **16, 17, 18, 19**. The runbook also defines
a "Fidelity loop" and "Fix-it prompts", which are reusable procedures, not numbered steps. After 19
comes the owner's agreed comprehensive validation, visual-fidelity pass and commits.

### 8.1 Prompt 16: Run the tasks. **Next; paused before any code**
- **Mode / model:** Spec, Sonnet 5.5.
- **Runbook text:** "Run the tasks from `tasks.md` one at a time. Review and commit after each."
- **Plan:** `.kiro/specs/wizard-flow-pricing-orders/tasks.md`. Requirement numbers refer to
  `requirements.md`; section numbers refer to `design.md`.

  | Task | Work | Status |
  |---|---|---|
  | 1 | Move `isStepActive`, `activeSteps` and `isStepComplete` to `src/lib/selections.ts`; add `isCompleteSelections` and `parseCompleteSelections` (drop `monogramStyle` when the text is empty) | ready |
  | 2 | `src/lib/pricing.ts`: `calculatePrice(selections)` (throws `PricingError`) and `formatPrice` ("AED 1267.00"); amounts from config only; check E1–E10 by hand | ready |
  | 3 | Real total in `SummaryStep` `PriceBlock`; "AED —" stays as the fallback; layout unchanged; compare with screen 26 | ready |
  | 4 | `OrderRecord` (`schemaVersion: 1`, `id`, `status: "submitted"`, `submittedAt`, `customerName`, `customerEmail`, `selections`, `pricing {total, currency: "AED", vatIncluded: false}`) and stricter `parseOrder`; `ProductionOrder` never includes pricing or email | ready |
  | 5 | `createOrder()`: atomic temp-file and rename write into `ORDERS_DIR` (development only); document it in README | ready |
  | 6 | `app/design/actions.ts` `submitOrder` server action: validate, price on the server, `randomUUID`, store; no UI | ready |
  | 7 | Submit control and customer details on the summary | **BLOCKED (Q1, Q2)** |
  | 8 | `app/order/[id]/confirmation/page.tsx` and `clearAll()` after a successful submission | **BLOCKED (Q1)** |
  | 9 | End-to-end check against screens 26 and 27, plus the Prompt 14 security checks | after 1–6 |
  | 10 | Production order store or notification | **BLOCKED (Q3)** |

- **Open question to the owner, asked and unanswered.** The tree holds uncommitted Prompts 8–15.
  Task 1 edits `WizardContext.tsx` (which contains Prompt 9–14 changes) and `src/lib/selections.ts`
  (untracked). So a per-task commit would sweep in earlier prompts, and a narrower commit wouldn't
  build. Options offered:
  1. A baseline commit of Prompts 8–15 first (after typecheck, lint and build), then one commit per
     task. This was recommended.
  2. No commits; list each task's files in the report.
  3. The owner splits and commits Prompts 8–15 themselves.

  **Wait for the answer.** The owner was also asked whether any of Q1–Q12 are answered.
- **Acceptance criteria:**
  - one shared `calculatePrice()` with no duplicated formula;
  - the server ignores client totals;
  - the waistcoat and pants rules are preserved;
  - all 15 measurements are required;
  - no visual changes;
  - blocked tasks are reported, not skipped silently.

### 8.2 Prompt 17: Pricing tests
- **Mode / model:** Vibe, Sonnet 5.5.
- **Depends on:** Prompt 16 task 2.
- **Prompt:** write tests for `calculatePrice()`:
  - a base order with no extras;
  - an order with a +99 swatch and side tabs;
  - an order with a different pants fabric;
  - an order with a monogram.

  Show the expected totals in a table, then run the tests.
- **Check:** totals match hand calculations from the config, plus screen 26's 899 + 299 + 59 + 10 =
  1267.
- **Expected values** (spec `design.md`):

  | Example | Total |
  |---|---:|
  | E1 | 699 |
  | E2 | 957 |
  | E3 | 1397 |
  | E4 | 738 |
  | E5 | 1267 |
  | E6 | 1234 |
  | E7 | 898 |
  | E8 | 699 |
  | E9, E10 | throw |

  These were recomputed from the config.
- **Note:** no test runner is installed. Choosing one adds a dependency, so ask the owner first.

### 8.3 Prompt 18: Mobile
- **Model:** Sonnet 5.5.
- **Prompt:** make every page responsive for phone and tablet:
  - tile rows wrap or scroll;
  - the header collapses sensibly;
  - measurement screens stack the video above the instructions;
  - pill inputs fit the screen;
  - the desktop look doesn't change.
- **References:** none exist for mobile. Per DESIGN.md, the owner must approve a proposed scaling.
  Also handle the touch alternative for hover previews (item 12).

### 8.4 Prompt 19: Deploy
- **Model:** Sonnet 5.5.
- **Prompt:** prepare for Vercel:
  - check that the build passes;
  - list the environment variables needed;
  - say whether the videos are too large for the repo;
  - write `DEPLOY.md`.
- **Known facts:**
  - Videos total 25 MB, the largest 2.9 MB, and they are already committed under `public/videos/`.
  - Environment variables: `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, `ORDERS_DIR`, plus
    whatever Q3 adds.
  - `ORDERS_DIR` can't work on Vercel; this depends on Q3.
  - The Secure cookie needs HTTPS.

### 8.5 After Prompt 19 (owner's agreed workflow)
1. One comprehensive validation: typecheck, lint, build, browser walk-throughs of every route and
   wizard branch, and the admin security checks.
2. A visual-fidelity pass against all 41 screenshots, using the runbook's "Fidelity loop".
3. Commits, as the owner decides.

---

## 9. Testing and validation status

### 9.1 Historical checks that passed (conversation record; the scripts were temporary and deleted)

| Prompt | Checks run | Result |
|---|---|---|
| Tailwind setup | dev render, production build, lint | pass |
| 3–8 | reported done in earlier sessions | Details not in the available record; Prompts 3–7 are committed |
| 9 | headless-browser checks (waistcoat shown or skipped and cleared, images, prices) | 22 pass |
| 10 | browser checks (YES/NO branch, clearing, images, rise title) + build | 34 pass; build pass |
| 11 | monogram and tailor-note checks; then font integration, SUBMIT offset and checkbox shape | 27 pass, then 19 pass |
| 12 | measurement checks (15 inputs, video and poster per screen, thigh without hips footage, save rules, order) | 60 pass |
| 13 | summary tiles, crops and layout | 19 checks over 2 runs; layout within 0.1px of the deck |
| 14 | `tsc`, lint, build; curl leak checks (no order data without a session, with a forged cookie, or unconfigured; no `ADMIN_` or `scrypt` in client bundles); browser test of `/admin` (login, cookie flags, list, ticket tiles, CODE NOT ON FILE, notes, no price, rejection of bad orders and path traversal, tampered cookie, logout) | all pass, 20/20 browser |
| 14 regression | summary after the SummaryGrid refactor (tiles, images, price block, BACK) | 5/5 |
| 14 follow-up | `tsc`, lint, build; `/admin` without monogram or measurements, plus security checks | pass; 11/11 |
| 15 | worked pricing examples recomputed from the config with a throwaway script | E1–E8 match |

**Visual comparison.** Each screen was compared against its reference when built. Measured layouts
match the deck geometry, for example the summary within 0.1px. Differences that remain on purpose
or by necessity:
- the Muller fallback font;
- BACK and NEXT pills, which aren't in the design;
- the summary's extra blocks and waistcoat tile;
- the `/admin` header and links;
- "ILLUSTRATION PENDING" on the thigh screen;
- the "AED —" price placeholder.

### 9.2 Still to do in the final pass (not yet rerun)
- `npx tsc --noEmit -p .`, `npm run lint`, `npm run build` after Prompts 16–19.
- Full browser walk-throughs:
  - every wizard branch: 3-Piece or not × pants YES or NO, with and without a monogram;
  - every measurement screen;
  - the summary total against E1–E8.
- The submission path and `/admin` with real records; the security checks again.
- Route checks: `/`, `/how-it-works`, `/our-story`, `/design`, `/admin`, and the confirmation page
  once it exists.
- A visual-fidelity pass on all 41 screenshots, ideally after Muller is available.
- Mobile checks after Prompt 18.

Don't rerun the full suite after every prompt; run only the smallest relevant checks unless a
specific problem calls for more.

---

## 10. Git and working state (verified)

- **Branch:** `main`. **Latest commit:** `d1abc3a` "prompt 7 done" (2026-10-29). There are 7
  commits; `8cf4038`, `2c8092a`, `825c545`, `d6fce76`, `a2e88d4`, `a1ae9e1` and `d1abc3a` cover the
  scaffold through Prompt 7.
- **So commits were made** for the setup and Prompts 3–7. **Prompts 8–15 are all uncommitted.**
- **Modified (tracked):** `DESIGN.md`, `README.md`, `app/globals.css`, `app/layout.tsx`,
  `app/page.tsx`, `asset-manifest.md`, `prompt.md`, `src/components/wizard/OptionStep.tsx`,
  `src/components/wizard/StepChrome.tsx`, `src/components/wizard/Wizard.tsx`,
  `src/components/wizard/WizardContext.tsx`, `src/config/steps.config.ts`.
- **Untracked:**
  - `.kiro/specs/wizard-flow-pricing-orders/{design,requirements,tasks}.md`
  - `app/admin/{LoginForm.tsx,actions.ts,page.tsx}`
  - `app/how-it-works/page.tsx`, `app/our-story/page.tsx`
  - `public/fonts/` (4 font files and 4 `OFL.txt`)
  - `scripts/hash-admin-password.mjs`
  - `src/components/site/PageParts.tsx`, `src/components/summary/SummaryGrid.tsx`
  - `src/components/wizard/{ChoiceStep,MeasurementStep,MonogramStep,SummaryStep,TailorNoteStep}.tsx`,
    `src/components/wizard/tracking.ts`
  - `src/config/measurements.config.ts`, `src/config/summary.config.ts`
  - `src/content/pages.ts`, `src/fonts/monogram.ts`, `src/lib/selections.ts`
  - `src/server/admin-auth.ts`, `src/server/orders.ts`
  - `KIRO_HANDOFF.md` (this file)
- **Already committed:** `public/` assets (images, videos, SVGs), `scripts/prepare-assets.mjs`,
  `src/config/assets.ts`, `src/config/fabrics.config.ts`, `src/config/site.ts` and
  `src/components/wizard/FabricPicker.tsx`.
- **Gitignored but required locally:** `powerpoint assets/`, `reference/*.png`, `.env*` and
  `node_modules`.

> **Do not discard or overwrite this work.** Never run `git reset --hard`, `git checkout -- .`,
> `git clean` or `git stash` on this tree. The runbook's "If a prompt makes a mess: git reset
> --hard" rule would destroy Prompts 8–15, because they are uncommitted. Don't commit unless the
> owner explicitly says so.

---

## 11. Instructions for the next Kiro account

1. **Read `KIRO_HANDOFF.md` first** (this file). Then read `.kiro/steering/project.md`,
   `prompt.md` (the runbook, titled "PROMPTS.md (v3)"), `DESIGN.md`, `asset-manifest.md` (at least
   the sections for the screens you touch), and `.kiro/specs/wizard-flow-pricing-orders/*`.
2. **Inspect the actual source** of the files the next task touches before changing them (section 4
   lists them). Don't re-explore the whole codebase; this file is meant to save that cost.
3. **Continue from the first incomplete prompt: Prompt 16, task 1.** Before writing code, get the
   owner's answer to the commit question in 8.1. If the owner already answered it in the message
   that hands over, follow that answer.
4. Use the runbook's mode, model and screenshots for each prompt: Prompt 16 is Spec mode with Sonnet
   5.5; 17–19 use Sonnet 5.5. Before any UI change, open the matching `reference/screen_NN.png` and
   look at it.
5. **One prompt at a time,** and one spec task at a time inside Prompt 16. Report and wait for
   review.
6. **Don't repeat completed work** (Prompts 1–15) unless a specific defect is reported.
7. **Keep credit use low.** Run the smallest relevant checks per task. Save the comprehensive
   validation and visual pass for after Prompt 19.
8. **Don't commit** until the agreed final review unless the owner explicitly says to. Never discard
   uncommitted work.
9. **Ask the owner only** when a decision or missing source detail actually blocks the task (Q1–Q12
   and section 7). Never invent prices, codes, copy, assets, image mappings or business rules.
10. Keep using the established patterns:
    - config-driven steps with `AssetKey`-typed images and `DeckCrop` crops;
    - measured layout constants in config `layout` objects;
    - tokens only in `app/globals.css`;
    - `getAsset()` only;
    - server-only modules for secrets and order data;
    - the existing `SummaryGrid`, `StepChrome`, `OptionStep`, `ChoiceStep` and `FabricPicker`.
11. For Next.js APIs, read `node_modules/next/dist/docs/` first (`AGENTS.md`).

---

## 12. Confidence notes

- **Verified in the repository:** the file lists, git state, versions, configuration values,
  prices, asset keys, component names and exports, the font files and their loading, the routes, the
  placeholder copy, the metadata and the spec tasks.
- **From conversation history only (not provable from files):**
  - the counts and results of earlier browser checks (the scripts were temporary);
  - the owner's commit and validation instructions;
  - the owner's approvals (fonts, removing the selected square, the SUBMIT offset);
  - the unanswered Prompt 16 commit question;
  - the measured fidelity figures, e.g. "within 0.1px".
- **Not verified:** that the dev server currently renders every route (no build or browser run was
  done for this handoff, which is documentation only); detailed check results for Prompts 3–8.
