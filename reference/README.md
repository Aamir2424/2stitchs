# Reference Screenshots — 2Stitchs Walkthrough

These 41 screenshots of the 2Stitchs (twostitchs.com) mockups are the reference for the suit-site build. The entries below come from looking at each image directly. When a screenshot's purpose can't be determined from what it shows, the entry says "Unclear" instead of guessing. For how these screens become the v1 build, see `../suit-website-mvp-spec.md`.

Unless an entry says otherwise, every browser screenshot has the same site header: a burgundy linen-texture banner with the nav links HOME / OUR STORY / HOW IT WORKS on the left, the gold "2 STITCHS" logo in the center, and DESIGN YOUR SUIT, an "AE" region badge, a cart icon, and an account icon on the right. Under the banner is a grey strip that reads "FREE SHIPPING ON ORDERS OVER USD 500". Page bodies sit on a white background with a faint geometric pattern.

## Screens

1. **screen_01.png** — Brand splash / logo card
   - Shown: A full-bleed burgundy linen fabric, folded diagonally, with the gold "2 STITCHS" wordmark in the center. There is no browser chrome and no navigation.
   - Journey: Brand intro, probably a splash or title card shown before the site. Whether it is a real page or a presentation cover is unclear.

2. **screen_02.png** — Home page hero
   - Shown: The site header, then a hero photo of a man in a grey three-piece suit holding his jacket, standing next to a wooden screen. Overlay text reads "TAILORED SUITS / STARTING FROM AED 699.00", followed by a marketing paragraph (50+ premium fabrics, Perfect Fit Guarantee) and a burgundy "DESIGN YOUR SUIT" CTA button.
   - Journey: Entry point (`/` in the spec).

3. **screen_03.png** — Home: "Choose Your Style" section
   - Shown: The heading "CHOOSE YOUR STYLE" above seven model-photo tiles: 2 PIECE SUITS, 3 PIECE SUITS, DOUBLE BREASTED SUITS, SAFARI SUITS, TUXIDO SUITS (spelled this way on the site), TWEED SUITS, LINEN.
   - Journey: Catalog / style entry, probably lower on the home page. The spec drops this grid in v1.

4. **screen_04.png** — Home / How It Works: "Stitch Your Dream Suit"
   - Shown: The heading "STITCH YOUR DREAM SUIT" with the subtitle "THE THREE STEP PROCESS". Three numbered line-art icons: 1 SELECT YOUR FABRIC (weave), 2 PICK YOUR DESIGN (jacket), 3 GET YOUR MEASURE (tape measure). Below them is a burgundy "GET STARTED" button.
   - Journey: Explains the process before the configurator starts (matches `/how-it-works` in the spec).

5. **screen_05.png** — Configurator: Pick Your Material (fabric family)
   - Shown: The heading "PICK YOUR MATERIAL" above six fabric tiles, each with a starting price and an (i) info icon: WORSTED WOOL (AED 799), LINEN (AED 999), COTTON (AED 799), VELVET (AED 899), TWEED (labeled "WINTER WEAR / COUNTRY STYLE", no price shown), POLYESTER BLEND (AED 699). The mouse cursor is over the tiles.
   - Journey: Wizard step 1, fabric family.

6. **screen_06.png** — Configurator: Pick Your Material (swatch grid for Worsted Wool)
   - Shown: The same heading. On the left is the selected WORSTED WOOL tile ("STARTING FROM AED 799.00"). Next to it is a 2×5 grid of swatches: Midnight Navy, Charcoal Grey, Medium Grey, Light Grey Sharkskin, Dark Chocolate Brown, Olive Green Herringbone, Deep Burgundy, Sand Beige, Navy Prince of Wales Check (+AED 99.00), Navy Pinstripe (+AED 99.00).
   - Journey: Wizard step 2, fabric color/swatch. The +AED 99 labels are the swatch premium deltas.

7. **screen_07.png** — Configurator: Pick Your Material (Worsted Wool swatches, alternate imagery)
   - Shown: The same layout as screen_06, with the WORSTED WOOL tile ("STARTING FROM AED 799.00", (i) icon) on the left and a 2×5 grid on the right. The top row's first three tiles show model or mannequin photos in navy, charcoal, and grey jackets instead of flat fabric. The rest are fabric close-ups (light grey, brown, green herringbone, burgundy, beige, navy, navy pinstripe). No swatch name labels are visible.
   - Journey: Wizard step 2 (swatch). Unclear whether this is a hover state that previews swatches on a jacket or just an earlier or later version of the screen_06 grid.

8. **screen_08.png** — Configurator: Pick Your Material (Linen swatches)
   - Shown: A LINEN tile ("STARTING FROM AED 999.00", (i) icon) on the left. Next to it is a 2×5 swatch grid: Ivory, Stone Grey, Sky Blue, Tobacco Brown, Rich Black, Sand Beige, Deep Burgundy, Olive Green, Navy, Forest Green. No premium deltas are shown.
   - Journey: Wizard step 2, swatch selection after picking the Linen family.

9. **screen_09.png** — Configurator: Pick Your Material (Cotton swatches)
   - Shown: A COTTON tile ("STARTING FROM AED 799.00", (i) icon) on the left. Next to it is a 2×5 swatch grid: Midnight Navy, Khaki, Olive Green Twill, Dark Chocolate Brown, Rich Black, Charcoal Grey, Stone Beige, Sky Blue, Navy Pinstripe, Deep Burgundy. No premium deltas are shown.
   - Journey: Wizard step 2, swatch selection after picking the Cotton family.

10. **screen_10.png** — Configurator: Pick Your Material (Velvet swatches)
   - Shown: A VELVET tile ("STARTING FROM AED 899.00", (i) icon) on the left. Next to it is a 2×5 swatch grid: Midnight Navy, Deep Burgundy, Royal Blue, Dark Chocolate Brown, Plum Purple, Jet Black, Emerald Green, Forest Green, Charcoal Grey, Champagne. No premium deltas are shown.
   - Journey: Wizard step 2, swatch selection after picking the Velvet family.

11. **screen_11.png** — Configurator: Pick Your Material (Tweed swatches)
   - Shown: A TWEED tile ("STARTING FROM AED 899.00", (i) icon) on the left. The family grid in screen_05 showed no price for Tweed; this screen does. Next to it is a 2×5 swatch grid: Brown Herringbone, Charcoal Grey Herringbone, Light Grey Donegal, Camel, Burgundy, Olive Green Estate, Midnight Navy, Blue Windowpane, Forest Green, Prince of Wales. No premium deltas are shown.
   - Journey: Wizard step 2, swatch selection after picking the Tweed family.

12. **screen_12.png** — Configurator: Pick Your Material (Polyester Blend swatches)
   - Shown: The browser tab bar is cropped off the top. A POLYESTER BLEND tile ("STARTING FROM AED 699.00", (i) icon) is on the left. Next to it is a 2×5 swatch grid: Midnight Navy, Light Grey, Dark Chocolate Brown, Deep Burgundy, Navy Prince of Wales Check, Charcoal Grey, Jet Black, Olive Green, Navy Pinstripe, Stone Beige. No premium deltas are shown.
   - Journey: Wizard step 2, swatch selection after picking the Polyester Blend family.

13. **screen_13.png** — Configurator: Style Your Suit Jacket (suit type)
   - Shown: The heading "STYLE YOUR SUIT JACKET" above five model photos, all in a beige/linen suit: 2 PIECE SUITS (no surcharge), 3 PIECE SUITS (+ AED 199.00), DOUBLE BREASTED SUITS (+ AED 99.00), SAFARI SUITS (+ AED 299.00), TUXIDO SUITS (+ AED 299.00). The preview uses the selected fabric color.
   - Journey: Wizard step 3, suit type / jacket style chosen after the fabric.

14. **screen_14.png** — Configurator: How Would You Like Your Fit?
   - Shown: The heading "HOW WOULD YOU LIKE YOUR FIT?" above two model photos in a beige/linen two-button suit: REGULAR FIT and SLIM FIT. No surcharges are shown. The shared header (burgundy fabric banner, free-shipping bar) is visible.
   - Journey: Wizard step 4, fit selection after the suit type.

15. **screen_15.png** — Configurator: Select the Lapel Thickness
   - Shown: The heading "SELECT THE LAPEL THICKNESS" above three close-up chest crops of a beige jacket: NARROW LAPEL, MEDIUM LAPEL, WIDE LAPEL. No surcharges are shown.
   - Journey: Wizard step 5, lapel width chosen after the fit.

16. **screen_16.png** — Configurator: Design Your Lapel (lapel style)
   - Shown: The heading "DESIGN YOUR LAPEL" above three close-up shoulder/lapel crops of a beige jacket: NOTCH LAPEL, PEAK LAPEL, SHAWL LAPEL. No surcharges are shown.
   - Journey: Wizard step 6, lapel style chosen after the lapel width.

17. **screen_17.png** — Configurator: Add a Waist Coat
   - Shown: The heading "ADD A WAIST COAT" with the subtitle "INCLUDED WITH THE 3-PIECE SUIT". Below are three model photos of beige waistcoats over white shirts: SINGLE BREASTED WAISTCOAT, DOUBLE BREASTED WAIST COAT (+ AED 29.00), U-SHAPED WAISTCOAT.
   - Journey: Wizard waistcoat step after the lapel. The subtitle suggests it applies when 3 PIECE was chosen in screen_13. Whether 2-piece buyers also see it is unclear.

18. **screen_18.png** — Configurator: Now How Would You Like Your Back? (vents)
   - Shown: The heading "NOW HOW WOULD YOU LIKE YOUR BACK?" above two rear-view photos of a beige jacket: CENTER VENT and SIDE VENT. No surcharges are shown.
   - Journey: Wizard jacket-back/vent step, after the waistcoat step.

19. **screen_19.png** — Configurator: Would You Like a Different Fabric for Your Pants?
   - Shown: The centered heading "WOULD YOU LIKE A DIFFERENT FABRIC FOR YOUR PANTS?" above two large burgundy pill buttons, YES and NO. There are no images.
   - Journey: Wizard branching question that begins the trouser section, after the jacket vent step. YES presumably leads to a separate trouser fabric selection; the screenshot doesn't confirm where either option goes.

20. **screen_20.png** — Configurator: How Would You Like to Fit in Your Pants?
   - Shown: The heading "HOW WOULD YOU LIKE TO FIT IN YOUR PANTS?" above two waist-down photos of beige trousers with brown loafers: REGULAR FIT and SLIM FIT. No surcharges are shown.
   - Journey: Wizard trouser-fit step, after the pants-fabric question in screen_19.

21. **screen_21.png** — Configurator: Where Would You Like Your Pants to Sit (rise)
   - Shown: The heading reads "WHERE WOLD YOU LIKE YOUR PANTS TO SIT"; "WOLD" is a typo on the live site. Below it are three waist-down photos of beige trousers: HIGH WAISTED, MID WAISTED, LOW WAISTED. No surcharges are shown.
   - Journey: Wizard trouser-rise step, after the trouser fit.

22. **screen_22.png** — Configurator: Belt Loops or Side Tabs?
   - Shown: The heading "BELT LOOPS OR SIDE TABS?" above two waist close-ups of beige trousers: BELT LOOPS (no surcharge) and SIDE TABS (+ AED 59.00).
   - Journey: Wizard trouser waistband step, after the trouser rise.

23. **screen_23.png** — Configurator: Cuff or No Cuff?
   - Shown: The heading "CUFF OR NO CUFF?" above two photos of trouser hems with brown loafers: WITHOUT CUFF (no surcharge) and WITH CUFF (+ AED 10.00).
   - Journey: Wizard trouser hem step, after belt loops/side tabs.

24. **screen_24.png** — Configurator: Design Your Monogram
   - Shown: On the left, a photo of an open beige jacket with "AAMIR" embroidered on the inner lining. In the center, the heading "DESIGN YOUR MONOGRAM" with the hint "MAXIMUM OF 10 LETTERS", a burgundy pill text input reading "AAMIR", and "+ AED 39.00" below it. On the right are four font-style checkboxes, each previewing "ABC" in a different typeface (sans, bold, script/italic, serif). None appears checked.
   - Journey: Wizard monogram/personalization step, after the trouser options.

25. **screen_25.png** — Configurator: Tell Your Tailor What You Desire (free-text notes)
   - Shown: Under the shared header, the heading "TELL YOUR TAILOR WHAT YOU DESIRE." above a large burgundy-outlined rounded text area. It holds a filled-in sample message ("HEY MR. TAILOR, JUST WANTED TO EXPLAIN WHAT I'M AFTER..."), describing a suit for casual evening wear and date nights, looser pants that aren't baggy, a jacket fitted but not skinny, and a "classy and expensive but effortless" look. A burgundy "SUBMIT" pill button sits below.
   - Journey: Wizard free-text notes step, after the monogram step. It's the last design input before measurements/checkout.

26. **screen_26.png** — Configurator: Summary
   - Shown: The heading "SUMMARY" above a grid of captioned tiles. "JACKET FABRIC- VELVET" shows a DEEP BURGUNDY swatch. "PANTS FABRIC- POLYESTER BLEND" shows a MIDNIGHT NAVY swatch. A tall "SUIT DESIGN" image of a beige safari jacket is captioned "SAFARI SUITS / SLIM FIT- SUIT AND PANT". Further tiles: "WIDE LAPEL", "PEAK LAPEL", "SIDE VENT", "HIGH WAISTED PANTS", "SIDE TABS PANTS", and "ANKLE CUFFS REQUIRED". Bottom right: "TOTAL PRICE" in a burgundy pill reading "AED 1267.00 EXC. VAT", with the note "VAT PAYABLE BY CUSTOMER AT THE TIME OF SHIPMENT" below. The tile images are generic beige-suit photos; they don't render the selected fabrics.
   - Journey: Review/summary step at the end of the design wizard, showing all choices and the running total, before measurements/checkout.

27. **screen_27.png** — Order spec sheet for a named customer (likely admin/tailor-facing)
   - Shown: No browser chrome or site header. The patterned background carries the customer-name heading "FAHD AHAMED" in place of "SUMMARY". Tiles: "SUIT FABRIC- WOOL & CASHMERE" and "PANTS FABRIC- WOOL & CASHMERE", both dark navy swatches labeled with the fabric code "YC676240". A "SUIT DESIGN" image of a beige 2-button suit is captioned "2 PIECE SUITS / REGULAR FIT- SUIT AND PANT". The rest match screen_26: WIDE LAPEL, PEAK LAPEL, SIDE VENT, HIGH WAISTED PANTS, SIDE TABS PANTS, ANKLE CUFFS REQUIRED. A footer line reads "NOTES: EMBROIDERY IS REQUIRED INSIDE TEH JACKET" (typo "TEH" as shown). No price is shown.
   - Journey: Unclear. It looks like a production/tailor order sheet, or an admin view of a submitted order, built from the summary layout. It uses fabric codes and a customer name and drops pricing. It isn't a customer-facing wizard step.

28. **screen_28.png** — Configurator: Summary with rendered suit previews
   - Shown: Shared header, then the heading "SUMMARY" above five portrait photos of a model in a burgundy velvet safari-style jacket with navy trousers. This matches the velvet jacket / navy pants selection in screen_26. Captions: "YOUR DESIGNED SUIT", "FRONT PROFILE", "BACK PROFILE", "SIDE PROFILE", "CLOSE-UP SHOT".
   - Journey: Summary step, visual preview section. It appears to be a second section or alternate view of the summary in screen_26, showing the designed suit from several angles. Whether these images are generated per order or static mockups is unclear.

29. **screen_29.png** — Measurement: Your Digital Profile (height / weight / age)
   - Shown: Shared header, then the heading "MEASUREMENT". On the left, three burgundy pill inputs with unit suffixes: "HEIGHT" ("inchs", a typo as shown), "WEIGHT" ("kg"), and "AGE" ("years"), with a small "SAVE" button below. On the right, the subheading "YOUR DIGITAL PROFILE" over three humorous helper lines ("ASK YOUR MOTHER HOW TALL YOU ARE...", "STEP ONTO THE BATHROOM SCALE...", "NOT SURE HOW OLD YOU ARE?...").
   - Journey: First step of the measurement flow, after the design summary. It collects basic body stats before the detailed measurements.

30. **screen_30.png** — Measurement: Shoulder Width
   - Shown: Shared header, then the heading "MEASUREMENT". On the left, a video/image of a man from behind with a dotted line tracing across his shoulders between two point markers. A white scrubber knob on a grey progress bar overlays it, suggesting a video player. On the right, the subheading "SHOULDER WIDTH" with two instruction paragraphs (place the tape where shoulder meets arm, measure across the natural curve to the same point). Below the media: a burgundy input with an "inchs" suffix and a "SAVE" button.
   - Journey: Measurement flow. First of the per-body-part guided measurement steps (video + instructions + single input), after the digital profile.

31. **screen_31.png** — Measurement: Sleeves Length
   - Shown: Same layout as screen_30. On the left, a video still of a man in a navy sweater with a dotted line running down the outside of his arm from a shoulder marker, and a woman holding a measuring tape beside him. No scrubber is visible in this frame. On the right, the subheading "SLEEVES LENGTH" with three instructions (stand relaxed, start where shoulder meets arm, follow the elbow curve to the wrist at the base of the thumb). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after shoulder width.

32. **screen_32.png** — Measurement: Stomach
   - Shown: Same measurement layout. On the left, a cropped video still of a man's torso in a navy sweater, hands at his chest, with a dotted line across his abdomen. On the right, the subheading "STOMACH" with instructions (wrap the tape around the widest part of the abdomen near navel level, keep it level, breathe normally, don't pull in your stomach). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after sleeves length.

33. **screen_33.png** — Measurement: Leg Length
   - Shown: Same measurement layout. On the left, a video still of a man's legs in navy trousers with a dotted vertical line down the outside of the leg from waist to floor, and a woman with a tape in the background. On the right, the subheading "LEG LENGTH" with instructions (measure vertically from the outer waist point down the side of the leg to the floor; length is adjusted for the chosen style: full-length, ankle-length, or shorts). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after stomach.

34. **screen_34.png** — Measurement: Pants Waist
   - Shown: Same measurement layout. On the left, a video still of a man in a navy V-neck sweater and navy trousers with a short dotted line at the waistband. On the right, the subheading "PANTS WAIST" with instructions (measure around the body where you want your pants to sit, not over clothing, snug but comfortable, keep the tape level). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after leg length.

35. **screen_35.png** — Measurement: Hips
   - Shown: Same measurement layout. On the left, a video still of a man's hip area from behind (hands clasped at his back) with a dotted line across his hips, and a woman's hair in the foreground. A white scrubber knob and progress bar overlay it. On the right, the subheading "HIPS" with instructions (legs slightly apart, wrap the tape around the widest part of the hips, keep it level, not too tight). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after pants waist.

36. **screen_36.png** — Measurement: Thigh
   - Shown: Same measurement layout. On the left, a video still almost identical to screen_35 (man from behind, dotted line across the hips/seat, woman in the foreground holding a tape). The dotted line sits at hip level rather than on the thigh, so the video frame appears reused from the hips step. On the right, the subheading "THIGH" with one instruction (wrap the tape around the widest part of the thigh, level, without squeezing). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after hips.


37. **screen_37.png** — Measurement: Neck
   - Shown: Same measurement layout. On the left, a video still of a man in a navy V-neck sweater facing the camera, with a faint dotted line around the base of his neck. A white scrubber knob and progress bar overlay it. On the right, the subheading "NECK" with two instructions (wrap the tape around the base of the neck where a shirt collar would sit; snug but not tight, one finger should slide underneath). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after thigh.


38. **screen_38.png** — Measurement: Body Length
   - Shown: Same measurement layout. On the left, a video still of a smiling man in a navy V-neck sweater with a woman (back to camera) in the foreground, and a dotted vertical line running from the base of his neck down the front of his body. A white scrubber knob and progress bar overlay it. On the right, the subheading "BODY LENGTH" with two instructions (stand straight, start at the base of the neck where shoulder meets neck; extend the tape vertically down the front over the abdomen to the midpoint of the thumb). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after neck.


39. **screen_39.png** — Measurement: Bicep
   - Shown: Same measurement layout. On the left, a video still of a man in a navy sweater in side profile, smiling toward a woman whose hair fills the right foreground. A short dotted line crosses his upper arm. No scrubber is visible in this frame. On the right, the subheading "BICEP" with one instruction (let the arm hang relaxed, measure around the fullest part of the bicep, comfortably snug). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after body length.


40. **screen_40.png** — Measurement: Rise
   - Shown: Same measurement layout. On the left, a cropped video still of a man's midsection in navy jeans and sweater, hands clasped at his chest, with a dotted line along the waistband and a faint circle marker near the button. No scrubber is visible in this frame. On the right, the subheading "RISE" with three instructions (start at the back of the waist where the waistband sits; bring the tape through the legs to the front of the waist where a belt buckle would sit; adjust for comfort, not too tight). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after bicep.


41. **screen_41.png** — Measurement: Wrist
   - Shown: Same measurement layout. On the left, a cropped video still of a man's arm and hip in navy clothing, with a dotted line around his wrist. A woman on the right holds a measuring tape at her waist. A white scrubber knob and progress bar overlay it. On the right, the subheading "WRIST" with one instruction (measure around the wrist at its narrowest point, just above the wrist bone). Below: an "inchs" input and a "SAVE" button.
   - Journey: Measurement flow, guided step after rise. This is the last screenshot in the set. Nothing in it shows what follows (e.g., cart or checkout), so the next step is unclear.
