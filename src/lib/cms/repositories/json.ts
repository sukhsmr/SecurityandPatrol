import 'server-only';
import { randomUUID } from 'node:crypto';
import { StorageError } from '../errors';
import { deleteDocument, listDocuments, readDocument, withLock, writeDocument } from '../storage/json-store';
import type { ActivityEntry, Office, Page, Post, SiteDocumentKey, SiteDocuments, Submission, SubmissionStatus } from '../types';
import type {
  ActivityRepository,
  OfficeRepository,
  PageRepository,
  PostRepository,
  Repositories,
  SiteRepository,
  SubmissionRepository,
} from './types';

/** One JSON file per document: `data/<collection>/<slug>.json`. */
function documentCollection<T extends { slug: string }>(collection: string) {
  return {
    async list(): Promise<T[]> {
      const names = await listDocuments(collection);
      const docs: Array<T | null> = await Promise.all(names.map((name) => readDocument<T>(collection, name)));
      return docs.filter((doc): doc is T => doc !== null);
    },
    get(slug: string): Promise<T | null> {
      return readDocument<T>(collection, slug);
    },
    save(doc: T): Promise<void> {
      return writeDocument(collection, doc.slug, doc);
    },
    delete(slug: string): Promise<void> {
      return deleteDocument(collection, slug);
    },
  };
}

const pages: PageRepository = documentCollection<Page>('pages');
const posts: PostRepository = documentCollection<Post>('posts');

const site: SiteRepository = {
  async get<K extends SiteDocumentKey>(key: K): Promise<SiteDocuments[K]> {
    const doc = await readDocument<SiteDocuments[K]>('site', key);
    if (!doc) throw new StorageError(`Missing site document "${key}".`);
    return doc;
  },
  save<K extends SiteDocumentKey>(key: K, value: SiteDocuments[K]): Promise<void> {
    return writeDocument('site', key, value);
  },
};

const offices: OfficeRepository = {
  async list(): Promise<Office[]> {
    return (await readDocument<Office[]>('collections', 'offices')) ?? [];
  },
  saveAll(items: Office[]): Promise<void> {
    return writeDocument('collections', 'offices', items);
  },
};

const ACTIVITY_LIMIT = 100;

const activity: ActivityRepository = {
  async list(limit = 20): Promise<ActivityEntry[]> {
    const entries = (await readDocument<ActivityEntry[]>('meta', 'activity')) ?? [];
    return entries.slice(0, limit);
  },
  record(entry): Promise<void> {
    return withLock('meta/activity', async () => {
      const entries = (await readDocument<ActivityEntry[]>('meta', 'activity')) ?? [];
      const next: ActivityEntry = { ...entry, id: randomUUID(), at: new Date().toISOString() };
      await writeDocument('meta', 'activity', [next, ...entries].slice(0, ACTIVITY_LIMIT));
    });
  },
};

const submissions: SubmissionRepository = {
  async list(): Promise<Submission[]> {
    return (await readDocument<Submission[]>('collections', 'submissions')) ?? [];
  },
  async get(id: string): Promise<Submission | null> {
    const list = (await readDocument<Submission[]>('collections', 'submissions')) ?? [];
    return list.find((item) => item.id === id) ?? null;
  },
  save(submission: Submission): Promise<void> {
    return withLock('collections/submissions', async () => {
      const list = (await readDocument<Submission[]>('collections', 'submissions')) ?? [];
      const index = list.findIndex((item) => item.id === submission.id);
      let next: Submission[];
      if (index >= 0) {
        next = [...list];
        next[index] = submission;
      } else {
        next = [submission, ...list];
      }
      await writeDocument('collections', 'submissions', next);
    });
  },
  updateStatus(id: string, status: SubmissionStatus): Promise<void> {
    return withLock('collections/submissions', async () => {
      const list = (await readDocument<Submission[]>('collections', 'submissions')) ?? [];
      const next = list.map((item) => (item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
      await writeDocument('collections', 'submissions', next);
    });
  },
  delete(id: string): Promise<void> {
    return withLock('collections/submissions', async () => {
      const list = (await readDocument<Submission[]>('collections', 'submissions')) ?? [];
      const next = list.filter((item) => item.id !== id);
      await writeDocument('collections', 'submissions', next);
    });
  },
};

export const jsonRepositories: Repositories = { pages, posts, site, offices, activity, submissions };
