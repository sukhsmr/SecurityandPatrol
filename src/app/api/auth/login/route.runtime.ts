import type { NextRequest } from 'next/server';
import { getAuthConfig, verifyCredentials } from '@/lib/cms/auth/credentials';
import { clearLoginFailures, loginRetryAfter, recordLoginFailure } from '@/lib/cms/auth/rate-limit';
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from '@/lib/cms/auth/session';
import { clientKey, errorResponse, isSameOrigin, isSecureRequest, jsonResponse, readJsonBody } from '@/lib/cms/http';

function serializeCookie(name: string, value: string, options: ReturnType<typeof sessionCookieOptions>): string {
  return [
    `${name}=${value}`,
    `Path=${options.path}`,
    `Max-Age=${options.maxAge}`,
    'HttpOnly',
    'SameSite=Strict',
    ...(options.secure ? ['Secure'] : []),
  ].join('; ');
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) return jsonResponse({ error: 'Request origin not allowed.' }, 403);

    const config = getAuthConfig();
    if (!config) {
      console.error('[cms] Admin login is not configured. Set CMS_ADMIN_USERNAME, CMS_ADMIN_PASSWORD_HASH and CMS_SESSION_SECRET.');
      return jsonResponse({ error: 'Admin login is not configured on this server.' }, 503);
    }

    const key = clientKey(request);
    const retryAfter = loginRetryAfter(key);
    if (retryAfter > 0) {
      return jsonResponse({ error: `Too many failed attempts. Try again in ${Math.ceil(retryAfter / 60)} minute(s).` }, 429);
    }

    const body = await readJsonBody<{ username?: unknown; password?: unknown }>(request);
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!username || !password) {
      return jsonResponse({ error: 'Username and password are required.' }, 400);
    }

    if (!(await verifyCredentials(config, username, password))) {
      recordLoginFailure(key);
      return jsonResponse({ error: 'Invalid username or password.' }, 401);
    }

    clearLoginFailures(key);
    const response = jsonResponse({ ok: true });
    response.headers.append(
      'Set-Cookie',
      serializeCookie(SESSION_COOKIE, createSessionToken(config, username), sessionCookieOptions(isSecureRequest(request))),
    );
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}
