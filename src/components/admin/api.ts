'use client';

import type { FieldErrors } from '@/lib/cms/errors';

/** Error thrown by `apiRequest`, carrying the server's message and field errors. */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fieldErrors: FieldErrors = {},
  ) {
    super(message);
  }
}

/** The site uses `trailingSlash: true`; calling the canonical URL avoids a 308 redirect. */
function withTrailingSlash(url: string): string {
  const [path, query] = url.split('?');
  return `${path.endsWith('/') ? path : `${path}/`}${query !== undefined ? `?${query}` : ''}`;
}

/**
 * Calls the admin JSON API. Redirects to the login page when the session has
 * expired, and turns error responses into `ApiError`s with friendly messages.
 */
export async function apiRequest<T = Record<string, unknown>>(method: string, url: string, body?: unknown): Promise<T> {
  url = withTrailingSlash(url);
  let response: Response;
  try {
    response = await fetch(url, {
      method,
      credentials: 'same-origin',
      headers: body instanceof FormData || body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body instanceof FormData ? body : body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Unable to reach the server. Check your connection and try again.', 0);
  }

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (response.status === 401) {
    window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`;
    throw new ApiError('Your session has expired.', 401);
  }
  if (!response.ok) {
    throw new ApiError(
      typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.',
      response.status,
      (data.fieldErrors as FieldErrors) ?? {},
    );
  }
  return data as T;
}

/** Keeps only errors under `prefix.` with the prefix removed (e.g. section `data.*` errors). */
export function scopeErrors(errors: FieldErrors, prefix: string): FieldErrors {
  return Object.fromEntries(
    Object.entries(errors)
      .filter(([key]) => key.startsWith(`${prefix}.`))
      .map(([key, value]) => [key.slice(prefix.length + 1), value]),
  );
}
