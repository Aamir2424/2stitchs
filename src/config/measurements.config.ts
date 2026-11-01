// Measurement flow (spec section 5; reference screens 29-41). One source for the fields, their
// units and input rules, the screen order, the copy and the media. MeasurementStep renders only
// what is defined here.
// Copy: word for word from the screenshots (checked against the deck text on slides 29-41).
// Media: asset-manifest.md, "Screens 30-41: guided measurements". Every key is checked against
// src/config/assets.ts at compile time.

import type { AssetKey } from "@/src/config/assets";

/** Input rules for one value. */
type FieldRule = {
  /** Unit label inside the pill ("inchs" in the design is a typo for "inches"). */
  unit: string;
  /** Digits allowed before the decimal point. */
  maxIntegerDigits: number;
  /** Digits allowed after it; 0 for whole numbers. */
  maxDecimals: number;
};

// Upper and lower limits per measurement are not in the design or spec, so none are set:
// any positive number in this format is accepted (to be confirmed with the tailor).
const inches: FieldRule = { unit: "inches", maxIntegerDigits: 3, maxDecimals: 2 };

/** The 15 values (spec section 5), in the order they are asked for. */
export const measurementFields = {
  height: { label: "HEIGHT", ...inches },
  weight: { label: "WEIGHT", unit: "kg", maxIntegerDigits: 3, maxDecimals: 2 },
  age: { label: "AGE", unit: "years", maxIntegerDigits: 3, maxDecimals: 0 },
  shoulderWidth: { label: "SHOULDER WIDTH", ...inches },
  sleeveLength: { label: "SLEEVES LENGTH", ...inches },
  stomach: { label: "STOMACH", ...inches },
  legLength: { label: "LEG LENGTH", ...inches },
  pantsWaist: { label: "PANTS WAIST", ...inches },
  hips: { label: "HIPS", ...inches },
  thigh: { label: "THIGH", ...inches },
  neck: { label: "NECK", ...inches },
  bodyLength: { label: "BODY LENGTH", ...inches },
  bicep: { label: "BICEP", ...inches },
  rise: { label: "RISE", ...inches },
  wrist: { label: "WRIST", ...inches },
} as const satisfies Record<string, FieldRule & { label: string }>;

export type MeasurementFieldId = keyof typeof measurementFields;

/** Saved values, by field. */
export type MeasurementValues = Partial<Record<MeasurementFieldId, number>>;

/**
 * True while the text could still become a valid value: digits, then optionally one decimal
 * point and up to maxDecimals digits. Used to refuse keystrokes that would make it invalid.
 */
export function isAllowedMeasurementInput(field: MeasurementFieldId, text: string): boolean {
  const { maxIntegerDigits, maxDecimals } = measurementFields[field];
  const decimals = maxDecimals > 0 ? `(\\.\\d{0,${maxDecimals}})?` : "";
  return new RegExp(`^(\\d{1,${maxIntegerDigits}}${decimals})?$`).test(text);
}

/** The value to save, or null if the text isn't a positive number in the allowed format. */
export function parseMeasurement(field: MeasurementFieldId, text: string): number | null {
  const trimmed = text.trim();
  if (trimmed === "" || !isAllowedMeasurementInput(field, trimmed)) return null;
  const value = Number(trimmed);
  return Number.isFinite(value) && value > 0 ? value : null;
}

/** Screen 29: height, weight and age, with "Your digital profile" text. */
type ProfileStepConfig = {
  step: string;
  kind: "profile";
  fields: readonly MeasurementFieldId[];
  heading: string;
  paragraphs: readonly string[];
  reference: string;
};

/** Media beside a guided measurement: the real video and its poster still, or a marked gap. */
type MeasurementMedia =
  | { kind: "video"; video: AssetKey; poster: AssetKey; source: string }
  | { kind: "illustrationPending"; label: string };

/** Screens 30-41: one measurement, its instructions and its media. */
type GuidedStepConfig = {
  step: string;
  kind: "guided";
  field: MeasurementFieldId;
  paragraphs: readonly string[];
  media: MeasurementMedia;
  reference: string;
};

export type MeasurementStepConfig = ProfileStepConfig | GuidedStepConfig;

/** Shared title on screens 29-41. */
export const measurementTitle = "MEASUREMENT";

/** Screen order: the profile, then the 12 measurements in the design's order. */
export const measurementSteps = [
  {
    step: "measurementProfile",
    kind: "profile",
    fields: ["height", "weight", "age"],
    heading: "YOUR DIGITAL PROFILE",
    paragraphs: [
      "ASK YOUR MOTHER HOW TALL YOU ARE. SHE'S BEEN KEEPING TRACK LONGER THAN YOU HAVE.",
      "STEP ONTO THE BATHROOM SCALE—OR, IF IT STARTS NEGOTIATING WITH YOU, TRY THE NEAREST WAREHOUSE SCALE.",
      "NOT SURE HOW OLD YOU ARE? YOUR MOTHER PROBABLY REMEMBERS THE DAY BETTER THAN YOU DO.",
    ],
    reference: "reference/screen_29.png",
  },
  {
    step: "measureShoulderWidth",
    kind: "guided",
    field: "shoulderWidth",
    paragraphs: [
      "PLACE THE MEASURING TAPE ON ONE SHOULDER WHERE IT MEETS YOUR ARM—THIS IS USUALLY THE PROMINENT BONE AT THE TOP OF YOUR ARM.",
      "MEASURE ACROSS THE NATURAL CURVE OF YOUR SHOULDERS TO THE SAME POINT ON THE OTHER SIDE, ENSURING THE TAPE LIGHTLY TOUCHES THE BASE OF YOUR NECK.",
    ],
    media: { kind: "video", video: "measurement.shoulderWidth.video", poster: "measurement.shoulderWidth.poster",
      source: "VAHOnh6O22M.mp4 / image132.jpeg" },
    reference: "reference/screen_30.png",
  },
  {
    step: "measureSleeveLength",
    kind: "guided",
    field: "sleeveLength",
    paragraphs: [
      "STAND IN A RELAXED POSITION, WITH YOUR ARMS RESTING NATURALLY AT YOUR SIDES.",
      "PLACE ONE END OF THE MEASURING TAPE WHERE YOUR SHOULDER MEETS YOUR ARM—THIS IS USUALLY THE PROMINENT BONE AT THE TOP OF YOUR ARM.",
      "EXTEND THE TAPE ALONG THE OUTSIDE OF YOUR ARM, FOLLOWING THE NATURAL CURVE OF YOUR ELBOW, AND STOP AT THE WRIST JOINT, WHERE THE BASE OF YOUR THUMB BEGINS.",
    ],
    media: { kind: "video", video: "measurement.sleeveLength.video", poster: "measurement.sleeveLength.poster",
      source: "VAHOnpZu6vQ.mp4 / image133.jpeg" },
    reference: "reference/screen_31.png",
  },
  {
    step: "measureStomach",
    kind: "guided",
    field: "stomach",
    paragraphs: [
      "WRAP THE MEASURING TAPE AROUND THE WIDEST PART OF YOUR ABDOMEN, WHICH IS TYPICALLY AT OR NEAR NAVEL LEVEL.",
      // No full stop at the end in the design.
      "MAKE SURE THE TAPE STAYS LEVEL AND AT THE SAME HEIGHT ALL AROUND YOUR BODY. BREATHE NORMALLY AND AVOID PULLING IN YOUR STOMACH",
    ],
    media: { kind: "video", video: "measurement.stomach.video", poster: "measurement.stomach.poster",
      source: "VAHOnn9Sces.mp4 / image134.jpeg" },
    reference: "reference/screen_32.png",
  },
  {
    step: "measureLegLength",
    kind: "guided",
    field: "legLength",
    paragraphs: [
      "MEASURE VERTICALLY FROM THE OUTER WAIST POINT WHERE YOU WANT YOUR PANTS TO SIT, DOWN THE SIDE OF YOUR LEG ALL THE WAY TO THE FLOOR.",
      "WE WILL ADJUST THE LENGTH OF YOUR GARMENT BASED ON THE STYLE SELECTED FOR EACH, WHETHER FULL-LENGTH, ANKLE-LENGTH, OR SHORTS.",
    ],
    media: { kind: "video", video: "measurement.legLength.video", poster: "measurement.legLength.poster",
      source: "VAHOn2011yM.mp4 / image135.jpeg" },
    reference: "reference/screen_33.png",
  },
  {
    step: "measurePantsWaist",
    kind: "guided",
    field: "pantsWaist",
    paragraphs: [
      "MEASURE AROUND YOUR BODY AT THE HEIGHT WHERE YOU PREFER YOUR PANTS TO SIT. DO NOT MEASURE OVER ANY CLOTHING. PLACE THE TAPE SNUGLY AGAINST YOUR BODY, ENSURING A COMFORTABLE BUT PRECISE FIT.",
      "ENSURE THE TAPE STAYS LEVEL AND AT THE SAME HEIGHT ALL AROUND YOUR BODY, WITHOUT PULLING TOO TIGHT.",
    ],
    media: { kind: "video", video: "measurement.pantsWaist.video", poster: "measurement.pantsWaist.poster",
      source: "VAHOnyibPYY.mp4 / image136.jpeg" },
    reference: "reference/screen_34.png",
  },
  {
    step: "measureHips",
    kind: "guided",
    field: "hips",
    paragraphs: [
      "STAND WITH YOUR LEGS SLIGHTLY APART AND WRAP THE MEASURING TAPE AROUND THE WIDEST PART OF YOUR HIPS, WHERE YOUR BUTTOCKS ARE MOST PROMINENT.",
      "ENSURE THE TAPE STAYS LEVEL AND AT THE SAME HEIGHT ALL AROUND YOUR BODY, WITHOUT PULLING TOO TIGHT.",
    ],
    media: { kind: "video", video: "measurement.hips.video", poster: "measurement.hips.poster",
      source: "VAHOnxvG-90.mp4 / image137.jpeg" },
    reference: "reference/screen_35.png",
  },
  {
    step: "measureThigh",
    kind: "guided",
    field: "thigh",
    paragraphs: [
      "WRAP THE MEASURING TAPE AROUND THE WIDEST PART OF YOUR THIGH, ENSURING IT STAYS LEVEL AND RESTS GENTLY AGAINST YOUR LEG WITHOUT SQUEEZING.",
    ],
    // No thigh video exists. The deck reuses the hips clip, which shows the tape around the hips,
    // so it is never shown here (asset-manifest.md, "Thigh"). A thigh illustration is pending.
    media: { kind: "illustrationPending", label: "ILLUSTRATION PENDING" },
    reference: "reference/screen_36.png",
  },
  {
    step: "measureNeck",
    kind: "guided",
    field: "neck",
    paragraphs: [
      "WRAP THE MEASURING TAPE AROUND THE BASE OF YOUR NECK, WHERE A SHIRT COLLAR WOULD SIT.",
      "KEEP THE TAPE SNUG BUT NOT TIGHT—YOU SHOULD BE ABLE TO SLIDE ONE FINGER UNDERNEATH FOR COMFORT.",
    ],
    media: { kind: "video", video: "measurement.neck.video", poster: "measurement.neck.poster",
      source: "VAHOn-whX8Y.mp4 / image138.jpeg" },
    reference: "reference/screen_37.png",
  },
  {
    step: "measureBodyLength",
    kind: "guided",
    field: "bodyLength",
    paragraphs: [
      "STAND UP STRAIGHT AND PLACE THE MEASURING TAPE AT THE BASE OF YOUR NECK, WHERE YOUR SHOULDER MEETS YOUR NECK, JUST BELOW YOUR EAR.",
      "EXTEND THE TAPE VERTICALLY DOWN THE FRONT OF YOUR BODY, PASSING OVER THE ABDOMEN, UNTIL REACHING THE MIDPOINT OF YOUR THUMB. LET THE TAPE FOLLOW THE NATURAL LINE OF YOUR TORSO.",
    ],
    media: { kind: "video", video: "measurement.bodyLength.video", poster: "measurement.bodyLength.poster",
      source: "VAHOny7vqiY.mp4 / image139.jpeg" },
    reference: "reference/screen_38.png",
  },
  {
    step: "measureBicep",
    kind: "guided",
    field: "bicep",
    paragraphs: [
      "LET YOUR ARM HANG NATURALLY BY YOUR SIDE AND KEEP IT RELAXED. MEASURE AROUND THE FULLEST PART OF YOUR BICEP, MAKING SURE THE TAPE STAYS COMFORTABLY SNUG.",
    ],
    media: { kind: "video", video: "measurement.bicep.video", poster: "measurement.bicep.poster",
      source: "VAHOn1JRpeU.mp4 / image140.jpeg" },
    reference: "reference/screen_39.png",
  },
  {
    step: "measureRise",
    kind: "guided",
    field: "rise",
    paragraphs: [
      "PLACE THE MEASURING TAPE AT THE BACK OF YOUR WAIST, RIGHT WHERE THE WAISTBAND WOULD SIT.",
      "BRING THE MEASURING TAPE THROUGH THE LEGS, FOLLOWING THE NATURAL CONTOUR, UNTIL IT REACHES THE FRONT OF YOUR WAIST (WHERE A BELT BUCKLE WOULD TYPICALLY SIT).",
      "ADJUST THE TAPE TO YOUR PREFERRED COMFORT LEVEL, MAKING SURE IT'S NOT TOO TIGHT.",
    ],
    media: { kind: "video", video: "measurement.rise.video", poster: "measurement.rise.poster",
      source: "VAHOn5XfIns.mp4 / image141.jpeg" },
    reference: "reference/screen_40.png",
  },
  {
    step: "measureWrist",
    kind: "guided",
    field: "wrist",
    paragraphs: ["MEASURE AROUND YOUR WRIST AT ITS NARROWEST POINT, JUST ABOVE THE WRIST BONE."],
    media: { kind: "video", video: "measurement.wrist.video", poster: "measurement.wrist.poster",
      source: "VAHOn5vgeiY.mp4 / image142.jpeg" },
    reference: "reference/screen_41.png",
  },
] as const satisfies readonly MeasurementStepConfig[];

export type MeasurementStepId = (typeof measurementSteps)[number]["step"];

export function isMeasurementStep(step: string): step is MeasurementStepId {
  return measurementSteps.some((s) => s.step === step);
}

export function findMeasurementStep(step: string): MeasurementStepConfig | undefined {
  return (measurementSteps as readonly MeasurementStepConfig[]).find((s) => s.step === step);
}

/** The fields one measurement screen asks for. */
export function fieldsOf(config: MeasurementStepConfig): readonly MeasurementFieldId[] {
  return config.kind === "profile" ? config.fields : [config.field];
}

/** Deck slides 29-41, CSS px at 1440px. Tops are from the top of the content area. */
export const measurementLayout = {
  /** "MEASUREMENT" title box (all screens). */
  titleTop: 27.7,
  profile: {
    columnLeft: 127.5,
    inputWidth: 431.5,
    inputHeight: 41.4,
    /** Width of the unit segment right of the 2px divider. */
    unitWidth: 68,
    dividerWidth: 2,
    /**
     * First label box. The deck's label-top-to-input gaps vary (20.8, 18.9, 18.7) and so do its
     * input-to-label gaps (18.1, 18.0); the averages keep every box within 1.4px of the deck.
     * labelGap is measured from the bottom of the 13.2px CSS label line.
     */
    labelsTop: 192.1,
    labelGap: 6.27,
    /** Input bottom to the next label. */
    fieldGap: 18.05,
    /** Last input bottom to SAVE. */
    saveTop: 36.7,
    saveWidth: 77.5,
    saveHeight: 26.3,
    textLeft: 783,
    textWidth: 657,
    headingTop: 205.5,
    /** Body inset inside the text column (820.1 - 783). */
    bodyInset: 37.1,
    /** Heading box bottom to the body (14.5 in the deck, 13.4 for the 33.8px CSS line). */
    bodyTop: 13.4,
  },
  guided: {
    mediaLeft: 81,
    mediaTop: 128.8,
    mediaWidth: 702,
    mediaHeight: 372.4,
    textWidth: 657,
    bodyInset: 37.1,
    /** The heading + instructions block is centred on this line (deck 535.25). */
    textCenterY: 307.45,
    bodyTop: 13.4,
    /** Media bottom to the input. */
    inputTop: 29.9,
    inputWidth: 218.2,
    inputHeight: 32,
    /** Unit segment right of the 1.5px divider. */
    unitWidth: 34.3,
    dividerWidth: 1.5,
    /** Input right edge to SAVE, which is centred on the input's height. */
    saveGap: 13.7,
    saveWidth: 60,
    saveHeight: 20.3,
  },
  /** Height of the title's line box (text-heading: 20.82 x 2.28). */
  titleBoxHeight: 47.47,
  /** Space between instruction paragraphs: one empty line of text-body (deck 18.76). */
  paragraphGap: 18.76,
} as const;
