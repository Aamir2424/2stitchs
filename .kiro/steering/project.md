# Project: 2Stitchs — made-to-measure suit website

## Brand
- Name: 2Stitchs (spelled exactly like this; domain twostitchs.com).
- Logo: gold "2" with wide-tracked "STITCHS" wordmark, on burgundy linen. Use the real logo
  file (`image2.png`, mapped in asset-manifest.md).
- Tagline used in the design: "Stitch Your Dream Suit".
- Currency: AED. Free-shipping banner and VAT note are config values, not hardcoded.

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS v4. No database yet.
Wizard options and prices live in config files, never hardcoded in JSX.

## Source of truth
- suit-website-mvp-spec.md = flow, wizard steps, data model, pricing formula.
  It and asset-manifest.md agree; items needing outside confirmation are listed in
  asset-manifest.md ("Requires external confirmation"). Don't change product scope without
  asking me.
- asset-manifest.md = the verified map of which image or video belongs to which screen and
  option. It overrides image_description.md and image_description_json.json when they disagree.
- image_description.md / image_description_json.json = the original visual catalogue of every
  extracted file. Use them for descriptions only. Ignore their obsolete BRANDNAME rule.
- reference/ = screenshots of the finished design to match visually.
- Extracted images and videos live in `powerpoint assets/`. Don't rename or edit that folder.

## Assets: real images and videos are used
- The images and videos extracted from the design deck are the real site assets. Use them.
- Every image and video is referenced through src/config/assets.ts, built only from
  asset-manifest.md. Never hardcode an asset path in a component, and never invent or
  substitute an image.
- Before using an image for an option, open it and confirm it matches the option label and the
  manifest. If the mapping is uncertain, inspect the asset and ask me. Do not guess.
- If an asset is missing, show a clearly marked placeholder and list it in your reply. The known
  missing assets are listed in asset-manifest.md.
- Don't paste pixels from the reference screenshots into the site. The screenshots are for
  layout comparison only.

## Visual reference rule
- reference/README.md maps the 41 screenshots.
- Before building or changing ANY UI, open the matching screenshot(s) and actually look at
  them. Never work from README text alone.
- After building, compare your result with the screenshot and fix every difference
  (spacing, letter-spacing, sizes, colors, alignment).

## Known copy mistakes in the design (do NOT copy these)
- "WHERE WOLD YOU LIKE YOUR PANTS TO SIT" -> "WOULD"
- Unit label "inchs" -> "inches"
- "TEH JACKET" -> "THE JACKET"
- "TELL YOUR TAILOR WHAT YOU DESIRE" is fine; keep as is.
- "TUXIDO SUITS" -> "TUXEDO SUITS" in all customer-facing copy (screens 03 and 13 show the typo).
- Shipping banner says USD 500 but prices are AED: the threshold amount and currency are config
  values, marked unconfirmed. Don't change the amount or convert it.

## v1 scope (decided; details in suit-website-mvp-spec.md and asset-manifest.md)
- All 6 fabric families × 10 swatches; all 5 jacket styles; the waistcoat step only for 3-Piece.
- Measurements: one screen each with its real video. Thigh never shows the hips video; it uses a
  thigh-specific static illustration (pending).
- Summary tiles reuse cropped, verified step images where no dedicated thumbnail exists.
- Production ticket: verified data only. Fabric codes and Wool & Cashmere are missing; never
  invent them.
- Don't invent missing assets, codes, prices or business rules. Ask, and list them in your reply.
- Photo and video publication rights must be verified before launch.

## Typography
- Muller is the primary typeface for headings, body text, buttons, prices and labels.
- Sizes, weights, line heights, letter-spacing and responsive steps are measured from the
  reference screenshots, never picked arbitrarily, and live only in the central theme.
- Muller files are not available yet. Don't substitute another font, and never declare or report
  Muller as loaded when it isn't. Once licensed web files exist, they go in public/fonts/ and are
  loaded with next/font/local. Never use the PowerPoint-embedded .fntdata files.
- Monogram style fonts are free fonts with a licence that allows web embedding.

## Conventions
- Tailwind CSS v4 is compiled by @tailwindcss/postcss (postcss.config.mjs).
- Colors and fonts come only from Tailwind v4 theme tokens declared with `@theme` in
  app/globals.css (there is no tailwind.config.ts). DESIGN.md does not exist yet; it is created
  in the design-tokens step and will document those tokens. Until then, don't invent tokens.
- Prices live only in config and are summed only by calculatePrice().
- One pure calculatePrice() function used on client and server.
- Commit-sized changes: one screen or one feature per task.
