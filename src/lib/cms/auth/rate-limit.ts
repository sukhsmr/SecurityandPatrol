import 'server-only';

/**
 * In-memory login throttle: after `MAX_FAILURES` failed attempts from one
 * client within the window, further attempts are refused until it expires.
 * Per-process only, which suits a single-server JSON CMS.
 */

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

const failures = new Map<string, { count: number; resetAt: number }>();

export function loginRetryAfter(key: string): number {
  const entry = failures.get(key);
  if (!entry) return 0;
  if (entry.resetAt <= Date.now()) {
    failures.delete(key);
    return 0;
  }
  return entry.count >= MAX_FAILURES ? Math.ceil((entry.resetAt - Date.now()) / 1000) : 0;
}

export function recordLoginFailure(key: string): void {
  const now = Date.now();
  const entry = failures.get(key);
  if (!entry || entry.resetAt <= now) failures.set(key, { count: 1, resetAt: now + WINDOW_MS });
  else entry.count++;
}

export function clearLoginFailures(key: string): void {
  failures.delete(key);
}
