import React from 'react';
import SectionRenderer from '@/components/sections/SectionRenderer';
import type { Page } from '@/lib/cms/types';
import SiteShell from './SiteShell';

/** Renders a CMS page: the theme shell, the page's article wrapper and its sections. */
export default function PageView({ page }: { page: Page }) {
  const { layout } = page;

  if (layout.type === 'full-width') {
    return (
      <SiteShell fullWidth>
        {page.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </SiteShell>
    );
  }

  const sections = page.sections.map((section) => (
    <SectionRenderer key={section.id} section={section} pageScope={layout.elementorId} />
  ));

  return (
    <SiteShell>
      <article id={layout.articleId} className={layout.articleClassName}>
        <div className="entry-content-wrap">
          <div className="entry-content single-content">
            {layout.elementorId ? (
              <div data-elementor-type="wp-page" data-elementor-id={layout.elementorId} className={`elementor elementor-${layout.elementorId}`} data-elementor-post-type="page">
                {sections}
              </div>
            ) : (
              sections
            )}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
