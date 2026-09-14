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
        <script dangerouslySetInnerHTML={{
          __html: `
            window.kadenceConfig = { "screenReader": { "expand": "Child menu", "expandOf": "Child menu of", "collapse": "Child menu", "collapseOf": "Child menu of" }, "breakPoints": { "desktop": "1024", "tablet": 768 }, "scrollOffset": "0" };
            window.elementorFrontendConfig = { "environmentMode": { "edit": false, "wpPreview": false, "isScriptDebug": false }, "i18n": { "shareOnFacebook": "Share on Facebook", "shareOnX": "Share on X", "pinIt": "Pin it", "download": "Download", "downloadImage": "Download image", "fullscreen": "Fullscreen", "zoom": "Zoom", "share": "Share", "playVideo": "Play Video", "previous": "Previous", "next": "Next", "close": "Close", "a11yCarouselPrevSlideMessage": "Previous slide", "a11yCarouselNextSlideMessage": "Next slide", "a11yCarouselFirstSlideMessage": "This is the first slide", "a11yCarouselLastSlideMessage": "This is the last slide", "a11yCarouselPaginationBulletMessage": "Go to slide" }, "is_rtl": false, "breakpoints": { "xs": 0, "sm": 480, "md": 768, "lg": 1025, "xl": 1440, "xxl": 1600 }, "responsive": { "breakpoints": { "mobile": { "label": "Mobile Portrait", "value": 767, "default_value": 767, "direction": "max", "is_enabled": true }, "mobile_extra": { "label": "Mobile Landscape", "value": 880, "default_value": 880, "direction": "max", "is_enabled": false }, "tablet": { "label": "Tablet Portrait", "value": 1024, "default_value": 1024, "direction": "max", "is_enabled": true }, "tablet_extra": { "label": "Tablet Landscape", "value": 1200, "default_value": 1200, "direction": "max", "is_enabled": false }, "laptop": { "label": "Laptop", "value": 1366, "default_value": 1366, "direction": "max", "is_enabled": false }, "widescreen": { "label": "Widescreen", "value": 2400, "default_value": 2400, "direction": "min", "is_enabled": false } }, "hasCustomBreakpoints": false }, "version": "4.2.4", "is_static": false, "experimentalFeatures": { "additional_custom_breakpoints": true, "container": true, "e_panel_promotions": true, "theme_builder_v2": true, "global_classes_should_enforce_capabilities": true, "e_variables": true, "e_opt_in_v4_page": true, "e_components": true, "e_interactions": true, "e_widget_creation": true, "import-export-customization": true, "e_pro_atomic_form": true, "e_pro_variables": true, "e_pro_interactions": true }, "urls": { "assets": "/wp-content/plugins/elementor/assets/", "ajaxurl": "/wp-admin/admin-ajax.php", "uploadUrl": "/wp-content/uploads" }, "nonces": { "floatingButtonsClickTracking": "087d5b6e3e", "atomicFormsSendForm": "81c46e1a6a" }, "swiperClass": "swiper", "settings": { "page": [], "editorPreferences": [] }, "kit": { "active_breakpoints": ["viewport_mobile", "viewport_tablet"], "global_image_lightbox": "yes", "lightbox_enable_counter": "yes", "lightbox_enable_fullscreen": "yes", "lightbox_enable_zoom": "yes", "lightbox_enable_share": "yes", "lightbox_title_src": "title", "lightbox_description_src": "description" }, "post": { "id": 7, "title": "Licensed%20Security%20Guard%20Services%20in%20California%20-%20ADS%20Guards", "excerpt": "", "featuredImage": "/wp-content/uploads/2023/03/MOBILE_PATROL-e1753305772866.jpg" } };
            window.ekit_config = { "ajaxurl": "/wp-admin/admin-ajax.php", "nonce": "d6f87dc623", "i18n": { "video_frame": "Video player", "close": "Close", "slider_prev": "Previous slide", "slider_next": "Next slide", "slider_first": "This is the first slide", "slider_last": "This is the last slide", "slider_bullet": "Go to slide {{index}}" } };
            window.localize = { "ajaxurl": "/wp-admin/admin-ajax.php", "nonce": "e14acbf3f9", "i18n": { "added": "Added ", "compare": "Compare", "loading": "Loading..." }, "eael_translate_text": { "required_text": "is a required field", "invalid_text": "Invalid", "billing_text": "Billing", "shipping_text": "Shipping", "fg_mfp_counter_text": "of" }, "page_permalink": "/", "cart_redirectition": "", "cart_page_url": "", "el_breakpoints": { "mobile": { "label": "Mobile Portrait", "value": 767, "default_value": 767, "direction": "max", "is_enabled": true }, "mobile_extra": { "label": "Mobile Landscape", "value": 880, "default_value": 880, "direction": "max", "is_enabled": false }, "tablet": { "label": "Tablet Portrait", "value": 1024, "default_value": 1024, "direction": "max", "is_enabled": true }, "tablet_extra": { "label": "Tablet Landscape", "value": 1200, "default_value": 1200, "direction": "max", "is_enabled": false }, "laptop": { "label": "Laptop", "value": 1366, "default_value": 1366, "direction": "max", "is_enabled": false }, "widescreen": { "label": "Widescreen", "value": 2400, "default_value": 2400, "direction": "min", "is_enabled": false } } };
            window.ElementorProFrontendConfig = { "ajaxurl": "/wp-admin/admin-ajax.php", "nonce": "0cada1b100", "urls": { "assets": "/wp-content/plugins/elementor-pro/assets/", "rest": "/wp-json/" }, "settings": { "lazy_load_background_images": true }, "popup": { "hasPopUps": true }, "shareButtonsNetworks": { "facebook": { "title": "Facebook", "has_counter": true }, "twitter": { "title": "Twitter" }, "linkedin": { "title": "LinkedIn", "has_counter": true }, "pinterest": { "title": "Pinterest", "has_counter": true }, "reddit": { "title": "Reddit", "has_counter": true }, "vk": { "title": "VK", "has_counter": true }, "odnoklassniki": { "title": "OK", "has_counter": true }, "tumblr": { "title": "Tumblr" }, "digg": { "title": "Digg" }, "skype": { "title": "Skype" }, "stumbleupon": { "title": "StumbleUpon", "has_counter": true }, "mix": { "title": "Mix" }, "telegram": { "title": "Telegram" }, "pocket": { "title": "Pocket", "has_counter": true }, "xing": { "title": "XING", "has_counter": true }, "whatsapp": { "title": "WhatsApp" }, "email": { "title": "Email" }, "print": { "title": "Print" }, "x-twitter": { "title": "X" }, "threads": { "title": "Threads" } }, "facebook_sdk": { "lang": "en_US", "app_id": "" }, "lottie": { "defaultAnimationUrl": "/wp-content/plugins/elementor-pro/modules/lottie/assets/animations/default.json" } };
          `
        }} />
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
