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
| Measurements | 11 body measurements, each its own screen, each with a short instructional video + a plain-language explainer + a number input |
| Personalization | Monogram (text + font choice) and a free-text "note to the tailor" |
| Output | A "Summary" screen (customer-facing, price total) and a separate "production ticket" variant (fabric codes, tailor note, no price) — these are two different consumers of the same order data |

This is the full shape of the product. Building all of it at once is the wrong move — below
is what to build **first**, and how the rest slots in later without a rewrite.

---

## 2. MVP Philosophy

Build the **thinnest version that produces a real, orderable custom suit**, even if:
- there's only 1 product (2-piece suit) instead of 7
- fabric choice is 6 swatches instead of 60
- there's no live visual preview (static labeled images instead)
- checkout is manual/WhatsApp-based instead of a payment gateway

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

No product browsing grid in v1 — one entry point ("Design Your Suit") straight into the
wizard, since there's only one jacket style at launch.

---

## 4. The Configurator — Full Step Machine

### 4.1 Step sequence (v1 scope in **bold**, later phases greyed out mentally)

| # | Step | Type | Options (v1) | Price delta |
|---|---|---|---|---|
| 1 | **Fabric family** | single-select tiles | Worsted Wool, Cotton | base price varies by family |
| 2 | **Fabric color/swatch** | single-select swatches | 4–6 per family | some swatches +delta |
| 3 | **Jacket style** | single-select | 2-Piece only in v1 | — |
| 4 | **Jacket fit** | single-select | Regular / Slim | — |
| 5 | **Lapel thickness** | single-select | Narrow / Medium / Wide | — |
| 6 | **Lapel style** | single-select | Notch / Peak / Shawl | — |
| 7 | Waistcoat style | single-select, **conditional** on step 3 = 3-Piece | — | Phase 2 (no 3-piece in v1, so step is skipped entirely) |
| 8 | **Back vent** | single-select | Center / Side | — |
| 9 | **Different pants fabric?** | yes/no branch | No → reuse jacket fabric; Yes → re-run steps 1–2 for pants | — |
| 10 | **Pants fit** | single-select | Regular / Slim | — |
| 11 | **Pants rise** | single-select | High / Mid / Low | — |
| 12 | **Waistband** | single-select | Belt Loops / Side Tabs | +delta |
| 13 | **Cuff** | single-select | With / Without | +delta |
| 14 | **Monogram** | text input + style select | text (max 10 chars), 1 font in v1 | +delta if text non-empty |
| 15 | **Note to tailor** | free text | optional textarea | — |
| 16 | **Measurements** | 11 number inputs (see §5) | — | — |
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
                                        (if 3-piece) Waistcoat Style
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
                                                  MEASUREMENTS (x11)
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
- **Additive pricing must be computed the same way everywhere** — see §7.

---

## 5. Measurement Step Spec

Each of the 11 measurements is its own screen: title, instructional video (or in v1, a
static labeled diagram — see below), a plain-language explainer, and a single numeric
input with a unit.

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

**v1 shortcut**: record all 11 as plain number inputs on **one scrollable page** (not 11
separate screens) with a static instructional illustration per field (a simple labeled
body diagram, not video). Ship actual instructional *videos* in Phase 2 once you have
budget/time to film or license them — video production is the single most expensive
part of replicating the source site and shouldn't block launch.

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

JacketStyle
 ├─ id, name ("2-Piece"), price_delta

Order
 ├─ id, user_id (FK), status (draft/submitted/in_production/shipped)
 ├─ jacket_fabric_swatch_id (FK), jacket_style_id (FK), jacket_fit (enum)
 ├─ lapel_thickness (enum), lapel_style (enum)
 ├─ waistcoat_style (enum, nullable)
 ├─ back_vent (enum)
 ├─ pants_fabric_swatch_id (FK, nullable = same as jacket)
 ├─ pants_fit (enum), pants_rise (enum), waistband (enum), cuff (bool)
 ├─ monogram_text, monogram_style
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
total = fabric_family.base_price
      + fabric_swatch.price_delta        (jacket)
      + jacket_style.price_delta
      + (pants_fabric_swatch.price_delta if different fabric chosen, else 0)
      + waistband.price_delta            (e.g. Side Tabs +59)
      + cuff.price_delta                 (e.g. +10)
      + (monogram.price_delta if monogram_text is non-empty)
```

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

Order of build: get the wizard working with **hardcoded JSON options** first (no
database at all). Only wire up Postgres once the wizard's step logic and pricing math
are proven. This avoids building a CMS before you know what data actually needs to be
dynamic.

---

## 9. MVP Feature Checklist (build this, in this order)

1. Home page (hero + 1 CTA)
2. Wizard shell — a `<WizardStep>` component that takes options + renders tiles, handles
   next/back, and holds state in a single object in memory (React Context or Zustand)
3. Steps 1–2 (fabric + swatch) — hardcode 2 families × 5 swatches
4. Steps 3–6 (jacket style/fit/lapel) — hardcode single jacket style so these are just fit/lapel
5. Steps 8–14 (vent, pants branch, pants fit/rise/waistband/cuff, monogram, note)
6. Measurement page (single scrollable form, 11 fields, static diagrams)
7. Summary page — render every choice as a labeled row + call `calculatePrice`
8. Submit → write the order to Postgres (or even just email yourself the JSON for the
   very first version) → confirmation page
9. Admin view — a single password-gated page that lists submitted orders as the
   "production ticket" layout (name, fabric codes, all choices, tailor note — no price)

Everything else from the 41-screen walkthrough (live 3D preview, video measurement
guides, multiple jacket styles, waistcoat branch, saved profiles, Stripe checkout,
multi-currency) is real and worth having — just not before step 9 above works end to end
with a real test order.

---

## 10. Open Decisions (need your input before/while building)

- **Currency**: source mixes AED pricing with a USD-denominated shipping threshold —
  pick one currency for v1 and be consistent.
- **Fulfilment**: who actually sews the suit? The whole checkout flow's meaning changes
  depending on whether you have a tailor/manufacturer partner lined up or are validating
  demand first.
- **Payment vs. manual order**: fastest v1 path is "submit order → you get an email/WhatsApp
  → you manually collect payment" — removes the entire Stripe integration from the
  critical path.
- **Domain/hosting budget**: Vercel + Supabase free tiers cover v1 comfortably.
