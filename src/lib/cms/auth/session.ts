import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { getAuthConfig, type AuthConfig } from './credentials';

/**
 * Stateless signed session cookie: `base64url(payload).base64url(hmac)`.
 * The signing key mixes in the password hash, so changing the admin password
 * invalidates every existing session.
 */

export const SESSION_COOKIE = 'cms_session';
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

export interface Session {
  username: string;
  expiresAt: number;
}

interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

function signingKey(config: AuthConfig): Buffer {
  return createHmac('sha256', config.secret).update(config.passwordHash).digest();
}

function sign(data: string, config: AuthConfig): string {
  return createHmac('sha256', signingKey(config)).update(data).digest('base64url');
}

export function createSessionToken(config: AuthConfig, username: string): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: Payload = { sub: username, iat: now, exp: now + SESSION_TTL_SECONDS };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${data}.${sign(data, config)}`;
}

export function verifySessionToken(token: string | undefined): Session | null {
  const config = getAuthConfig();
  if (!config || !token) return null;
  const [data, signature] = token.split('.');
  if (!data || !signature) return null;

  const expected = Buffer.from(sign(data, config));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8')) as Payload;
    if (payload.sub !== config.username || payload.exp * 1000 <= Date.now()) return null;
    return { username: payload.sub, expiresAt: payload.exp * 1000 };
  } catch {
    return null;
  }
}

/** Current admin session from the request cookies (Server Components and Route Handlers). */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(secure: boolean, maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure,
    path: '/',
    maxAge,
  };
}
