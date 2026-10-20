# Custom-Suit Website — MVP Design & Build Spec

Reference brand analyzed: **2Stitchs** (twostitchs.com mockups). This document turns the full
41-screen walkthrough into a concrete, buildable v1 plan: what to build first, the exact
data model, the exact wizard flow, and what to defer.

---

## 1. What the source material told us

| Layer | What it does |
|---|---|
| Catalog | Suits organized by jacket style (2-piece, 3-piece, double-breasted, safari, tuxedo, tweed, linen) |
| Configurator | ~14-step linear wizard, one micro-decision per screen, with one conditional branch (waistcoat step only if 3-piece) |
| Pricing | **Additive**: base fabric price + style delta + swatch premium + every option delta, VAT excluded, shown live |
| Measurements | 15 fields: height/weight/age on one profile screen, then 12 body measurements, each its own screen with a short instructional video + a plain-language explainer + a number input (thigh has no video of its own) |
| Personalization | Monogram (text + font choice) and a free-text "note to the tailor" |
| Output | A "Summary" screen (customer-facing, price total) and a separate "production ticket" variant (fabric codes, tailor note, no price) — these are two different consumers of the same order data |

This is the full shape of the product. Building all of it at once is the wrong move — below
is what to build **first**, and how the rest slots in later without a rewrite.

> **v1 decisions (October 2026).** These override the original v1 shortcuts further down, and
> `asset-manifest.md` agrees with them:
> - **All six fabric families** (Worsted Wool, Linen, Cotton, Velvet, Tweed, Polyester Blend)
>   with their 10 swatches each.
> - **All five jacket styles** (2-Piece, 3-Piece, Double-Breasted, Safari, Tuxedo). The
>   waistcoat step is shown only when 3-Piece is chosen.
> - **Measurements: one screen per measurement with the real instruction videos** (they exist,
>   so the "static diagrams first" shortcut in §5 no longer applies), 15 fields in total.
> - **Customer-facing copy says "Tuxedo"**; the design's "TUXIDO" is a typo.
> - Checkout stays manual (no payment gateway) and there is still no live 3D preview.
>
> Items that still need external confirmation are listed in §10.

---

## 2. MVP Philosophy

Build the **thinnest version that produces a real, orderable custom suit**, even if:
- there's no live visual preview (static labeled images instead)
- checkout is manual/WhatsApp-based instead of a payment gateway

(The original shortcuts of 1 product and 6 swatches were dropped: v1 ships all 5 jacket styles
and all 6 fabric families × 10 swatches, because every image for them exists. See the v1
decisions above.)

The wizard's *shape* (ordered steps, conditional logic, additive pricing, final summary)
is the hard part to get right. Get that right with a small option set, then widen the
option set later — that's a data change, not a rebuild.

---

## 3. Site Map (v1)

```
/                      Home (hero, "Design Your Suit" CTA, trust strip)
/how-it-works          3-step explainer (static page)
/our-story              About page (static page)
/design                The configurator wizard (the core feature)
/design/summary        Review screen + price + "Submit Order"
/order/:id/confirmation  Thank-you / order received page
/account                Login, order history, saved measurements  [Phase 2]
/admin                 Internal: view submitted orders as production tickets [MVP-lite, password gated]
```

The main entry point is "Design Your Suit", straight into the wizard. The home page also
shows the "Choose Your Style" row from the design (screen 03). It has 7 tiles: five are jacket
styles and two ("TWEED SUITS", "LINEN") are fabric families. Whether a tile preselects its style
or family in the wizard is **not decided** (see §10); until then every tile opens the wizard
at step 1.

---

## 4. The Configurator — Full Step Machine

### 4.1 Step sequence (all steps are in v1)

Prices are the values shown in the reference screenshots (screen numbers in brackets). At
runtime they live only in the config files; this table is the reference for checking them.
Images for every option are mapped in `asset-manifest.md`.

| # | Step | Type | Options (v1) | Price (AED) |
|---|---|---|---|---|
| 1 | **Fabric family** | single-select tiles | Worsted Wool, Linen, Cotton, Velvet, Tweed, Polyester Blend | Base price: Wool 799, Linen 999, Cotton 799, Velvet 899, **Tweed 899**, Poly Blend 699 [05, 06–12]. Tweed's price comes from screen 11; screen 05 shows "WINTER WEAR / COUNTRY STYLE" instead of a price. |
| 2 | **Fabric color/swatch** | single-select swatches | 10 per family [06, 08–12] | Wool Navy Prince of Wales Check +99 and Navy Pinstripe +99 [06]; all others 0 |
| 3 | **Jacket style** | single-select | 2-Piece, 3-Piece, Double-Breasted, Safari, Tuxedo | 0 / +199 / +99 / +299 / +299 [13] |
| 4 | **Jacket fit** | single-select | Regular / Slim | — |
| 5 | **Lapel thickness** | single-select | Narrow / Medium / Wide | — |
| 6 | **Lapel style** | single-select | Notch / Peak / Shawl | — |
| 7 | **Waistcoat style** | single-select, **only when step 3 = 3-Piece** (the waistcoat is included in the 3-Piece price) | Single-Breasted / Double-Breasted / U-Shaped | 0 / +29 / 0 [17] |
| 8 | **Back vent** | single-select | Center / Side | — |
| 9 | **Different pants fabric?** | yes/no branch | No → reuse jacket fabric; Yes → re-run steps 1–2 for pants | — |
| 10 | **Pants fit** | single-select | Regular / Slim | — |
| 11 | **Pants rise** | single-select | High / Mid / Low | — |
| 12 | **Waistband** | single-select | Belt Loops / Side Tabs | 0 / +59 [22] |
| 13 | **Cuff** | single-select | Without / With | 0 / +10 [23] |
| 14 | **Monogram** | text input + style select | text (max 10 chars), 4 font styles [24] | +39 if text non-empty [24] |
| 15 | **Note to tailor** | free text | optional textarea | — |
| 16 | **Measurements** | 15 number inputs (see §5) | — | — |
| 17 | **Summary** | review + total price + submit | — | — |

### 4.2 Flow diagram

```
 Home --> [Design Your Suit] --> Fabric Family --> Fabric Swatch
                                                        |
                                                        v
                                              Jacket Style --> Jacket Fit
                                                        |
                                                        v
                                        Lapel Thickness --> Lapel Style
                                                        |
                                                        v
                                     (only if 3-Piece) Waistcoat Style
                                                        |
                                                        v
                                                    Back Vent
                                                        |
                                                        v
                                    Different pants fabric? --(yes)--> Fabric Family/Swatch (pants)
                                                        |(no)                    |
                                                        v <-----------------------
                                              Pants Fit --> Pants Rise
                                                        |
                                                        v
                                    Waistband --> Cuff --> Monogram --> Tailor Note
                                                        |
                                                        v
                                                  MEASUREMENTS (x15)
                                                        |
                                                        v
                                                    SUMMARY
                                                        |
                                                        v
                                              Submit Order --> Confirmation
```

### 4.3 Why this order matters (design decisions worth keeping)

- **Style before measurements**: the customer commits emotionally to a design before the
  more tedious measurement step — reduces drop-off.
- **One decision per screen**: makes each screen trivial to build and test in isolation,
  and makes the wizard state machine a flat array instead of a tree (except step 7/9).
- **Changing the jacket style away from 3-Piece clears the waistcoat choice**, so a stale
  waistcoat can never reach the summary, the price or the production ticket.
- **Additive pricing must be computed the same way everywhere** — see §7.

---

## 5. Measurement Step Spec

There are **15 fields**: height, weight and age on one "Your Digital Profile" screen
(screen 29), then **12 guided measurements, each on its own screen** (screens 30–41) with a
title, the real instructional video, a plain-language explainer, and a single numeric input
with a unit. (Earlier drafts said "11 measurements"; the table below always listed 15.)

| Measurement | Unit | What it's used for |
|---|---|---|
| Height | in/cm | Overall sizing baseline |
| Weight | kg/lb | Overall sizing baseline |
| Age | years | Fit profile only, not garment math |
| Shoulder width | in | Jacket shoulder seam |
| Sleeve length | in | Jacket sleeve |
| Stomach | in | Jacket/waistcoat waist |
| Leg length | in | Pants length |
| Pants waist | in | Pants waist |
| Hips | in | Pants seat |
| Thigh | in | Pants leg |
| Neck | in | Shirt collar (future shirt SKU) |
| Body length | in | Jacket length |
| Bicep | in | Jacket sleeve width |
| Rise | in | Pants rise |
| Wrist | in | Sleeve cuff |

**v1 media (supersedes the earlier "static diagrams first" shortcut):** the instructional
videos already exist in the design deck, so v1 uses them, one screen per measurement as in
screens 30–41. The original reason for the shortcut (cost of filming) no longer applies.
Video-to-measurement mappings are in `asset-manifest.md`.

**Thigh is the exception.** There is no thigh video. The deck reuses the hips clip, which
shows the tape and dotted line around the hips, so showing it on the thigh screen would teach
the wrong measurement. The thigh screen therefore **does not show the hips video**. It uses a
thigh-specific static illustration plus the screen 36 instruction text ("wrap the tape around
the widest part of the thigh, level, without squeezing"). That illustration does not exist
yet (see §10); until it is supplied the thigh screen shows the text instructions and input
with a clearly marked "illustration pending" area, and the thigh screen is a pre-launch item.

Units: inches for lengths and circumferences; weight in kg and age in years as in screen 29.
The design's "inchs" label is a typo for "inches".

Store all measurements against the **customer profile**, not the order, so a returning
customer's next order pre-fills them (this was explicit in the source: "Your Digital
Profile").

---

## 6. Data Model

```
User
 ├─ id, email, name, password_hash, created_at

MeasurementProfile
 ├─ id, user_id (FK)
 ├─ height, weight, age
 ├─ shoulder_width, sleeve_length, stomach, leg_length, pants_waist,
 │  hips, thigh, neck, body_length, bicep, rise, wrist
 └─ updated_at

FabricFamily
 ├─ id, name ("Worsted Wool"), base_price, description

FabricSwatch
 ├─ id, fabric_family_id (FK), name ("Midnight Navy"), price_delta, swatch_image_url
 └─ fabric_code (nullable; no verified codes exist yet, see §10 — never fill with guesses)

JacketStyle
 ├─ id, name ("2-Piece" … "Tuxedo"), price_delta

WaistcoatStyle
 ├─ id, name ("Single-Breasted"), price_delta   (only selectable with 3-Piece)

Order
 ├─ id, user_id (FK), status (draft/submitted/in_production/shipped)
 ├─ jacket_fabric_swatch_id (FK), jacket_style_id (FK), jacket_fit (enum)
 ├─ lapel_thickness (enum), lapel_style (enum)
 ├─ waistcoat_style (enum, nullable; null unless jacket style = 3-Piece)
 ├─ back_vent (enum)
 ├─ pants_fabric_swatch_id (FK, nullable = same as jacket)
 ├─ pants_fit (enum), pants_rise (enum), waistband (enum), cuff (bool)
 ├─ monogram_text, monogram_style (one of the 4 styles on screen 24)
 ├─ tailor_note (text)
 ├─ measurement_profile_id (FK, snapshot at order time)
 ├─ total_price, currency
 └─ created_at, submitted_at
```

Key decision: **snapshot the measurement profile onto the order** (copy, not live
reference) so if the customer updates their profile later, past orders aren't silently
altered.

---

## 7. Pricing Engine

```
total = fabric_family.base_price         (jacket fabric family)
      + fabric_swatch.price_delta        (jacket)
      + jacket_style.price_delta
      + (waistcoat_style.price_delta if jacket_style = 3-Piece, else 0)   (e.g. Double-Breasted +29)
      + (pants_fabric_swatch.price_delta if different fabric chosen, else 0)
      + waistband.price_delta            (e.g. Side Tabs +59)
      + cuff.price_delta                 (e.g. +10)
      + (monogram.price_delta if monogram_text is non-empty)   (+39)
```

The waistcoat term was added because screen 17 shows "+ AED 29.00" on the double-breasted
waistcoat. The pants fabric family does not change the base price: the summary on screen 26
(Velvet jacket, Polyester Blend pants, Safari, Side Tabs, cuffs) totals AED 1267.00 =
899 + 299 + 59 + 10, which matches this formula. Prices are VAT-exclusive ("EXC. VAT").
All amounts come from the config; nothing is hardcoded in components.

Implement this as **one pure function** `calculatePrice(order) -> number`, called both
client-side (live total on the summary screen) and server-side (authoritative total at
submit time — never trust the client-computed number for the actual charge).

---

## 8. Tech Stack Recommendation

Given this is a solo build and you already work across web/ML/blockchain:

| Layer | Recommendation | Why |
|---|---|---|
| Frontend + backend | **Next.js (App Router)** | One codebase, server components for the wizard's server-validated pricing, easy deploy to Vercel |
| Styling | Tailwind CSS | Matches the burgundy/gold/serif brand tokens cleanly, fast to iterate |
| Database | **PostgreSQL** (Supabase or Neon, free tier) | Relational fits the schema above exactly; Supabase also gives you auth for free |
| Auth | Supabase Auth or NextAuth | Don't hand-roll this |
| Image hosting | Cloudinary or S3 | Fabric swatches, product photos |
| Payments | **Stripe** (or manual "we'll contact you" flow for true v1) | Don't build a payment gateway integration until the wizard itself works end-to-end |
| Hosting | Vercel | Zero-config Next.js deploy |

Order of build: get the wizard working with **options in static config files** first (no
database at all). Only wire up Postgres once the wizard's step logic and pricing math
are proven. This avoids building a CMS before you know what data actually needs to be
dynamic.

---

## 9. MVP Feature Checklist (build this, in this order)

1. Home page (hero + CTA, "Choose Your Style" row, three-step explainer)
2. Wizard shell — a `<WizardStep>` component that takes options + renders tiles, handles
   next/back, and holds state in a single object in memory (React Context or Zustand)
3. Steps 1–2 (fabric + swatch) — 6 families × 10 swatches from the config
4. Steps 3–7 (jacket style, fit, lapels, waistcoat only for 3-Piece)
5. Steps 8–15 (vent, pants branch, pants fit/rise/waistband/cuff, monogram, note)
6. Measurement screens (15 fields: profile screen + 12 guided screens with videos; thigh uses
   a static illustration, see §5)
7. Summary page — render every choice as a labeled row + call `calculatePrice`
8. Submit → write the order to Postgres (or even just email yourself the JSON for the
   very first version) → confirmation page
9. Admin view — a single password-gated page that lists submitted orders as the
   "production ticket" layout (name, fabric codes, all choices, tailor note — no price)

Everything else from the 41-screen walkthrough (live 3D preview, saved profiles, Stripe
checkout, multi-currency, the multi-angle previews on screen 28) is real and worth having —
just not before step 9 above works end to end with a real test order.

The production ticket (step 9) shows only verified data: the customer's choices, swatch
names and images, and the tailor note. Fabric codes are shown only once a verified code list
exists; until then the code field is empty, never guessed.

---

## 10. Open Decisions (need your input before/while building)

### Needs external confirmation (do not invent these)

| Item | Current handling | Blocks |
|---|---|---|
| **Free-shipping threshold** (design says "USD 500" while prices are AED) | Kept as a config value (amount + currency), shown as in the design and marked unconfirmed. No conversion or exchange rate is assumed. | Launch |
| **Fabric codes** (screen 27 shows "YC676240") | `fabric_code` stays empty for every swatch. | Production ticket codes |
| **Wool & Cashmere fabric** (screen 27) | Not in any family; no swatch image. Not offered until supplied. | — |
| **Thigh illustration** | Thigh screen shows text + input + marked "illustration pending" area. | Launch |
| **Muller font licence and files** (primary typeface) | Required font; not loaded until licensed files are in `public/fonts/`. | Final typography |
| **Photo and video publication rights** for every deck asset | Pre-launch verification requirement. | Launch |
| **Our Story copy** | Not in the design. | `/our-story` |

### Product decisions still open

- **Currency**: prices are AED; only the shipping threshold is in USD (see above).
- **Typography**: Muller is the primary typeface for headings, body, buttons, prices and
  labels. Sizes, weights, line heights and letter-spacing are measured from the 41 reference
  screenshots and kept in one central theme. Until licensed Muller files exist, the site
  must not claim Muller is loaded (see `asset-manifest.md`, Fonts).
- **Fulfilment**: who actually sews the suit? The whole checkout flow's meaning changes
  depending on whether you have a tailor/manufacturer partner lined up or are validating
  demand first.
- **Payment vs. manual order**: fastest v1 path is "submit order → you get an email/WhatsApp
  → you manually collect payment" — removes the entire Stripe integration from the
  critical path.
- **Domain/hosting budget**: Vercel + Supabase free tiers cover v1 comfortably.
- **"Choose Your Style" tiles on the home page**: whether a tile preselects its style (or, for
  "TWEED SUITS" / "LINEN", its fabric family). Until decided, all tiles open the wizard at step 1.
- **Cart and account icons** in the header: the design shows them but has no cart or login
  screens.

### Resolved (October 2026)

All six fabric families; all five jacket styles with the waistcoat step only for 3-Piece;
Tweed base price AED 899 (from screen 11); "Tuxedo" in customer-facing copy; real
measurement videos, one screen each; thigh uses a static illustration instead of the hips
video; summary tiles reuse cropped verified step images where no dedicated thumbnail exists
(see `asset-manifest.md`); Muller is the primary font with no substitute declared as Muller;
monogram font styles use free, properly licensed fonts.
