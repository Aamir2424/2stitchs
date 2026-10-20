# Suit Website Asset Manifest

> Purpose: help Kiro/Claude select the correct original media for the 41 reference screens. This catalogue is based on visual inspection of labelled contact sheets and the 41 full-page reference screenshots. Filenames are preserved from `ppt/media/`.

## Rules for the coding agent

- Use the exact filenames in this manifest; do not rename assets unless you also update every reference.
- Put copied website assets under `public/assets/` (or another single agreed directory) and reference them with stable paths such as `/assets/image4.png`. Do not reference `/mnt/data` paths.
- Use `object-fit: contain` for isolated product/model cards where the whole garment should remain visible; use `cover` only where the reference visibly crops the image.
- Treat this as a mapping aid, not permission to copy the reference brand. Project rules require the placeholder `BRANDNAME`; do not use the `2 STITCHES` logo (`image2.png`) in the shipped site.
- Do not use a reference screenshot as a website asset. Build the layout in HTML/CSS and use only the individual media files where appropriate.
- A match marked “candidate” or “likely” must be visually verified against the corresponding screenshot before implementation. Avoid guessing exact fabric option order from this document alone.
- Preserve aspect ratio. Avoid stretching fabric swatches or garment photos.

## High-level screen-to-asset map

| Reference screen | Page / step | Assets to inspect first | Confidence / notes |
|---|---|---|---|
| `screen_01.png` | Brand/splash | burgundy woven texture and centered wordmark; image1.png is the texture candidate and image2.png is the reference logo (do not copy brand logo per project rules). | See notes below; confirm candidates against the screenshot. |
| `screen_02.png` | Landing/hero | image4.png is the strongest visual match for the model hero. image1.png / image9.png or image73.png may be texture/background assets. | See notes below; confirm candidates against the screenshot. |
| `screen_03.png` | Choose your style | use model cards image10.png–image16.png; image41.png–image43.png may be alternate product/style imagery depending on exact card matching. | See notes below; confirm candidates against the screenshot. |
| `screen_04.png` | Three-step “stitch your dream suit” explainer | image17.png or image18.png for line-art process icons; image9.png/image73.png for page pattern. | See notes below; confirm candidates against the screenshot. |
| `screen_05.png` | Material selection, first group | fabric thumbnails visually correspond to image19.png, image28.png, image21.png, image22.png, image27.png, image24.png (verify individual crop/order against screenshot). | See notes below; confirm candidates against the screenshot. |
| `screen_06.png` | Material selection grid | plain fabric thumbnails, including image31.png–image40.png and other plain weave assets; exact tile order should follow the screenshot. | See notes below; confirm candidates against the screenshot. |
| `screen_07.png` | Material selection with garment thumbnails and fabric choices | image41.png–image43.png plus swatches from image31.png onward; inspect screenshot tile-by-tile before mapping each slot. | See notes below; confirm candidates against the screenshot. |
| `screen_08.png` | Material selection grid of pale/blue/gray/burgundy fabrics | likely image20.png, image44.png, image46.png, image47.png, image49.png, image51.png, image55.png, image62.png, image82.png, etc. | See notes below; confirm candidates against the screenshot. |
| `screen_09.png` | Material selection grid including green, black, blue, cream and burgundy fabrics | likely image52.png, image54.png, image56.png–image59.png, image63.png and image68.png. | See notes below; confirm candidates against the screenshot. |
| `screen_10.png` | Material selection grid of satin/velvet-like colors | image62.png–image72.png are strong candidates for burgundy, navy, black, green, blue, brown, purple and champagne swatches. | See notes below; confirm candidates against the screenshot. |
| `screen_11.png` | Material selection grid with herringbone/tweed and green/brown/navy fabrics | likely image74.png–image84.png. | See notes below; confirm candidates against the screenshot. |
| `screen_12.png` | Material selection grid with gray/black/navy/olive/burgundy fabrics | likely image85.png–image93.png. | See notes below; confirm candidates against the screenshot. |
| `screen_13.png` | Style your suit jacket | image94.png–image98.png show jacket construction/style options; image99.png/image100.png are full-body variants. | See notes below; confirm candidates against the screenshot. |
| `screen_14.png` | Fit choice | image99.png and image100.png are full-length beige-suit models; compare their exact crops/fit differences before assigning Regular vs Slim. | See notes below; confirm candidates against the screenshot. |
| `screen_15.png` | Lapel thickness selection | image104.png–image106.png are close-up beige lapel/torso variants. | See notes below; confirm candidates against the screenshot. |
| `screen_16.png` | Design your lapel | image101.png–image103.png and/or image121.png–image122.png show lapel/chest detail; use the closest framing for each choice. | See notes below; confirm candidates against the screenshot. |
| `screen_17.png` | Add a waistcoat | image107.png–image109.png show full-body beige-suit/waistcoat views. | See notes below; confirm candidates against the screenshot. |
| `screen_18.png` | Back style choice | image110.png–image111.png are back views of the beige jacket. | See notes below; confirm candidates against the screenshot. |
| `screen_19.png` | Different fabric for pants? Yes/No choice | Different fabric for pants? Yes/No choice; likely no unique product image is needed beyond the UI/background. | See notes below; confirm candidates against the screenshot. |
| `screen_20.png` | Pants fit choice | image112.png–image117.png show shirt-and-trousers model views; select exact image variants after visual comparison. | See notes below; confirm candidates against the screenshot. |
| `screen_21.png` | Pants rise choice | image112.png–image117.png or small crops image124.png–image125.png; verify exact image-to-option mapping. | See notes below; confirm candidates against the screenshot. |
| `screen_22.png` | Belt loops or side tabs | image112.png–image117.png provide front waist/trouser views; likely no unique standalone image for side tabs. | See notes below; confirm candidates against the screenshot. |
| `screen_23.png` | Cuff/no cuff | image118.png, image119.png and image126.png show trouser hems/shoes. | See notes below; confirm candidates against the screenshot. |
| `screen_24.png` | Monogram personalization | image120.png shows the jacket opened to reveal lining; text/monogram UI is HTML, not a baked image. | See notes below; confirm candidates against the screenshot. |
| `screen_25.png` | Free-text instructions to tailor | no product image needed; UI is text input and submit button. | See notes below; confirm candidates against the screenshot. |
| `screen_26.png` | Summary of chosen beige suit | assemble the chosen fabric, jacket, lapel, waistcoat, back, trousers and cuff assets from earlier steps; not one single image. | See notes below; confirm candidates against the screenshot. |
| `screen_27.png` | Summary board for burgundy outfit | image127.png–image131.png are front/back/side/detail outfit views. | See notes below; confirm candidates against the screenshot. |
| `screen_28.png` | Alternate summary outfit/model views | image127.png–image131.png appear to be the matching burgundy suit set. | See notes below; confirm candidates against the screenshot. |
| `screen_29.png` | Measurement page with digital profile selectors | page UI; avatar image5.png may be a placeholder, but confirm in the screenshot. | See notes below; confirm candidates against the screenshot. |
| `screen_30.png` | Measurement guide for shoulder width | use appropriate tutorial video (one of VAHOn*.mp4) and/or frame image132.jpeg; map exact video only after reviewing each clip. | See notes below; confirm candidates against the screenshot. |
| `screen_31.png` | Measurement guide for sleeve length | tutorial footage; candidate frames image133.jpeg/image139.jpeg/image140.jpeg. | See notes below; confirm candidates against the screenshot. |
| `screen_32.png` | Measurement guide for stomach | tutorial footage; candidate frames image134.jpeg/image137.jpeg/image141.jpeg. | See notes below; confirm candidates against the screenshot. |
| `screen_33.png` | Measurement guide for leg length | tutorial footage; candidate frame image136.jpeg. | See notes below; confirm candidates against the screenshot. |
| `screen_34.png` | Measurement guide for pants waist | tutorial footage; candidate frames image134.jpeg/image137.jpeg/image141.jpeg/image142.jpeg. | See notes below; confirm candidates against the screenshot. |
| `screen_35.png` | Measurement guide for hips | tutorial footage; candidate frames image134.jpeg/image137.jpeg/image141.jpeg/image142.jpeg. | See notes below; confirm candidates against the screenshot. |
| `screen_36.png` | Measurement guide for thighs | tutorial footage; candidate frames image134.jpeg/image137.jpeg/image141.jpeg/image142.jpeg. | See notes below; confirm candidates against the screenshot. |
| `screen_37.png` | Measurement guide for neck | tutorial frame image138.jpeg shows the customer from the front; confirm the relevant clip. | See notes below; confirm candidates against the screenshot. |
| `screen_38.png` | Measurement guide for body length | tutorial frames image133.jpeg/image139.jpeg show full torso/body context. | See notes below; confirm candidates against the screenshot. |
| `screen_39.png` | Measurement guide for bicep | tutorial frame image140.jpeg shows a side view; confirm relevant clip. | See notes below; confirm candidates against the screenshot. |
| `screen_40.png` | Measurement guide for rise | tutorial frames image134.jpeg/image137.jpeg/image141.jpeg/image142.jpeg show waist/hip region. | See notes below; confirm candidates against the screenshot. |
| `screen_41.png` | Measurement guide for wrist | tutorial frames image135.jpeg/image140.jpeg; confirm relevant clip. | See notes below; confirm candidates against the screenshot. |

## Asset-by-asset catalogue

### Brand, hero, icons and shared backgrounds

- **`image1.png`** — Close-up burgundy/red woven suit fabric texture; also matches the burgundy textured background used behind the 2 STITCHES wordmark in screen_01. Dimensions: 2420×2420.
- **`image17.png`** — Line-art set showing fabric/weave, jacket, measuring tape and thread/spool; process/how-it-works illustration. Screen_04. Dimensions: 768×512.
- **`image18.png`** — Near-duplicate of image17.png, same line-art process illustration. Compare before deciding which is the correct intended variant. Dimensions: 768×512.
- **`image2.png`** — 2 STITCHES brand logo on a pale background. Use only if the design calls for this brand reference; the project steering rules require replacing the reference brand with BRANDNAME, so do not reproduce this logo in the implementation. Dimensions: 639×360.
- **`image25.png`** — Information “i” icon in a pale circular background. Dimensions: 98×98.
- **`image26.svg`** — SVG file; view source/render to identify exact icon before using.
- **`image29.png`** — Large cursor/pointer graphic. Likely instructional/UI illustration rather than a production website asset. Dimensions: 607×872.
- **`image3.png`** — A full-screen browser/UI screenshot with a dark page; not a clean suit/product asset. Likely unrelated or a captured state. Do not use as a website image without checking its context. Dimensions: 1920×1080.
- **`image30.svg`** — SVG file; view source/render to identify exact icon before using.
- **`image4.png`** — Wide editorial hero photograph of a male model in a dark green/charcoal suit against a warm textured studio backdrop. Strong match for screen_02 landing-page hero. Dimensions: 2250×1171.
- **`image5.png`** — Generic circular user/avatar placeholder icon. Dimensions: 500×500.
- **`image6.svg`** — SVG asset; inspect in browser or editor before use. Likely an interface/icon asset; exact appearance should be confirmed from the SVG source.
- **`image7.png`** — Shopping cart icon inside a pale circular background. Dimensions: 116×116.
- **`image73.png`** — Large repeating geometric ornamental pattern, similar to image9.png. Likely a high-resolution source for the pale patterned page background; verify which tile matches the screenshots best. Dimensions: 2993×3008.
- **`image8.svg`** — SVG asset; inspect before use. Likely a small interface/icon asset.
- **`image9.png`** — Large repeating geometric ornamental pattern in muted gray/burgundy. Candidate for the pale patterned page background visible throughout screens 2–41. Dimensions: 2993×3008.

### Style/product model imagery

- **`image10.png`** — Full-length male model in a dark navy/black formal suit; style-selection card. Screen_03. Dimensions: 410×615.
- **`image100.png`** — Full-length model in a light beige suit, front view. Dimensions: 614×923.
- **`image101.png`** — Close-up crop of light beige suit jacket/torso, front view. Dimensions: 898×1122.
- **`image102.png`** — Close-up crop of light beige suit jacket/torso, slightly different framing from image101. Dimensions: 1010×1262.
- **`image103.png`** — Close-up crop of light beige suit jacket/torso, similar to image101/102. Dimensions: 898×1122.
- **`image104.png`** — Close-up of beige jacket lapel and shirt, detail crop; useful for lapel thickness choices. Dimensions: 512×769.
- **`image105.png`** — Close-up of beige jacket lapel and shirt, detail crop; lapel variant. Dimensions: 512×769.
- **`image106.png`** — Close-up of beige jacket lapel and shirt, detail crop; lapel variant. Dimensions: 512×769.
- **`image107.png`** — Full-length model in beige suit without jacket buttoned/with waistcoat styling; waistcoat option view. Dimensions: 717×1076.
- **`image108.png`** — Full-length model in beige suit with waistcoat styling; near-duplicate/alternate crop of image107. Dimensions: 717×1076.
- **`image109.png`** — Full-length model in beige suit with waistcoat styling; alternate crop of image107/108. Dimensions: 717×1076.
- **`image11.png`** — Male model in a brown/charcoal suit leaning beside a stool; style-selection card. Screen_03. Dimensions: 410×615.
- **`image110.png`** — Back view of beige suit jacket on model. Dimensions: 921×1384.
- **`image111.png`** — Back view of beige suit jacket on model; near-duplicate/alternate framing of image110. Dimensions: 921×1384.
- **`image112.png`** — Front view of model in white shirt and beige trousers, full body; pants fit/rise/waist options. Dimensions: 717×1076.
- **`image113.png`** — Front view of model in white shirt and beige trousers, alternate crop of image112. Dimensions: 921×1384.
- **`image114.png`** — Front view of model in white shirt and beige trousers, alternate crop. Dimensions: 717×1076.
- **`image115.png`** — Front view of model in white shirt and beige trousers, full-body alternate. Dimensions: 717×1076.
- **`image116.png`** — Front view of model in white shirt and beige trousers, full-body alternate. Dimensions: 717×1076.
- **`image117.png`** — Front view of model in white shirt and beige trousers, alternate crop. Dimensions: 921×1384.
- **`image118.png`** — Close-up of beige suit trousers and brown shoes, front/leg crop; cuff/hem option. Dimensions: 819×1230.
- **`image119.png`** — Close-up of beige suit trousers and brown shoes, alternate hem/leg crop. Dimensions: 819×1230.
- **`image12.png`** — Full-length male model in a dark formal suit; style-selection card. Dimensions: 410×615.
- **`image120.png`** — Model opening beige jacket to show inner lining; monogram/customization visual. Screen_24. Dimensions: 674×842.
- **`image121.png`** — Small close-up of beige lapel/upper jacket; likely lapel design option thumbnail. Dimensions: 185×254.
- **`image122.png`** — Small close-up of beige lapel/upper jacket; alternate lapel option thumbnail. Dimensions: 186×255.
- **`image123.png`** — Small cropped view of beige jacket body/hem; likely jacket detail thumbnail. Dimensions: 202×264.
- **`image124.png`** — Small crop of beige trousers/upper legs; likely pants fit/rise option thumbnail. Dimensions: 200×263.
- **`image125.png`** — Small crop of beige trousers/upper legs; alternate pants option thumbnail. Dimensions: 201×264.
- **`image126.png`** — Small crop of beige trousers and shoes; likely cuff/hem option thumbnail. Dimensions: 200×261.
- **`image127.png`** — Male model wearing a burgundy blazer with dark trousers, front view; alternative outfit summary/style view. Dimensions: 512×769.
- **`image128.png`** — Male model wearing a burgundy blazer with dark trousers, front view, alternate crop. Dimensions: 512×769.
- **`image129.png`** — Back view of burgundy blazer and dark trousers. Dimensions: 512×769.
- **`image13.png`** — Male model in a light/cream suit, relaxed pose; style-selection card. Dimensions: 410×615.
- **`image130.png`** — Side/profile view of burgundy blazer and dark trousers. Dimensions: 512×769.
- **`image131.png`** — Close-up portrait/upper body of model in burgundy blazer; likely outfit summary detail. Dimensions: 543×724.
- **`image14.png`** — Male model in a black tuxedo/formal suit; style-selection card. Dimensions: 410×615.
- **`image15.png`** — Male model in a medium-brown suit; style-selection card. Dimensions: 410×615.
- **`image16.png`** — Male model in a light beige suit; style-selection card. Dimensions: 410×615.
- **`image28.png`** — Close-up beige suit lapel/chest with pocket square; likely style/lapel detail imagery. Dimensions: 410×615.
- **`image41.png`** — Full-length male model in a navy suit against a light neutral background; likely a style/product card variant. Dimensions: 1024×572.
- **`image42.png`** — Full-length male model in a gray/brown suit against a light neutral background; likely a style/product card variant. Dimensions: 820×624.
- **`image43.png`** — Gray suit jacket on a mannequin against a neutral background; product/style card variant. Dimensions: 512×388.
- **`image94.png`** — Beige suit jacket with tie, front view; jacket-style option. Dimensions: 512×768.
- **`image95.png`** — Beige double-breasted suit jacket with tie, front view; jacket-style option. Dimensions: 512×768.
- **`image96.png`** — Beige double-breasted jacket with prominent buttons, front view; jacket-style option. Dimensions: 512×768.
- **`image97.png`** — Beige jacket with patch/flap pockets and tie, front view; jacket-style option. Dimensions: 561×701.
- **`image98.png`** — Light beige suit jacket close-up, front view; jacket-style option. Dimensions: 561×701.
- **`image99.png`** — Full-length model wearing a light beige suit; fit/style reference. Dimensions: 614×923.

### Fabric swatches and textures

- **`image19.png`** — Close-up charcoal/black textured fabric swatch. Dimensions: 800×800.
- **`image20.png`** — Close-up light blue woven fabric swatch. Dimensions: 403×537.
- **`image21.png`** — Olive/green folded fabric swatch. Dimensions: 432×611.
- **`image22.png`** — Burgundy/red smooth fabric swatch. Dimensions: 450×450.
- **`image23.png`** — Brown/tan herringbone fabric swatch. Dimensions: 601×601.
- **`image24.png`** — Light gray/silver draped fabric swatch. Dimensions: 637×481.
- **`image27.png`** — Near-black fabric texture swatch. Dimensions: 601×601.
- **`image31.png`** — Dark navy/black fabric swatch, portrait crop. Dimensions: 360×576.
- **`image32.png`** — Deep forest-green plain fabric swatch. Dimensions: 567×567.
- **`image33.png`** — Dark charcoal/brown fabric swatch. Dimensions: 380×400.
- **`image34.png`** — Burgundy/wine-red plain fabric swatch. Dimensions: 714×716.
- **`image35.png`** — Medium gray plain fabric swatch. Dimensions: 570×570.
- **`image36.png`** — Light beige/cream fabric swatch. Dimensions: 480×480.
- **`image37.png`** — Light gray woven fabric swatch, portrait crop. Dimensions: 360×576.
- **`image38.png`** — Dark navy fabric with a subtle diagonal weave/stripe. Dimensions: 374×560.
- **`image39.png`** — Brown/charcoal woven fabric swatch. Dimensions: 400×286.
- **`image40.png`** — Dark navy fabric with fine pinstripes. Dimensions: 400×400.
- **`image44.png`** — Pale ivory/cream fabric swatch with visible folds. Dimensions: 480×640.
- **`image45.png`** — Tan/camel plain fabric swatch. Dimensions: 480×480.
- **`image46.png`** — Light gray woven fabric swatch. Dimensions: 360×360.
- **`image47.png`** — Pale blue fabric swatch with folds. Dimensions: 480×720.
- **`image48.png`** — Olive-green fabric with folds. Dimensions: 368×491.
- **`image49.png`** — Brown fabric draped/knotted; portrait image. Dimensions: 700×1050.
- **`image50.png`** — Blue/navy plain fabric swatch. Dimensions: 400×400.
- **`image51.png`** — Black fabric gathered into folds. Dimensions: 480×320.
- **`image52.png`** — Dark olive/green fabric swatch. Dimensions: 432×432.
- **`image53.png`** — Dark navy fabric swatch. Dimensions: 343×343.
- **`image54.png`** — Dark gray fabric draped into folds. Dimensions: 401×401.
- **`image55.png`** — Beige/taupe folded fabric swatch. Dimensions: 432×611.
- **`image56.png`** — Pale beige/cream fabric with loose folds. Dimensions: 560×560.
- **`image57.png`** — Dark olive fabric draped in folds. Dimensions: 410×410.
- **`image58.png`** — Light blue plain fabric swatch. Dimensions: 400×400.
- **`image59.png`** — Dark brown satin-like fabric swatch. Dimensions: 410×308.
- **`image60.png`** — Blue fabric with fine pinstripes. Dimensions: 400×400.
- **`image61.png`** — Dark charcoal/black fabric swatch, portrait crop. Dimensions: 360×480.
- **`image62.png`** — Burgundy/wine fabric with soft folds. Dimensions: 401×401.
- **`image63.png`** — Deep navy fabric draped into folds. Dimensions: 432×432.
- **`image64.png`** — Black glossy/satin fabric in a swirl. Dimensions: 750×750.
- **`image65.png`** — Red glossy/satin fabric in a swirl. Dimensions: 360×270.
- **`image66.png`** — Deep green glossy/velvet-like fabric in folds. Dimensions: 615×410.
- **`image67.png`** — Bright royal-blue glossy fabric in folds. Dimensions: 450×450.
- **`image68.png`** — Emerald-green glossy fabric in folds. Dimensions: 768×538.
- **`image69.png`** — Dark brown glossy fabric in folds. Dimensions: 371×369.
- **`image70.png`** — Black/charcoal fabric swatch in a swirl. Dimensions: 360×360.
- **`image71.png`** — Purple glossy fabric in folds. Dimensions: 400×400.
- **`image72.png`** — Champagne/beige satin fabric in folds. Dimensions: 364×364.
- **`image73.png`** — Large repeating geometric ornamental pattern, similar to image9.png. Likely a high-resolution source for the pale patterned page background; verify which tile matches the screenshots best. Dimensions: 2993×3008.
- **`image74.png`** — Dark charcoal herringbone/twill fabric swatch. Dimensions: 794×794.
- **`image75.png`** — Dark brown/black fabric swatch. Dimensions: 480×480.
- **`image76.png`** — Olive/gold textured fabric swatch. Dimensions: 400×400.
- **`image77.png`** — Dark gray plain fabric swatch. Dimensions: 750×750.
- **`image78.png`** — Dark navy flecked/tweed-like fabric swatch. Dimensions: 502×502.
- **`image79.png`** — Gray-beige textured fabric draped in folds. Dimensions: 460×614.
- **`image80.png`** — Dark blue/purple fabric with a subtle windowpane/check pattern. Dimensions: 400×300.
- **`image81.png`** — Tan/brown herringbone fabric draped in folds. Dimensions: 874×583.
- **`image82.png`** — Muted green textured fabric swatch. Dimensions: 360×480.
- **`image83.png`** — Burgundy/red herringbone fabric swatch. Dimensions: 615×615.
- **`image84.png`** — Brown plaid/check fabric swatch. Dimensions: 400×400.
- **`image85.png`** — Dark navy plain fabric swatch. Dimensions: 615×615.
- **`image86.png`** — Charcoal-gray plain fabric swatch. Dimensions: 410×410.
- **`image87.png`** — Light gray-green fabric swatch with a diagonal fold. Dimensions: 470×470.
- **`image88.png`** — Black/dark charcoal fabric close-up, horizontal crop. Dimensions: 450×275.
- **`image89.png`** — Brown/taupe fabric draped in folds. Dimensions: 410×410.
- **`image90.png`** — Olive/khaki fabric draped in parallel folds. Dimensions: 400×400.
- **`image91.png`** — Burgundy/wine fabric draped in folds. Dimensions: 410×307.
- **`image92.png`** — Dark navy fabric with thin pinstripes. Dimensions: 410×410.
- **`image93.png`** — Pale beige fabric with folds. Dimensions: 400×600.

### Measurement tutorial frames

- **`image132.jpeg`** — Measurement tutorial video frame: tailor measuring a customer from behind/shoulder area in a fitting room. Dimensions: 1000×526.
- **`image133.jpeg`** — Measurement tutorial frame: tailor and customer facing each other in a fitting room. Dimensions: 1000×526.
- **`image134.jpeg`** — Measurement tutorial frame: close-up of customer torso/waist while being measured. Dimensions: 1000×526.
- **`image135.jpeg`** — Measurement tutorial frame: customer and tailor in the fitting room, wider view. Dimensions: 1000×526.
- **`image136.jpeg`** — Measurement tutorial frame: customer standing in dark trousers, wider body/leg view. Dimensions: 1000×526.
- **`image137.jpeg`** — Measurement tutorial frame: close-up around waist measurement. Dimensions: 1000×526.
- **`image138.jpeg`** — Measurement tutorial frame: close-up of male customer facing camera. Dimensions: 1000×526.
- **`image139.jpeg`** — Measurement tutorial frame: customer and tailor in fitting room, wider view. Dimensions: 1000×526.
- **`image140.jpeg`** — Measurement tutorial frame: side view of customer and tailor. Dimensions: 1000×526.
- **`image141.jpeg`** — Measurement tutorial frame: close-up of waist/hip measurement. Dimensions: 1000×526.
- **`image142.jpeg`** — Measurement tutorial frame: side/hip measurement close-up. Dimensions: 1000×526.

### Video files

The ZIP contains 11 MP4 files. The reference screens 30–41 show measurement tutorial panels, and the JPEGs `image132.jpeg`–`image142.jpeg` are still frames from measurement footage. The exact MP4-to-measurement-label mapping is **not confirmed** from filenames alone. Before wiring a video, preview each MP4 and record its subject/duration. Do not arbitrarily use the first video for every measurement.

- **`VAHOn-whX8Y.mp4`** — Embedded measurement tutorial video; inspect duration/content before assigning to a specific measurement step. Size: 2,556,988 bytes.
- **`VAHOn1JRpeU.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 2,192,916 bytes.
- **`VAHOn2011yM.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 2,972,926 bytes.
- **`VAHOn5vgeiY.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 1,634,108 bytes.
- **`VAHOn5XfIns.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 2,744,325 bytes.
- **`VAHOnh6O22M.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 1,785,503 bytes.
- **`VAHOnn9Sces.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 2,722,925 bytes.
- **`VAHOnpZu6vQ.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 3,014,107 bytes.
- **`VAHOnxvG-90.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 2,889,215 bytes.
- **`VAHOny7vqiY.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 1,836,007 bytes.
- **`VAHOnyibPYY.mp4`** — Embedded measurement tutorial video; likely one of the measurement instruction clips. Size: 2,315,730 bytes.

### SVG files

- **`image26.svg`** — SVG file; view source/render to identify exact icon before using. Size: 932 bytes.
- **`image30.svg`** — SVG file; view source/render to identify exact icon before using. Size: 2,526 bytes.
- **`image6.svg`** — SVG asset; inspect in browser or editor before use. Likely an interface/icon asset; exact appearance should be confirmed from the SVG source. Size: 1,161 bytes.
- **`image8.svg`** — SVG asset; inspect before use. Likely a small interface/icon asset. Size: 1,096 bytes.

## Exactness and confidence notes

1. **Confirmed at category level:** the fabric catalogue is the large group of textile close-ups (`image19.png`–`image93.png`, with gaps). The beige suit construction options are mainly `image94.png`–`image126.png`. The burgundy outfit views are `image127.png`–`image131.png`. The measurement footage frames are `image132.jpeg`–`image142.jpeg`.
2. **Do not assume filenames encode semantic order.** `imageXX` numbering is not a reliable sequence for the wizard; use this manifest and compare the actual screenshot.
3. **Potential duplicates/variants:** `image17.png`/`image18.png`; `image9.png`/`image73.png`; `image101.png`–`image103.png`; `image104.png`–`image106.png`; `image107.png`–`image109.png`; `image110.png`/`image111.png`; `image112.png`–`image117.png`; `image118.png`/`image119.png`; `image121.png`/`image122.png`; and the frames `image132.jpeg`–`image142.jpeg`. These are often alternate crops, not necessarily exact duplicates.
4. **Screen 5–12 fabric tile order:** use the screenshot’s left-to-right/top-to-bottom order. The contact sheet helps identify swatches, but visual similarity alone is not enough to guarantee exact tile-to-file correspondence at the small screenshot scale.
5. **Measurement videos:** eleven MP4s are present, but their exact mapping to shoulder, sleeve, stomach, leg, waist, hips, thighs, neck, body length, bicep, rise, and wrist needs clip-by-clip verification. The JPEGs are candidate representative frames, not a substitute for verifying the video itself.
6. `image3.png` looks like a full browser screenshot, not a clean component asset. Treat as unused unless the spec explains it.

## Suggested implementation pattern

Create a central `src/config/assets.ts` (or equivalent) rather than scattering filenames through JSX. Example:

```ts
export const suitAssets = {
  brandTexture: "/assets/image1.png",
  heroModel: "/assets/image4.png",
  styleCards: [
    "/assets/image10.png",
    "/assets/image11.png",
    "/assets/image12.png",
    "/assets/image13.png",
    "/assets/image14.png",
    "/assets/image15.png",
    "/assets/image16.png",
  ],
  processIllustration: "/assets/image17.png",
};
```

This is an example only. Check `suit-website-mvp-spec.md` and the relevant screenshot before committing to exact option ordering.

## Full inventory

| Filename | Type | Dimensions | File size | Description |
|---|---|---:|---:|---|
| `image1.png` | image | 2420×2420 | 13,584,744 B | Close-up burgundy/red woven suit fabric texture; also matches the burgundy textured background used behind the 2 STITCHES wordmark in screen_01. |
| `image10.png` | image | 410×615 | 262,763 B | Full-length male model in a dark navy/black formal suit; style-selection card. Screen_03. |
| `image100.png` | image | 614×923 | 636,903 B | Full-length model in a light beige suit, front view. |
| `image101.png` | image | 898×1122 | 1,367,344 B | Close-up crop of light beige suit jacket/torso, front view. |
| `image102.png` | image | 1010×1262 | 1,725,001 B | Close-up crop of light beige suit jacket/torso, slightly different framing from image101. |
| `image103.png` | image | 898×1122 | 1,430,616 B | Close-up crop of light beige suit jacket/torso, similar to image101/102. |
| `image104.png` | image | 512×769 | 612,750 B | Close-up of beige jacket lapel and shirt, detail crop; useful for lapel thickness choices. |
| `image105.png` | image | 512×769 | 611,786 B | Close-up of beige jacket lapel and shirt, detail crop; lapel variant. |
| `image106.png` | image | 512×769 | 621,017 B | Close-up of beige jacket lapel and shirt, detail crop; lapel variant. |
| `image107.png` | image | 717×1076 | 876,542 B | Full-length model in beige suit without jacket buttoned/with waistcoat styling; waistcoat option view. |
| `image108.png` | image | 717×1076 | 935,849 B | Full-length model in beige suit with waistcoat styling; near-duplicate/alternate crop of image107. |
| `image109.png` | image | 717×1076 | 915,285 B | Full-length model in beige suit with waistcoat styling; alternate crop of image107/108. |
| `image11.png` | image | 410×615 | 320,555 B | Male model in a brown/charcoal suit leaning beside a stool; style-selection card. Screen_03. |
| `image110.png` | image | 921×1384 | 1,518,112 B | Back view of beige suit jacket on model. |
| `image111.png` | image | 921×1384 | 1,492,620 B | Back view of beige suit jacket on model; near-duplicate/alternate framing of image110. |
| `image112.png` | image | 717×1076 | 867,342 B | Front view of model in white shirt and beige trousers, full body; pants fit/rise/waist options. |
| `image113.png` | image | 921×1384 | 1,409,973 B | Front view of model in white shirt and beige trousers, alternate crop of image112. |
| `image114.png` | image | 717×1076 | 875,495 B | Front view of model in white shirt and beige trousers, alternate crop. |
| `image115.png` | image | 717×1076 | 880,730 B | Front view of model in white shirt and beige trousers, full-body alternate. |
| `image116.png` | image | 717×1076 | 865,852 B | Front view of model in white shirt and beige trousers, full-body alternate. |
| `image117.png` | image | 921×1384 | 1,463,509 B | Front view of model in white shirt and beige trousers, alternate crop. |
| `image118.png` | image | 819×1230 | 1,275,899 B | Close-up of beige suit trousers and brown shoes, front/leg crop; cuff/hem option. |
| `image119.png` | image | 819×1230 | 1,292,103 B | Close-up of beige suit trousers and brown shoes, alternate hem/leg crop. |
| `image12.png` | image | 410×615 | 276,131 B | Full-length male model in a dark formal suit; style-selection card. |
| `image120.png` | image | 674×842 | 789,922 B | Model opening beige jacket to show inner lining; monogram/customization visual. Screen_24. |
| `image121.png` | image | 185×254 | 67,988 B | Small close-up of beige lapel/upper jacket; likely lapel design option thumbnail. |
| `image122.png` | image | 186×255 | 70,539 B | Small close-up of beige lapel/upper jacket; alternate lapel option thumbnail. |
| `image123.png` | image | 202×264 | 78,413 B | Small cropped view of beige jacket body/hem; likely jacket detail thumbnail. |
| `image124.png` | image | 200×263 | 70,423 B | Small crop of beige trousers/upper legs; likely pants fit/rise option thumbnail. |
| `image125.png` | image | 201×264 | 79,667 B | Small crop of beige trousers/upper legs; alternate pants option thumbnail. |
| `image126.png` | image | 200×261 | 67,211 B | Small crop of beige trousers and shoes; likely cuff/hem option thumbnail. |
| `image127.png` | image | 512×769 | 448,329 B | Male model wearing a burgundy blazer with dark trousers, front view; alternative outfit summary/style view. |
| `image128.png` | image | 512×769 | 445,258 B | Male model wearing a burgundy blazer with dark trousers, front view, alternate crop. |
| `image129.png` | image | 512×769 | 422,883 B | Back view of burgundy blazer and dark trousers. |
| `image13.png` | image | 410×615 | 278,208 B | Male model in a light/cream suit, relaxed pose; style-selection card. |
| `image130.png` | image | 512×769 | 420,180 B | Side/profile view of burgundy blazer and dark trousers. |
| `image131.png` | image | 543×724 | 474,758 B | Close-up portrait/upper body of model in burgundy blazer; likely outfit summary detail. |
| `image132.jpeg` | image | 1000×526 | 21,608 B | Measurement tutorial video frame: tailor measuring a customer from behind/shoulder area in a fitting room. |
| `image133.jpeg` | image | 1000×526 | 28,545 B | Measurement tutorial frame: tailor and customer facing each other in a fitting room. |
| `image134.jpeg` | image | 1000×526 | 23,139 B | Measurement tutorial frame: close-up of customer torso/waist while being measured. |
| `image135.jpeg` | image | 1000×526 | 28,934 B | Measurement tutorial frame: customer and tailor in the fitting room, wider view. |
| `image136.jpeg` | image | 1000×526 | 26,876 B | Measurement tutorial frame: customer standing in dark trousers, wider body/leg view. |
| `image137.jpeg` | image | 1000×526 | 23,414 B | Measurement tutorial frame: close-up around waist measurement. |
| `image138.jpeg` | image | 1000×526 | 19,569 B | Measurement tutorial frame: close-up of male customer facing camera. |
| `image139.jpeg` | image | 1000×526 | 25,680 B | Measurement tutorial frame: customer and tailor in fitting room, wider view. |
| `image14.png` | image | 410×615 | 256,052 B | Male model in a black tuxedo/formal suit; style-selection card. |
| `image140.jpeg` | image | 1000×526 | 28,401 B | Measurement tutorial frame: side view of customer and tailor. |
| `image141.jpeg` | image | 1000×526 | 27,217 B | Measurement tutorial frame: close-up of waist/hip measurement. |
| `image142.jpeg` | image | 1000×526 | 23,695 B | Measurement tutorial frame: side/hip measurement close-up. |
| `image15.png` | image | 410×615 | 303,356 B | Male model in a medium-brown suit; style-selection card. |
| `image16.png` | image | 410×615 | 283,632 B | Male model in a light beige suit; style-selection card. |
| `image17.png` | image | 768×512 | 126,244 B | Line-art set showing fabric/weave, jacket, measuring tape and thread/spool; process/how-it-works illustration. Screen_04. |
| `image18.png` | image | 768×512 | 129,088 B | Near-duplicate of image17.png, same line-art process illustration. Compare before deciding which is the correct intended variant. |
| `image19.png` | image | 800×800 | 998,856 B | Close-up charcoal/black textured fabric swatch. |
| `image2.png` | image | 639×360 | 90,191 B | 2 STITCHES brand logo on a pale background. Use only if the design calls for this brand reference; the project steering rules require replacing the reference brand with BRANDNAME, so do not reproduce this logo in the implementation. |
| `image20.png` | image | 403×537 | 367,168 B | Close-up light blue woven fabric swatch. |
| `image21.png` | image | 432×611 | 474,243 B | Olive/green folded fabric swatch. |
| `image22.png` | image | 450×450 | 362,916 B | Burgundy/red smooth fabric swatch. |
| `image23.png` | image | 601×601 | 978,320 B | Brown/tan herringbone fabric swatch. |
| `image24.png` | image | 637×481 | 409,816 B | Light gray/silver draped fabric swatch. |
| `image25.png` | image | 98×98 | 2,814 B | Information “i” icon in a pale circular background. |
| `image26.svg` | vector | — | 932 B | SVG file; view source/render to identify exact icon before using. |
| `image27.png` | image | 601×601 | 226,738 B | Near-black fabric texture swatch. |
| `image28.png` | image | 410×615 | 464,978 B | Close-up beige suit lapel/chest with pocket square; likely style/lapel detail imagery. |
| `image29.png` | image | 607×872 | 44,562 B | Large cursor/pointer graphic. Likely instructional/UI illustration rather than a production website asset. |
| `image3.png` | image | 1920×1080 | 44,923 B | A full-screen browser/UI screenshot with a dark page; not a clean suit/product asset. Likely unrelated or a captured state. Do not use as a website image without checking its context. |
| `image30.svg` | vector | — | 2,526 B | SVG file; view source/render to identify exact icon before using. |
| `image31.png` | image | 360×576 | 226,520 B | Dark navy/black fabric swatch, portrait crop. |
| `image32.png` | image | 567×567 | 677,026 B | Deep forest-green plain fabric swatch. |
| `image33.png` | image | 380×400 | 201,565 B | Dark charcoal/brown fabric swatch. |
| `image34.png` | image | 714×716 | 805,951 B | Burgundy/wine-red plain fabric swatch. |
| `image35.png` | image | 570×570 | 660,600 B | Medium gray plain fabric swatch. |
| `image36.png` | image | 480×480 | 484,167 B | Light beige/cream fabric swatch. |
| `image37.png` | image | 360×576 | 308,339 B | Light gray woven fabric swatch, portrait crop. |
| `image38.png` | image | 374×560 | 424,702 B | Dark navy fabric with a subtle diagonal weave/stripe. |
| `image39.png` | image | 400×286 | 173,823 B | Brown/charcoal woven fabric swatch. |
| `image4.png` | image | 2250×1171 | 2,896,152 B | Wide editorial hero photograph of a male model in a dark green/charcoal suit against a warm textured studio backdrop. Strong match for screen_02 landing-page hero. |
| `image40.png` | image | 400×400 | 270,764 B | Dark navy fabric with fine pinstripes. |
| `image41.png` | image | 1024×572 | 166,846 B | Full-length male model in a navy suit against a light neutral background; likely a style/product card variant. |
| `image42.png` | image | 820×624 | 219,336 B | Full-length male model in a gray/brown suit against a light neutral background; likely a style/product card variant. |
| `image43.png` | image | 512×388 | 160,547 B | Gray suit jacket on a mannequin against a neutral background; product/style card variant. |
| `image44.png` | image | 480×640 | 367,575 B | Pale ivory/cream fabric swatch with visible folds. |
| `image45.png` | image | 480×480 | 300,858 B | Tan/camel plain fabric swatch. |
| `image46.png` | image | 360×360 | 243,120 B | Light gray woven fabric swatch. |
| `image47.png` | image | 480×720 | 666,763 B | Pale blue fabric swatch with folds. |
| `image48.png` | image | 368×491 | 383,148 B | Olive-green fabric with folds. |
| `image49.png` | image | 700×1050 | 1,957,086 B | Brown fabric draped/knotted; portrait image. |
| `image5.png` | image | 500×500 | 15,677 B | Generic circular user/avatar placeholder icon. |
| `image50.png` | image | 400×400 | 231,000 B | Blue/navy plain fabric swatch. |
| `image51.png` | image | 480×320 | 147,504 B | Black fabric gathered into folds. |
| `image52.png` | image | 432×432 | 300,320 B | Dark olive/green fabric swatch. |
| `image53.png` | image | 343×343 | 186,296 B | Dark navy fabric swatch. |
| `image54.png` | image | 401×401 | 174,734 B | Dark gray fabric draped into folds. |
| `image55.png` | image | 432×611 | 491,427 B | Beige/taupe folded fabric swatch. |
| `image56.png` | image | 560×560 | 388,743 B | Pale beige/cream fabric with loose folds. |
| `image57.png` | image | 410×410 | 236,420 B | Dark olive fabric draped in folds. |
| `image58.png` | image | 400×400 | 357,349 B | Light blue plain fabric swatch. |
| `image59.png` | image | 410×308 | 160,766 B | Dark brown satin-like fabric swatch. |
| `image6.svg` | vector | — | 1,161 B | SVG asset; inspect in browser or editor before use. Likely an interface/icon asset; exact appearance should be confirmed from the SVG source. |
| `image60.png` | image | 400×400 | 240,628 B | Blue fabric with fine pinstripes. |
| `image61.png` | image | 360×480 | 192,202 B | Dark charcoal/black fabric swatch, portrait crop. |
| `image62.png` | image | 401×401 | 202,478 B | Burgundy/wine fabric with soft folds. |
| `image63.png` | image | 432×432 | 180,067 B | Deep navy fabric draped into folds. |
| `image64.png` | image | 750×750 | 523,225 B | Black glossy/satin fabric in a swirl. |
| `image65.png` | image | 360×270 | 158,097 B | Red glossy/satin fabric in a swirl. |
| `image66.png` | image | 615×410 | 453,675 B | Deep green glossy/velvet-like fabric in folds. |
| `image67.png` | image | 450×450 | 342,526 B | Bright royal-blue glossy fabric in folds. |
| `image68.png` | image | 768×538 | 499,225 B | Emerald-green glossy fabric in folds. |
| `image69.png` | image | 371×369 | 117,832 B | Dark brown glossy fabric in folds. |
| `image7.png` | image | 116×116 | 3,109 B | Shopping cart icon inside a pale circular background. |
| `image70.png` | image | 360×360 | 163,307 B | Black/charcoal fabric swatch in a swirl. |
| `image71.png` | image | 400×400 | 298,667 B | Purple glossy fabric in folds. |
| `image72.png` | image | 364×364 | 204,129 B | Champagne/beige satin fabric in folds. |
| `image73.png` | image | 2993×3008 | 5,973,119 B | Large repeating geometric ornamental pattern, similar to image9.png. Likely a high-resolution source for the pale patterned page background; verify which tile matches the screenshots best. |
| `image74.png` | image | 794×794 | 711,293 B | Dark charcoal herringbone/twill fabric swatch. |
| `image75.png` | image | 480×480 | 531,876 B | Dark brown/black fabric swatch. |
| `image76.png` | image | 400×400 | 388,376 B | Olive/gold textured fabric swatch. |
| `image77.png` | image | 750×750 | 895,742 B | Dark gray plain fabric swatch. |
| `image78.png` | image | 502×502 | 499,709 B | Dark navy flecked/tweed-like fabric swatch. |
| `image79.png` | image | 460×614 | 379,465 B | Gray-beige textured fabric draped in folds. |
| `image8.svg` | vector | — | 1,096 B | SVG asset; inspect before use. Likely a small interface/icon asset. |
| `image80.png` | image | 400×300 | 141,378 B | Dark blue/purple fabric with a subtle windowpane/check pattern. |
| `image81.png` | image | 874×583 | 1,145,311 B | Tan/brown herringbone fabric draped in folds. |
| `image82.png` | image | 360×480 | 416,402 B | Muted green textured fabric swatch. |
| `image83.png` | image | 615×615 | 928,912 B | Burgundy/red herringbone fabric swatch. |
| `image84.png` | image | 400×400 | 447,225 B | Brown plaid/check fabric swatch. |
| `image85.png` | image | 615×615 | 479,945 B | Dark navy plain fabric swatch. |
| `image86.png` | image | 410×410 | 335,597 B | Charcoal-gray plain fabric swatch. |
| `image87.png` | image | 470×470 | 373,655 B | Light gray-green fabric swatch with a diagonal fold. |
| `image88.png` | image | 450×275 | 120,489 B | Black/dark charcoal fabric close-up, horizontal crop. |
| `image89.png` | image | 410×410 | 400,192 B | Brown/taupe fabric draped in folds. |
| `image9.png` | image | 2993×3008 | 6,167,883 B | Large repeating geometric ornamental pattern in muted gray/burgundy. Candidate for the pale patterned page background visible throughout screens 2–41. |
| `image90.png` | image | 400×400 | 399,233 B | Olive/khaki fabric draped in parallel folds. |
| `image91.png` | image | 410×307 | 130,917 B | Burgundy/wine fabric draped in folds. |
| `image92.png` | image | 410×410 | 293,427 B | Dark navy fabric with thin pinstripes. |
| `image93.png` | image | 400×600 | 314,700 B | Pale beige fabric with folds. |
| `image94.png` | image | 512×768 | 531,920 B | Beige suit jacket with tie, front view; jacket-style option. |
| `image95.png` | image | 512×768 | 513,305 B | Beige double-breasted suit jacket with tie, front view; jacket-style option. |
| `image96.png` | image | 512×768 | 539,800 B | Beige double-breasted jacket with prominent buttons, front view; jacket-style option. |
| `image97.png` | image | 561×701 | 523,066 B | Beige jacket with patch/flap pockets and tie, front view; jacket-style option. |
| `image98.png` | image | 561×701 | 499,338 B | Light beige suit jacket close-up, front view; jacket-style option. |
| `image99.png` | image | 614×923 | 644,256 B | Full-length model wearing a light beige suit; fit/style reference. |
| `VAHOn-whX8Y.mp4` | video | — | 2,556,988 B | Embedded measurement tutorial video; inspect duration/content before assigning to a specific measurement step. |
| `VAHOn1JRpeU.mp4` | video | — | 2,192,916 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOn2011yM.mp4` | video | — | 2,972,926 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOn5vgeiY.mp4` | video | — | 1,634,108 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOn5XfIns.mp4` | video | — | 2,744,325 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOnh6O22M.mp4` | video | — | 1,785,503 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOnn9Sces.mp4` | video | — | 2,722,925 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOnpZu6vQ.mp4` | video | — | 3,014,107 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOnxvG-90.mp4` | video | — | 2,889,215 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOny7vqiY.mp4` | video | — | 1,836,007 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |
| `VAHOnyibPYY.mp4` | video | — | 2,315,730 B | Embedded measurement tutorial video; likely one of the measurement instruction clips. |

## Reference screen journey (observed)

- `screen_01`: logo/splash.
- `screen_02`: landing/hero.
- `screen_03`: style selection.
- `screen_04`: process explainer.
- `screen_05`–`screen_12`: fabric/material selection grids.
- `screen_13`–`screen_18`: jacket, fit, lapel, waistcoat, and back options.
- `screen_19`: pants fabric yes/no.
- `screen_20`–`screen_23`: pants fit/rise/waist construction/cuffs.
- `screen_24`: monogram.
- `screen_25`: tailor notes.
- `screen_26`–`screen_28`: summary/outfit review variants.
- `screen_29`–`screen_41`: measurement profile and tutorial steps.
