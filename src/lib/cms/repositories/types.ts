import type { ActivityEntry, Office, Page, Post, SiteDocumentKey, SiteDocuments } from '../types';

/**
 * Storage contracts. The services layer depends only on these interfaces;
 * replacing JSON files with a REST API or a database means providing new
 * implementations and wiring them up in `repositories/index.ts`.
 */

export interface PageRepository {
  list(): Promise<Page[]>;
  get(slug: string): Promise<Page | null>;
  save(page: Page): Promise<void>;
  delete(slug: string): Promise<void>;
}

export interface PostRepository {
  list(): Promise<Post[]>;
  get(slug: string): Promise<Post | null>;
  save(post: Post): Promise<void>;
  delete(slug: string): Promise<void>;
}

export interface SiteRepository {
  get<K extends SiteDocumentKey>(key: K): Promise<SiteDocuments[K]>;
  save<K extends SiteDocumentKey>(key: K, value: SiteDocuments[K]): Promise<void>;
}

export interface OfficeRepository {
  list(): Promise<Office[]>;
  saveAll(offices: Office[]): Promise<void>;
}

export interface ActivityRepository {
  list(limit?: number): Promise<ActivityEntry[]>;
  record(entry: Omit<ActivityEntry, 'id' | 'at'>): Promise<void>;
}

export interface Repositories {
  pages: PageRepository;
  posts: PostRepository;
  site: SiteRepository;
  offices: OfficeRepository;
  activity: ActivityRepository;
}
