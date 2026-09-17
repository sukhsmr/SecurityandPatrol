// Seeds the securityand_patrol MySQL database from the project's existing
// src/data/*.json content and the hardcoded office list in
// src/components/OfficesList. Safe to re-run: it clears each table before
// inserting (existing manual edits to these tables would be overwritten).
//
// Usage: node database/seed.js
// Reads DB connection settings from .env.local (falls back to localhost/root).

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local'), quiet: true });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const ROOT = path.join(__dirname, '..');

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

// Mirrors the 6 offices currently hardcoded in src/components/OfficesList/index.tsx.
const OFFICES = [
  {
    anchor: 'California',
    name: 'California (Bay Area)',
    license_number: 'LIC:PPO14579',
    office_type: 'Headquarter',
    address: '33446 Western AVE, Union City, CA 94587',
    phone: '510-742-8000',
    image_url: '/wp-content/uploads/2023/03/california.jpg',
    image_alt: 'Bay Bridge with San Francisco skyline in the background under a cloudy sky.',
    sort_order: 1,
  },
  {
    anchor: 'portland',
    name: 'Portland Oregon',
    license_number: 'LIC:105G258C2',
    office_type: 'Branch Office',
    address: '650 NE Holladay St Suite 1600, Portland, OR 97232',
    phone: '503-925-4600',
    image_url: '/wp-content/uploads/2023/03/oregon.jpg',
    image_alt: 'Beautiful waterfall cascading over lush cliffs with a bridge, surrounded by vibrant green foliage.',
    sort_order: 2,
  },
  {
    anchor: 'Texas',
    name: 'Houston Texas',
    license_number: 'LIC:B07283801',
    office_type: null,
    address: null,
    phone: '832-917-6994',
    image_url: '/wp-content/uploads/2023/03/Houston.jpg',
    image_alt: 'Skyline of a bustling city with modern skyscrapers and lush green spaces under a partly cloudy blue sky.',
    sort_order: 3,
  },
  {
    anchor: 'san',
    name: 'San Antonio Texas',
    license_number: 'LIC:B07283801',
    office_type: 'Branch Office',
    address: '14215 S. US Highway 181, San Antonio, TX 78223',
    phone: '210-714-3030',
    image_url: '/wp-content/uploads/2023/03/San_Antonio_Texas.jpg',
    image_alt: 'Colorful San Antonio River Walk at night, with bright lights reflecting on the water and bustling riverside restaurants.',
    sort_order: 4,
  },
  {
    anchor: 'seattle',
    name: 'Seattle Washington',
    license_number: 'LIC:1206',
    office_type: 'Branch Office',
    address: '600 Stewart St Suite 400, Seattle, WA 98101',
    phone: '206-620-2260',
    image_url: '/wp-content/uploads/2023/03/portland.jpg',
    image_alt: 'Seattle skyline at dusk featuring the iconic Space Needle and city skyscrapers against a blue evening sky.',
    sort_order: 5,
  },
  {
    anchor: 'vanc',
    name: 'Vancouver Washington',
    license_number: 'LIC:1206',
    office_type: 'Branch Office',
    address: '2910 E Evergreen BLVD, Vancouver, WA 98661',
    phone: '360-719-4991',
    image_url: '/wp-content/uploads/2023/03/vancouver.jpg',
    image_alt: 'Historic steam clock in vibrant city street scene at night, surrounded by lit buildings and blurred motion of lights.',
    sort_order: 6,
  },
];

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'securityand_patrol',
    multipleStatements: false,
  });

  try {
    // --- services ---
    // Short home-page card summaries. These previously lived only as hardcoded
    // JSX in src/components/ServicesList (and duplicated in Header's mega-menu) —
    // there's no separate JSON source for them, so they're captured here.
    const SERVICE_SUMMARIES = {
      'unarmed-security': 'Security and Patrol Unarmed Security Guards are trained to deal with our valued clients unique security needs',
      'armed-security': 'Security and Patrol Armed Security Guards are trained to deal with complex and unique security needs.',
      'construction-site-security': 'Our well-trained onsite security professionals will monitor the site 24 hours a day.',
      'mobile-patrol-security': 'Our Security Guards will patrol your property at random times yet systematically with visibly marked Security and Patrol security vehicles.',
      'event-security': 'Security and Patrol can deploy trained security professionals to prevent any security risks before it becomes a problem.',
      'commercial-security': 'We customized our commercial property security services for corporations, apartment buildings, hospitals, colleges, office buildings and hotels.',
      'residential-security': 'At Security and Patrol we understand that residential security is the number one concern of home-buyers and residents.',
      'shopping-center-security-guards': 'Licensed Shopping center security guards and mall security services for retail plazas, commercial shopping centers, and malls.',
      'office-buildings': null,
    };
    // Plain data (tag name, which occurrence, optional subtitle text) that
    // says where each service page's primary on-page heading lives inside
    // content_html — no HTML is stored. Hand-verified against the actual
    // markup: some pages use <h1>, some <h2>; two of them ("Services" is a
    // breadcrumb heading that comes first) need the *second* matching tag,
    // not the first. getServiceBySlug/getAllServices build the replacement
    // heading from `title` (+ subtitle) in code on every read.
    const SERVICE_HEADINGS = {
      'unarmed-security': { tag: 'h1', occurrence: 0, subtitle: 'guard Services' },
      'armed-security': { tag: 'h1', occurrence: 0, subtitle: 'Guard Services' },
      'construction-site-security': { tag: 'h1', occurrence: 0, subtitle: 'GUARD SERVICES' },
      'mobile-patrol-security': { tag: 'h1', occurrence: 0, subtitle: 'SERVICES' },
      'event-security': { tag: 'h1', occurrence: 0, subtitle: 'SERVICES' },
      'commercial-security': { tag: 'h1', occurrence: 0, subtitle: 'SERVICES' },
      'residential-security': { tag: 'h2', occurrence: 1, subtitle: null },
      'shopping-center-security-guards': { tag: 'h1', occurrence: 0, subtitle: 'Services' },
      'office-buildings': { tag: 'h2', occurrence: 1, subtitle: null },
    };
    // src/data/services.json has one title with an HTML entity baked in as
    // literal text ("...Guards &amp; Mall...") instead of a plain "&" — a
    // leftover from the original scrape. `title` should always be plain
    // text (React/our own HTML-sync escape it when needed), so decode any
    // such entities once here rather than storing them.
    const decodeEntities = (text) =>
      text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'");

    const services = readJson('src/data/services.json');
    await conn.execute('DELETE FROM services');
    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      const heading = SERVICE_HEADINGS[s.id];
      await conn.execute(
        `INSERT INTO services (slug, wp_id, title, summary, seo_title, seo_description, content_html, heading_tag, heading_occurrence, heading_subtitle, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          s.id,
          s.wpId ?? null,
          decodeEntities(s.title),
          SERVICE_SUMMARIES[s.id] ?? null,
          s.seo?.title ?? null,
          s.seo?.description ?? null,
          s.contentHtml,
          heading?.tag ?? null,
          heading?.occurrence ?? 0,
          heading?.subtitle ?? null,
          i,
        ]
      );
    }
    console.log(`Seeded ${services.length} services`);

    // --- blog_posts ---
    const posts = readJson('src/data/blog.json');
    await conn.execute('DELETE FROM blog_posts');
    for (const p of posts) {
      await conn.execute(
        `INSERT INTO blog_posts
           (wp_id, slug, title, excerpt, content_html, featured_image_url, featured_image_alt,
            author, categories, seo_title, seo_description, audio_url, published_at, modified_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id ?? null,
          p.slug,
          p.title,
          p.excerpt ?? null,
          p.contentHtml,
          p.featuredImage?.url ?? null,
          p.featuredImage?.alt ?? null,
          p.author ?? null,
          p.categories ? JSON.stringify(p.categories) : null,
          p.seo?.title ?? null,
          p.seo?.description ?? null,
          p.audioUrl ?? null,
          p.date ? new Date(p.date).toISOString().slice(0, 19).replace('T', ' ') : null,
          p.modified ? new Date(p.modified).toISOString().slice(0, 19).replace('T', ' ') : null,
        ]
      );
    }
    console.log(`Seeded ${posts.length} blog posts`);

    // --- offices ---
    await conn.execute('DELETE FROM offices');
    for (const o of OFFICES) {
      await conn.execute(
        `INSERT INTO offices (anchor, name, license_number, office_type, address, phone, image_url, image_alt, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [o.anchor, o.name, o.license_number, o.office_type, o.address, o.phone, o.image_url, o.image_alt, o.sort_order]
      );
    }
    console.log(`Seeded ${OFFICES.length} offices`);

    // --- pages (whole-page HTML content for routes not yet broken into their own tables) ---
    const pageSeeds = [
      { slug: 'offices', title: 'Our offices', file: 'src/data/offices.json' },
      { slug: 'ads-guards-contact-us', title: 'Contact Us', file: 'src/data/contact.json' },
      { slug: 'home-why-choose', title: 'Home - Why Choose Us', file: 'src/data/home-why-choose.json' },
    ];
    await conn.execute('DELETE FROM pages');
    for (const p of pageSeeds) {
      const data = readJson(p.file);
      await conn.execute(
        `INSERT INTO pages (slug, title, meta_description, content_html) VALUES (?, ?, ?, ?)`,
        [p.slug, p.title, null, data.contentHtml]
      );
    }
    console.log(`Seeded ${pageSeeds.length} pages`);

    // --- site_settings ---
    const settings = {
      company_name: 'Security and Patrol',
      phone: '1-800-794-1550',
      email: 'info@securityandpatrol.com',
    };
    await conn.execute('DELETE FROM site_settings');
    for (const [key, value] of Object.entries(settings)) {
      await conn.execute(
        `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)`,
        [key, value]
      );
    }
    console.log(`Seeded ${Object.keys(settings).length} site settings`);

    console.log('Database seed complete.');
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
