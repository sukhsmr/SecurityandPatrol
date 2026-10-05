# Website CMS Guide

This site is a Next.js app whose content lives in JSON files under `data/`. A protected admin panel at `/admin` edits those files. There is no database.

- [Running and building](#running-and-building)
- [Admin login and authentication](#admin-login-and-authentication)
- [Pages](#pages): add, edit, publish, SEO
- [Sections](#sections): add, edit, delete, reorder, enable or disable
- [Blog posts](#blog-posts)
- [Header, footer and site settings](#header-footer-and-site-settings)
- [Images](#images)
- [How the JSON structure works](#how-the-json-structure-works)
- [Architecture](#architecture) (for developers)
- [Security](#security)
- [Backups and data safety](#backups-and-data-safety)

---

## Running and building

```bash
npm install
cp .env.example .env.local        # then fill in the values, see below
npm run dev                       # http://localhost:3000, admin at /admin
```

There are two production build modes:

| Command | What it builds | Use when |
| --- | --- | --- |
| `npm run build` then `npm start` | Public site **and** admin panel and API. Needs Node.js on the server. Content edits go live immediately. | Hosting on a Node.js server (VPS, Plesk Node.js, Docker, etc.). |
| `npm run build:static` | The public site only, as static HTML in `out/`. No admin. | Static hosting such as the current IIS deployment. |

**Running the admin on the live server:** follow [DEPLOYMENT.md](DEPLOYMENT.md) (Plesk on Windows, via iisnode).

**Static-hosting workflow:** run the admin locally (`npm run dev`), make your edits, run `npm run build:static`, then upload `out/` as before. The JSON files are the source of truth for both modes, so commit `data/` to keep edits under version control.

> **Hosting note:** JSON edits are written to disk. Serverless platforms with read-only or ephemeral file systems (e.g. Vercel functions) will not keep admin edits. Use a host with a persistent disk, or swap the storage layer (see [Architecture](#architecture)).

Route files that need a Node.js server use the extension `.runtime.ts(x)` (admin, API, preview, uploads). Files that only the static export uses end in `.export.tsx`. `next.config.ts` picks the right set for each build mode.

### Site stylesheet

The original WordPress/LiteSpeed theme CSS is ~70 files in `public/wp-content/litespeed/css/`. The site loads a single concatenated copy, `site.bundle.css`, built by `scripts/bundle-css.cjs` from the ordered list in `scripts/site-stylesheets.json`, so the cascade is identical. The bundle is regenerated automatically by `npm run dev`, `npm run build` and `npm run build:static`. After editing a source stylesheet or the list, run `npm run css:bundle`.

---

## Admin login and authentication

Credentials live in environment variables (`.env.local` for development, or the server's environment in production), never in the content files:

```bash
CMS_ADMIN_USERNAME=admin
CMS_ADMIN_PASSWORD_HASH=scrypt:16384:8:1:...   # never the plain password
CMS_SESSION_SECRET=...                          # random, at least 32 characters
```

Generate the hash and a session secret:

```bash
npm run cms:hash-password -- "a-long-strong-password"
```

Paste the two printed lines into your environment and restart the server.

How it works:

- `POST /api/auth/login` checks the password against the scrypt hash using constant-time comparison.
- On success it sets the `cms_session` cookie, which is signed (HMAC-SHA256), `HttpOnly`, `SameSite=Strict`, `Secure` on HTTPS, and expires after 8 hours.
- After 5 failed attempts from one client, login is locked for 15 minutes.
- Every `/admin` screen (except login) and every `/api` endpoint verifies the session on the server. Write requests must also come from the site's own origin (CSRF protection).
- Changing the password or the session secret signs everyone out.
- **Sign out** is in the top-right of the admin.

---

## Pages

**Admin → Pages** lists every page with its URL, type, number of sections, status and last update. You can search the list and filter it by status or type.

### Add a page

1. Click **New page**.
2. Enter a name. The slug is filled in automatically (lowercase letters, numbers and dashes) and you can change it.
3. Choose **Draft** or **Published**, and the type:
   - **Standard page** is a normal page.
   - **Service page** also appears automatically in the header's Services menus.
4. Click **Create page**. You land on the empty page, ready for sections.

The page is served at `/<slug>/`. Slugs must be unique across pages *and* blog posts, since both share the same URL space. Some slugs are reserved (`admin`, `api`, `preview`, `uploads`, `wp-content`, …).

### Edit a page

Click the page name or **Sections**. The **Settings & SEO** tab holds:

- name, slug, status and type
- **Menu summary** and **Menu order**, for service pages (text and position in the Services mega menu)
- **SEO**: title, description, keywords, canonical URL and Open Graph image. Empty fields fall back to the defaults under *Settings & SEO*.
- **Advanced → Layout**: the WordPress/Elementor wrapper classes. Leave these alone for existing pages; they keep the original styling intact.

### Publish or unpublish

Use **Publish** or **Unpublish** at the top of the page editor. Draft pages return 404 on the public site. Use **Preview** to see a draft (admins only, at `/preview/<slug>/`).

### Duplicate or delete

Use the copy and trash icons in the Pages list. A duplicate is created as a draft named "(Copy)". Deleting asks for confirmation first. The home page cannot be deleted.

---

## Sections

A page is an ordered list of sections. Each section has a **type** (e.g. Hero, Testimonials), a **name** (shown only in the admin), an **enabled** switch and its content.

### Add a section

On the page's **Sections** tab, click **Add section**, pick a type (searchable, grouped by category), fill in the form and click **Save section**. New sections go at the end; move them afterwards.

Section types available (all taken from the existing site design):

| Type | Used on |
| --- | --- |
| Hero, Expandable Feature Cards, About (Image + Expandable Text), Numbered Services Grid, Why Choose Us + Quote Form, Testimonials | Home |
| Offices | Home, Offices |
| Blog Banner, Blog Intro Bar, Blog Post List | Blog |
| Career Banner, Section Heading, Career Application Form | Career |
| Legal / Policy Content | Privacy Policy |
| Contact Banner, Contact Intro, Office Map & Contacts, Contact Form | Contact Us |
| Custom HTML | Service pages, and any one-off layout |

A section placed on a different page keeps its original look automatically: the renderer adds the CSS scope that section needs.

### Edit a section

Click **Edit** (or the section name). The form matches the section type: text fields, image pickers, repeatable lists (add, remove, reorder or duplicate items) and so on. Required fields are marked with `*`, and errors appear next to the field.

- Plain text fields are escaped, so `<` shows as `<`.
- Fields labelled **(HTML)** accept HTML such as `<strong>`, `<br>` and `<a href="…">`.
- Service pages are made of **Custom HTML** sections (the original Elementor markup). Edit the HTML directly. Keep the existing `class` attributes so the styling still matches.

### Delete a section

Click the trash icon and confirm. Deletion is permanent, but a backup of the page file is kept (see [Backups](#backups-and-data-safety)).

### Reorder sections

Either **drag a row** by its handle, or use the **▲ / ▼** buttons. The new order saves immediately and the website updates. Reordering is disabled while a search or type filter is active.

### Enable or disable a section

Use the switch in the **Status** column. Disabled sections stay in the page but are not shown on the website.

### Duplicate a section

The copy icon inserts a copy, named "(Copy)", directly below the original.

---

## Blog posts

**Admin → Blog Posts** lists all posts, with search and a status filter. **New post** or **Edit** opens the editor with fields for title, slug, status, publish date, author, excerpt, featured image, categories, SEO and the article HTML. Published posts appear on the Blog page (newest first) and at `/<slug>/`.

---

## Header, footer and site settings

| Admin screen | File | Controls |
| --- | --- | --- |
| **Header & Menu** | `data/site/header.json` | Top-bar text and social icons, logo, "Serving" locations, quote button text, desktop menu, mobile menu, and the Request a Quote popup's labels and options |
| **Footer** | `data/site/footer.json` | Call-to-action, the three link columns, brand column, contact lines, corporate office links, newsletter text, optional copyright line |
| **Settings & SEO** | `data/site/settings.json` | Site name, URL, logo, favicon, phone, email, address, copyright, default SEO title and description. Social media links are edited under **Header & Menu** (they appear in the top bar). |
| **Offices** | `data/collections/offices.json` | Office cards on the Offices and home pages, and the Offices dropdown menus |

Menu items have a **type**:

- **Link**: a normal link.
- **Services dropdown**: lists all published *service pages*.
- **Offices dropdown**: lists all offices.

Add, remove or reorder items with the list controls. Changes appear on every page as soon as you click **Save changes**.

---

## Images

Existing images stay where they were (`public/wp-content/uploads/…`, `public/logos/…`). Nothing was moved or re-downloaded.

- **Admin → Media** shows every image in `public/`, with search.
- **Upload image** accepts PNG, JPG, GIF and WebP up to 5 MB. Files are saved to `public/uploads/YYYY/MM/` with a safe, unique file name. SVG uploads are blocked because SVG files can contain scripts.
- Every image field in a form has **Browse**, which opens the same library, plus a path box. You can paste a path such as `/wp-content/uploads/2023/03/laptop.png`.
- Always fill in **alt text** for accessibility and SEO.
- Paths are case-sensitive on Linux and on `next start`. Use the exact file-name casing (the picker does this for you).

---

## How the JSON structure works

```text
data/
├── pages/<slug>.json            one file per page (home.json is "/")
├── posts/<slug>.json            one file per blog post
├── site/
│   ├── settings.json            global settings & default SEO
│   ├── header.json              header, menus, quote popup
│   └── footer.json              footer
├── collections/offices.json     office locations
├── meta/activity.json           "Recent changes" log (last 100)
└── .backups/                    automatic backups (not committed)
```

A page file:

```json
{
  "id": "uuid",
  "slug": "career",
  "title": "Career",
  "status": "published",
  "group": "page",
  "seo": { "title": "…", "description": "…" },
  "layout": {
    "type": "article",
    "articleId": "post-10",
    "articleClassName": "entry content-bg single-entry …",
    "elementorId": 10
  },
  "sections": [
    {
      "id": "uuid",
      "type": "career-hero",
      "name": "Career Banner",
      "enabled": true,
      "data": { "lineOne": "THE BEST WAY TO START", "highlight": "YOUR CAREER", "buttonText": "CONTACT US NOW", "buttonUrl": "/security-and-patrol-contact-us" }
    }
  ],
  "createdAt": "…",
  "updatedAt": "…"
}
```

- The **array order of `sections` is the render order**.
- `data` always matches the field schema of the section `type` (see `src/lib/cms/sections/definitions.ts`). Unknown keys are dropped when you save.
- `layout.type` is `article` (the standard theme wrapper) or `full-width` (blog style).

You can edit the files by hand. The admin is just safer, because it validates every field before saving.

---

## Architecture

```text
UI (public pages & admin)
  ↓
Services        src/lib/cms/services/   content.ts (public reads) · admin.ts (validated writes) · media.ts
  ↓
Repositories    src/lib/cms/repositories/   interfaces in types.ts, JSON implementation in json.ts
  ↓
Storage         src/lib/cms/storage/json-store.ts   atomic writes, backups, path checks, locking
  ↓
data/*.json
```

**Moving to an API or database** means implementing the interfaces in `repositories/types.ts` and returning the new implementation from `repositories/index.ts`. Nothing in the UI changes.

Key places:

| Path | Purpose |
| --- | --- |
| `src/lib/cms/types.ts` | Domain types (Page, Section, Post, Header, …) |
| `src/lib/cms/schema/` | Field schemas plus the validator shared by forms and API |
| `src/lib/cms/sections/definitions.ts` | Section type registry (fields, defaults, CSS scope) |
| `src/components/sections/SectionRenderer.tsx` | Maps section type to component |
| `src/components/site/PageView.tsx` | Renders a page: theme shell, article wrapper, sections |
| `src/app/(site)/` | Public routes (`/`, `/[slug]`, `/preview/[slug]`) |
| `src/app/admin/` | Admin panel (separate root layout, so no site CSS) |
| `src/app/api/` | JSON API |

### Rendering stored HTML

`src/lib/content-html.ts` prepares stored HTML (Custom HTML sections, Elementor-template sections, blog posts) before rendering:

- **Internal links** get the site's trailing slash (`/career` → `/career/`) so they don't go through a redirect. This also applies to menu, footer and button URLs.
- **`<script>` tags** are rendered inert on the server and executed exactly once in the browser after the page loads (`src/lib/use-deferred-scripts.ts`). Scripts can rely on the global jQuery the site already loads; do not add another copy.

### Adding a new section type

1. Add a data interface and a `SectionDefinition` (fields, label, category) in `sections/definitions.ts`.
2. Build the component in `src/components/sections/`.
3. Register it in `SECTION_COMPONENTS` in `SectionRenderer.tsx`.

The admin form, validation and "Add section" picker pick it up automatically.

### API reference

All endpoints require an admin session. Writes also require a same-origin `Origin` header. URLs end in `/` (the site uses `trailingSlash`).

| Method | Endpoint | Action |
| --- | --- | --- |
| GET / POST | `/api/pages/` | List pages / create page |
| GET / PUT / DELETE | `/api/pages/{slug}/` | Read / update settings / delete page |
| POST | `/api/pages/{slug}/duplicate/` | Duplicate page (as draft) |
| GET / POST | `/api/pages/{slug}/sections/` | List / create section (`{type, name, enabled, data, position?}`) |
| PUT | `/api/pages/{slug}/sections/` | Reorder (`{order: [sectionId, …]}`) |
| GET / PUT / DELETE | `/api/pages/{slug}/sections/{id}/` | Read / update (`name`, `enabled`, `data`) / delete |
| POST | `/api/pages/{slug}/sections/{id}/duplicate/` | Duplicate section |
| GET / POST | `/api/posts/` · GET / PUT / DELETE `/api/posts/{slug}/` | Blog posts |
| GET / PUT | `/api/site/{settings\|header\|footer}/` | Global documents |
| GET / PUT | `/api/offices/` | Offices (`{offices: [...]}`) |
| GET / POST | `/api/media/` | List (`?q=&page=`) / upload (multipart `file`) |
| POST | `/api/auth/login/` · `/api/auth/logout/` | Session |

Errors are JSON: `{ "error": "message", "fieldErrors": { "field.path": "message" } }`, with status 401, 403, 404, 409, 413 or 422.

---

## Security

- The admin UI, preview and **all** API endpoints (reads included) require a valid session, checked on the server.
- Writes are rejected unless they come from the site's own origin.
- Every request body is validated against the field schemas: required fields, URL format (`javascript:` URLs are rejected), image paths, slugs, section types, list sizes and text lengths. Unknown fields are discarded.
- Storage paths are built only from validated segments (`[a-z0-9-]`). Inputs like `../../etc/passwd` cannot reach files outside `data/`. Upload serving is restricted to `public/uploads/`.
- Error messages never include server file paths. Details go to the server log with a `[cms]` prefix.
- Plain-text content is HTML-escaped when rendered. **HTML fields are trusted admin input** and are rendered as-is (as in WordPress), so only give admin access to trusted people.

---

## Backups and data safety

- **Atomic writes**: each save writes a temporary file, checks it is valid JSON, then renames it over the original. A crash can never leave a half-written file.
- **Automatic backups**: before any file is overwritten or deleted, the previous version is copied to `data/.backups/<path>/<timestamp>.json`. The last 20 versions per file are kept. To restore one, copy it back over the live file.
- **Serialised writes**: concurrent saves are queued, so they cannot overwrite each other.
- Commit `data/` to git regularly for full history.
