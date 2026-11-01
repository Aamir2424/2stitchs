"use client";

import { useId, useState, type CSSProperties, type FormEvent } from "react";
import { getAsset } from "@/src/config/assets";
import {
  fieldsOf,
  isAllowedMeasurementInput,
  measurementFields,
  measurementLayout,
  measurementTitle,
  parseMeasurement,
  type MeasurementFieldId,
  type MeasurementStepConfig,
  type MeasurementValues,
} from "@/src/config/measurements.config";
import { pillStates, StepNav, StepTitle, trackLabel, trackWide } from "./StepChrome";

type Props = {
  config: MeasurementStepConfig;
  /** Values saved so far (WizardContext). */
  saved: MeasurementValues;
  onSave: (values: Partial<Record<MeasurementFieldId, string>>) => void;
  onNext: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  /** Move keyboard focus to the title when the step appears (not on first page load). */
  focusTitle?: boolean;
};

const L = measurementLayout;
/** Bottom of the MEASUREMENT title box, from the top of the content area. */
const titleBottom = L.titleTop + L.titleBoxHeight;

/**
 * One measurement screen from measurements.config.ts: the profile (screen 29) or a guided
 * measurement with its video (screens 30-41). Typed values are saved to WizardContext with
 * SAVE; NEXT waits until every value on the screen is saved and unchanged.
 */
export default function MeasurementStep({ config, saved, onSave, onNext, onBack, canGoNext, canGoBack, focusTitle }: Props) {
  const titleId = useId();
  const statusId = useId();
  const fields = fieldsOf(config);
  const [drafts, setDrafts] = useState<Partial<Record<MeasurementFieldId, string>>>(() =>
    Object.fromEntries(fields.map((f) => [f, saved[f]?.toString() ?? ""])),
  );
  const [justSaved, setJustSaved] = useState(false);

  const parsed = fields.map((f) => parseMeasurement(f, drafts[f] ?? ""));
  const allValid = parsed.every((v) => v !== null);
  const unsaved = fields.some((f, i) => parsed[i] !== (saved[f] ?? null));

  function change(field: MeasurementFieldId, raw: string) {
    const text = raw.replace(",", ".");
    // Keystrokes that would make the value invalid are refused.
    if (!isAllowedMeasurementInput(field, text)) return;
    setDrafts((d) => ({ ...d, [field]: text }));
    setJustSaved(false);
  }

  function save(e: FormEvent) {
    e.preventDefault();
    if (!allValid || !unsaved) return;
    onSave(drafts);
    // Show the saved form of each value (e.g. "32." becomes "32").
    setDrafts(Object.fromEntries(fields.map((f, i) => [f, String(parsed[i])])));
    setJustSaved(true);
  }

  const inputs = (size: "profile" | "guided") =>
    fields.map((field, i) => (
      <MeasurementInput
        key={field}
        field={field}
        size={size}
        value={drafts[field] ?? ""}
        invalid={(drafts[field] ?? "") !== "" && parsed[i] === null}
        labelledBy={size === "guided" ? `${titleId}-name` : undefined}
        describedBy={statusId}
        onChange={(text) => change(field, text)}
      />
    ));
  const saveDisabled = !allValid || !unsaved;
  const status = (
    <p id={statusId} aria-live="polite" className="sr-only">
      {justSaved ? "SAVED" : unsaved && allValid ? "NOT SAVED YET" : ""}
    </p>
  );

  return (
    <section className="flex flex-col items-center pb-10" style={{ paddingTop: L.titleTop }}>
      <StepTitle id={titleId} autoFocus={focusTitle}>
        {measurementTitle}
      </StepTitle>

      {config.kind === "profile" ? (
        <div className="flex w-full max-w-[1440px] flex-wrap justify-center min-[1440px]:justify-start">
          <form
            onSubmit={save}
            className="flex flex-col items-center"
            style={{ marginLeft: L.profile.columnLeft, marginTop: L.profile.labelsTop - titleBottom, width: L.profile.inputWidth, maxWidth: "100%" }}
          >
            <div className="flex w-full flex-col" style={{ gap: L.profile.fieldGap }}>
              {inputs("profile")}
            </div>
            <SaveButton size="profile" disabled={saveDisabled} style={{ marginTop: L.profile.saveTop }} />
            {status}
          </form>
          <div
            style={{
              marginLeft: L.profile.textLeft - L.profile.columnLeft - L.profile.inputWidth,
              marginTop: L.profile.headingTop - titleBottom,
              width: L.profile.textWidth,
              maxWidth: "100%",
            }}
          >
            <Copy heading={config.heading} paragraphs={config.paragraphs} layout={L.profile} />
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-[1440px] flex-wrap justify-center min-[1440px]:justify-start">
          <form
            onSubmit={save}
            className="flex flex-col items-center"
            style={{ marginLeft: L.guided.mediaLeft, marginTop: L.guided.mediaTop - titleBottom, width: L.guided.mediaWidth, maxWidth: "100%" }}
          >
            <Media config={config} />
            <div className="relative" style={{ marginTop: L.guided.inputTop }}>
              {inputs("guided")}
              <SaveButton
                size="guided"
                disabled={saveDisabled}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `calc(100% + ${L.guided.saveGap}px)` }}
              />
            </div>
            {status}
          </form>
          <div
            className="flex flex-col justify-center"
            style={{
              // The text block is centred on the deck's line, not on the video.
              marginTop: L.guided.textCenterY - L.guided.mediaHeight / 2 - titleBottom,
              height: L.guided.mediaHeight,
              width: L.guided.textWidth,
              maxWidth: "100%",
            }}
          >
            <Copy
              heading={measurementFields[config.field].label}
              headingId={`${titleId}-name`}
              paragraphs={config.paragraphs}
              layout={L.guided}
            />
          </div>
        </div>
      )}

      <StepNav onBack={onBack} onNext={onNext} canGoBack={canGoBack} canGoNext={canGoNext && !unsaved} />
    </section>
  );
}

type CopyProps = {
  heading: string;
  headingId?: string;
  paragraphs: readonly string[];
  /** The layout's body inset and heading-to-body space. */
  layout: { bodyInset: number; bodyTop: number };
};

/** Subheading and instruction paragraphs (right-hand column). */
function Copy({ heading, headingId, paragraphs, layout }: CopyProps) {
  const inset = layout.bodyInset;
  return (
    <>
      <h2 id={headingId} className={`${trackWide} text-center text-subheading text-maroon`}>
        {heading}
      </h2>
      <div className="flex flex-col" style={{ marginTop: layout.bodyTop, paddingLeft: inset, paddingRight: inset, gap: L.paragraphGap }}>
        {paragraphs.map((p) => (
          <p key={p} className="text-body text-ink">
            {p}
          </p>
        ))}
      </div>
    </>
  );
}

/** The instruction video with its poster still, or the marked area for a missing illustration. */
function Media({ config }: { config: Extract<MeasurementStepConfig, { kind: "guided" }> }) {
  const label = measurementFields[config.field].label;
  const box = { width: L.guided.mediaWidth, maxWidth: "100%", aspectRatio: `${L.guided.mediaWidth} / ${L.guided.mediaHeight}` };

  if (config.media.kind === "illustrationPending") {
    return (
      <div
        role="img"
        aria-label={`${label}: ${config.media.label}`}
        className="flex items-center justify-center border-2 border-dashed border-burgundy bg-paper"
        style={box}
      >
        <span className={`${trackWide} text-center text-subheading text-maroon`}>{config.media.label}</span>
      </div>
    );
  }

  const video = getAsset(config.media.video);
  const poster = getAsset(config.media.poster);
  if (video.kind !== "video" || poster.kind !== "image") throw new Error(`Bad media keys for ${config.step}.`);
  return (
    <video
      controls
      preload="metadata"
      playsInline
      poster={poster.src}
      aria-label={`HOW TO MEASURE: ${label}`}
      // The deck crops 0.85% off the right of the 1000x526 footage to fill 702x372.4.
      className="block bg-ink object-cover object-left"
      style={box}
    >
      <source src={video.src} type={video.type} />
    </video>
  );
}

type InputProps = {
  field: MeasurementFieldId;
  size: "profile" | "guided";
  value: string;
  invalid: boolean;
  /** Labelled by the screen's subheading (guided) instead of a visible label (profile). */
  labelledBy?: string;
  describedBy: string;
  onChange: (text: string) => void;
};

/** Burgundy pill input with a divider and the unit on the right (screens 29-41). */
function MeasurementInput({ field, size, value, invalid, labelledBy, describedBy, onChange }: InputProps) {
  const id = useId();
  const unitId = useId();
  const { label, unit, maxDecimals } = measurementFields[field];
  const g = size === "guided" ? L.guided : L.profile;
  const pill = (
    <div
      className={
        `flex items-stretch overflow-hidden bg-burgundy text-paper ${size === "guided" ? "rounded-control-compact" : "rounded-control"} ` +
        "focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-ink"
      }
      style={{ width: g.inputWidth, maxWidth: "100%", height: g.inputHeight }}
    >
      <input
        id={id}
        type="text"
        inputMode={maxDecimals > 0 ? "decimal" : "numeric"}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-labelledby={labelledBy}
        aria-describedby={`${unitId} ${describedBy}`}
        aria-invalid={invalid || undefined}
        className={`${trackWide} min-w-0 flex-1 bg-transparent text-center text-button text-paper caret-paper outline-none`}
      />
      <span aria-hidden className="shrink-0 bg-paper" style={{ width: g.dividerWidth }} />
      <span
        id={unitId}
        className={`flex shrink-0 items-center justify-center ${size === "guided" ? "text-unit-sm" : "text-unit"}`}
        style={{ width: g.unitWidth - g.dividerWidth }}
      >
        {unit}
      </span>
    </div>
  );

  if (size === "guided") return pill;
  return (
    <div className="flex flex-col items-center">
      <label htmlFor={id} className={`${trackLabel} text-center text-caption text-ink`}>
        {label}
      </label>
      <div className="w-full" style={{ marginTop: L.profile.labelGap }}>
        {pill}
      </div>
    </div>
  );
}

type SaveProps = { size: "profile" | "guided"; disabled: boolean; className?: string; style?: CSSProperties };

/** SAVE pill: 78x26 on screen 29, 60x20 on screens 30-41. Submits the screen's form. */
function SaveButton({ size, disabled, className = "", style }: SaveProps) {
  const g = size === "guided" ? L.guided : L.profile;
  const shape = size === "guided" ? "rounded-control-xs text-button-xs" : "rounded-control-sm text-button-sm";
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${trackWide} ${shape} shrink-0 bg-burgundy text-paper ${pillStates} ${className}`}
      style={{ width: g.saveWidth, height: g.saveHeight, ...style }}
    >
      SAVE
    </button>
  );
}
