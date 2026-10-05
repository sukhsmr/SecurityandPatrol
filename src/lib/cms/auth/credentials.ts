import 'server-only';
import { scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback) as (password: string, salt: Buffer, keylen: number, options: { N: number; r: number; p: number; maxmem: number }) => Promise<Buffer>;

/**
 * Admin credentials come from environment variables, never from the content
 * store, so a compromised JSON file cannot grant access:
 *
 *   CMS_ADMIN_USERNAME       admin login name
 *   CMS_ADMIN_PASSWORD_HASH  scrypt hash from `npm run cms:hash-password`
 *   CMS_SESSION_SECRET       random string, at least 32 characters
 */

export interface AuthConfig {
  username: string;
  passwordHash: string;
  secret: string;
}

export function getAuthConfig(): AuthConfig | null {
  const username = process.env.CMS_ADMIN_USERNAME?.trim();
  const passwordHash = process.env.CMS_ADMIN_PASSWORD_HASH?.trim();
  const secret = process.env.CMS_SESSION_SECRET?.trim();
  if (!username || !passwordHash || !secret || secret.length < 32) return null;
  return { username, passwordHash, secret };
}

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Verifies a password against `scrypt:N:r:p:saltHex:hashHex` (no `$`, which env loaders expand). */
async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(':');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [, n, r, p, saltHex, hashHex] = parts;
  const expected = Buffer.from(hashHex, 'hex');
  const N = Number(n);
  const derived = await scrypt(password, Buffer.from(saltHex, 'hex'), expected.length, {
    N,
    r: Number(r),
    p: Number(p),
    maxmem: 256 * N * Number(r),
  });
  return safeEqual(derived, expected);
}

export async function verifyCredentials(config: AuthConfig, username: string, password: string): Promise<boolean> {
  // Always run the hash so response time does not reveal valid usernames.
  const passwordOk = await verifyPassword(password, config.passwordHash).catch(() => false);
  const usernameOk = safeEqual(Buffer.from(username), Buffer.from(config.username));
  return usernameOk && passwordOk;
}
