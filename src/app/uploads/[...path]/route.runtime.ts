import { readUpload } from '@/lib/cms/services/media';

/**
 * Serves images uploaded through the admin after the last build. Files that
 * existed at build time are served directly from `public/` by Next.js.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const file = await readUpload(path);
  if (!file) return new Response('Not found', { status: 404 });
  return new Response(new Uint8Array(file.body), {
    headers: {
      'Content-Type': file.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
