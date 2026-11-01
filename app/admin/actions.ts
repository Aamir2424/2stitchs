"use server";

import { redirect } from "next/navigation";
import { endAdminSession, isAdminConfigured, startAdminSession, verifyAdminPassword } from "@/src/server/admin-auth";

export type LoginState = { error: string | null };

/** Delay after a failed attempt, to slow down guessing (not a substitute for rate limiting). */
const FAILURE_DELAY_MS = 750;

/** Checks the password on the server and starts a session. Reachable by direct POST, so it checks everything itself. */
export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) return { error: "ADMIN ACCESS IS NOT CONFIGURED." };
  const password = formData.get("password");
  if (typeof password !== "string" || !(await verifyAdminPassword(password))) {
    await new Promise((r) => setTimeout(r, FAILURE_DELAY_MS));
    return { error: "INCORRECT PASSWORD." };
  }
  await startAdminSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endAdminSession();
  redirect("/admin");
}
