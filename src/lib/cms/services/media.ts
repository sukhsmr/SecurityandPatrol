import 'server-only';
import { randomBytes } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { CmsError, ValidationError } from '../errors';

/**
 * Media library over the existing `public/` folder. Existing assets (e.g.
 * `/wp-content/uploads/...`) are listed in place; new uploads are written to
 * `public/uploads/YYYY/MM/` (or `CMS_UPLOAD_DIR`, for hosts where `public/` is
 * read-only) and always served at `/uploads/...`. No external storage is involved.
 */

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const PUBLIC_UPLOAD_DIR = path.join(PUBLIC_DIR, 'uploads');
const UPLOAD_DIR = process.env.CMS_UPLOAD_DIR ? path.resolve(process.env.CMS_UPLOAD_DIR) : PUBLIC_UPLOAD_DIR;
const UPLOAD_URL = '/uploads';
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.ico']);
const SKIP_DIRS = new Set(['_next', 'node_modules', 'litespeed']);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const LIST_CACHE_MS = 30_000;

/** Upload types and their magic-byte signatures. SVG is excluded because it can carry scripts. */
const UPLOAD_SIGNATURES: Record<string, (bytes: Buffer) => boolean> = {
  '.png': (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  '.jpg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  '.jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  '.gif': (b) => b.subarray(0, 4).toString('ascii') === 'GIF8',
  '.webp': (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP',
};

export interface MediaItem {
  path: string;
  name: string;
  size: number;
  modified: string;
}

let cache: { at: number; items: MediaItem[] } | null = null;

/** Public URL of a file inside `PUBLIC_DIR` or `UPLOAD_DIR`. */
function urlFor(file: string): string {
  const inUploads = path.relative(UPLOAD_DIR, file);
  if (!inUploads.startsWith('..') && !path.isAbsolute(inUploads)) return `${UPLOAD_URL}/${inUploads.split(path.sep).join('/')}`;
  return '/' + path.relative(PUBLIC_DIR, file).split(path.sep).join('/');
}

async function walk(dir: string, items: MediaItem[]): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) await walk(full, items);
        return;
      }
      if (!IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) return;
      const stat = await fs.stat(full);
      items.push({
        path: urlFor(full),
        name: entry.name,
        size: stat.size,
        modified: stat.mtime.toISOString(),
      });
    }),
  );
}

async function allMedia(): Promise<MediaItem[]> {
  if (cache && Date.now() - cache.at < LIST_CACHE_MS) return cache.items;
  const items: MediaItem[] = [];
  await walk(PUBLIC_DIR, items);
  if (UPLOAD_DIR !== PUBLIC_UPLOAD_DIR) await walk(UPLOAD_DIR, items);
  items.sort((a, b) => b.modified.localeCompare(a.modified));
  cache = { at: Date.now(), items };
  return items;
}

export async function listMedia(options: { query?: string; page?: number; pageSize?: number }) {
  const query = options.query?.trim().toLowerCase() ?? '';
  const pageSize = Math.min(Math.max(options.pageSize ?? 48, 1), 200);
  const page = Math.max(options.page ?? 1, 1);
  const filtered = (await allMedia()).filter((item) => !query || item.path.toLowerCase().includes(query));
  return {
    items: filtered.slice((page - 1) * pageSize, page * pageSize),
    total: filtered.length,
    page,
    pageSize,
  };
}

function safeFileName(name: string, ext: string): string {
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return `${base || 'image'}-${randomBytes(3).toString('hex')}${ext}`;
}

export async function saveUpload(file: File): Promise<MediaItem> {
  const ext = path.extname(file.name).toLowerCase();
  const matchesSignature = UPLOAD_SIGNATURES[ext];
  if (!matchesSignature) throw new ValidationError({ file: 'Only PNG, JPG, GIF and WebP images can be uploaded.' });
  if (file.size === 0) throw new ValidationError({ file: 'The file is empty.' });
  if (file.size > MAX_UPLOAD_BYTES) throw new ValidationError({ file: 'Images must be 5 MB or smaller.' });

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!matchesSignature(bytes)) throw new ValidationError({ file: 'The file content does not match its image type.' });

  const now = new Date();
  const dir = path.join(UPLOAD_DIR, String(now.getFullYear()), String(now.getMonth() + 1).padStart(2, '0'));
  const fileName = safeFileName(file.name, ext);
  const target = path.join(dir, fileName);
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(target, bytes, { flag: 'wx' });
  } catch (error) {
    console.error('[cms] Failed to save upload', error);
    throw new CmsError('Unable to save the uploaded image.', 500, 'storage_error');
  }
  cache = null;
  return {
    path: urlFor(target),
    name: fileName,
    size: bytes.length,
    modified: now.toISOString(),
  };
}

const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

/** Reads an uploaded file for the `/uploads/...` fallback route (files added after the build). */
export async function readUpload(segments: string[]): Promise<{ body: Buffer; contentType: string } | null> {
  if (!segments.every((segment) => /^[a-z0-9][a-z0-9._-]*$/i.test(segment) && !segment.includes('..'))) return null;
  const contentType = CONTENT_TYPES[path.extname(segments[segments.length - 1] ?? '').toLowerCase()];
  if (!contentType) return null;
  // Uploads live in UPLOAD_DIR; older ones may still be in public/uploads.
  for (const base of new Set([UPLOAD_DIR, PUBLIC_UPLOAD_DIR])) {
    const target = path.resolve(base, ...segments);
    if (!target.startsWith(base + path.sep)) continue;
    try {
      return { body: await fs.readFile(target), contentType };
    } catch {
      // try the next location
    }
  }
  return null;
}
