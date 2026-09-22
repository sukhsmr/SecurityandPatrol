"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import RequestQuoteModal from '../RequestQuoteModal';
import type { Service } from '@/lib/data/services';
import type { Office } from '@/lib/data/offices';
import './mobile-menu-fix.css';

const OFFICE_ANCHOR_LABELS: Record<string, string> = {
  California: 'California (Bay Area)',
  Texas: 'Houston Texas',
  portland: 'Portland Oregon',
  seattle: 'Seattle Washington',
  san: 'San Antonio Texas',
  vanc: 'Vancouver Washington',
};

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) result.push(items.slice(i, i + size));
  return result;
}

// The live site's services mega-menu styles its number badge and link title
// per-widget, via Elementor's auto-generated per-ID CSS (one rule per of the
// 9 items, all with identical values). This dynamic version has no fixed
// per-item IDs to hang those rules on, so the same values are applied here
// once, scoped to this menu only.
const SERVICES_MENU_STYLE = `
.services-menu-item {
  display: flex;
  margin-bottom: 25px;
  padding-right: 15px;
}
.services-menu-number-container {
  background-color: #f7f7f7;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 15px;
  font-weight: 700;
  color: #d89b33;
  font-size: 16px;
}
.services-menu-content {
  display: flex;
  flex-direction: column;
}
.services-menu-title {
  color: #4F92DA !important;
  font-size: 15px;
  margin-top: 0;
  margin-bottom: 5px;
  font-weight: 500;
  text-decoration: none;
}
.services-menu-description {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 8px;
  margin-top: 0;
}
.services-menu-read-more {
  font-size: 13px;
  color: #333 !important;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.services-menu-read-more:hover {
  color: #d89b33 !important;
}
`;

export default function Header({ services, offices }: { services: Service[]; offices: Office[] }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleSubMenu = (menuId: string) => {
    setOpenSubMenus(prev => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  const serviceColumns = chunk(services, Math.ceil(services.length / 3) || 1);
  const officeColumns = chunk(offices, Math.ceil(offices.length / 3) || 1);
  return (
    <><header data-elementor-type="header" data-elementor-id={4734} className="elementor elementor-4734 elementor-location-header" data-elementor-post-type="elementor_library">
    <section className="elementor-section elementor-top-section elementor-element elementor-element-0d1d5dc elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="0d1d5dc" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-915187e" data-id="915187e" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-7ed16a9 elementor-widget elementor-widget-heading" data-id="7ed16a9" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">Call US: 1-800-794-1550
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-f695f9c" data-id="f695f9c" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-488d75b elementor-shape-square e-grid-align-right elementor-grid-0 elementor-widget elementor-widget-social-icons" data-id="488d75b" data-element_type="widget" data-e-type="widget" data-widget_type="social-icons.default">
              <div className="elementor-widget-container">
                <div className="elementor-social-icons-wrapper elementor-grid" role="list">
                  <span className="elementor-grid-item" role="listitem">
                    <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook-f elementor-repeater-item-38321e7" href="https://www.facebook.com/ADS-Guards-419408835286802" target="_blank">
                      <span className="elementor-screen-only">Facebook-f</span>
                      <i aria-hidden="true" className="fab fa-facebook-f" /> </a>
                  </span>
                  <span className="elementor-grid-item" role="listitem">
                    <a className="elementor-icon elementor-social-icon elementor-social-icon-twitter elementor-repeater-item-b0b1f9c" href="https://twitter.com/ADSGuards" target="_blank">
                      <span className="elementor-screen-only">Twitter</span>
                      <i aria-hidden="true" className="fab fa-twitter" /> </a>
                  </span>
                  <span className="elementor-grid-item" role="listitem">
                    <a className="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-2d89bd4" href="https://www.youtube.com/channel/UCllIX4xuDtGGcd8Y5HagsJQ" target="_blank">
                      <span className="elementor-screen-only">Youtube</span>
                      <i aria-hidden="true" className="fab fa-youtube" /> </a>
                  </span>
                  <span className="elementor-grid-item" role="listitem">
                    <a className="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-8044d7a" href="https://www.instagram.com/adsguards/" target="_blank">
                      <span className="elementor-screen-only">Instagram</span>
                      <i aria-hidden="true" className="fab fa-instagram" /> </a>
                  </span>
                  <span className="elementor-grid-item" role="listitem">
                    <a className="elementor-icon elementor-social-icon elementor-social-icon-linkedin-in elementor-repeater-item-b1ff4d5" href="https://www.linkedin.com/company/28438799/" target="_blank">
                      <span className="elementor-screen-only">Linkedin-in</span>
                      <i aria-hidden="true" className="fab fa-linkedin-in" /> </a>
                  </span>
                  <span className="elementor-grid-item" role="listitem">
                    <a className="elementor-icon elementor-social-icon elementor-social-icon-whatsapp elementor-repeater-item-8501dda" href="https://wa.me/+15108595401" target="_blank">
                      <span className="elementor-screen-only">Whatsapp</span>
                      <i aria-hidden="true" className="fab fa-whatsapp" /> </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="elementor-section elementor-top-section elementor-element elementor-element-6c302ae elementor-hidden-tablet elementor-hidden-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="6c302ae" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-e70d03b" data-id="e70d03b" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-cb5f340 elementor-widget elementor-widget-image" data-id="cb5f340" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
              <div className="elementor-widget-container">
                <a href="/">
                  <img src="/logos/logo.png" fetchPriority="high" width={166} height={180} className="attachment-large size-large wp-image-4917" alt="Security and Patrol - 24/7 Private Security" /> </a>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-be8ce32" data-id="be8ce32" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-ebd99e9 elementor-widget__width-auto elementor-widget elementor-widget-heading" data-id="ebd99e9" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">Serving:</h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-b478dbd elementor-widget__width-auto elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" data-id="b478dbd" data-element_type="widget" data-e-type="widget" data-settings="{&quot;layout&quot;:&quot;horizontal&quot;,&quot;submenu_icon&quot;:{&quot;value&quot;:&quot;<i class=\&quot;fas fa-caret-down\&quot; aria-hidden=\&quot;true\&quot;><\/i>&quot;,&quot;library&quot;:&quot;fa-solid&quot;},&quot;toggle&quot;:&quot;burger&quot;}" data-widget_type="nav-menu.default">
              <div className="elementor-widget-container">
                <nav aria-label="Menu" className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-none">
                  <ul id="menu-1-b478dbd" className="elementor-nav-menu">
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1122">
                      <a href="/offices#California" className="elementor-item elementor-item-anchor">California</a></li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1123">
                      <a href="/offices#portland" className="elementor-item elementor-item-anchor">Portland</a></li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1124">
                      <a href="/offices#seattle" className="elementor-item elementor-item-anchor">Seattle</a></li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1125">
                      <a href="/offices#vanc" className="elementor-item elementor-item-anchor">Vancouver</a></li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1126">
                      <a href="/offices#Texas" className="elementor-item elementor-item-anchor">Houston</a></li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1127">
                      <a href="/offices#san" className="elementor-item elementor-item-anchor">San Antonio</a></li>
                  </ul>
                </nav>
                <div className={`elementor-menu-toggle ${isMobileMenuOpen ? "elementor-active" : ""}`} role="button" tabIndex={0} aria-label="Menu Toggle" aria-expanded={isMobileMenuOpen ? "true" : "false"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--open eicon-menu-bar" /><i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--close eicon-close" />
                </div>
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.nav 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="elementor-nav-menu--dropdown elementor-nav-menu__container" 
                      aria-hidden="false" 
                      style={{ display: 'block' }}
                    >
                      <ul id="menu-2-b478dbd" className="elementor-nav-menu">
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1122">
                          <a href="/offices#California" className="elementor-item elementor-item-anchor" tabIndex={-1}>California</a></li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1123">
                          <a href="/offices#portland" className="elementor-item elementor-item-anchor" tabIndex={-1}>Portland</a></li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1124">
                          <a href="/offices#seattle" className="elementor-item elementor-item-anchor" tabIndex={-1}>Seattle</a></li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1125">
                          <a href="/offices#vanc" className="elementor-item elementor-item-anchor" tabIndex={-1}>Vancouver</a></li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1126">
                          <a href="/offices#Texas" className="elementor-item elementor-item-anchor" tabIndex={-1}>Houston</a></li>
                        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1127">
                          <a href="/offices#san" className="elementor-item elementor-item-anchor" tabIndex={-1}>San
                            Antonio</a></li>
                      </ul>
                    </motion.nav>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-fa7cf31" data-id="fa7cf31" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-4868b1b elementor-align-right elementor-widget elementor-widget-button" data-id="4868b1b" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <a className="elementor-button elementor-button-link elementor-size-md" href="#" onClick={(e) => { e.preventDefault(); setIsQuoteModalOpen(true); }}>
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-text">Request a Quote</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="elementor-section elementor-top-section elementor-element elementor-element-56eb930 elementor-hidden-mobile elementor-hidden-tablet elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="56eb930" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-6f09094" data-id="6f09094" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-97e1f84 elementor-widget elementor-widget-ekit-nav-menu" data-id="97e1f84" data-element_type="widget" data-e-type="widget" data-widget_type="ekit-nav-menu.default">
              <div className="elementor-widget-container">
                <nav className="ekit-wid-con ekit_menu_responsive_mobile" data-hamburger-icon data-hamburger-icon-type="icon" data-responsive-breakpoint={767} data-close-on-anchor="no">
                  <button 
                    className={`elementskit-menu-hamburger elementskit-menu-toggler ${isMobileMenuOpen ? 'active' : ''}`}
                    type="button" 
                    aria-label="hamburger-icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <span className="elementskit-menu-hamburger-icon" /><span className="elementskit-menu-hamburger-icon" /><span className="elementskit-menu-hamburger-icon" />
                  </button>
                  <div id="ekit-megamenu-primary-menu" className={`elementskit-menu-container elementskit-menu-offcanvas-elements elementskit-navbar-nav-default ekit-nav-menu-one-page-no ekit-nav-dropdown-hover ${isMobileMenuOpen ? 'active' : ''}`}>
                    <ul id="menu-primary-menu" className="elementskit-navbar-nav elementskit-menu-po-left submenu-click-on-icon">
                      <li id="menu-item-27" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-27 nav-item elementskit-mobile-builder-content active" data-vertical-menu="750px"><a href="/" className="ekit-menu-nav-link active" aria-current="page">Home</a>
                      </li>
                      <li id="menu-item-31" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-31 nav-item elementskit-dropdown-has relative_position elementskit-dropdown-menu-custom_width elementskit-megamenu-has elementskit-mobile-builder-content" data-vertical-menu={1200}><a href="#" className="ekit-menu-nav-link">Services<i aria-hidden="true" className="icon icon-down-arrow1 elementskit-submenu-indicator" /></a>
                        <div className="elementskit-megamenu-panel">
                          <div data-elementor-type="wp-post" data-elementor-id={75} className="elementor elementor-75" data-elementor-post-type="elementskit_content">
                            <section className="elementor-section elementor-top-section elementor-element elementor-element-cc4c8be ops-section elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="cc4c8be" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;ekit_has_onepagescroll&quot;:&quot;section&quot;}">
                              <style dangerouslySetInnerHTML={{ __html: SERVICES_MENU_STYLE }} />
                              <div className="elementor-container elementor-column-gap-default">
                                {serviceColumns.map((column, colIdx) => (
                                  <div key={colIdx} className="elementor-column elementor-col-33 elementor-top-column elementor-element" data-element_type="column" data-e-type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      {column.map((service) => (
                                        <div key={service.id} className="services-menu-item">
                                          <div className="services-menu-number-container">
                                            {services.indexOf(service) + 1}
                                          </div>
                                          <div className="services-menu-content">
                                            <a href={`/${service.id}`} className="services-menu-title">
                                              {service.title}
                                            </a>
                                            {service.summary && (
                                              <p className="services-menu-description">
                                                {service.summary}
                                              </p>
                                            )}
                                            <a href={`/${service.id}`} className="services-menu-read-more">
                                              Read More →
                                            </a>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </section>
                          </div>
                        </div>
                      </li>
                      
<li id="menu-item-968" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-968 nav-item elementskit-dropdown-has top_position elementskit-dropdown-menu-custom_width elementskit-megamenu-has elementskit-mobile-builder-content" data-vertical-menu={1200}><a href="/offices" className="ekit-menu-nav-link">OUR OFFICES<i aria-hidden="true" className="icon icon-down-arrow1 elementskit-submenu-indicator" /></a>
                        <div className="elementskit-megamenu-panel">
                          <div data-elementor-type="wp-post" data-elementor-id={969} className="elementor elementor-969" data-elementor-post-type="elementskit_content">
                            <section className="elementor-section elementor-top-section elementor-element elementor-element-002bafd elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="002bafd" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                              <style dangerouslySetInnerHTML={{ __html: SERVICES_MENU_STYLE }} />
                              <div className="elementor-container elementor-column-gap-default">
                                {officeColumns.map((column, colIdx) => (
                                  <div key={colIdx} className="elementor-column elementor-col-33 elementor-top-column elementor-element" data-element_type="column" data-e-type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                      {column.map((office) => (
                                        <div key={office.anchor} className="services-menu-item">
                                          <div className="services-menu-number-container">
                                            {offices.indexOf(office) + 1}
                                          </div>
                                          <div className="services-menu-content">
                                            <a href={`/offices#${office.anchor}`} className="services-menu-title">
                                              {OFFICE_ANCHOR_LABELS[office.anchor || ''] || office.name}
                                            </a>
                                            {(office.officeType || office.address) && (
                                              <p className="services-menu-description" style={{ marginBottom: office.phone ? '2px' : '8px' }}>
                                                {office.officeType}{office.officeType && office.address ? ' ' : ''}{office.address}
                                              </p>
                                            )}
                                            {office.phone && (
                                              <p className="services-menu-description" style={{ color: '#333', fontWeight: 500, marginBottom: '8px' }}>
                                                {office.phone}
                                              </p>
                                            )}
                                            <a href={`/offices#${office.anchor}`} className="services-menu-read-more">
                                              Read More →
                                            </a>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </section>
                          </div>
                        </div>
                      </li>
                      
<li id="menu-item-28" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-28 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px"><a href="/ads-blog" className="ekit-menu-nav-link">Blog</a></li>
                      <li id="menu-item-30" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-30 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px"><a href="/ads-guards-contact-us" className="ekit-menu-nav-link">Contact Us</a></li>
                      <li id="menu-item-29" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px"><a href="/career" className="ekit-menu-nav-link">Career</a></li>
                      <li id="menu-item-3807" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-3807 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px"><a href="/privacy-policy" className="ekit-menu-nav-link">Privacy Policy</a></li>
                    </ul>
                    <div className="elementskit-nav-identity-panel"><button className="elementskit-menu-close elementskit-menu-toggler" type="button" onClick={() => setIsMobileMenuOpen(false)}>X</button></div>
                  </div>
                  <div className="elementskit-menu-overlay elementskit-menu-offcanvas-elements elementskit-menu-toggler ekit-nav-menu--overlay">
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="elementor-section elementor-top-section elementor-element elementor-element-b213eeb elementor-hidden-desktop elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="b213eeb" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-dd8e0b5" data-id="dd8e0b5" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-8a14986 elementor-widget elementor-widget-image" data-id="8a14986" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
              <div className="elementor-widget-container">
                <a href="/">
                  <img src="/logos/logo.png" fetchPriority="high" width={166} height={180} className="attachment-large size-large wp-image-4917" alt="Security and Patrol - 24/7 Private Security" /> </a>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-f550c60" data-id="f550c60" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-627a828 elementor-align-right elementor-mobile-align-center elementor-widget elementor-widget-button" data-id="627a828" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <a className="elementor-button elementor-button-link elementor-size-sm" href="#" onClick={(e) => { e.preventDefault(); setIsQuoteModalOpen(true); }}>
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-text">Request a Quote</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-729d1b3" data-id="729d1b3" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-4e18aba elementor-nav-menu--stretch elementor-nav-menu--dropdown-tablet elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget elementor-widget-nav-menu" data-id="4e18aba" data-element_type="widget" data-e-type="widget" data-settings="{&quot;full_width&quot;:&quot;stretch&quot;,&quot;layout&quot;:&quot;horizontal&quot;,&quot;submenu_icon&quot;:{&quot;value&quot;:&quot;<i class=\&quot;fas fa-caret-down\&quot; aria-hidden=\&quot;true\&quot;><\/i>&quot;,&quot;library&quot;:&quot;fa-solid&quot;},&quot;toggle&quot;:&quot;burger&quot;}" data-widget_type="nav-menu.default">
              <div className="elementor-widget-container">
                <nav aria-label="Menu" className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-none">
                  <ul id="menu-1-4e18aba" className="elementor-nav-menu">
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-7 menu-item-393 ${pathname === '/' ? 'current-menu-item current_page_item' : ''}`}>
                      <a href="/" aria-current={pathname === '/' ? 'page' : undefined} className={`elementor-item ${pathname === '/' ? 'elementor-item-active' : ''}`}>Home</a></li>
                    <li className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-405 ${pathname !== '/' && !pathname.startsWith('/ads-blog') && !pathname.startsWith('/ads-guards-contact-us') && !pathname.startsWith('/career') && !pathname.startsWith('/privacy-policy') && !pathname.startsWith('/offices') ? 'current-menu-item' : ''}`}>
                      <a href="#" className={`elementor-item elementor-item-anchor ${pathname !== '/' && !pathname.startsWith('/ads-blog') && !pathname.startsWith('/ads-guards-contact-us') && !pathname.startsWith('/career') && !pathname.startsWith('/privacy-policy') && !pathname.startsWith('/offices') ? 'elementor-item-active' : ''}`}>
                        Services
                        <span className="sub-arrow"><i className="fas fa-caret-down"></i></span>
                      </a>
                      <ul className="sub-menu elementor-nav-menu--dropdown">
                        {services.map((service) => (
                          <li key={service.id} className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href={`/${service.id}`} className="elementor-sub-item">{service.title}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-412">
                      <a href="#" className="elementor-item elementor-item-anchor">
                        Our Offices
                        <span className="sub-arrow"><i className="fas fa-caret-down"></i></span>
                      </a>
                      <ul className="sub-menu elementor-nav-menu--dropdown">
                        {offices.map((office) => (
                          <li key={office.anchor} className="menu-item menu-item-type-custom menu-item-object-custom">
                            <a href={`/offices#${office.anchor}`} className="elementor-sub-item elementor-item-anchor">{OFFICE_ANCHOR_LABELS[office.anchor || ''] || office.name}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-400 ${pathname === '/ads-guards-contact-us' ? 'current-menu-item' : ''}`}>
                      <a href="/ads-guards-contact-us" className={`elementor-item ${pathname === '/ads-guards-contact-us' ? 'elementor-item-active' : ''}`}>Contact Us</a></li>
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-394 ${pathname.startsWith('/ads-blog') ? 'current-menu-item' : ''}`}>
                      <a href="/ads-blog" className={`elementor-item ${pathname.startsWith('/ads-blog') ? 'elementor-item-active' : ''}`}>Blog</a></li>
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-397 ${pathname === '/career' ? 'current-menu-item' : ''}`}>
                      <a href="/career" className={`elementor-item ${pathname === '/career' ? 'elementor-item-active' : ''}`}>Career</a></li>
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-3806 ${pathname === '/privacy-policy' ? 'current-menu-item' : ''}`}>
                      <a rel="privacy-policy" href="/privacy-policy" className={`elementor-item ${pathname === '/privacy-policy' ? 'elementor-item-active' : ''}`}>Privacy Policy</a></li>
                  </ul>
                </nav>
                <div className={`elementor-menu-toggle ${isMobileMenuOpen ? "elementor-active" : ""}`} role="button" tabIndex={0} aria-label="Menu Toggle" aria-expanded={isMobileMenuOpen ? "true" : "false"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--open eicon-menu-bar" /><i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--close eicon-close" />
                </div>
                <nav className={`elementor-nav-menu--dropdown elementor-nav-menu__container ${isMobileMenuOpen ? "elementor-active" : ""}`} aria-hidden={isMobileMenuOpen ? "false" : "true"} style={{ height: isMobileMenuOpen ? "auto" : "0px", opacity: isMobileMenuOpen ? 1 : 0, overflow: "hidden", display: isMobileMenuOpen ? "block" : "none" }}>
                  <ul id="menu-2-4e18aba" className="elementor-nav-menu">
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-7 menu-item-393 ${pathname === '/' ? 'current-menu-item current_page_item' : ''}`}>
                      <a href="/" aria-current={pathname === '/' ? 'page' : undefined} className={`elementor-item ${pathname === '/' ? 'elementor-item-active' : ''}`} tabIndex={-1}>Home</a>
                    </li>
                    <li className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-405 ${openSubMenus['services'] ? 'elementor-active' : ''}`}>
                      <a href="#" className={`elementor-item elementor-item-anchor ${openSubMenus['services'] ? 'elementor-item-active' : ''}`} tabIndex={-1} onClick={(e) => { e.preventDefault(); toggleSubMenu('services'); }} style={{ display: 'flex !important', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                        Services
                        <span className="sub-arrow"><i className="fas fa-caret-down"></i></span>
                      </a>
                      <ul className="sub-menu elementor-nav-menu--dropdown" style={{ display: openSubMenus['services'] ? 'block' : 'none' }}>
                        {services.map((service) => (
                          <li key={service.id} className="menu-item menu-item-type-post_type menu-item-object-page">
                            <a href={`/${service.id}`} className="elementor-sub-item" tabIndex={-1}>{service.title}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-412 ${openSubMenus['offices'] ? 'elementor-active' : ''}`}>
                      <a href="#" className={`elementor-item elementor-item-anchor ${openSubMenus['offices'] ? 'elementor-item-active' : ''}`} tabIndex={-1} onClick={(e) => { e.preventDefault(); toggleSubMenu('offices'); }} style={{ display: 'flex !important', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                        Our Offices
                        <span className="sub-arrow"><i className="fas fa-caret-down"></i></span>
                      </a>
                      <ul className="sub-menu elementor-nav-menu--dropdown" style={{ display: openSubMenus['offices'] ? 'block' : 'none' }}>
                        {offices.map((office) => (
                          <li key={office.anchor} className="menu-item menu-item-type-custom menu-item-object-custom">
                            <a href={`/offices#${office.anchor}`} className="elementor-sub-item elementor-item-anchor" tabIndex={-1}>{OFFICE_ANCHOR_LABELS[office.anchor || ''] || office.name}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-400 ${pathname === '/ads-guards-contact-us' ? 'current-menu-item' : ''}`}>
                      <a href="/ads-guards-contact-us" className={`elementor-item ${pathname === '/ads-guards-contact-us' ? 'elementor-item-active' : ''}`} tabIndex={-1}>Contact Us</a></li>
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-394 ${pathname.startsWith('/ads-blog') ? 'current-menu-item' : ''}`}>
                      <a href="/ads-blog" className={`elementor-item ${pathname.startsWith('/ads-blog') ? 'elementor-item-active' : ''}`} tabIndex={-1}>Blog</a></li>
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-397 ${pathname === '/career' ? 'current-menu-item' : ''}`}>
                      <a href="/career" className={`elementor-item ${pathname === '/career' ? 'elementor-item-active' : ''}`} tabIndex={-1}>Career</a></li>
                    <li className={`menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-3806 ${pathname === '/privacy-policy' ? 'current-menu-item' : ''}`}>
                      <a rel="privacy-policy" href="/privacy-policy" className={`elementor-item ${pathname === '/privacy-policy' ? 'elementor-item-active' : ''}`} tabIndex={-1}>Privacy Policy</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
  <RequestQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
  </>

  );
}
