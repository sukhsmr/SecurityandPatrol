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
      <head dangerouslySetInnerHTML={{ __html: `<meta charSet="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
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

<script src="/js/js_0_js_P2lkPUct.js"></script>
<script src="/js/js_1_frontend-gtag.min.js"></script>
<script src="/js/js_2_jquery.min.js"></script>
<script src="/js/js_3_jquery-migrate.min.js"></script>
<script src="/js/js_4_js_P2lkPUct.js"></script>
<script src="/js/js_5_jquery-3.6.0.min.js"></script>
<script src="/js/js_6_jquery-3.6.0.min.js"></script>
<script src="/js/js_7_jquery-3.6.0.min.js"></script>
<script src="/js/js_8_navigation.min.js"></script>
<script src="/js/js_9_webpack.runtime.min.js"></script>
<script src="/js/js_10_frontend-modules.min.js"></script>
<script src="/js/js_11_core.min.js"></script>
<script src="/js/js_12_frontend.min.js"></script>
<script src="/js/js_13_jquery.smartmenus.min.js"></script>
<script src="/js/js_14_nav-menu.js"></script>
<script src="/js/js_15_core.js"></script>
<script src="/js/js_16_nav-menu.js"></script>
<script src="/js/js_17_testimonial.js"></script>
<script src="/js/js_18_swiper.min.js"></script>
<script src="/js/js_19_jquery.magnific-popup.min.js"></script>
<script src="/js/js_20_header-search.js"></script>
<script src="/js/js_21_header-offcanvas.js"></script>
<script src="/js/js_22_general.min.js"></script>
<script src="/js/js_23_api.js_P3JlbmRl.js"></script>
<script src="/js/js_24_webpack-pro.runtime.min.js"></script>
<script src="/js/js_25_hooks.min.js"></script>
<script src="/js/js_26_i18n.min.js"></script>
<script src="/js/js_27_frontend.min.js"></script>
<script src="/js/js_28_elements-handlers.min.js"></script>
<script src="/js/js_29_tccl-tti.min.js"></script>
` }} />
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
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "<script type=\"speculationrules\">{\"prefetch\":[{\"source\":\"document\",\"where\":{\"and\":[{\"href_matches\":\"\\/*\"},{\"not\":{\"href_matches\":[\"\\/wp-*.php\",\"\\/wp-admin\\/*\",\"\\/wp-content\\/uploads\\/*\",\"\\/wp-content\\/*\",\"\\/wp-content\\/plugins\\/*\",\"\\/wp-content\\/themes\\/kadence\\/*\",\"\\/*\\\\?(.+)\"]}},{\"not\":{\"selector_matches\":\"a[rel~=\\\"nofollow\\\"]\"}},{\"not\":{\"selector_matches\":\".no-prefetch, .no-prefetch a\"}}]},\"eagerness\":\"conservative\"}]}</script>\n<script type=\"litespeed/javascript\" data-src=\"https://www.google.com/recaptcha/api.js?render=explicit&amp;ver=4.0.3\" id=\"elementor-recaptcha-api-js\"></script>\n\n<script type=\"module\">async function load(){await new Promise((t=>{\"complete\"===document.readyState?t():window.addEventListener(\"load\",t,{once:!0})})),\"function\"==typeof requestIdleCallback&&await new Promise((t=>{requestIdleCallback(t)}));const t=\"script#optimization-detective-detect-args\",e=document.querySelector(t);if(!(e instanceof HTMLScriptElement))throw new Error(`Missing: ${t}`);const o=JSON.parse(e.text);if(!Array.isArray(o)||2!==o.length||\"string\"!=typeof o[0]||\"object\"!=typeof o[1])throw new Error(\"SCRIPT#optimization-detective-detect-args is not [ string, object ]\");const i=o[0],a=o[1],n=(await import(i)).default;await n(a)}load();\n//# sourceURL=https://www.adsguards.com/wp-content/plugins/optimization-detective/detect-loader.min.js?ver=1.0.0-beta6</script>\n<script data-no-optimize=\"1\">window.lazyLoadOptions=Object.assign({},{threshold:300},window.lazyLoadOptions||{});!function(t,e){\"object\"==typeof exports&&\"undefined\"!=typeof module?module.exports=e():\"function\"==typeof define&&define.amd?define(e):(t=\"undefined\"!=typeof globalThis?globalThis:t||self).LazyLoad=e()}(this,function(){\"use strict\";function e(){return(e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n,a=arguments[e];for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}).apply(this,arguments)}function o(t){return e({},at,t)}function l(t,e){return t.getAttribute(gt+e)}function c(t){return l(t,vt)}function s(t,e){return function(t,e,n){e=gt+e;null!==n?t.setAttribute(e,n):t.removeAttribute(e)}(t,vt,e)}function i(t){return s(t,null),0}function r(t){return null===c(t)}function u(t){return c(t)===_t}function d(t,e,n,a){t&&(void 0===a?void 0===n?t(e):t(e,n):t(e,n,a))}function f(t,e){et?t.classList.add(e):t.className+=(t.className?\" \":\"\")+e}function _(t,e){et?t.classList.remove(e):t.className=t.className.replace(new RegExp(\"(^|\\\\s+)\"+e+\"(\\\\s+|$)\"),\" \").replace(/^\\s+/,\"\").replace(/\\s+$/,\"\")}function g(t){return t.llTempImage}function v(t,e){!e||(e=e._observer)&&e.unobserve(t)}function b(t,e){t&&(t.loadingCount+=e)}function p(t,e){t&&(t.toLoadCount=e)}function n(t){for(var e,n=[],a=0;e=t.children[a];a+=1)\"SOURCE\"===e.tagName&&n.push(e);return n}function h(t,e){(t=t.parentNode)&&\"PICTURE\"===t.tagName&&n(t).forEach(e)}function a(t,e){n(t).forEach(e)}function m(t){return!!t[lt]}function E(t){return t[lt]}function I(t){return delete t[lt]}function y(e,t){var n;m(e)||(n={},t.forEach(function(t){n[t]=e.getAttribute(t)}),e[lt]=n)}function L(a,t){var o;m(a)&&(o=E(a),t.forEach(function(t){var e,n;e=a,(t=o[n=t])?e.setAttribute(n,t):e.removeAttribute(n)}))}function k(t,e,n){f(t,e.class_loading),s(t,st),n&&(b(n,1),d(e.callback_loading,t,n))}function A(t,e,n){n&&t.setAttribute(e,n)}function O(t,e){A(t,rt,l(t,e.data_sizes)),A(t,it,l(t,e.data_srcset)),A(t,ot,l(t,e.data_src))}function w(t,e,n){var a=l(t,e.data_bg_multi),o=l(t,e.data_bg_multi_hidpi);(a=nt&&o?o:a)&&(t.style.backgroundImage=a,n=n,f(t=t,(e=e).class_applied),s(t,dt),n&&(e.unobserve_completed&&v(t,e),d(e.callback_applied,t,n)))}function x(t,e){!e||0<e.loadingCount||0<e.toLoadCount||d(t.callback_finish,e)}function M(t,e,n){t.addEventListener(e,n),t.llEvLisnrs[e]=n}function N(t){return!!t.llEvLisnrs}function z(t){if(N(t)){var e,n,a=t.llEvLisnrs;for(e in a){var o=a[e];n=e,o=o,t.removeEventListener(n,o)}delete t.llEvLisnrs}}function C(t,e,n){var a;delete t.llTempImage,b(n,-1),(a=n)&&--a.toLoadCount,_(t,e.class_loading),e.unobserve_completed&&v(t,n)}function R(i,r,c){var l=g(i)||i;N(l)||function(t,e,n){N(t)||(t.llEvLisnrs={});var a=\"VIDEO\"===t.tagName?\"loadeddata\":\"load\";M(t,a,e),M(t,\"error\",n)}(l,function(t){var e,n,a,o;n=r,a=c,o=u(e=i),C(e,n,a),f(e,n.class_loaded),s(e,ut),d(n.callback_loaded,e,a),o||x(n,a),z(l)},function(t){var e,n,a,o;n=r,a=c,o=u(e=i),C(e,n,a),f(e,n.class_error),s(e,ft),d(n.callback_error,e,a),o||x(n,a),z(l)})}function T(t,e,n){var a,o,i,r,c;t.llTempImage=document.createElement(\"IMG\"),R(t,e,n),m(c=t)||(c[lt]={backgroundImage:c.style.backgroundImage}),i=n,r=l(a=t,(o=e).data_bg),c=l(a,o.data_bg_hidpi),(r=nt&&c?c:r)&&(a.style.backgroundImage='url(\"'.concat(r,'\")'),g(a).setAttribute(ot,r),k(a,o,i)),w(t,e,n)}function G(t,e,n){var a;R(t,e,n),a=e,e=n,(t=Et[(n=t).tagName])&&(t(n,a),k(n,a,e))}function D(t,e,n){var a;a=t,(-1<It.indexOf(a.tagName)?G:T)(t,e,n)}function S(t,e,n){var a;t.setAttribute(\"loading\",\"lazy\"),R(t,e,n),a=e,(e=Et[(n=t).tagName])&&e(n,a),s(t,_t)}function V(t){t.removeAttribute(ot),t.removeAttribute(it),t.removeAttribute(rt)}function j(t){h(t,function(t){L(t,mt)}),L(t,mt)}function F(t){var e;(e=yt[t.tagName])?e(t):m(e=t)&&(t=E(e),e.style.backgroundImage=t.backgroundImage)}function P(t,e){var n;F(t),n=e,r(e=t)||u(e)||(_(e,n.class_entered),_(e,n.class_exited),_(e,n.class_applied),_(e,n.class_loading),_(e,n.class_loaded),_(e,n.class_error)),i(t),I(t)}function U(t,e,n,a){var o;n.cancel_on_exit&&(c(t)!==st||\"IMG\"===t.tagName&&(z(t),h(o=t,function(t){V(t)}),V(o),j(t),_(t,n.class_loading),b(a,-1),i(t),d(n.callback_cancel,t,e,a)))}function $(t,e,n,a){var o,i,r=(i=t,0<=bt.indexOf(c(i)));s(t,\"entered\"),f(t,n.class_entered),_(t,n.class_exited),o=t,i=a,n.unobserve_entered&&v(o,i),d(n.callback_enter,t,e,a),r||D(t,n,a)}function q(t){return t.use_native&&\"loading\"in HTMLImageElement.prototype}function H(t,o,i){t.forEach(function(t){return(a=t).isIntersecting||0<a.intersectionRatio?$(t.target,t,o,i):(e=t.target,n=t,a=o,t=i,void(r(e)||(f(e,a.class_exited),U(e,n,a,t),d(a.callback_exit,e,n,t))));var e,n,a})}function B(e,n){var t;tt&&!q(e)&&(n._observer=new IntersectionObserver(function(t){H(t,e,n)},{root:(t=e).container===document?null:t.container,rootMargin:t.thresholds||t.threshold+\"px\"}))}function J(t){return Array.prototype.slice.call(t)}function K(t){return t.container.querySelectorAll(t.elements_selector)}function Q(t){return c(t)===ft}function W(t,e){return e=t||K(e),J(e).filter(r)}function X(e,t){var n;(n=K(e),J(n).filter(Q)).forEach(function(t){_(t,e.class_error),i(t)}),t.update()}function t(t,e){var n,a,t=o(t);this._settings=t,this.loadingCount=0,B(t,this),n=t,a=this,Y&&window.addEventListener(\"online\",function(){X(n,a)}),this.update(e)}var Y=\"undefined\"!=typeof window,Z=Y&&!(\"onscroll\"in window)||\"undefined\"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),tt=Y&&\"IntersectionObserver\"in window,et=Y&&\"classList\"in document.createElement(\"p\"),nt=Y&&1<window.devicePixelRatio,at={elements_selector:\".lazy\",container:Z||Y?document:null,threshold:300,thresholds:null,data_src:\"src\",data_srcset:\"srcset\",data_sizes:\"sizes\",data_bg:\"bg\",data_bg_hidpi:\"bg-hidpi\",data_bg_multi:\"bg-multi\",data_bg_multi_hidpi:\"bg-multi-hidpi\",data_poster:\"poster\",class_applied:\"applied\",class_loading:\"litespeed-loading\",class_loaded:\"litespeed-loaded\",class_error:\"error\",class_entered:\"entered\",class_exited:\"exited\",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!0,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1},ot=\"src\",it=\"srcset\",rt=\"sizes\",ct=\"poster\",lt=\"llOriginalAttrs\",st=\"loading\",ut=\"loaded\",dt=\"applied\",ft=\"error\",_t=\"native\",gt=\"data-\",vt=\"ll-status\",bt=[st,ut,dt,ft],pt=[ot],ht=[ot,ct],mt=[ot,it,rt],Et={IMG:function(t,e){h(t,function(t){y(t,mt),O(t,e)}),y(t,mt),O(t,e)},IFRAME:function(t,e){y(t,pt),A(t,ot,l(t,e.data_src))},VIDEO:function(t,e){a(t,function(t){y(t,pt),A(t,ot,l(t,e.data_src))}),y(t,ht),A(t,ct,l(t,e.data_poster)),A(t,ot,l(t,e.data_src)),t.load()}},It=[\"IMG\",\"IFRAME\",\"VIDEO\"],yt={IMG:j,IFRAME:function(t){L(t,pt)},VIDEO:function(t){a(t,function(t){L(t,pt)}),L(t,ht),t.load()}},Lt=[\"IMG\",\"IFRAME\",\"VIDEO\"];return t.prototype={update:function(t){var e,n,a,o=this._settings,i=W(t,o);{if(p(this,i.length),!Z&&tt)return q(o)?(e=o,n=this,i.forEach(function(t){-1!==Lt.indexOf(t.tagName)&&S(t,e,n)}),void p(n,0)):(t=this._observer,o=i,t.disconnect(),a=t,void o.forEach(function(t){a.observe(t)}));this.loadAll(i)}},destroy:function(){this._observer&&this._observer.disconnect(),K(this._settings).forEach(function(t){I(t)}),delete this._observer,delete this._settings,delete this.loadingCount,delete this.toLoadCount},loadAll:function(t){var e=this,n=this._settings;W(t,n).forEach(function(t){v(t,e),D(t,n,e)})},restoreAll:function(){var e=this._settings;K(e).forEach(function(t){P(t,e)})}},t.load=function(t,e){e=o(e);D(t,e)},t.resetStatus=function(t){i(t)},t}),function(t,e){\"use strict\";function n(){e.body.classList.add(\"litespeed_lazyloaded\")}function a(){console.log(\"[LiteSpeed] Start Lazy Load\"),o=new LazyLoad(Object.assign({},t.lazyLoadOptions||{},{elements_selector:\"[data-lazyloaded]\",callback_finish:n})),i=function(){o.update()},t.MutationObserver&&new MutationObserver(i).observe(e.documentElement,{childList:!0,subtree:!0,attributes:!0})}var o,i;t.addEventListener?t.addEventListener(\"load\",a,!1):t.attachEvent(\"onload\",a)}(window,document);</script>\n<script data-no-optimize=\"1\">window.litespeed_ui_events=window.litespeed_ui_events||[\"mouseover\",\"click\",\"keydown\",\"wheel\",\"touchmove\",\"touchstart\",\"pointerup\",\"pointerdown\"];var urlCreator=window.URL||window.webkitURL;function litespeed_load_delayed_js_force(){console.log(\"[LiteSpeed] Start Load JS Delayed\"),litespeed_ui_events.forEach(e=>{window.removeEventListener(e,litespeed_load_delayed_js_force,{passive:!0})}),document.querySelectorAll(\"iframe[data-litespeed-src]\").forEach(e=>{e.setAttribute(\"src\",e.getAttribute(\"data-litespeed-src\"))}),\"loading\"==document.readyState?window.addEventListener(\"DOMContentLoaded\",litespeed_load_delayed_js):litespeed_load_delayed_js()}litespeed_ui_events.forEach(e=>{window.addEventListener(e,litespeed_load_delayed_js_force,{passive:!0})});async function litespeed_load_delayed_js(){let t=[];for(var d in document.querySelectorAll('script[type=\"litespeed/javascript\"]').forEach(e=>{t.push(e)}),t)await new Promise(e=>litespeed_load_one(t[d],e));document.dispatchEvent(new Event(\"DOMContentLiteSpeedLoaded\")),window.dispatchEvent(new Event(\"DOMContentLiteSpeedLoaded\"))}function litespeed_load_one(t,e){console.log(\"[LiteSpeed] Load \",t);function d(){o.src.startsWith(\"blob:\")&&URL.revokeObjectURL(o.src),e()}var o=document.createElement(\"script\");o.addEventListener(\"load\",d),o.addEventListener(\"error\",d),t.getAttributeNames().forEach(e=>{\"type\"!=e&&o.setAttribute(\"data-src\"==e?\"src\":e,t.getAttribute(e))}),o.type=\"text/javascript\",!o.src&&t.textContent&&(o.src=litespeed_inline2src(t.textContent)),t.after(o),t.remove()}function litespeed_inline2src(t){try{var d=urlCreator.createObjectURL(new Blob([t.replace(/^(?:<!--)?(.*?)(?:-->)?$/gm,\"$1\")],{type:\"text/javascript\"}))}catch(e){d=\"data:text/javascript;base64,\"+btoa(t.replace(/^(?:<!--)?(.*?)(?:-->)?$/gm,\"$1\"))}return d}</script>\n<script data-optimized=\"1\" type=\"litespeed/javascript\" data-src=\"https://www.adsguards.com/wp-content/litespeed/js/f524a15887fe3faa4de1847680201e9d.js?ver=d15d0\"></script>\n" }} />
      </body>
    </html>
  );
}
