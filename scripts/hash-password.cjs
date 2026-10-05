/* eslint-disable @typescript-eslint/no-require-imports -- plain Node CommonJS script */
/**
 * Generates a CMS_ADMIN_PASSWORD_HASH value.
 *
 *   npm run cms:hash-password -- "your-strong-password"
 *
 * Without an argument, a random password is generated and printed.
 */
const { randomBytes, scryptSync } = require("node:crypto");

const N = 16384;
const r = 8;
const p = 1;

const password = process.argv[2] || randomBytes(12).toString("base64url");
if (password.length < 10) {
  console.error("Password must be at least 10 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64, { N, r, p, maxmem: 256 * N * r });

if (!process.argv[2]) console.log(`Generated password: ${password}`);
console.log(`CMS_ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("hex")}:${hash.toString("hex")}`);
console.log(`CMS_SESSION_SECRET=${randomBytes(32).toString("hex")}`);
