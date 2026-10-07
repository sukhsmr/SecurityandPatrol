import React from 'react';
import ConnectedHeader from '@/components/Header/Connected';
import Footer from '@/components/Footer';
import { backgroundCssForFields } from '@/lib/cms/backgrounds';
import { footerFields, headerFields } from '@/lib/cms/schema/documents';
import { getFooter, getHeader } from '@/lib/cms/services/content';

interface SiteShellProps {
  children: React.ReactNode;
  /** Edge-to-edge content without the theme's content container (blog listing). */
  fullWidth?: boolean;
}

/** The theme wrapper shared by every public page: header, content area and footer. */
export default async function SiteShell({ children, fullWidth = false }: SiteShellProps) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()]);
  // Background images changed in the admin override the design CSS.
  const backgroundCss = backgroundCssForFields(headerFields, header) + backgroundCssForFields(footerFields, footer);
  return (
    <>
      {backgroundCss && <style data-cms-backgrounds="">{backgroundCss}</style>}
      <div id="wrapper" className="site wp-site-blocks">
        <a className="skip-link screen-reader-text scroll-ignore" href="#main">Skip to content</a>
        <ConnectedHeader />
        {fullWidth ? (
          <div id="content" className="site-content" style={{ padding: 0 }}>
            <main id="inner-wrap" className="wrap kt-clear" role="main" style={{ padding: 0, width: '100%', maxWidth: '100%' }}>
              {children}
            </main>
          </div>
        ) : (
          <div id="content" className="site-content">
            <main id="inner-wrap" className="wrap kt-clear" role="main">
              <div id="primary" className="content-area">
                <div className="content-container site-container">
                  <div id="main" className="site-main">
                    <div className="content-wrap">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        )}
        <Footer data={footer} />
      </div>
    </>
  );
}
