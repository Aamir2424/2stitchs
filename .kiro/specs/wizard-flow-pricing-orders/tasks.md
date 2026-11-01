# Tasks: wizard flow, pricing and order submission

Run one task at a time (Prompt 16), and review and commit after each. Every task must pass
`npx tsc --noEmit -p .`, `npm run lint` and `npm run build`, and must not change any visual design.
Tasks marked **BLOCKED** wait for the open question named; don't start them until it is answered.

The step order (requirement 1), the waistcoat condition (requirement 2), the client side of the
pants branch (requirement 3) and the measurement screens (requirement 4) are already implemented
and verified (see design.md, "What already exists"). Tasks 1 and 9 recheck them; none rebuilds them.

- [ ] 1. Share the step rules between client and server
  - Move `isStepActive`, `activeSteps` and `isStepComplete` unchanged from `WizardContext.tsx` to
    `src/lib/selections.ts`, and import them in `WizardContext.tsx`.
  - Add `isCompleteSelections()` and `parseCompleteSelections()` (design §1), including dropping
    `monogramStyle` when `monogramText` is empty.
  - Verify: the wizard behaves as before. Walk 3-Piece and non-3-Piece, and pants YES and NO, and
    check the step counts are 27–29 (requirement 1.3). Incomplete selections fail
    `parseCompleteSelections`.
  - _Requirements: 1.4–1.6, 2.2–2.4, 3.4–3.7, 4.6, 5.3_

- [ ] 2. Implement `calculatePrice()` and `formatPrice()`
  - Create `src/lib/pricing.ts` (design §2), reading amounts only from `fabrics.config.ts`
    (`basePrice`, swatch `priceDelta`), `steps.config.ts` (`jacketStyle`, `waistcoat`, `waistband`,
    `cuff` deltas; `monogramStep.priceDelta`; `priceCurrency`).
  - No price literals. No VAT, shipping or discount.
  - Verify: check examples E1–E10 in design.md by hand in a temporary, uncommitted script. Writing
    permanent tests is Prompt 17.
  - _Requirements: 6.1, 6.5–6.7, 7.1–7.7_

- [ ] 3. Show the real total on the summary
  - In `SummaryStep.tsx`, `PriceBlock` shows `formatPrice(calculatePrice(selections))` (design §3),
    falling back to `summaryCopy.pricePlaceholder` ("AED —") if it throws.
  - Remove `pricePlaceholderLabel` from `summary.config.ts`, and update the comments that refer to
    the placeholder.
  - Verify: with the screen 26 selections the pill reads "AED 1267.00", with "EXC. VAT" and the VAT
    note unchanged. Compare with `reference/screen_26.png`; the layout must match as before.
  - _Requirements: 6.2, 7.5, 7.7, 8.1–8.3_

- [ ] 4. Order record format and parsing
  - In `src/server/orders.ts`, add the `OrderRecord` type (design §4). Make `parseOrder()` require
    `schemaVersion: 1`, a valid `customerEmail` and `parseCompleteSelections()`.
  - Keep `ProductionOrder` free of `pricing` and `customerEmail`.
  - Verify: `/admin` lists and shows a v1 fixture record. The ticket's HTML and RSC payload contain
    no total, AED or email. Invalid or incomplete fixtures show "ORDER NOT FOUND".
  - _Requirements: 10.1–10.6, 11.1–11.5_

- [ ] 5. Order store write (interim, development only)
  - Add `createOrder()` to `orders.ts`: an atomic temp-file write and rename into `ORDERS_DIR`,
    returning `notConfigured` when it is unset or not absolute (design §4). Document in `README.md`
    that `ORDERS_DIR` is now also written to and that it doesn't work on Vercel.
  - Verify: a written record is read back by `getOrder()`, and the `.tmp` file is never listed.
  - _Requirements: 9.5, 9.7, 10.5_

- [ ] 6. `submitOrder` server action (no UI)
  - Create `app/design/actions.ts` (design §5). It validates the selections and the customer, prices
    with `calculatePrice()` on the server, builds the record with `randomUUID` and the server time,
    and calls `createOrder()`.
  - It returns only `{ ok, orderId }` or an error code.
  - Verify with a temporary, uncommitted route:
    - valid input stores one record whose total equals E5 (1267);
    - an added client `total` field is ignored;
    - a stale waistcoat, pants YES without a fabric, a missing measurement, a bad email and an
      unset `ORDERS_DIR` each store nothing and return the right error.
  - _Requirements: 6.3, 6.4, 9.1–9.7, 9.13, 10.1–10.3_

- [ ] 7. **BLOCKED (Q1, Q2):** submit control and customer details on the summary
  - Needs an approved design: screen 26 has no submit control or details form.
  - When unblocked: call `submitOrder` inside `useTransition`, disable the control while it is
    pending, show errors inline and keep the selections on failure.
  - _Requirements: 9.1, 9.3, 9.6–9.8, 9.11_

- [ ] 8. **BLOCKED (Q1):** confirmation page
  - Needs approved copy and design.
  - When unblocked: build `app/order/[id]/confirmation/page.tsx` (design §6). It checks the id with
    `isOrderId`, shows only "order received" and the id, and doesn't read the store. The summary
    calls `clearAll()` after a successful submission.
  - _Requirements: 9.9, 9.10_

- [ ] 9. End-to-end check
  - Walk the wizard four times: 2-Piece with pants NO, 3-Piece with pants YES, the screen 26 order
    and E6. Check each summary total against design.md.
  - Submit each order through the task 6 route (or the real control once task 7 exists), then open
    it on `/admin`. Check it against screen 27: CODE NOT ON FILE, the notes line, and no price,
    monogram or measurements.
  - Rerun the Prompt 14 security checks (unauthenticated, forged cookie, path traversal).
  - _Requirements: all_

- [ ] 10. **BLOCKED (Q3):** production order store or notification
  - Replace the internals of `createOrder`, `listOrders` and `getOrder` with the chosen database,
    email or WhatsApp delivery, keeping their signatures.
  - Add the new environment variables to `README.md`.
  - _Requirements: 9.12, 10.5_

## Not in this spec

- Tests for `calculatePrice()`. These are Prompt 17; their expected totals are E1–E10 in design.md.
- Rate limiting and CAPTCHA (Q12), accounts and saved profiles (spec §3, Phase 2), payment, and
  persisting wizard state across reloads.
