import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/cms/auth/session';
import { isSameOrigin, jsonResponse } from '@/lib/cms/http';

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return jsonResponse({ error: 'Request origin not allowed.' }, 403);
  const response = jsonResponse({ ok: true });
  response.headers.append('Set-Cookie', `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`);
  return response;
}
