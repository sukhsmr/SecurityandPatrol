/**
 * Domain types for the JSON CMS.
 *
 * These types describe content independently of where it is stored, so the
 * JSON repositories can later be swapped for an API- or database-backed
 * implementation without touching the UI.
 */

import type { BackgroundValue } from './schema/fields';

export type PageStatus = 'draft' | 'published';

/** `service` pages also feed the header "Services" menus. */
export type PageGroup = 'page' | 'service';

export interface SeoFields {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * How a page is wrapped. The original WordPress/Elementor markup scopes most
 * CSS to `.elementor-<id>` and to specific `<article>` classes, so these
 * values must be preserved for pages to look identical.
 */
export interface ArticleLayout {
  type: 'article';
  articleId?: string;
  articleClassName: string;
  /** Renders `<div class="elementor elementor-<id>">` around the sections. */
  elementorId?: number;
}

/** Edge-to-edge layout used by the blog listing page. */
export interface FullWidthLayout {
  type: 'full-width';
}

export type PageLayout = ArticleLayout | FullWidthLayout;

export type SectionData = Record<string, unknown>;

export interface Section<D extends SectionData = SectionData> {
  id: string;
  type: string;
  /** Admin-facing label, e.g. "Hero" or "Testimonials". */
  name: string;
  enabled: boolean;
  data: D;
}

export interface Page {
  id: string;
  /** URL slug. The home page uses the reserved slug `home` and is served at `/`. */
  slug: string;
  title: string;
  status: PageStatus;
  group: PageGroup;
  /** Short description shown in the services mega menu (service pages only). */
  summary?: string;
  /** Sort order within the services menu (service pages only). */
  menuOrder?: number;
  seo: SeoFields;
  layout: PageLayout;
  /** Array order is the render order. */
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  status: PageStatus;
  date: string;
  modified?: string;
  contentHtml: string;
  excerpt?: string;
  featuredImage?: { url: string; alt?: string };
  author?: string;
  categories?: string[];
  seo?: { title?: string; description?: string };
  audioUrl?: string;
}

export interface Office {
  /** Anchor id on /offices, e.g. `California` → `/offices#California`. */
  anchor: string | null;
  name: string;
  /** Label used in the header office menus. Falls back to `name`. */
  menuLabel?: string;
  licenseNumber: string | null;
  officeType: string | null;
  address: string | null;
  phone: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface ImageRef {
  src: string;
  alt?: string;
}

export interface SiteSettings {
  siteName: string;
  siteUrl?: string;
  logo: string;
  favicon?: string;
  phone?: string;
  email?: string;
  address?: string;
  copyright?: string;
  defaultSeo: { title: string; description: string };
}

export interface SocialLink {
  /** Elementor icon slug, e.g. `facebook-f`. */
  network: string;
  label: string;
  iconClass: string;
  url: string;
  repeaterId?: string;
}

export type MenuItemKind = 'link' | 'services' | 'offices';

export interface MenuItem {
  label: string;
  url: string;
  kind: MenuItemKind;
  /** Desktop menu: render with the "active" highlight (Home on the original site). */
  highlighted?: boolean;
  /** Mobile menu: `prefix` marks the item active for any nested path. */
  activeMatch?: 'exact' | 'prefix';
  rel?: string;
}

export interface QuoteModalContent {
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  locationLabel: string;
  locations: string[];
  serviceLabel: string;
  services: string[];
  messageLabel: string;
  messagePlaceholder: string;
  captchaLabel: string;
  submitText: string;
  disclaimer: string;
}

export interface HeaderContent {
  topBarText: string;
  socialLinks: SocialLink[];
  logo: ImageRef & { url: string };
  servingLabel: string;
  servingLinks: LinkItem[];
  quoteButtonText: string;
  readMoreText: string;
  desktopMenu: MenuItem[];
  mobileMenu: MenuItem[];
  quoteModal: QuoteModalContent;
  /** Admin-chosen background images; empty = the design's images. */
  background?: BackgroundValue;
  mobileBackground?: BackgroundValue;
}

export interface FooterLinkColumn {
  title: string;
  links: LinkItem[];
}

export interface FooterContent {
  ctaHeading: string;
  ctaText: string;
  ctaPhone: string;
  ctaPhoneHref: string;
  linkColumns: FooterLinkColumn[];
  brandTitle: string;
  logo: ImageRef & { url: string };
  brandItems: string[];
  contactTitle: string;
  contactLines: string[];
  officesTitle: string;
  /** Inline HTML, kept verbatim to preserve the original link styling. */
  officesHtml: string;
  newsletterHeadingHtml: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  copyright?: string;
  background?: BackgroundValue;
}

export interface SiteDocuments {
  settings: SiteSettings;
  header: HeaderContent;
  footer: FooterContent;
}

export type SiteDocumentKey = keyof SiteDocuments;

export type ActivityAction = 'created' | 'updated' | 'deleted' | 'duplicated' | 'reordered';

export interface ActivityEntry {
  id: string;
  at: string;
  action: ActivityAction;
  entity: 'page' | 'section' | 'post' | 'settings' | 'header' | 'footer' | 'offices' | 'media';
  label: string;
  /** Admin URL for the affected item, when one exists. */
  href?: string;
}

/** Public-facing projection of a service page used by the header menus. */
export interface ServiceMenuItem {
  slug: string;
  title: string;
  summary?: string;
}
