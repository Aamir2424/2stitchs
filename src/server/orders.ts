import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { WizardSelections } from "@/src/components/wizard/WizardContext";
import { parseSelections } from "@/src/lib/selections";
import { requireAdminSession } from "./admin-auth";

// Submitted orders for the admin production ticket (data access layer). Every read checks the
// admin session itself, so no caller can get order data without one.
//
// INTERIM STORE: no database or order-submission flow exists yet. Orders are read from JSON files
// in the directory named by the ORDERS_DIR server environment variable (one "<order id>.json"
// per order, outside public/). Nothing writes these files yet. Replace this module's internals
// with the real database when it exists; the exported functions stay the same.

export type ProductionOrder = {
  id: string;
  customerName: string;
  submittedAt: string;
  selections: WizardSelections;
};

export type OrderSummary = Pick<ProductionOrder, "id" | "customerName" | "submittedAt">;

export type OrderStoreResult<T> = { status: "notConfigured" } | { status: "ok"; data: T };

const ORDER_ID = /^[A-Za-z0-9_-]{1,64}$/;

/** True for ids that can name an order file (letters, digits, "-" and "_"; no paths). */
export function isOrderId(value: unknown): value is string {
  return typeof value === "string" && ORDER_ID.test(value);
}

function ordersDir(): string | null {
  const dir = process.env.ORDERS_DIR;
  return dir && path.isAbsolute(dir) ? dir : null;
}

/** Validates one stored order. Anything malformed is rejected as a whole. */
function parseOrder(id: string, raw: unknown): ProductionOrder | null {
  if (typeof raw !== "object" || raw === null) return null;
  const { customerName, submittedAt, selections } = raw as Record<string, unknown>;
  if (typeof customerName !== "string" || customerName.trim().length === 0 || customerName.length > 100) return null;
  if (typeof submittedAt !== "string" || Number.isNaN(Date.parse(submittedAt))) return null;
  const parsed = parseSelections(selections);
  if (!parsed) return null;
  return { id, customerName: customerName.trim(), submittedAt, selections: parsed };
}

async function readOrder(dir: string, id: string): Promise<ProductionOrder | null> {
  try {
    const text = await readFile(path.join(dir, `${id}.json`), "utf8");
    return parseOrder(id, JSON.parse(text));
  } catch {
    return null;
  }
}

/** Every valid stored order, newest first. */
export async function listOrders(): Promise<OrderStoreResult<OrderSummary[]>> {
  await requireAdminSession();
  const dir = ordersDir();
  if (!dir) return { status: "notConfigured" };
  let files: string[];
  try {
    files = await readdir(dir);
  } catch {
    return { status: "notConfigured" };
  }
  const ids = files.filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)).filter(isOrderId);
  const orders = (await Promise.all(ids.map((id) => readOrder(dir, id)))).filter((o): o is ProductionOrder => o !== null);
  orders.sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt));
  return { status: "ok", data: orders.map(({ id, customerName, submittedAt }) => ({ id, customerName, submittedAt })) };
}

/** One order by id, or null if it doesn't exist or is invalid. */
export async function getOrder(id: string): Promise<OrderStoreResult<ProductionOrder | null>> {
  await requireAdminSession();
  const dir = ordersDir();
  if (!dir) return { status: "notConfigured" };
  return { status: "ok", data: isOrderId(id) ? await readOrder(dir, id) : null };
}
