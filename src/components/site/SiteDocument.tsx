import React from 'react';
import Script from 'next/script';
import ScrollToTop from '@/components/ScrollToTop';
import { SITE_STYLESHEET } from './siteStylesheet';

/**
 * The public site's HTML document: the original WordPress/Elementor
 * stylesheets, jQuery and body classes. Shared by the site layout and the
 * global 404 page.
 */
export default function SiteDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src="/wp-includes/js/jquery/jquery.min.js" strategy="beforeInteractive" />
        {/* The original ~70 WordPress/LiteSpeed stylesheets, concatenated in their
            original order by scripts/bundle-css.cjs (one request instead of ~70). */}
        <link rel="stylesheet" href={SITE_STYLESHEET} />
        </head>
      <body suppressHydrationWarning className="home wp-singular page-template-default page page-id-7 wp-custom-logo wp-embed-responsive wp-theme-kadence footer-on-bottom hide-focus-outline link-style-standard content-title-style-hide content-width-fullwidth content-style-unboxed content-vertical-padding-hide non-transparent-header mobile-non-transparent-header kadence-elementor-colors elementor-default elementor-kit-6 elementor-page elementor-page-7">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
