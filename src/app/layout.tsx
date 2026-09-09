// @ts-nocheck
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

export const metadata: Metadata = {
  title: "Licensed Security Guard Services in California - ADS Guards",
  description: "Licensed Security Guard Services in California - ADS Guards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/css/css_0_style.min.css" />
        <link rel="stylesheet" href="/css/css_1_latest.css" />
        <link rel="stylesheet" href="/css/css_2_global.min.css" />
        <link rel="stylesheet" href="/css/css_3_header.min.css" />
        <link rel="stylesheet" href="/css/css_4_content.min.css" />
        <link rel="stylesheet" href="/css/css_5_footer.min.css" />
        <link rel="stylesheet" href="/css/css_6_frontend.min.css" />
        <link rel="stylesheet" href="/css/css_7_widget-heading.min.css" />
        <link rel="stylesheet" href="/css/css_8_widget-social-icons.min.css" />
        <link rel="stylesheet" href="/css/css_9_apple-webkit.min.css" />
        <link rel="stylesheet" href="/css/css_10_widget-image.min.css" />
        <link rel="stylesheet" href="/css/css_11_widget-nav-menu.min.css" />
        <link rel="stylesheet" href="/css/css_12_common.css" />
        <link rel="stylesheet" href="/css/css_13_nav-menu.css" />
        <link rel="stylesheet" href="/css/css_14_flash.min.css" />
        <link rel="stylesheet" href="/css/css_15_widget-icon-box.min.css" />
        <link rel="stylesheet" href="/css/css_16_widget-icon-list.min.css" />
        <link rel="stylesheet" href="/css/css_17_widget-divider.min.css" />
        <link rel="stylesheet" href="/css/css_18_widget-form.min.css" />
        <link rel="stylesheet" href="/css/css_19_elementor-icons.min.css" />
        <link rel="stylesheet" href="/css/css_20_post-6.css" />
        <link rel="stylesheet" href="/css/css_21_slideInLeft.min.css" />
        <link rel="stylesheet" href="/css/css_22_slideInRight.min.css" />
        <link rel="stylesheet" href="/css/css_23_testimonial.css" />
        <link rel="stylesheet" href="/css/css_24_swiper.min.css" />
        <link rel="stylesheet" href="/css/css_25_post-7.css" />
        <link rel="stylesheet" href="/css/css_26_post-4734.css" />
        <link rel="stylesheet" href="/css/css_27_post-4740.css" />
        <link rel="stylesheet" href="/css/css_28_header-search.css" />
        <link rel="stylesheet" href="/css/css_29_header-offcanvas.css" />
        <link rel="stylesheet" href="/css/css_30_header-info.css" />
        <link rel="stylesheet" href="/css/css_31_general.min.css" />
        <link rel="stylesheet" href="/css/css_32_plusjakartasans.css" />
        <link rel="stylesheet" href="/css/css_33_bebasneue.css" />
        <link rel="stylesheet" href="/css/css_34_roboto.css" />
        <link rel="stylesheet" href="/css/css_35_oswald.css" />
        <link rel="stylesheet" href="/css/css_36_fontawesome.min.css" />
        <link rel="stylesheet" href="/css/css_37_solid.min.css" />
        <link rel="stylesheet" href="/css/css_38_ekiticons.css" />
        <link rel="stylesheet" href="/css/css_39_brands.min.css" />
        <link rel="stylesheet" href="/css/css_40_post-75.css" />
        <link rel="stylesheet" href="/css/css_41_post-969.css" />
        <link rel="stylesheet" href="/css/css_42_post-1198.css" />
        <link rel="stylesheet" href="/css/css_43_popup.min.css" />
        <script src="/js/js_0_js_P2lkPUct.js" async></script>
        <script src="/js/js_1_frontend-gtag.min.js" async></script>
        <script src="/js/js_2_jquery.min.js" async></script>
        <script src="/js/js_3_jquery-migrate.min.js" async></script>
        <script src="/js/js_4_js_P2lkPUct.js" async></script>
        <script src="/js/js_5_jquery-3.6.0.min.js" async></script>
        <script src="/js/js_6_jquery-3.6.0.min.js" async></script>
        <script src="/js/js_7_jquery-3.6.0.min.js" async></script>
        <script src="/js/js_8_navigation.min.js" async></script>
        <script src="/js/js_9_webpack.runtime.min.js" async></script>
        <script src="/js/js_10_frontend-modules.min.js" async></script>
        <script src="/js/js_11_core.min.js" async></script>
        <script src="/js/js_12_frontend.min.js" async></script>
        <script src="/js/js_13_jquery.smartmenus.min.js" async></script>
        <script src="/js/js_14_nav-menu.js" async></script>
        <script src="/js/js_15_core.js" async></script>
        <script src="/js/js_16_nav-menu.js" async></script>
        <script src="/js/js_17_testimonial.js" async></script>
        <script src="/js/js_18_swiper.min.js" async></script>
        <script src="/js/js_19_jquery.magnific-popup.min.js" async></script>
        <script src="/js/js_20_header-search.js" async></script>
        <script src="/js/js_21_header-offcanvas.js" async></script>
        <script src="/js/js_22_general.min.js" async></script>
        <script src="/js/js_23_api.js_P3JlbmRl.js" async></script>
        <script src="/js/js_24_webpack-pro.runtime.min.js" async></script>
        <script src="/js/js_25_hooks.min.js" async></script>
        <script src="/js/js_26_i18n.min.js" async></script>
        <script src="/js/js_27_frontend.min.js" async></script>
        <script src="/js/js_28_elements-handlers.min.js" async></script>
        <script src="/js/js_29_tccl-tti.min.js" async></script>
      </head>
      <body suppressHydrationWarning className="home wp-singular page-template-default page page-id-7 wp-custom-logo wp-embed-responsive wp-theme-kadence footer-on-bottom hide-focus-outline link-style-standard content-title-style-hide content-width-fullwidth content-style-unboxed content-vertical-padding-hide non-transparent-header mobile-non-transparent-header kadence-elementor-colors elementor-default elementor-kit-6 elementor-page elementor-page-7">
        <Header />
        <main id="inner-wrap" className="wrap kt-clear" role="main">
          <div id="primary" className="content-area">
            <div className="content-container site-container">
              <div id="main" className="site-main">
                <div className="content-wrap">
                  <article id="post-7" className="entry content-bg single-entry post-7 page type-page status-publish has-post-thumbnail hentry">
                    <div className="entry-content-wrap">
                      <div className="entry-content single-content">
                        <div data-elementor-type="wp-page" data-elementor-id="7" className="elementor elementor-7" data-elementor-post-type="page">
                          {children}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <ScrollToTop />

      </body>
    </html>
  );
}
