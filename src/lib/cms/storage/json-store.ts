import 'server-only';
import { randomBytes } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { StorageError } from '../errors';

/**
 * Low-level JSON file storage. Every read and write of CMS content goes
 * through this module so that path validation, atomic writes, backups and
 * write serialisation live in exactly one place.
 */

const DATA_ROOT = path.resolve(process.env.CMS_DATA_DIR || path.join(process.cwd(), 'data'));
const BACKUP_DIR = '.backups';
const BACKUPS_PER_FILE = 20;
const RETRYABLE_FS_CODES = new Set(['EPERM', 'EBUSY', 'EACCES']);

/** A single storage path segment: lowercase letters, digits and dashes only. */
const SEGMENT_PATTERN = /^[a-z0-9][a-z0-9-]{0,199}$/;

export function isSafeSegment(segment: string): boolean {
  return SEGMENT_PATTERN.test(segment);
}

/**
 * Resolves `<collection>/<name>.json` inside the data root. Rejects anything
 * that is not a plain segment, so input such as `../../etc/passwd` can never
 * escape the data directory.
 */
function resolveDocumentPath(collection: string, name: string): string {
  const segments = [...collection.split('/'), name];
  if (!segments.every(isSafeSegment)) {
    throw new StorageError('Invalid storage path.');
  }
  const resolved = path.resolve(DATA_ROOT, ...segments.slice(0, -1), `${name}.json`);
  if (!resolved.startsWith(DATA_ROOT + path.sep)) {
    throw new StorageError('Invalid storage path.');
  }
  return resolved;
}

function relativeToRoot(filePath: string): string {
  return path.relative(DATA_ROOT, filePath).split(path.sep).join('/');
}

async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  // Windows (and sync clients such as OneDrive) can briefly lock files.
  for (let attempt = 0; ; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (attempt >= 5 || !code || !RETRYABLE_FS_CODES.has(code)) throw error;
      await new Promise((resolve) => setTimeout(resolve, 50 * 2 ** attempt));
    }
  }
}

const locks = new Map<string, Promise<unknown>>();

/**
 * Serialises read-modify-write cycles per key within this process, so two
 * concurrent admin requests cannot overwrite each other's changes.
 */
export async function withLock<T>(key: string, task: () => Promise<T>): Promise<T> {
  const previous = locks.get(key) ?? Promise.resolve();
  const run = previous.catch(() => undefined).then(task);
  const tail = run.catch(() => undefined);
  locks.set(key, tail);
  try {
    return await run;
  } finally {
    if (locks.get(key) === tail) locks.delete(key);
  }
}

/**
 * Parsed documents, keyed by path and validated by mtime + size, so files
 * edited outside the CMS (git pull, manual edits) are still picked up. Values
 * are deep-frozen: callers that need to modify a document must clone it.
 */
const documentCache = new Map<string, { mtimeMs: number; size: number; value: unknown }>();

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

export async function readDocument<T>(collection: string, name: string): Promise<T | null> {
  const filePath = resolveDocumentPath(collection, name);
  let raw: string;
  let stat: { mtimeMs: number; size: number };
  try {
    stat = await fs.stat(filePath);
    const cached = documentCache.get(filePath);
    if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) return cached.value as T;
    raw = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      documentCache.delete(filePath);
      return null;
    }
    console.error(`[cms] Failed to read ${relativeToRoot(filePath)}`, error);
    throw new StorageError('Unable to read content.');
  }
  let value: T;
  try {
    value = deepFreeze(JSON.parse(raw) as T);
  } catch (error) {
    console.error(`[cms] Invalid JSON in ${relativeToRoot(filePath)}`, error);
    throw new StorageError('Stored content contains invalid JSON.');
  }
  documentCache.set(filePath, { mtimeMs: stat.mtimeMs, size: stat.size, value });
  return value;
}

export async function listDocuments(collection: string): Promise<string[]> {
  const dir = path.dirname(resolveDocumentPath(collection, 'placeholder'));
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map((entry) => entry.name.slice(0, -'.json'.length))
      .filter(isSafeSegment)
      .sort();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    console.error(`[cms] Failed to list ${collection}`, error);
    throw new StorageError('Unable to list content.');
  }
}

async function backupFile(filePath: string): Promise<void> {
  let contents: Buffer;
  try {
    contents = await fs.readFile(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
    throw error;
  }
  const rel = relativeToRoot(filePath).replace(/\.json$/, '');
  const dir = path.join(DATA_ROOT, BACKUP_DIR, ...rel.split('/'));
  await fs.mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  await fs.writeFile(path.join(dir, `${stamp}.json`), contents);

  const existing = (await fs.readdir(dir)).filter((name) => name.endsWith('.json')).sort();
  const stale = existing.slice(0, Math.max(0, existing.length - BACKUPS_PER_FILE));
  await Promise.all(stale.map((name) => fs.rm(path.join(dir, name), { force: true })));
}

/**
 * Writes a document atomically: the JSON is serialised and re-parsed to
 * prove it is valid, written to a temporary file in the same directory, and
 * then renamed over the target. Readers therefore only ever see the old or
 * the new file, never a partial write. The previous version is backed up
 * first.
 */
export async function writeDocument(collection: string, name: string, data: unknown): Promise<void> {
  const filePath = resolveDocumentPath(collection, name);
  let serialised: string;
  try {
    serialised = `${JSON.stringify(data, null, 2)}\n`;
    JSON.parse(serialised);
  } catch (error) {
    console.error(`[cms] Refusing to write non-serialisable data to ${relativeToRoot(filePath)}`, error);
    throw new StorageError('Content could not be serialised to JSON.');
  }

  const dir = path.dirname(filePath);
  const tempPath = path.join(dir, `.${name}.${randomBytes(6).toString('hex')}.tmp`);
  try {
    await fs.mkdir(dir, { recursive: true });
    await backupFile(filePath);
    const handle = await fs.open(tempPath, 'w');
    try {
      await handle.writeFile(serialised, 'utf8');
      await handle.sync();
    } finally {
      await handle.close();
    }
    await withRetry(() => fs.rename(tempPath, filePath));
    documentCache.delete(filePath);
  } catch (error) {
    await fs.rm(tempPath, { force: true }).catch(() => undefined);
    console.error(`[cms] Failed to write ${relativeToRoot(filePath)}`, error);
    throw new StorageError('Unable to save content.');
  }
}

export async function deleteDocument(collection: string, name: string): Promise<void> {
  const filePath = resolveDocumentPath(collection, name);
  try {
    await backupFile(filePath);
    await withRetry(() => fs.rm(filePath));
    documentCache.delete(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
    console.error(`[cms] Failed to delete ${relativeToRoot(filePath)}`, error);
    throw new StorageError('Unable to delete content.');
  }
}
