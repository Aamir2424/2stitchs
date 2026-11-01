import "server-only";

import { createHmac, randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from "node:crypto";
import { cookies } from "next/headers";

// Admin authentication for /admin (production tickets). Server only: the password check, the
// session signing key and the session cookie never reach the browser.
//
// Configuration (server environment variables; never NEXT_PUBLIC_):
//   ADMIN_PASSWORD_HASH   scrypt hash of the admin password, made with
//                         `node scripts/hash-admin-password.mjs`. The password itself is not stored.
//   ADMIN_SESSION_SECRET  at least 32 random bytes, e.g. `openssl rand -base64 32`. Signs the
//                         session cookie; changing it signs everyone out.
// If either is missing or malformed, admin access is disabled (fails closed).
//
// Sessions are stateless: an HMAC-SHA256-signed expiry in an HttpOnly, SameSite=Strict cookie
// scoped to /admin, valid for 8 hours. Signing out deletes the cookie in that browser; a copied
// cookie stays valid until it expires (no server-side revocation list without a session store).

const COOKIE_NAME = "twostitchs_admin";
const COOKIE_PATH = "/admin";
const SESSION_SECONDS = 8 * 60 * 60;
const MAX_PASSWORD_LENGTH = 1024;

type PasswordHash = { N: number; r: number; p: number; salt: Buffer; key: Buffer };
type AdminConfig = { hash: PasswordHash; sessionKey: Buffer };

/** Parses "scrypt:N:r:p:<salt base64url>:<key base64url>" (no "$", which .env files expand). */
function parseHash(value: string): PasswordHash | null {
  const parts = value.trim().split(":");
  if (parts.length !== 6 || parts[0] !== "scrypt") return null;
  const [N, r, p] = parts.slice(1, 4).map(Number);
  const salt = Buffer.from(parts[4], "base64url");
  const key = Buffer.from(parts[5], "base64url");
  const valid =
    Number.isInteger(N) && N >= 16384 && (N & (N - 1)) === 0 &&
    Number.isInteger(r) && r >= 8 && Number.isInteger(p) && p >= 1 &&
    salt.length >= 16 && key.length >= 32;
  return valid ? { N, r, p, salt, key } : null;
}

function readConfig(): AdminConfig | null {
  const hash = parseHash(process.env.ADMIN_PASSWORD_HASH ?? "");
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  if (!hash || Buffer.byteLength(secret) < 32) return null;
  return { hash, sessionKey: Buffer.from(secret) };
}

/** False when the admin environment variables are missing or malformed. */
export function isAdminConfigured(): boolean {
  return readConfig() !== null;
}

function scryptAsync(password: string, h: PasswordHash): Promise<Buffer> {
  const options: ScryptOptions = { N: h.N, r: h.r, p: h.p, maxmem: 256 * h.N * h.r };
  return new Promise((resolve, reject) =>
    scrypt(password, h.salt, h.key.length, options, (err, key) => (err ? reject(err) : resolve(key))),
  );
}

/** Constant-time check of a submitted password against ADMIN_PASSWORD_HASH. */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const config = readConfig();
  if (!config || password.length === 0 || password.length > MAX_PASSWORD_LENGTH) return false;
  const key = await scryptAsync(password, config.hash);
  return key.length === config.hash.key.length && timingSafeEqual(key, config.hash.key);
}

function sign(payload: string, key: Buffer): Buffer {
  return createHmac("sha256", key).update(`admin-session:${payload}`).digest();
}

/** Sets the signed session cookie. Call only from a Server Action, after verifyAdminPassword. */
export async function startAdminSession(): Promise<void> {
  const config = readConfig();
  if (!config) throw new Error("Admin access is not configured.");
  const expires = Date.now() + SESSION_SECONDS * 1000;
  const payload = `${expires}.${randomBytes(16).toString("base64url")}`;
  const token = `${payload}.${sign(payload, config.sessionKey).toString("base64url")}`;
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: COOKIE_PATH,
    maxAge: SESSION_SECONDS,
  });
}

/** Deletes the session cookie. Call only from a Server Action. */
export async function endAdminSession(): Promise<void> {
  (await cookies()).set(COOKIE_NAME, "", { httpOnly: true, sameSite: "strict", path: COOKIE_PATH, maxAge: 0 });
}

/** True when the request carries a valid, unexpired admin session cookie. */
export async function hasAdminSession(): Promise<boolean> {
  const config = readConfig();
  if (!config) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const given = Buffer.from(parts[2], "base64url");
  const expected = sign(payload, config.sessionKey);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  const expires = Number(parts[0]);
  return Number.isFinite(expires) && expires > Date.now();
}

/** Throws unless the request has a valid admin session. Used by every admin data read. */
export async function requireAdminSession(): Promise<void> {
  if (!(await hasAdminSession())) throw new Error("Not authorized.");
}
