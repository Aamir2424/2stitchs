# Requirements: wizard flow, pricing and order submission

## Introduction

This spec wires the existing 2Stitchs screens (Prompts 6–14) into one orderable flow:

- the complete wizard step order,
- the waistcoat condition and the pants-fabric branch,
- the 15 measurement fields,
- one shared `calculatePrice()` used on client and server,
- submitting an order and the data it must contain,
- the data the admin production ticket needs.

It is the plan for Prompt 16. It does not change any visual design. UI that the reference screens
don't show (a submit control on the summary, customer-details capture, a confirmation page) is
listed as blocked until the owner approves a design for it.

### Sources and precedence

| Source | Used for |
|---|---|
| `suit-website-mvp-spec.md` §4 (step machine), §6 (data model), §7 (pricing engine) | Flow, data and the pricing formula. Source of truth. |
| `asset-manifest.md`, "Spec conflicts and how they are resolved" | Conflict resolutions. It also states that the spec "stays the source of truth for flow, data model and pricing". |
| `asset-manifest.md`, "Requires external confirmation" and "Still-open product decisions" | Items that must not be invented. |
| `src/config/*.ts`, `src/components/wizard/WizardContext.tsx`, `src/lib/selections.ts`, `src/server/orders.ts` | The existing configuration and state structure this spec must agree with. |
| `prompt.md` (titled "PROMPTS.md (v3)"; there is no file named `PROMPTS.md`) | Prompt 15–17 scope. |

### Constraints

- No visual changes. Every screen keeps its current layout. The summary's price pill changes only
  its text, from the placeholder "AED —" to the calculated total.
- Prices live only in config and are summed only by `calculatePrice()`.
- No invented prices, fabric codes, customer data or business rules. Anything the sources don't
  settle is listed under [Open questions](#open-questions).
- No Wool & Cashmere. Fabric codes stay `null` and the ticket shows "CODE NOT ON FILE".
- No database exists yet (steering file). The order store sits behind an interface.

## Glossary

| Term | Meaning |
|---|---|
| Selections | The `WizardSelections` object in `WizardContext.tsx`: one field per answered step, plus `monogramText`, `monogramStyle`, `tailorNote` and `measurements`. |
| Step id | An entry of `wizardSteps` in `src/config/steps.config.ts`. |
| Shown step | A step that is active for the current selections (see `conditionalSteps`). |
| Complete selections | Selections in which every shown step is complete (Requirement 4.6). |
| Order record | What is stored when an order is submitted (Requirement 10). |
| Production ticket | The admin view of an order record at `/admin?order=<id>` (screen 27). |

---

## Requirement 1: Wizard step order

**User story:** As a customer, I want the wizard to ask one thing per screen in a fixed order, so that I
design the suit before I enter my measurements.

### Acceptance criteria

1. The wizard SHALL present steps in this order (spec §4.1 and §4.2):

   | # | Step id | Spec step | Screen |
   |---:|---|---|---|
   | 1 | `fabric` (family and swatch on one screen) | 1–2 | 05–12 |
   | 2 | `jacketStyle` | 3 | 13 |
   | 3 | `jacketFit` | 4 | 14 |
   | 4 | `lapelThickness` | 5 | 15 |
   | 5 | `lapelStyle` | 6 | 16 |
   | 6 | `waistcoat` (only with 3-Piece, Requirement 2) | 7 | 17 |
   | 7 | `backVent` | 8 | 18 |
   | 8 | `pantsFabricChoice` | 9 | 19 |
   | 9 | `pantsFabric` (only after YES, Requirement 3) | 9 (re-runs 1–2) | 05–12 |
   | 10 | `pantsFit` | 10 | 20 |
   | 11 | `rise` | 11 | 21 |
   | 12 | `waistband` | 12 | 22 |
   | 13 | `cuff` | 13 | 23 |
   | 14 | `monogram` | 14 | 24 |
   | 15 | `tailorNote` | 15 | 25 |
   | 16 | `measurementProfile` (height, weight, age) | 16 | 29 |
   | 17–28 | `measureShoulderWidth`, `measureSleeveLength`, `measureStomach`, `measureLegLength`, `measurePantsWaist`, `measureHips`, `measureThigh`, `measureNeck`, `measureBodyLength`, `measureBicep`, `measureRise`, `measureWrist` | 16 | 30–41 |
   | 29 | `summary` | 17 | 26 |

2. The measurement screens SHALL come before the summary, even though the deck numbers the summary
   (26) before them (29–41). The "Spec conflicts" table has no row on step order. Its introduction
   says the spec "stays the source of truth for flow", and spec §4.1 (step 16 before 17) and §4.2
   put the measurements first. Rows #1, #2 and #4 settle the measurement screens, the 15 fields
   and the waistcoat step.
3. The wizard SHALL show 27 steps when neither conditional step applies, and up to 29 when both apply.
4. WHEN the customer presses NEXT, the wizard SHALL move to the next shown step only if the current
   step is complete (Requirement 4.6).
5. WHEN the customer presses BACK, the wizard SHALL move to the previous shown step.
6. The wizard SHALL NOT let the customer reach a step that isn't shown for the current selections.
7. The SUBMIT button on screen 25 (`tailorNote`) SHALL continue to the measurements. It SHALL NOT
   submit the order (spec §4.2: Tailor Note → Measurements → Summary → Submit Order).
8. The step order SHALL be defined only in `src/config/steps.config.ts` (design steps) and
   `src/config/measurements.config.ts` (measurement screens).

## Requirement 2: Conditional waistcoat step

**User story:** As a customer who chooses a 3-Piece suit, I want to choose its waistcoat, and as any
other customer I don't want to be asked.

### Acceptance criteria

1. The `waistcoat` step SHALL be shown only WHEN `jacketStyle` is `threePiece`.
2. WHEN `jacketStyle` changes from `threePiece` to another style, the system SHALL clear `waistcoat`
   immediately, so a stale waistcoat cannot reach the summary, the price, a submitted order or the
   production ticket (spec §4.3).
3. WHEN `jacketStyle` is `threePiece`, a waistcoat choice SHALL be required before the customer can continue.
4. The server SHALL reject a submitted order whose `waistcoat` is set without `jacketStyle` = `threePiece`.
5. The waistcoat is included in the 3-Piece price (screen 17 subtitle "INCLUDED WITH THE 3-PIECE SUIT").
   Only its own delta is added (Requirement 7).

## Requirement 3: Pants fabric branch

**User story:** As a customer, I want to choose whether my pants use a different fabric, so that I can
mix fabrics or keep one fabric for the whole suit.

### Acceptance criteria

1. Screen 19 (`pantsFabricChoice`) SHALL offer YES and NO, and an answer SHALL be required.
2. WHEN the answer is YES, the system SHALL show the `pantsFabric` step: the same fabric picker (family,
   then swatch) storing to `selections.pantsFabric` only.
3. WHEN the answer is NO, the pants SHALL use the jacket fabric (`selections.fabric`) and no
   `pantsFabric` SHALL be stored.
4. WHEN the answer changes from YES to NO, the system SHALL clear `pantsFabric` immediately.
5. WHEN the answer is YES, a pants family and swatch SHALL be required before the customer can continue.
6. The fabric the pants are made in SHALL be computed in one place, `effectivePantsFabric()` in
   `src/lib/selections.ts`. The summary and the production ticket SHALL both use it. The order
   record stores the raw answer (`pantsFabricChoice`, plus `pantsFabric` after YES), as spec §6 does.
7. The server SHALL reject a submitted order with a `pantsFabric` and an answer other than YES, or with
   YES and no `pantsFabric`.

## Requirement 4: Measurements

**User story:** As a customer, I want to enter my profile and each body measurement on its own guided
screen, so that the tailor gets every value needed to cut the suit.

### Acceptance criteria

1. The system SHALL collect exactly 15 fields (spec §5; "Spec conflicts" #2):

   | Field id | Spec name | Unit | Screen |
   |---|---|---|---|
   | `height` | height | inches | 29 |
   | `weight` | weight | kg | 29 |
   | `age` | age | years (whole number) | 29 |
   | `shoulderWidth` | shoulder_width | inches | 30 |
   | `sleeveLength` | sleeve_length | inches | 31 |
   | `stomach` | stomach | inches | 32 |
   | `legLength` | leg_length | inches | 33 |
   | `pantsWaist` | pants_waist | inches | 34 |
   | `hips` | hips | inches | 35 |
   | `thigh` | thigh | inches | 36 |
   | `neck` | neck | inches | 37 |
   | `bodyLength` | body_length | inches | 38 |
   | `bicep` | bicep | inches | 39 |
   | `rise` | rise | inches | 40 |
   | `wrist` | wrist | inches | 41 |

2. Height, weight and age SHALL be on one profile screen. Each of the other 12 SHALL have its own screen.
3. The thigh screen SHALL NOT show the hips video. It SHALL show its instructions, the input and the
   marked "ILLUSTRATION PENDING" area until a thigh illustration is supplied ("Spec conflicts" #8).
4. A value SHALL be accepted only if it is a positive number with at most 3 integer digits and at most
   2 decimals. Age SHALL be a whole number. These are the rules in `measurements.config.ts`.
   No upper or lower limits exist in the sources (Open question Q9).
5. A measurement screen SHALL NOT allow NEXT until its values are saved.
6. Complete selections means:
   - `fabric` has a family and a swatch;
   - every shown option and choice step has an answer;
   - `pantsFabric` has a family and a swatch when the pants answer is YES;
   - if `monogramText` is not empty, `monogramStyle` is set (current Prompt 11 behaviour);
   - all 15 measurements are saved.

   `tailorNote` and the monogram are optional.
7. A submitted order SHALL carry a copy of the 15 values taken at submission time (spec §6:
   "snapshot the measurement profile onto the order").

## Requirement 5: Monogram and tailor note data

**User story:** As a customer, I want to add an optional monogram and a note, so that the tailor
can personalise the suit.

### Acceptance criteria

1. The monogram text SHALL be at most 10 letters A–Z, stored in capitals (`sanitizeMonogramText`).
   Whether spaces, digits or accents are allowed is Open question Q8.
2. The monogram style SHALL be one of the four ids in `monogramStyles` (`sans`, `slab`, `script`, `serif`).
3. WHEN `monogramText` is empty, the submitted order SHALL NOT store a `monogramStyle` (assumption A4).
4. The tailor note SHALL be optional free text, stored as typed.
5. WHEN a submitted note is longer than `maxStoredNoteLength` (10,000 characters), the server SHALL
   reject the submission with a clear error. The wizard sets no limit (Open question Q7).

## Requirement 6: One shared `calculatePrice()`

**User story:** As the business, I want the price computed by one function everywhere, so that the
customer's total and the stored total can never disagree.

### Acceptance criteria

1. There SHALL be exactly one pricing function, `calculatePrice(selections)`, a pure function with no
   React, no I/O, no environment access and no randomness (spec §7).
2. The summary screen SHALL call it to display the total (client).
3. The order submission SHALL call it on the server, from the server's own validated selections, to
   compute the stored total.
4. The server SHALL NOT accept a total, price or delta sent by the client.
5. `calculatePrice()` SHALL read every amount from config. No component or server module SHALL
   contain a price literal or sum prices itself.
6. WHEN a price-relevant choice is missing or unknown, `calculatePrice()` SHALL throw instead of
   returning a partial total.
7. Given the same selections and config, `calculatePrice()` SHALL return the same number on client
   and server.

## Requirement 7: Pricing components, conditions and VAT

**User story:** As a customer, I want a total that adds up exactly as the options showed, so that
the price is predictable.

### Acceptance criteria

1. The total SHALL be the sum of these components (spec §7), in AED:

   | # | Component | Condition | Config source | Values |
   |---:|---|---|---|---|
   | 1 | Jacket fabric family base price | always | `fabricFamilies[].basePrice` | Wool 799, Linen 999, Cotton 799, Velvet 899, Tweed 899, Polyester Blend 699 |
   | 2 | Jacket swatch delta | always | `fabricFamilies[].swatches[].priceDelta` | Wool Navy Prince of Wales Check +99, Wool Navy Pinstripe +99, all others 0 |
   | 3 | Jacket style delta | always | `optionSteps.jacketStyle` | 2-Piece 0, 3-Piece +199, Double-Breasted +99, Safari +299, Tuxedo +299 |
   | 4 | Waistcoat delta | only if jacket style = 3-Piece | `optionSteps.waistcoat` | Single-Breasted 0, Double-Breasted +29, U-Shaped 0 |
   | 5 | Pants swatch delta | only if the pants answer is YES | `fabricFamilies[].swatches[].priceDelta` (pants swatch) | as row 2 |
   | 6 | Waistband delta | always | `optionSteps.waistband` | Belt Loops 0, Side Tabs +59 |
   | 7 | Cuff delta | always | `optionSteps.cuff` | Without 0, With +10 |
   | 8 | Monogram delta | only if `monogramText` is not empty | `monogramStep.priceDelta` | +39 |

2. The pants fabric family SHALL NOT add a base price (spec §7; screen 26: 899 + 299 + 59 + 10 = 1267).
3. WHEN the pants answer is NO, the jacket swatch delta SHALL be counted once only (row 2), not again for the pants.
4. Jacket fit, lapel thickness, lapel style, back vent, pants fit, rise, the tailor note and the
   measurements SHALL NOT affect the price. Every option of these steps has delta 0, and the formula
   has no term for them.
5. All prices SHALL be VAT-exclusive. `calculatePrice()` SHALL NOT add VAT. The summary SHALL show
   "EXC. VAT" and the config VAT note ("VAT PAYABLE BY CUSTOMER AT THE TIME OF SHIPMENT").
6. The total SHALL NOT include shipping, a discount or the free-shipping threshold. The threshold
   (USD 500, unconfirmed) SHALL stay display-only and unconverted.
7. The total SHALL be displayed as `AED <amount with 2 decimals>`, without a thousands separator,
   matching screen 26 ("AED 1267.00").

## Requirement 8: Summary total

**User story:** As a customer, I want to see my real total on the summary, so that I know what I'm
ordering before I submit.

### Acceptance criteria

1. WHEN the summary is shown, the price pill SHALL show `calculatePrice(selections)` formatted per
   Requirement 7.7, replacing the "AED —" placeholder.
2. The price pill, "EXC. VAT", the VAT note and their layout SHALL stay exactly as they are now.
3. Through NEXT, the summary SHALL be reachable only with complete selections (Requirements 1.4
   and 4.6), so the total is defined there. `goTo()` in `WizardContext` doesn't check completeness;
   no UI calls it today. WHEN the summary is shown with selections that can't be priced, the pill
   SHALL show "AED —" instead of a partial total. The server check (Requirement 9.2) is what
   guarantees correctness.

## Requirement 9: Order submission

**User story:** As a customer, I want to submit my finished design, so that 2Stitchs can contact me,
take payment and make the suit.

### Acceptance criteria

1. Submission SHALL be a server action. The client SHALL send only the selections and the customer
   details. Prices SHALL NOT be sent.
2. The server SHALL validate the selections against the config and require complete selections
   (Requirement 4.6), including the conditional rules (Requirements 2.4 and 3.7). It uses
   `parseCompleteSelections()`, which is `parseSelections()` plus the completeness check
   (design §1).
3. The server SHALL validate the customer details: name required (1–100 characters, the limit
   `orders.ts` already enforces) and email required and well-formed (spec §6, User: name, email).
   Other contact fields are Open question Q2.
4. The server SHALL compute the total with `calculatePrice()` (Requirement 6.3).
5. The server SHALL create a new order id that can't be guessed (random UUID), set status
   `submitted` and store the order record (Requirement 10).
6. WHEN validation fails, the server SHALL store nothing and return an error the customer can act on.
7. WHEN storing fails or no order store is configured, the server SHALL return an error, store
   nothing partial, and the wizard SHALL keep the customer's selections.
8. WHILE a submission is in progress, the submit control SHALL be disabled, so one click creates at most one order.
9. WHEN the order is stored, the customer SHALL see the confirmation (spec §3:
   `/order/:id/confirmation`), and the wizard state SHALL be cleared.
10. The confirmation SHALL NOT show order details, measurements or the customer's contact details,
    so anyone holding the URL learns nothing beyond the order id.
11. The submit control, customer-details capture and confirmation page are blocked until a design is
    approved (Open question Q1). No customer-facing UI for them SHALL be built before that.
12. How a stored order reaches the business (email, WhatsApp, database) is Open question Q3. Until it
    is decided, orders SHALL be stored only through the order-store interface (Requirement 10.5).
13. There is no payment step (spec §1: manual checkout).

## Requirement 10: Submitted order data

**User story:** As the business, I want each submitted order stored with everything needed to contact
the customer, price the order and make the suit.

### Acceptance criteria

1. An order record SHALL contain:
   - `schemaVersion` (1)
   - `id`
   - `status` (`submitted`; the later values `in_production` and `shipped` from spec §6 are not set in v1)
   - `submittedAt` (ISO 8601, set by the server)
   - `customerName` and `customerEmail`
   - `selections`: complete and validated, with the 15 measurement values, the monogram text and
     style, and the tailor note
   - `pricing`: `total` (from `calculatePrice()`), `currency` (`"AED"`) and `vatIncluded` (`false`)
2. The order SHALL keep its own copy of the selections and measurements. Later config or profile
   changes SHALL NOT alter it (spec §6).
3. The stored total SHALL stay as computed at submission, even if config prices change later.
4. A swatch's fabric code SHALL NOT be copied into the order. The ticket reads codes from config at
   display time, so a code supplied later appears on existing orders (assumption A6).
5. Orders SHALL be stored and read only through `src/server/orders.ts`. Reading SHALL keep requiring
   an admin session. Writing SHALL be used only by the submission action.
6. The record format SHALL map onto spec §6 `Order` as described in `design.md` ("Data mapping").

## Requirement 11: Admin production-ticket data

**User story:** As the tailor, I want a production ticket for each order with only what I need to make
it, and no price.

### Acceptance criteria

1. The ticket SHALL show only stored, validated order data and config data:
   - the customer name as the title;
   - the jacket fabric (family, swatch name and image);
   - the pants fabric (the separate pants fabric after YES, or the jacket fabric after NO);
   - for each fabric, its code from config, or exactly "CODE NOT ON FILE" when the code is `null`;
   - the suit design (style image, style caption and the fit caption);
   - the lapel thickness, lapel style, vent, rise, waistband and cuff tiles;
   - the waistcoat tile (3-Piece only);
   - a "NOTES:" line with the tailor note, or "—" when there is none.
2. The ticket SHALL NOT show the total, any price, VAT, the monogram block or the measurements block
   (screen 27; the Prompt 14 follow-up).
3. The ticket SHALL NOT receive the order's pricing. The data passed to the ticket SHALL exclude it.
4. Order records that fail validation SHALL show "ORDER NOT FOUND", as they do now.
5. The existing server-side authentication and data-access checks SHALL stay unchanged.
6. The monogram and the measurements are stored on the order (Requirement 10) but are not on the
   ticket. How the tailor receives them is Open question Q5.

---

## Assumptions

| # | Assumption | Basis |
|---|---|---|
| A1 | `calculatePrice(order)` in spec §7 takes the order's selections (`WizardSelections`). | The selections hold every price input. |
| A2 | "If different fabric chosen" (spec §7) means the pants answer is YES, even if the customer then picks the jacket's own swatch. | Spec §6 `pants_fabric_swatch_id` is "nullable = same as jacket"; the formula keys on that field being set. See Q4. |
| A3 | All config amounts are whole dirhams, so summing JavaScript numbers is exact. | Every amount in the sources is an integer. |
| A4 | An empty monogram text means there is no monogram, so its style is dropped from the order. | Spec §7 charges only for non-empty text; spec §6 pairs style with text. |
| A5 | v1 has no user accounts (`/account` is Phase 2), so the order carries the customer's name, email and measurement copy directly instead of `user_id` and `measurement_profile_id`. | Spec §3 and §6. |
| A6 | Fabric codes are read from config when the ticket is displayed. | Codes are all `null` now; this lets a later code list apply to existing orders. |
| A7 | The summary stays a wizard step inside `/design` rather than the separate `/design/summary` route in spec §3. | The wizard state is in memory only and the current summary is built as a step. See Q6. |

## Open questions

None of these may be guessed. Tasks that depend on them are marked blocked in `tasks.md`.

| # | Question | Blocks |
|---|---|---|
| Q1 | Design for the submit control on the summary (screen 26 has none), the customer-details capture and the confirmation page. | Tasks 7–8 |
| Q2 | Which customer details are required beyond name and email (phone, WhatsApp, address)? | Task 7 |
| Q3 | How orders reach the business (email, WhatsApp, database) and where they are stored in production. A file store doesn't work on Vercel's read-only file system. | Task 10 (production submission) |
| Q4 | Pants YES with the same swatch as the jacket: charge the pants swatch delta again (current reading, A2) or not? | Confirmation only; the formula is implemented as A2 |
| Q5 | Production ticket: how does the tailor get the measurements and the monogram, which screen 27 doesn't show? | Production use |
| Q6 | Keep the summary inside `/design` (A7) or move it to `/design/summary` as in spec §3? | Nothing in this spec |
| Q7 | Tailor-note length limit: the wizard has none, the server accepts up to 10,000 characters. | Requirement 5.5 wording |
| Q8 | Monogram: are spaces, digits or accents allowed? | Nothing (A–Z only stays) |
| Q9 | Measurement ranges (minimum and maximum per field)? | Nothing (format rules only) |
| Q10 | Is the VAT note's wording and treatment correct, and is shipping ever charged below the unconfirmed free-shipping threshold? | Launch |
| Q11 | A pants fabric from a pricier family adds no base price (for example, Polyester Blend jacket with Linen pants totals from 699). The spec states this rule; please confirm it is intended. | Confirmation only |
| Q12 | Spam and abuse protection (rate limiting, CAPTCHA) for public submission. | Launch |
