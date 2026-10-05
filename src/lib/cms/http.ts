import 'server-only';
import type { NextRequest } from 'next/server';
import { CmsError, ValidationError } from './errors';
import { getSession } from './auth/session';

/** Shared helpers for the admin API route handlers. */

const MAX_BODY_BYTES = 8 * 1024 * 1024;
const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function jsonResponse(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}

export function errorResponse(error: unknown): Response {
  if (error instanceof ValidationError) {
    return jsonResponse({ error: error.message, code: error.code, fieldErrors: error.fieldErrors }, error.status);
  }
  if (error instanceof CmsError) {
    return jsonResponse({ error: error.message, code: error.code }, error.status);
  }
  console.error('[cms] Unhandled API error', error);
  return jsonResponse({ error: 'Something went wrong. Please try again.', code: 'internal_error' }, 500);
}

function requestHost(request: NextRequest): string | null {
  return request.headers.get('x-forwarded-host') ?? request.headers.get('host');
}

/**
 * CSRF defence in depth (the session cookie is already SameSite=Strict):
 * mutating requests must come from this site's own origin.
 */
export function isSameOrigin(request: NextRequest): boolean {
  const host = requestHost(request);
  const source = request.headers.get('origin') ?? request.headers.get('referer');
  if (!host || !source) return false;
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

export function isSecureRequest(request: NextRequest): boolean {
  const forwarded = request.headers.get('x-forwarded-proto');
  return (forwarded ? forwarded.split(',')[0].trim() : request.nextUrl.protocol.replace(':', '')) === 'https';
}

export function clientKey(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'local';
}

export async function readJsonBody<T = unknown>(request: NextRequest): Promise<T> {
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY_BYTES) throw new CmsError('Request is too large.', 413, 'payload_too_large');
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new CmsError('Request is too large.', 413, 'payload_too_large');
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new CmsError('Invalid JSON data.', 400, 'invalid_json');
  }
}

type Handler<C> = (request: NextRequest, context: C) => Promise<Response>;

/**
 * Wraps an admin route handler: requires a valid session, enforces
 * same-origin for writes, and converts thrown errors into JSON responses.
 */
export function adminRoute<C>(handler: Handler<C>): Handler<C> {
  return async (request, context) => {
    try {
      if (!(await getSession())) {
        return jsonResponse({ error: 'Your session has expired. Please sign in again.', code: 'unauthorized' }, 401);
      }
      if (MUTATING_METHODS.has(request.method) && !isSameOrigin(request)) {
        return jsonResponse({ error: 'Request origin not allowed.', code: 'forbidden' }, 403);
      }
      return await handler(request, context);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
