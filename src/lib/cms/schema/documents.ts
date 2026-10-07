import type { Field } from './fields';

/** Field schemas for pages, posts and global site documents. Client-safe. */

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const HOME_SLUG = 'home';

/** Slugs that would collide with app routes or static asset folders. */
export const RESERVED_SLUGS = new Set([
  'admin',
  'api',
  'preview',
  'uploads',
  'logos',
  'wp-content',
  'wp-includes',
  'wp-json',
  'favicon-ico',
  'icon-png',
  '404',
  '_next',
]);

export const seoFields: Field[] = [
  { type: 'text', name: 'title', label: 'SEO title', help: 'Leave empty to use the site default.' },
  { type: 'textarea', name: 'description', label: 'SEO description' },
  { type: 'text', name: 'keywords', label: 'SEO keywords', help: 'Comma separated.' },
  { type: 'url', name: 'canonical', label: 'Canonical URL' },
  { type: 'text', name: 'ogImage', label: 'Open Graph image path' },
];

export const pageSettingsFields: Field[] = [
  { type: 'text', name: 'title', label: 'Page name', required: true },
  { type: 'text', name: 'slug', label: 'Slug', required: true, help: 'Lowercase letters, numbers and dashes. Use "home" for the home page.' },
  {
    type: 'select',
    name: 'status',
    label: 'Status',
    required: true,
    options: [
      { value: 'published', label: 'Published' },
      { value: 'draft', label: 'Draft' },
    ],
  },
  {
    type: 'select',
    name: 'group',
    label: 'Page type',
    required: true,
    options: [
      { value: 'page', label: 'Standard page' },
      { value: 'service', label: 'Service page (listed in the Services menu)' },
    ],
  },
  { type: 'textarea', name: 'summary', label: 'Menu summary', help: 'Shown under the title in the Services mega menu.' },
  { type: 'number', name: 'menuOrder', label: 'Menu order', integer: true, min: 0 },
  { type: 'group', name: 'seo', label: 'SEO', fields: seoFields },
  {
    type: 'group',
    name: 'layout',
    label: 'Layout',
    advanced: true,
    fields: [
      {
        type: 'select',
        name: 'type',
        label: 'Layout type',
        required: true,
        options: [
          { value: 'article', label: 'Article (standard)' },
          { value: 'full-width', label: 'Full width (blog style)' },
        ],
      },
      { type: 'text', name: 'articleId', label: 'Article element id', help: 'e.g. post-7' },
      { type: 'text', name: 'articleClassName', label: 'Article CSS classes' },
      { type: 'number', name: 'elementorId', label: 'Elementor wrapper id', integer: true, min: 0, help: '0 = no wrapper.' },
    ],
  },
];

export const postFields: Field[] = [
  { type: 'text', name: 'title', label: 'Title', required: true },
  { type: 'text', name: 'slug', label: 'Slug', required: true },
  {
    type: 'select',
    name: 'status',
    label: 'Status',
    required: true,
    options: [
      { value: 'published', label: 'Published' },
      { value: 'draft', label: 'Draft' },
    ],
  },
  { type: 'text', name: 'date', label: 'Publish date', required: true, help: 'ISO format, e.g. 2026-03-01T10:00:00' },
  { type: 'text', name: 'author', label: 'Author' },
  { type: 'textarea', name: 'excerpt', label: 'Excerpt' },
  { type: 'image', name: 'featuredImage', label: 'Featured image', pathKey: 'url' },
  { type: 'stringList', name: 'categories', label: 'Categories', itemLabel: 'Category' },
  { type: 'text', name: 'audioUrl', label: 'Audio narration URL', advanced: true },
  {
    type: 'group',
    name: 'seo',
    label: 'SEO',
    fields: [
      { type: 'text', name: 'title', label: 'SEO title' },
      { type: 'textarea', name: 'description', label: 'SEO description' },
    ],
  },
  { type: 'code', name: 'contentHtml', label: 'Content', required: true },
];

const linkFields: Field[] = [
  { type: 'text', name: 'label', label: 'Label', required: true },
  { type: 'url', name: 'url', label: 'URL', required: true },
];

const imageLinkFields: Field[] = [
  { type: 'text', name: 'src', label: 'Image path', required: true },
  { type: 'text', name: 'alt', label: 'Alt text' },
  { type: 'url', name: 'url', label: 'Link URL' },
];

export const settingsFields: Field[] = [
  { type: 'text', name: 'siteName', label: 'Site name', required: true },
  { type: 'url', name: 'siteUrl', label: 'Site URL', help: 'Used for canonical URLs, e.g. https://www.example.com' },
  { type: 'text', name: 'logo', label: 'Logo path', required: true },
  { type: 'text', name: 'favicon', label: 'Favicon path', help: 'Leave empty to use the built-in icon.' },
  { type: 'text', name: 'phone', label: 'Phone' },
  { type: 'email', name: 'email', label: 'Email' },
  { type: 'textarea', name: 'address', label: 'Address' },
  { type: 'text', name: 'copyright', label: 'Copyright text', help: 'Shown at the bottom of the footer when set.' },
  {
    type: 'group',
    name: 'defaultSeo',
    label: 'Default SEO',
    fields: [
      { type: 'text', name: 'title', label: 'Default SEO title', required: true },
      { type: 'textarea', name: 'description', label: 'Default SEO description' },
    ],
  },
];

const menuItemFields: Field[] = [
  { type: 'text', name: 'label', label: 'Label', required: true },
  { type: 'url', name: 'url', label: 'URL', required: true },
  {
    type: 'select',
    name: 'kind',
    label: 'Item type',
    required: true,
    options: [
      { value: 'link', label: 'Link' },
      { value: 'services', label: 'Services dropdown' },
      { value: 'offices', label: 'Offices dropdown' },
    ],
  },
  { type: 'boolean', name: 'highlighted', label: 'Always highlighted (desktop)' },
  {
    type: 'select',
    name: 'activeMatch',
    label: 'Active state (mobile)',
    options: [
      { value: 'exact', label: 'Exact URL' },
      { value: 'prefix', label: 'URL and sub-paths' },
    ],
  },
  { type: 'text', name: 'rel', label: 'rel attribute', advanced: true },
];

export const headerFields: Field[] = [
  { type: 'text', name: 'topBarText', label: 'Top bar text' },
  {
    type: 'list',
    name: 'socialLinks',
    label: 'Top bar social icons',
    itemLabel: 'Icon',
    titleField: 'label',
    fields: [
      { type: 'text', name: 'label', label: 'Label', required: true },
      { type: 'url', name: 'url', label: 'URL', required: true },
      { type: 'text', name: 'network', label: 'Network slug', help: 'e.g. facebook-f, twitter, youtube', required: true },
      { type: 'text', name: 'iconClass', label: 'Icon CSS class', help: 'e.g. fab fa-facebook-f', required: true },
      { type: 'text', name: 'repeaterId', label: 'Style id', advanced: true },
    ],
  },
  { type: 'group', name: 'logo', label: 'Logo', fields: imageLinkFields },
  { type: 'text', name: 'servingLabel', label: '"Serving" label' },
  { type: 'list', name: 'servingLinks', label: 'Serving locations', itemLabel: 'Location', titleField: 'label', fields: linkFields },
  { type: 'text', name: 'quoteButtonText', label: 'Quote button text', required: true },
  { type: 'text', name: 'readMoreText', label: 'Mega menu "Read more" text' },
  { type: 'list', name: 'desktopMenu', label: 'Desktop menu', itemLabel: 'Menu item', titleField: 'label', fields: menuItemFields },
  { type: 'list', name: 'mobileMenu', label: 'Mobile & tablet menu', itemLabel: 'Menu item', titleField: 'label', fields: menuItemFields },
  {
    type: 'group',
    name: 'quoteModal',
    label: 'Request a quote popup',
    fields: [
      { type: 'text', name: 'title', label: 'Title', required: true },
      { type: 'text', name: 'nameLabel', label: 'Name label' },
      { type: 'text', name: 'namePlaceholder', label: 'Name placeholder' },
      { type: 'text', name: 'emailLabel', label: 'Email label' },
      { type: 'text', name: 'emailPlaceholder', label: 'Email placeholder' },
      { type: 'text', name: 'phoneLabel', label: 'Phone label' },
      { type: 'text', name: 'phonePlaceholder', label: 'Phone placeholder' },
      { type: 'text', name: 'locationLabel', label: 'Location label' },
      { type: 'stringList', name: 'locations', label: 'Location options', itemLabel: 'Location' },
      { type: 'text', name: 'serviceLabel', label: 'Service label' },
      { type: 'stringList', name: 'services', label: 'Service options', itemLabel: 'Service' },
      { type: 'text', name: 'messageLabel', label: 'Message label' },
      { type: 'text', name: 'messagePlaceholder', label: 'Message placeholder' },
      { type: 'text', name: 'captchaLabel', label: 'Captcha label' },
      { type: 'text', name: 'submitText', label: 'Submit button text', required: true },
      { type: 'textarea', name: 'disclaimer', label: 'Disclaimer' },
    ],
  },
  { type: 'background', name: 'background', label: 'Header background (desktop)', elementId: '6c302ae' },
  { type: 'background', name: 'mobileBackground', label: 'Header background (mobile & tablet)', elementId: 'b213eeb' },
];

export const footerFields: Field[] = [
  { type: 'text', name: 'ctaHeading', label: 'Call-to-action heading' },
  { type: 'textarea', name: 'ctaText', label: 'Call-to-action text' },
  { type: 'text', name: 'ctaPhone', label: 'Call-to-action phone (display)' },
  { type: 'url', name: 'ctaPhoneHref', label: 'Call-to-action phone link', help: 'e.g. tel:5107548456' },
  {
    type: 'list',
    name: 'linkColumns',
    label: 'Link columns',
    itemLabel: 'Column',
    titleField: 'title',
    fields: [
      { type: 'text', name: 'title', label: 'Title', required: true },
      { type: 'list', name: 'links', label: 'Links', itemLabel: 'Link', titleField: 'label', fields: linkFields },
    ],
  },
  { type: 'text', name: 'brandTitle', label: 'Brand column title' },
  { type: 'group', name: 'logo', label: 'Logo', fields: imageLinkFields },
  { type: 'stringList', name: 'brandItems', label: 'Brand column items', itemLabel: 'Item' },
  { type: 'text', name: 'contactTitle', label: 'Contact column title' },
  { type: 'stringList', name: 'contactLines', label: 'Contact lines', itemLabel: 'Line' },
  { type: 'text', name: 'officesTitle', label: 'Offices heading' },
  { type: 'html', name: 'officesHtml', label: 'Office links (HTML)', rows: 6 },
  { type: 'html', name: 'newsletterHeadingHtml', label: 'Newsletter heading (HTML)', rows: 2 },
  { type: 'text', name: 'newsletterPlaceholder', label: 'Newsletter placeholder' },
  { type: 'text', name: 'newsletterButtonText', label: 'Newsletter button text' },
  { type: 'text', name: 'copyright', label: 'Copyright line', help: 'Optional. Leave empty to hide.' },
  { type: 'background', name: 'background', label: 'Footer background', elementId: '2396415' },
];

export const officeFields: Field[] = [
  { type: 'text', name: 'name', label: 'Office name', required: true },
  { type: 'text', name: 'menuLabel', label: 'Menu label', help: 'Shown in the header office menus. Defaults to the office name.' },
  { type: 'text', name: 'anchor', label: 'Anchor id', help: 'Used in links like /offices#California' },
  { type: 'text', name: 'licenseNumber', label: 'License number' },
  { type: 'text', name: 'officeType', label: 'Office type', help: 'e.g. Headquarter, Branch Office' },
  { type: 'textarea', name: 'address', label: 'Address', help: 'One line per row.' },
  { type: 'text', name: 'phone', label: 'Phone' },
  { type: 'text', name: 'imageUrl', label: 'Image path' },
  { type: 'text', name: 'imageAlt', label: 'Image alt text' },
];

export const officesDocumentFields: Field[] = [
  { type: 'list', name: 'offices', label: 'Offices', itemLabel: 'Office', titleField: 'name', fields: officeFields },
];
