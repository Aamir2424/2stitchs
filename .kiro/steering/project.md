# Project: 2Stitchs — made-to-measure suit website

## Brand
- Name: 2Stitchs (spelled exactly like this; domain twostitchs.com).
- Logo: gold "2" with wide-tracked "STITCHS" wordmark, on burgundy linen.
- Tagline used in the design: "Stitch Your Dream Suit".
- Currency: AED. Free-shipping banner and VAT note are config values, not hardcoded.

## Stack
Next.js (App Router) + TypeScript + Tailwind. No database yet.
Wizard options and prices live in config files, never hardcoded in JSX.

## Source of truth
- suit-website-mvp-spec.md = flow, wizard steps, data model, pricing formula.
- asset-manifest.md (+ image_description.md / image_description_json.json) = which
  image or video belongs to which screen and option.
- reference/ = screenshots of the finished design to match visually.

## Assets: real images and videos are used
- The images and videos extracted from the design deck are the real site assets. Use them.
- Every image is referenced through src/config/assets.ts. Never hardcode an image path in a
  component, and never invent or substitute an image.
- Before using an image for an option, open it and confirm it matches the option label.
  If the mapping is uncertain, inspect the asset and ask me. Do not guess.
- If an asset is missing, show a clearly marked placeholder and list it in your reply.
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
- Shipping banner says USD but prices are AED: keep as a config value until I decide.

## Conventions
- Colors and fonts only through Tailwind tokens defined in DESIGN.md.
- One pure calculatePrice() function used on client and server.
- Commit-sized changes: one screen or one feature per task.