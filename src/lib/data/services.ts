import { query } from '@/lib/db';

export interface Service {
  id: string;
  wpId: number | null;
  title: string;
  summary: string | null;
  seo?: { title?: string; description?: string };
  contentHtml: string;
}

interface ServiceRow {
  slug: string;
  wp_id: number | null;
  title: string;
  summary: string | null;
  seo_title: string | null;
  seo_description: string | null;
  content_html: string;
  heading_tag: string | null;
  heading_occurrence: number;
  heading_subtitle: string | null;
}

const SELECT_FIELDS =
  'slug, wp_id, title, summary, seo_title, seo_description, content_html, heading_tag, heading_occurrence, heading_subtitle';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// content_html is a raw scraped HTML blob and is never rewritten in the
// database — no markup is stored for this feature, only plain data
// (heading_tag, heading_occurrence, heading_subtitle). This finds the
// Nth occurrence of that heading tag and swaps its content for one built
// from the live `title` column, entirely in code, on every read.
function syncHeading(
  contentHtml: string,
  tag: string | null,
  occurrence: number,
  subtitle: string | null,
  title: string
): string {
  if (!tag) return contentHtml;

  const re = new RegExp(`<${tag} class="elementor-heading-title elementor-size-default">[\\s\\S]*?</${tag}>`, 'g');
  let index = 0;
  let matchToReplace: RegExpExecArray | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(contentHtml))) {
    if (index === occurrence) {
      matchToReplace = m;
      break;
    }
    index++;
  }
  if (!matchToReplace) return contentHtml;

  const inner = subtitle ? `${escapeHtml(title)}<br><span>${escapeHtml(subtitle)}</span>` : escapeHtml(title);
  const replacement = `<${tag} class="elementor-heading-title elementor-size-default">${inner}</${tag}>`;
  return contentHtml.slice(0, matchToReplace.index) + replacement + contentHtml.slice(matchToReplace.index + matchToReplace[0].length);
}

function toService(row: ServiceRow): Service {
  const contentHtml = syncHeading(
    row.content_html,
    row.heading_tag,
    row.heading_occurrence,
    row.heading_subtitle,
    row.title
  );

  return {
    id: row.slug,
    wpId: row.wp_id,
    title: row.title,
    summary: row.summary,
    seo: { title: row.seo_title || undefined, description: row.seo_description || undefined },
    contentHtml,
  };
}

export async function getAllServices(): Promise<Service[]> {
  const rows = await query<ServiceRow[]>(
    `SELECT ${SELECT_FIELDS} FROM services ORDER BY sort_order ASC, id ASC`
  );
  return rows.map(toService);
}

export async function getServicesBySlugs(slugs: string[]): Promise<Service[]> {
  if (slugs.length === 0) return [];
  const placeholders = slugs.map(() => '?').join(',');
  const rows = await query<ServiceRow[]>(
    `SELECT ${SELECT_FIELDS} FROM services WHERE slug IN (${placeholders})`,
    slugs
  );
  const bySlug = new Map(rows.map((r) => [r.slug, toService(r)]));
  return slugs.map((slug) => bySlug.get(slug)).filter((s): s is Service => Boolean(s));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const rows = await query<ServiceRow[]>(
    `SELECT ${SELECT_FIELDS} FROM services WHERE slug = ? LIMIT 1`,
    [slug]
  );
  return rows.length ? toService(rows[0]) : null;
}
