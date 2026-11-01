// Prints an ADMIN_PASSWORD_HASH value for /admin (see src/server/admin-auth.ts).
// Usage: node scripts/hash-admin-password.mjs   (then type the password; it is not echoed)
//    or: printf '%s' "$PASSWORD" | node scripts/hash-admin-password.mjs
// Put the printed line in the server's environment (e.g. .env.local, which git ignores).
// The password itself is never stored.

import { randomBytes, scrypt } from "node:crypto";

const N = 32768, r = 8, p = 1, keyLength = 64;

async function readPassword() {
  if (!process.stdin.isTTY) {
    let data = "";
    for await (const chunk of process.stdin) data += chunk;
    return data.replace(/\r?\n$/, "");
  }
  process.stdout.write("Admin password: ");
  process.stdin.setRawMode(true);
  let password = "";
  for await (const chunk of process.stdin) {
    for (const ch of chunk.toString("utf8")) {
      if (ch === "\r" || ch === "\n") { process.stdin.setRawMode(false); process.stdout.write("\n"); return password; }
      if (ch === "\u0003") process.exit(130);
      if (ch === "\u007f") password = password.slice(0, -1);
      else password += ch;
    }
  }
  return password;
}

const password = await readPassword();
if (password.length < 12) {
  console.error("Use at least 12 characters.");
  process.exit(1);
}
const salt = randomBytes(16);
scrypt(password, salt, keyLength, { N, r, p, maxmem: 256 * N * r }, (err, key) => {
  if (err) throw err;
  console.log(`ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("base64url")}:${key.toString("base64url")}`);
});
