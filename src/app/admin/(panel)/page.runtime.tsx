import type { Metadata } from 'next';
import Link from 'next/link';
import Icon, { type IconName } from '@/components/admin/Icon';
import { PageHeader, StatusBadge, timeAgo } from '@/components/admin/ui/common';
import { pagePath } from '@/lib/cms/pages';
import { getOffices, listActivity, listPages, listPosts } from '@/lib/cms/services/admin';
import type { ActivityEntry } from '@/lib/cms/types';

export const metadata: Metadata = { title: 'Dashboard' };

const ACTIVITY_TONE: Record<ActivityEntry['action'], { icon: IconName; tone: string }> = {
  created: { icon: 'plus', tone: 'tone-green' },
  updated: { icon: 'edit', tone: 'tone-indigo' },
  deleted: { icon: 'trash', tone: 'tone-amber' },
  duplicated: { icon: 'copy', tone: 'tone-slate' },
  reordered: { icon: 'layers', tone: 'tone-orange' },
};

export default async function DashboardPage() {
  const [pages, posts, offices, activity] = await Promise.all([listPages(), listPosts(), getOffices(), listActivity(10)]);
  const published = pages.filter((page) => page.status === 'published').length;
  const sections = pages.reduce((total, page) => total + page.sections.length, 0);
  const recent = [...pages].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 6);

  const stats: Array<{ label: string; value: number; icon: IconName; tone: string; href: string }> = [
    { label: 'Total pages', value: pages.length, icon: 'pages', tone: 'tone-orange', href: '/admin/pages' },
    { label: 'Total sections', value: sections, icon: 'layers', tone: 'tone-indigo', href: '/admin/pages' },
    { label: 'Published pages', value: published, icon: 'globe', tone: 'tone-green', href: '/admin/pages' },
    { label: 'Draft pages', value: pages.length - published, icon: 'draft', tone: 'tone-amber', href: '/admin/pages' },
    { label: 'Blog posts', value: posts.length, icon: 'posts', tone: 'tone-slate', href: '/admin/posts' },
    { label: 'Offices', value: offices.length, icon: 'offices', tone: 'tone-slate', href: '/admin/offices' },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="An overview of your website content." />

      <div className="cms-stats">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="cms-card cms-stat">
            <div className={`cms-stat-icon ${stat.tone}`}>
              <Icon name={stat.icon} size={20} />
            </div>
            <div>
              <div className="cms-stat-value">{stat.value}</div>
              <div className="cms-stat-label">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="cms-grid-2">
        <div className="cms-card">
          <div className="cms-card-header">
            <h2>Recently updated pages</h2>
            <Link href="/admin/pages" className="cms-btn cms-btn-ghost cms-btn-sm">View all</Link>
          </div>
          <ul className="cms-feed">
            {recent.map((page) => (
              <li key={page.slug}>
                <div className="cms-feed-dot tone-orange"><Icon name="pages" size={15} /></div>
                <div className="cms-feed-text">
                  <Link href={`/admin/pages/${page.slug}`} className="cms-cell-title">{page.title}</Link>
                  <div className="cms-cell-sub">{pagePath(page.slug)} · {page.sections.length} sections</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <StatusBadge status={page.status} />
                  <div className="cms-feed-time" style={{ marginTop: 4 }}>{timeAgo(page.updatedAt)}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="cms-card">
          <div className="cms-card-header">
            <h2>Recent changes</h2>
          </div>
          {activity.length === 0 ? (
            <div className="cms-empty" style={{ padding: 32 }}>
              <div className="cms-empty-icon"><Icon name="clock" size={22} /></div>
              <h3>No changes yet</h3>
              <p>Edits made in the admin will appear here.</p>
            </div>
          ) : (
            <ul className="cms-feed">
              {activity.map((entry) => {
                const tone = ACTIVITY_TONE[entry.action];
                return (
                  <li key={entry.id}>
                    <div className={`cms-feed-dot ${tone.tone}`}><Icon name={tone.icon} size={15} /></div>
                    <div className="cms-feed-text">{entry.href ? <Link href={entry.href}>{entry.label}</Link> : entry.label}</div>
                    <span className="cms-feed-time" title={new Date(entry.at).toLocaleString()}>{timeAgo(entry.at)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="cms-card" style={{ marginTop: 20 }}>
        <div className="cms-card-header"><h2>Quick actions</h2></div>
        <div className="cms-card-body">
          <div className="cms-quick">
            <Link href="/admin/pages/home"><Icon name="pages" /> Edit home page</Link>
            <Link href="/admin/posts"><Icon name="posts" /> Write a blog post</Link>
            <Link href="/admin/header"><Icon name="header" /> Edit navigation</Link>
            <Link href="/admin/media"><Icon name="media" /> Upload images</Link>
          </div>
        </div>
      </div>
    </>
  );
}
