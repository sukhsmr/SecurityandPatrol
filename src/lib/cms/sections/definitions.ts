import { emptyObjectFor, type Field, type ImageValue } from '../schema/fields';

/**
 * Section type registry: every section type that exists on the site, its
 * data shape, and the fields the admin can edit. Client-safe — rendering
 * components are mapped separately in `components/sections/SectionRenderer`.
 *
 * To add a section type: add a data interface and definition here, build a
 * component, and register it in the SectionRenderer map.
 */

export type SectionCategory = 'Home' | 'Blog' | 'Career' | 'Contact' | 'Legal' | 'General';

export interface SectionDefinition {
  type: string;
  label: string;
  description: string;
  category: SectionCategory;
  /**
   * Elementor page id whose CSS styles this section (`.elementor-<id>`). When
   * the section is placed on a page with a different wrapper id, the renderer
   * adds the scope wrapper so the section keeps its original styling.
   */
  scope?: number;
  fields: Field[];
  defaults?: () => Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Data shapes
// ---------------------------------------------------------------------------

export interface HeroData {
  highlight: string;
  title: string;
  subtitle: string;
  badgeImage: ImageValue;
  buttonText: string;
  buttonUrl: string;
  sideImage: ImageValue;
}

export interface FeatureCard {
  logo: ImageValue;
  title: string;
  listHeading: string;
  items: string[];
}

export interface FeatureCardsData {
  cards: FeatureCard[];
  showMoreText: string;
  showLessText: string;
}

export interface AboutExpandableData {
  image: ImageValue;
  heading: string;
  subheading: string;
  tagline: string;
  paragraphs: string[];
  highlights: string[];
  moreText: string;
  showMoreText: string;
  showLessText: string;
}

export interface NumberedItem {
  title: string;
  description: string;
}

export interface ServicesGridData {
  heading: string;
  introParagraphs: string[];
  desktopItems: NumberedItem[];
  mobileItems: NumberedItem[];
}

export interface IconFeature {
  iconClass: string;
  title: string;
  description: string;
}

export interface WhyChooseUsData {
  heading: string;
  intro: string;
  primaryFeature: IconFeature;
  secondaryFeature: IconFeature;
  moreText: string;
  showMoreText: string;
  showLessText: string;
  formHeading: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  submitText: string;
  recaptchaSiteKey: string;
}

export interface OfficesSectionData {
  title: string;
}

export interface Testimonial {
  name: string;
  title: string;
  content: string;
}

export interface TestimonialsData {
  avatar: ImageValue;
  items: Testimonial[];
  autoplayDelay: number;
}

export interface BlogBannerData {
  backgroundImage: ImageValue;
  eyebrow: string;
  title: string;
  text: string;
  emailPlaceholder: string;
  buttonText: string;
}

export interface BlogIntroData {
  eyebrow: string;
  heading: string;
}

export interface CareerHeroData {
  lineOne: string;
  highlight: string;
  buttonText: string;
  buttonUrl: string;
}

export interface SectionHeadingData {
  title: string;
  subtitle: string;
}

export interface CareerFormLabels {
  firstNameLabel: string;
  firstNamePlaceholder: string;
  middleNameLabel: string;
  middleNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  addressLabel: string;
  addressPlaceholder: string;
  addressLine2Placeholder: string;
  cityPlaceholder: string;
  statePlaceholder: string;
  zipPlaceholder: string;
  resumeLabel: string;
  coverLetterLabel: string;
}

export interface CareerFormData {
  heading: string;
  positions: string[];
  labels: CareerFormLabels;
  submitText: string;
  disclaimer: string;
  recaptchaSiteKey: string;
}

export interface LegalItem {
  heading: string;
  body: string;
}

export interface LegalContentData {
  items: LegalItem[];
}

export interface ContactHeroData {
  lineOne: string;
  highlight: string;
  buttonText: string;
  buttonUrl: string;
  phone: string;
}

export interface ContactIntroData {
  eyebrow: string;
  eyebrowUrl: string;
  heading: string;
  subheading: string;
  subheadingUrl: string;
}

export interface MapHotspot {
  id: string;
  x: number;
  y: number;
  contentHtml: string;
}

export interface ContactColumn {
  title: string;
  lines: string[];
}

export interface ContactLocationsData {
  map: ImageValue;
  hotspots: MapHotspot[];
  columns: ContactColumn[];
}

export interface ContactFormData {
  heading: string;
  subheading: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  serviceLabel: string;
  services: string[];
  locationLabel: string;
  locations: string[];
  phoneLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  acceptanceText: string;
  submitText: string;
  disclaimer: string;
  recaptchaSiteKey: string;
  image: ImageValue;
}

export interface HtmlSectionData {
  html: string;
}

// ---------------------------------------------------------------------------
// Shared field fragments
// ---------------------------------------------------------------------------

const toggleLabelFields: Field[] = [
  { type: 'text', name: 'showMoreText', label: '"Show more" button text', required: true },
  { type: 'text', name: 'showLessText', label: '"Show less" button text', required: true },
];

const recaptchaField: Field = {
  type: 'text',
  name: 'recaptchaSiteKey',
  label: 'reCAPTCHA site key',
  advanced: true,
};

const iconFeatureFields: Field[] = [
  { type: 'text', name: 'iconClass', label: 'Icon CSS class', help: 'e.g. "fas fa-credit-card" or "icon icon-team1"', required: true },
  { type: 'text', name: 'title', label: 'Title', required: true },
  { type: 'textarea', name: 'description', label: 'Description' },
];

const numberedItemFields: Field[] = [
  { type: 'text', name: 'title', label: 'Title', required: true },
  { type: 'textarea', name: 'description', label: 'Description' },
];

// ---------------------------------------------------------------------------
// Definitions
// ---------------------------------------------------------------------------

export const sectionDefinitions: SectionDefinition[] = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Large heading with highlighted word, subtitle, call-to-action button and badge images.',
    category: 'Home',
    scope: 7,
    fields: [
      { type: 'text', name: 'highlight', label: 'Highlighted heading text', help: 'Shown in orange before the heading.' },
      { type: 'text', name: 'title', label: 'Heading', required: true },
      { type: 'textarea', name: 'subtitle', label: 'Subtitle' },
      { type: 'text', name: 'buttonText', label: 'Button text' },
      { type: 'url', name: 'buttonUrl', label: 'Button URL' },
      { type: 'image', name: 'badgeImage', label: 'Mobile badge image' },
      { type: 'image', name: 'sideImage', label: 'Desktop side image', withSrcSet: true },
    ],
  },
  {
    type: 'feature-cards',
    label: 'Expandable Feature Cards',
    description: 'Side-by-side cards with a title and a "Show more" bullet list (GuardOne / Dispatch).',
    category: 'Home',
    scope: 7,
    fields: [
      {
        type: 'list',
        name: 'cards',
        label: 'Cards',
        itemLabel: 'Card',
        titleField: 'title',
        minItems: 1,
        fields: [
          { type: 'image', name: 'logo', label: 'Logo (optional)' },
          { type: 'text', name: 'title', label: 'Title', required: true },
          { type: 'text', name: 'listHeading', label: 'List heading' },
          { type: 'stringList', name: 'items', label: 'Bullet points', itemLabel: 'Bullet point' },
        ],
      },
      ...toggleLabelFields,
    ],
    defaults: () => ({ cards: [], showMoreText: 'Show More', showLessText: 'Show Less' }),
  },
  {
    type: 'about-expandable',
    label: 'About (Image + Expandable Text)',
    description: 'Image beside headings, paragraphs and a "Show more" panel.',
    category: 'Home',
    scope: 7,
    fields: [
      { type: 'image', name: 'image', label: 'Image', required: true },
      { type: 'text', name: 'heading', label: 'Heading', required: true },
      { type: 'text', name: 'subheading', label: 'Subheading' },
      { type: 'text', name: 'tagline', label: 'Tagline' },
      { type: 'stringList', name: 'paragraphs', label: 'Paragraphs', itemLabel: 'Paragraph' },
      { type: 'stringList', name: 'highlights', label: 'Expanded panel highlights', itemLabel: 'Highlight', help: 'Bold lines at the top of the expanded panel.' },
      { type: 'textarea', name: 'moreText', label: 'Expanded panel text' },
      ...toggleLabelFields,
    ],
    defaults: () => ({ showMoreText: 'Show More', showLessText: 'Show Less' }),
  },
  {
    type: 'services-grid',
    label: 'Numbered Services Grid',
    description: 'Heading and intro with numbered service boxes (separate desktop and mobile lists).',
    category: 'Home',
    scope: 7,
    fields: [
      { type: 'text', name: 'heading', label: 'Heading', required: true },
      { type: 'stringList', name: 'introParagraphs', label: 'Intro paragraphs', itemLabel: 'Paragraph' },
      { type: 'list', name: 'desktopItems', label: 'Desktop items', itemLabel: 'Item', titleField: 'title', fields: numberedItemFields },
      { type: 'list', name: 'mobileItems', label: 'Mobile & tablet items', itemLabel: 'Item', titleField: 'title', fields: numberedItemFields },
    ],
  },
  {
    type: 'why-choose-us',
    label: 'Why Choose Us + Quote Form',
    description: 'Two feature boxes with an expandable note, beside a free-quote form.',
    category: 'Home',
    scope: 7,
    fields: [
      { type: 'text', name: 'heading', label: 'Heading', required: true },
      { type: 'textarea', name: 'intro', label: 'Intro text' },
      { type: 'group', name: 'primaryFeature', label: 'First feature', fields: iconFeatureFields },
      { type: 'group', name: 'secondaryFeature', label: 'Second feature', fields: iconFeatureFields },
      { type: 'textarea', name: 'moreText', label: 'Expanded text (under second feature)' },
      ...toggleLabelFields,
      { type: 'text', name: 'formHeading', label: 'Form heading' },
      { type: 'text', name: 'namePlaceholder', label: 'Name placeholder' },
      { type: 'text', name: 'emailPlaceholder', label: 'Email placeholder' },
      { type: 'text', name: 'phonePlaceholder', label: 'Phone placeholder' },
      { type: 'text', name: 'messagePlaceholder', label: 'Message placeholder' },
      { type: 'text', name: 'submitText', label: 'Submit button text', required: true },
      recaptchaField,
    ],
    defaults: () => ({ showMoreText: 'Show More', showLessText: 'Show Less', submitText: 'Submit' }),
  },
  {
    type: 'offices',
    label: 'Offices',
    description: 'Office cards (image, name, license, address, phone). Offices are managed under Offices.',
    category: 'General',
    fields: [{ type: 'text', name: 'title', label: 'Heading', required: true }],
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Auto-playing testimonial slider.',
    category: 'Home',
    scope: 7,
    fields: [
      { type: 'image', name: 'avatar', label: 'Avatar image' },
      { type: 'number', name: 'autoplayDelay', label: 'Autoplay delay (ms)', min: 1000, max: 30000, integer: true },
      {
        type: 'list',
        name: 'items',
        label: 'Testimonials',
        itemLabel: 'Testimonial',
        titleField: 'name',
        minItems: 1,
        fields: [
          { type: 'text', name: 'name', label: 'Name', required: true },
          { type: 'text', name: 'title', label: 'Title / company' },
          { type: 'textarea', name: 'content', label: 'Quote', required: true },
        ],
      },
    ],
    defaults: () => ({ avatar: { src: '/logos/logo.png', alt: '' }, autoplayDelay: 3000, items: [] }),
  },
  {
    type: 'blog-banner',
    label: 'Blog Banner',
    description: 'Background image banner with heading and newsletter field.',
    category: 'Blog',
    fields: [
      { type: 'image', name: 'backgroundImage', label: 'Background image', required: true },
      { type: 'text', name: 'eyebrow', label: 'Small heading' },
      { type: 'text', name: 'title', label: 'Large heading', required: true },
      { type: 'textarea', name: 'text', label: 'Text' },
      { type: 'text', name: 'emailPlaceholder', label: 'Email placeholder' },
      { type: 'text', name: 'buttonText', label: 'Button text' },
    ],
  },
  {
    type: 'blog-intro',
    label: 'Blog Intro Bar',
    description: 'Dark bar with a small label and heading.',
    category: 'Blog',
    fields: [
      { type: 'text', name: 'eyebrow', label: 'Small label' },
      { type: 'text', name: 'heading', label: 'Heading', required: true },
    ],
  },
  {
    type: 'blog-list',
    label: 'Blog Post List',
    description: 'All published blog posts, newest first. Posts are managed under Blog Posts.',
    category: 'Blog',
    fields: [],
  },
  {
    type: 'career-hero',
    label: 'Career Banner',
    description: 'Banner with a two-line heading and a button.',
    category: 'Career',
    scope: 10,
    fields: [
      { type: 'text', name: 'lineOne', label: 'First line', required: true },
      { type: 'text', name: 'highlight', label: 'Highlighted line' },
      { type: 'text', name: 'buttonText', label: 'Button text' },
      { type: 'url', name: 'buttonUrl', label: 'Button URL' },
    ],
  },
  {
    type: 'section-heading',
    label: 'Section Heading',
    description: 'Title, subtitle and divider.',
    category: 'Career',
    scope: 10,
    fields: [
      { type: 'text', name: 'title', label: 'Title', required: true },
      { type: 'text', name: 'subtitle', label: 'Subtitle' },
    ],
  },
  {
    type: 'career-form',
    label: 'Career Application Form',
    description: 'Job application form with position choices.',
    category: 'Career',
    scope: 10,
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'stringList', name: 'positions', label: 'Positions', itemLabel: 'Position', required: true, minItems: 1 },
      {
        type: 'group',
        name: 'labels',
        label: 'Field labels',
        fields: [
          { type: 'text', name: 'firstNameLabel', label: 'First name label' },
          { type: 'text', name: 'firstNamePlaceholder', label: 'First name placeholder' },
          { type: 'text', name: 'middleNameLabel', label: 'Middle name label' },
          { type: 'text', name: 'middleNamePlaceholder', label: 'Middle name placeholder' },
          { type: 'text', name: 'lastNameLabel', label: 'Last name label' },
          { type: 'text', name: 'lastNamePlaceholder', label: 'Last name placeholder' },
          { type: 'text', name: 'emailLabel', label: 'Email label' },
          { type: 'text', name: 'emailPlaceholder', label: 'Email placeholder' },
          { type: 'text', name: 'phoneLabel', label: 'Phone label' },
          { type: 'text', name: 'phonePlaceholder', label: 'Phone placeholder' },
          { type: 'text', name: 'addressLabel', label: 'Address label' },
          { type: 'text', name: 'addressPlaceholder', label: 'Address placeholder' },
          { type: 'text', name: 'addressLine2Placeholder', label: 'Address line 2 placeholder' },
          { type: 'text', name: 'cityPlaceholder', label: 'City placeholder' },
          { type: 'text', name: 'statePlaceholder', label: 'State placeholder' },
          { type: 'text', name: 'zipPlaceholder', label: 'Postal code placeholder' },
          { type: 'text', name: 'resumeLabel', label: 'Resume upload label' },
          { type: 'text', name: 'coverLetterLabel', label: 'Cover letter label' },
        ],
      },
      { type: 'text', name: 'submitText', label: 'Submit button text', required: true },
      { type: 'textarea', name: 'disclaimer', label: 'Disclaimer' },
      recaptchaField,
    ],
    defaults: () => ({ submitText: 'Apply' }),
  },
  {
    type: 'legal-content',
    label: 'Legal / Policy Content',
    description: 'Sequence of headings with rich-text bodies.',
    category: 'Legal',
    scope: 3,
    fields: [
      {
        type: 'list',
        name: 'items',
        label: 'Blocks',
        itemLabel: 'Block',
        titleField: 'heading',
        minItems: 1,
        fields: [
          { type: 'text', name: 'heading', label: 'Heading', required: true },
          { type: 'html', name: 'body', label: 'Body (HTML)', rows: 6 },
        ],
      },
    ],
  },
  {
    type: 'contact-hero',
    label: 'Contact Banner',
    description: 'Banner with a two-line heading, call button and phone number.',
    category: 'Contact',
    scope: 9,
    fields: [
      { type: 'text', name: 'lineOne', label: 'First line', required: true },
      { type: 'text', name: 'highlight', label: 'Highlighted line' },
      { type: 'text', name: 'buttonText', label: 'Button text' },
      { type: 'url', name: 'buttonUrl', label: 'Button URL' },
      { type: 'text', name: 'phone', label: 'Phone number' },
    ],
  },
  {
    type: 'contact-intro',
    label: 'Contact Intro',
    description: 'Three stacked headings, optionally linked.',
    category: 'Contact',
    scope: 9,
    fields: [
      { type: 'text', name: 'eyebrow', label: 'Small heading' },
      { type: 'url', name: 'eyebrowUrl', label: 'Small heading link' },
      { type: 'text', name: 'heading', label: 'Heading', required: true },
      { type: 'text', name: 'subheading', label: 'Subheading' },
      { type: 'url', name: 'subheadingUrl', label: 'Subheading link' },
    ],
  },
  {
    type: 'contact-locations',
    label: 'Office Map & Contacts',
    description: 'Map with office hotspots and contact email columns.',
    category: 'Contact',
    scope: 9,
    fields: [
      { type: 'image', name: 'map', label: 'Map image', required: true, withSrcSet: true },
      {
        type: 'list',
        name: 'hotspots',
        label: 'Map hotspots',
        itemLabel: 'Hotspot',
        fields: [
          { type: 'text', name: 'id', label: 'Hotspot id', advanced: true, help: 'Internal id; keep unchanged for existing hotspots.' },
          { type: 'number', name: 'x', label: 'Horizontal position (%)', min: 0, max: 100 },
          { type: 'number', name: 'y', label: 'Vertical position (%)', min: 0, max: 100 },
          { type: 'html', name: 'contentHtml', label: 'Tooltip content (HTML)', rows: 4 },
        ],
      },
      {
        type: 'list',
        name: 'columns',
        label: 'Contact columns',
        itemLabel: 'Column',
        titleField: 'title',
        fields: [
          { type: 'text', name: 'title', label: 'Title', required: true },
          { type: 'stringList', name: 'lines', label: 'Lines', itemLabel: 'Line' },
        ],
      },
    ],
  },
  {
    type: 'contact-form',
    label: 'Contact Form',
    description: 'Quote request form beside an image.',
    category: 'Contact',
    scope: 9,
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'text', name: 'subheading', label: 'Subheading' },
      { type: 'text', name: 'firstNameLabel', label: 'Name label' },
      { type: 'text', name: 'firstNamePlaceholder', label: 'Name placeholder' },
      { type: 'text', name: 'emailLabel', label: 'Email label' },
      { type: 'text', name: 'emailPlaceholder', label: 'Email placeholder' },
      { type: 'text', name: 'serviceLabel', label: 'Service label' },
      { type: 'stringList', name: 'services', label: 'Service options', itemLabel: 'Service' },
      { type: 'text', name: 'locationLabel', label: 'Location label' },
      { type: 'stringList', name: 'locations', label: 'Location options', itemLabel: 'Location' },
      { type: 'text', name: 'phoneLabel', label: 'Phone label' },
      { type: 'text', name: 'messageLabel', label: 'Message label' },
      { type: 'text', name: 'messagePlaceholder', label: 'Message placeholder' },
      { type: 'text', name: 'acceptanceText', label: 'Consent checkbox text' },
      { type: 'text', name: 'submitText', label: 'Submit button text', required: true },
      { type: 'textarea', name: 'disclaimer', label: 'Disclaimer' },
      { type: 'image', name: 'image', label: 'Side image', withSrcSet: true },
      recaptchaField,
    ],
  },
  {
    type: 'html',
    label: 'Custom HTML',
    description: 'Raw HTML block. Used for imported Elementor layouts such as the service pages.',
    category: 'General',
    fields: [{ type: 'code', name: 'html', label: 'HTML', required: true }],
  },
];

const definitionsByType = new Map(sectionDefinitions.map((definition) => [definition.type, definition]));

export function getSectionDefinition(type: string): SectionDefinition | undefined {
  return definitionsByType.get(type);
}

export function defaultSectionData(definition: SectionDefinition): Record<string, unknown> {
  return { ...emptyObjectFor(definition.fields), ...definition.defaults?.() };
}
