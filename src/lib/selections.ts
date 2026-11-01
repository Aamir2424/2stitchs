// Rules about a set of wizard selections that both the client (wizard) and the server (production
// ticket) need. Plain functions with no React, so they run on either side.

import type { FabricSelection, WizardSelections } from "@/src/components/wizard/WizardContext";
import { fabricFamilies } from "@/src/config/fabrics.config";
import { measurementFields, parseMeasurement, type MeasurementFieldId } from "@/src/config/measurements.config";
import {
  choiceSteps,
  conditionalSteps,
  monogramStyles,
  optionSteps,
  sanitizeMonogramText,
  type ChoiceStepId,
  type OptionStepId,
} from "@/src/config/steps.config";

/**
 * The fabric the pants are made in: the separate pants fabric after YES, otherwise the
 * jacket fabric. Undefined until the customer has answered the question.
 */
export function effectivePantsFabric(selections: WizardSelections): FabricSelection | undefined {
  if (selections.pantsFabricChoice === "yes") return selections.pantsFabric;
  if (selections.pantsFabricChoice === "no") return selections.fabric;
  return undefined;
}

/**
 * Checks a set of selections that comes from outside the wizard (a stored order) against the
 * config: every id must exist, every value must be in range, and the conditional steps must
 * agree (a waistcoat only for 3-Piece, a separate pants fabric only after YES). Returns the
 * selections, or null if anything is invalid; unknown fields are dropped.
 */
export function parseSelections(raw: unknown): WizardSelections | null {
  if (!isRecord(raw)) return null;
  const out: Record<string, unknown> = {};

  for (const step of Object.keys(optionSteps) as OptionStepId[]) {
    if (raw[step] === undefined) continue;
    if (!optionSteps[step].options.some((o) => o.id === raw[step])) return null;
    out[step] = raw[step];
  }
  for (const step of Object.keys(choiceSteps) as ChoiceStepId[]) {
    if (raw[step] === undefined) continue;
    if (!choiceSteps[step].options.some((o) => o.id === raw[step])) return null;
    out[step] = raw[step];
  }
  for (const key of ["fabric", "pantsFabric"] as const) {
    if (raw[key] === undefined) continue;
    const fabric = raw[key];
    if (!isRecord(fabric)) return null;
    const family = fabricFamilies.find((f) => f.id === fabric.family);
    if (!family || !(family.swatches as readonly { id: string }[]).some((s) => s.id === fabric.swatch)) return null;
    out[key] = { family: family.id, swatch: fabric.swatch };
  }
  if (raw.monogramText !== undefined) {
    if (typeof raw.monogramText !== "string" || sanitizeMonogramText(raw.monogramText) !== raw.monogramText) return null;
    out.monogramText = raw.monogramText;
  }
  if (raw.monogramStyle !== undefined) {
    if (!monogramStyles.some((s) => s.id === raw.monogramStyle)) return null;
    out.monogramStyle = raw.monogramStyle;
  }
  if (raw.tailorNote !== undefined) {
    if (typeof raw.tailorNote !== "string" || raw.tailorNote.length > maxStoredNoteLength) return null;
    out.tailorNote = raw.tailorNote;
  }
  if (raw.measurements !== undefined) {
    if (!isRecord(raw.measurements)) return null;
    const measurements: Record<string, number> = {};
    for (const [field, value] of Object.entries(raw.measurements)) {
      if (!(field in measurementFields) || typeof value !== "number") return null;
      if (parseMeasurement(field as MeasurementFieldId, String(value)) !== value) return null;
      measurements[field] = value;
    }
    out.measurements = measurements;
  }

  // Conditional steps must match the answers they depend on.
  for (const [step, rule] of Object.entries(conditionalSteps)) {
    if (out[step] !== undefined && rule && out[rule.step] !== rule.option) return null;
  }
  return out as WizardSelections;
}

/**
 * Longest tailor note accepted from storage. The wizard sets no limit (none is specified);
 * this only bounds what the server will render.
 */
export const maxStoredNoteLength = 10_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
