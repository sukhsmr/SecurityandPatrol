import 'server-only';
import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { ConflictError, NotFoundError, ValidationError, type FieldErrors } from '../errors';
import type { PageSettingsForm } from '../pages';
import { repositories } from '../repositories';
import {
  footerFields,
  headerFields,
  HOME_SLUG,
  officesDocumentFields,
  pageSettingsFields,
  postFields,
  RESERVED_SLUGS,
  settingsFields,
  SLUG_PATTERN,
} from '../schema/documents';
import type { Field } from '../schema/fields';
import { validateFields } from '../schema/validate';
import { getSectionDefinition } from '../sections/definitions';
import { withLock } from '../storage/json-store';
import type {
  ActivityEntry,
  Office,
  Page,
  PageLayout,
  Post,
  Section,
  SeoFields,
  SiteDocumentKey,
  SiteDocuments,
} from '../types';

/**
 * Admin write operations. Every mutation is validated, serialised behind a
 * single write lock, recorded in the activity log, and followed by cache
 * revalidation so the public site reflects the change on the next request.
 */

const WRITE_LOCK = 'cms-write';

function now(): string {
  return new Date().toISOString();
}

function revalidateSite(): void {
  try {
    // Header, footer and menus are shared by every route, so revalidate the
    // whole tree rather than tracking per-page dependencies.
    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('[cms] Revalidation failed', error);
  }
}

async function record(entry: Omit<ActivityEntry, 'id' | 'at'>): Promise<void> {
  try {
    await repositories.activity.record(entry);
  } catch (error) {
    console.error('[cms] Failed to record activity', error);
  }
}

function validateOrThrow<T>(fields: Field[], input: unknown): T {
  const result = validateFields<T>(fields, input);
  if (!result.valid) throw new ValidationError(result.errors);
  return result.value;
}

function compactSeo(seo: SeoFields): SeoFields {
  return Object.fromEntries(Object.entries(seo).filter(([, value]) => typeof value === 'string' && value.trim() !== ''));
}

// ---------------------------------------------------------------------------
// Slugs
// ---------------------------------------------------------------------------

function slugError(slug: string): string | null {
  if (!SLUG_PATTERN.test(slug)) return 'Slug may only contain lowercase letters, numbers and single dashes.';
  if (slug.length > 100) return 'Slug must be 100 characters or fewer.';
  if (RESERVED_SLUGS.has(slug)) return `"${slug}" is reserved. Please choose another slug.`;
  return null;
}

/** Pages and posts share the `/[slug]` URL space, so slugs must be unique across both. */
async function assertSlugAvailable(slug: string, current?: { kind: 'page' | 'post'; slug: string }): Promise<void> {
  if (current && current.slug === slug) return;
  const [page, post] = await Promise.all([repositories.pages.get(slug), repositories.posts.get(slug)]);
  if (page || post) throw new ValidationError({ slug: 'Slug already exists.' });
}

async function uniqueSlug(base: string): Promise<string> {
  for (let index = 1; ; index++) {
    const candidate = `${base}-copy${index === 1 ? '' : `-${index}`}`.slice(0, 100);
    const [page, post] = await Promise.all([repositories.pages.get(candidate), repositories.posts.get(candidate)]);
    if (!page && !post) return candidate;
  }
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export async function listPages(): Promise<Page[]> {
  const pages = await repositories.pages.list();
  return pages.sort((a, b) => {
    if (a.slug === HOME_SLUG) return -1;
    if (b.slug === HOME_SLUG) return 1;
    return a.group.localeCompare(b.group) || (a.menuOrder ?? 0) - (b.menuOrder ?? 0) || a.title.localeCompare(b.title);
  });
}

export async function getPage(slug: string): Promise<Page> {
  const page = await repositories.pages.get(slug);
  if (!page) throw new NotFoundError('Page not found.');
  return page;
}

function parsePageSettings(input: unknown, existing?: Page): Omit<Page, 'id' | 'sections' | 'createdAt' | 'updatedAt'> {
  const form = validateOrThrow<PageSettingsForm>(pageSettingsFields, input);
  const errors: FieldErrors = {};

  const isHome = existing?.slug === HOME_SLUG;
  if (isHome && form.slug !== HOME_SLUG) errors.slug = 'The home page slug cannot be changed.';
  else if (!isHome && form.slug === HOME_SLUG) errors.slug = '"home" is reserved for the home page.';
  else if (!isHome) {
    const error = slugError(form.slug);
    if (error) errors.slug = error;
  }
  if (form.layout.type === 'article' && !form.layout.articleClassName.trim()) {
    errors['layout.articleClassName'] = 'Article CSS classes are required for the article layout.';
  }
  if (Object.keys(errors).length) throw new ValidationError(errors);

  const layout: PageLayout =
    form.layout.type === 'full-width'
      ? { type: 'full-width' }
      : {
          type: 'article',
          ...(form.layout.articleId.trim() ? { articleId: form.layout.articleId.trim() } : {}),
          articleClassName: form.layout.articleClassName.trim(),
          ...(form.layout.elementorId > 0 ? { elementorId: form.layout.elementorId } : {}),
        };

  return {
    slug: form.slug,
    title: form.title.trim(),
    status: form.status,
    group: form.group,
    ...(form.summary.trim() ? { summary: form.summary.trim() } : {}),
    ...(form.group === 'service' ? { menuOrder: form.menuOrder } : {}),
    seo: compactSeo(form.seo),
    layout,
  };
}

export function createPage(input: unknown): Promise<Page> {
  return withLock(WRITE_LOCK, async () => {
    const settings = parsePageSettings(input);
    await assertSlugAvailable(settings.slug);
    const timestamp = now();
    const page: Page = { id: randomUUID(), ...settings, sections: [], createdAt: timestamp, updatedAt: timestamp };
    await repositories.pages.save(page);
    await record({ action: 'created', entity: 'page', label: `${page.title} page created`, href: `/admin/pages/${page.slug}` });
    revalidateSite();
    return page;
  });
}

export function updatePageSettings(slug: string, input: unknown): Promise<Page> {
  return withLock(WRITE_LOCK, async () => {
    const existing = await getPage(slug);
    const settings = parsePageSettings(input, existing);
    await assertSlugAvailable(settings.slug, { kind: 'page', slug });
    const page: Page = { ...existing, ...settings, updatedAt: now() };
    if (settings.summary === undefined) delete page.summary;
    if (settings.menuOrder === undefined) delete page.menuOrder;
    await repositories.pages.save(page);
    if (page.slug !== slug) await repositories.pages.delete(slug);
    await record({ action: 'updated', entity: 'page', label: `${page.title} page settings updated`, href: `/admin/pages/${page.slug}` });
    revalidateSite();
    return page;
  });
}

export function deletePage(slug: string): Promise<void> {
  return withLock(WRITE_LOCK, async () => {
    if (slug === HOME_SLUG) throw new ConflictError('The home page cannot be deleted.');
    const page = await getPage(slug);
    await repositories.pages.delete(slug);
    await record({ action: 'deleted', entity: 'page', label: `${page.title} page deleted` });
    revalidateSite();
  });
}

export function duplicatePage(slug: string): Promise<Page> {
  return withLock(WRITE_LOCK, async () => {
    const source = await getPage(slug);
    const timestamp = now();
    const copy: Page = {
      ...structuredClone(source),
      id: randomUUID(),
      slug: await uniqueSlug(source.slug),
      title: `${source.title} (Copy)`,
      status: 'draft',
      sections: source.sections.map((section) => ({ ...structuredClone(section), id: randomUUID() })),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    await repositories.pages.save(copy);
    await record({ action: 'duplicated', entity: 'page', label: `${source.title} page duplicated`, href: `/admin/pages/${copy.slug}` });
    revalidateSite();
    return copy;
  });
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

interface SectionInput {
  type?: unknown;
  name?: unknown;
  enabled?: unknown;
  data?: unknown;
}

function parseSection(input: SectionInput, type: string): Omit<Section, 'id'> {
  const definition = getSectionDefinition(type);
  if (!definition) throw new ValidationError({ type: 'Invalid section type.' });

  const errors: FieldErrors = {};
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  if (!name) errors.name = 'Section name is required.';
  else if (name.length > 120) errors.name = 'Section name must be 120 characters or fewer.';

  const result = validateFields(definition.fields, input.data);
  for (const [path, message] of Object.entries(result.errors)) errors[`data.${path}`] = message;
  if (Object.keys(errors).length) throw new ValidationError(errors);

  return { type, name, enabled: input.enabled !== false, data: result.value };
}

async function mutatePage(slug: string, mutate: (page: Page) => void): Promise<Page> {
  // Stored documents are cached and frozen; edit a copy.
  const page = structuredClone(await getPage(slug));
  mutate(page);
  page.updatedAt = now();
  await repositories.pages.save(page);
  revalidateSite();
  return page;
}

function findSectionIndex(page: Page, sectionId: string): number {
  const index = page.sections.findIndex((section) => section.id === sectionId);
  if (index === -1) throw new NotFoundError('Section not found.');
  return index;
}

export function createSection(slug: string, input: SectionInput, position?: number): Promise<Section> {
  return withLock(WRITE_LOCK, async () => {
    const type = typeof input.type === 'string' ? input.type : '';
    const section: Section = { id: randomUUID(), ...parseSection(input, type) };
    const page = await mutatePage(slug, (target) => {
      const at = position === undefined ? target.sections.length : Math.max(0, Math.min(position, target.sections.length));
      target.sections.splice(at, 0, section);
    });
    await record({ action: 'created', entity: 'section', label: `${section.name} section added to ${page.title}`, href: `/admin/pages/${slug}` });
    return section;
  });
}

export function updateSection(slug: string, sectionId: string, input: SectionInput): Promise<Section> {
  return withLock(WRITE_LOCK, async () => {
    let updated: Section | undefined;
    const page = await mutatePage(slug, (target) => {
      const index = findSectionIndex(target, sectionId);
      const existing = target.sections[index];
      const merged: SectionInput = {
        name: input.name ?? existing.name,
        enabled: input.enabled ?? existing.enabled,
        data: input.data ?? existing.data,
      };
      updated = { id: existing.id, ...parseSection(merged, existing.type) };
      target.sections[index] = updated;
    });
    await record({ action: 'updated', entity: 'section', label: `${updated!.name} section updated on ${page.title}`, href: `/admin/pages/${slug}` });
    return updated!;
  });
}

export function deleteSection(slug: string, sectionId: string): Promise<void> {
  return withLock(WRITE_LOCK, async () => {
    let removed: Section | undefined;
    const page = await mutatePage(slug, (target) => {
      [removed] = target.sections.splice(findSectionIndex(target, sectionId), 1);
    });
    await record({ action: 'deleted', entity: 'section', label: `${removed!.name} section deleted from ${page.title}`, href: `/admin/pages/${slug}` });
  });
}

export function duplicateSection(slug: string, sectionId: string): Promise<Section> {
  return withLock(WRITE_LOCK, async () => {
    let copy: Section | undefined;
    const page = await mutatePage(slug, (target) => {
      const index = findSectionIndex(target, sectionId);
      const source = target.sections[index];
      copy = { ...structuredClone(source), id: randomUUID(), name: `${source.name} (Copy)` };
      target.sections.splice(index + 1, 0, copy);
    });
    await record({ action: 'duplicated', entity: 'section', label: `${copy!.name} created on ${page.title}`, href: `/admin/pages/${slug}` });
    return copy!;
  });
}

export function reorderSections(slug: string, orderedIds: unknown): Promise<Page> {
  return withLock(WRITE_LOCK, async () => {
    const page = await mutatePage(slug, (target) => {
      const ids = Array.isArray(orderedIds) ? orderedIds : [];
      const byId = new Map(target.sections.map((section) => [section.id, section]));
      const isPermutation =
        ids.length === target.sections.length && new Set(ids).size === ids.length && ids.every((id) => byId.has(id as string));
      if (!isPermutation) throw new ValidationError({ order: 'Section order must list every section exactly once.' });
      target.sections = ids.map((id) => byId.get(id as string)!);
    });
    await record({ action: 'reordered', entity: 'section', label: `Section order updated on ${page.title}`, href: `/admin/pages/${slug}` });
    return page;
  });
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function listPosts(): Promise<Post[]> {
  const posts = await repositories.posts.list();
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post> {
  const post = await repositories.posts.get(slug);
  if (!post) throw new NotFoundError('Post not found.');
  return post;
}

type PostForm = Omit<Post, 'id' | 'modified'> & {
  featuredImage: { url: string; alt: string };
  seo: { title: string; description: string };
};

function parsePost(input: unknown): PostForm {
  const form = validateOrThrow<PostForm>(postFields, input);
  const error = form.slug === HOME_SLUG ? '"home" is reserved for the home page.' : slugError(form.slug);
  if (error) throw new ValidationError({ slug: error });
  if (Number.isNaN(new Date(form.date).getTime())) throw new ValidationError({ date: 'Please enter a valid date.' });
  return form;
}

function buildPost(form: PostForm, base: Pick<Post, 'id'> & Partial<Post>): Post {
  const post: Post = {
    ...base,
    slug: form.slug,
    title: form.title.trim(),
    status: form.status,
    date: form.date,
    modified: now(),
    contentHtml: form.contentHtml,
  };
  const optional: Partial<Post> = {
    excerpt: form.excerpt?.trim() || undefined,
    author: form.author?.trim() || undefined,
    audioUrl: form.audioUrl?.trim() || undefined,
    categories: form.categories?.length ? form.categories : undefined,
    featuredImage: form.featuredImage.url.trim()
      ? { url: form.featuredImage.url.trim(), ...(form.featuredImage.alt ? { alt: form.featuredImage.alt } : {}) }
      : undefined,
    seo: form.seo.title || form.seo.description ? compactSeo(form.seo) : undefined,
  };
  for (const [key, value] of Object.entries(optional)) {
    if (value === undefined) delete (post as unknown as Record<string, unknown>)[key];
    else (post as unknown as Record<string, unknown>)[key] = value;
  }
  return post;
}

export function createPost(input: unknown): Promise<Post> {
  return withLock(WRITE_LOCK, async () => {
    const form = parsePost(input);
    await assertSlugAvailable(form.slug);
    const existing = await repositories.posts.list();
    const id = existing.reduce((max, post) => Math.max(max, post.id), 0) + 1;
    const post = buildPost(form, { id });
    await repositories.posts.save(post);
    await record({ action: 'created', entity: 'post', label: `Blog post "${post.title}" created`, href: '/admin/posts' });
    revalidateSite();
    return post;
  });
}

export function updatePost(slug: string, input: unknown): Promise<Post> {
  return withLock(WRITE_LOCK, async () => {
    const existing = await getPost(slug);
    const form = parsePost(input);
    await assertSlugAvailable(form.slug, { kind: 'post', slug });
    const post = buildPost(form, existing);
    await repositories.posts.save(post);
    if (post.slug !== slug) await repositories.posts.delete(slug);
    await record({ action: 'updated', entity: 'post', label: `Blog post "${post.title}" updated`, href: '/admin/posts' });
    revalidateSite();
    return post;
  });
}

export function deletePost(slug: string): Promise<void> {
  return withLock(WRITE_LOCK, async () => {
    const post = await getPost(slug);
    await repositories.posts.delete(slug);
    await record({ action: 'deleted', entity: 'post', label: `Blog post "${post.title}" deleted` });
    revalidateSite();
  });
}

// ---------------------------------------------------------------------------
// Global documents
// ---------------------------------------------------------------------------

const siteDocumentFields: Record<SiteDocumentKey, Field[]> = {
  settings: settingsFields,
  header: headerFields,
  footer: footerFields,
};

const siteDocumentLabels: Record<SiteDocumentKey, string> = {
  settings: 'Site settings',
  header: 'Header',
  footer: 'Footer',
};

export function isSiteDocumentKey(key: string): key is SiteDocumentKey {
  return Object.prototype.hasOwnProperty.call(siteDocumentFields, key);
}

export function getSiteDocument<K extends SiteDocumentKey>(key: K): Promise<SiteDocuments[K]> {
  return repositories.site.get(key);
}

export function updateSiteDocument<K extends SiteDocumentKey>(key: K, input: unknown): Promise<SiteDocuments[K]> {
  return withLock(WRITE_LOCK, async () => {
    const value = validateOrThrow<SiteDocuments[K]>(siteDocumentFields[key], input);
    await repositories.site.save(key, value);
    await record({ action: 'updated', entity: key, label: `${siteDocumentLabels[key]} updated`, href: `/admin/${key}` });
    revalidateSite();
    return value;
  });
}

export function getOffices(): Promise<Office[]> {
  return repositories.offices.list();
}

export function updateOffices(input: unknown): Promise<Office[]> {
  return withLock(WRITE_LOCK, async () => {
    const { offices } = validateOrThrow<{ offices: Office[] }>(officesDocumentFields, input);
    await repositories.offices.saveAll(offices);
    await record({ action: 'updated', entity: 'offices', label: 'Offices updated', href: '/admin/offices' });
    revalidateSite();
    return offices;
  });
}

export function recordActivity(entry: Omit<ActivityEntry, 'id' | 'at'>): Promise<void> {
  return record(entry);
}

export function listActivity(limit = 20): Promise<ActivityEntry[]> {
  return repositories.activity.list(limit);
}

