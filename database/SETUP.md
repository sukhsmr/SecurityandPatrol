# Database setup — step by step

This project's content (services, blog posts, offices, contact/offices page
content, site settings) lives in a MySQL database named `securityand_patrol`.
The Next.js app reads from it directly on every request, so editing a row in
the database updates the live site on the next page refresh — no code
change, no redeploy, no restart.

**One file has everything:** `database/schema.sql` creates all 6 tables
*and* fills them with the site's real, current content. Importing that one
file is the entire database setup — nothing else needs to run afterward.

These steps assume Windows with XAMPP. If XAMPP isn't installed yet,
download it from https://www.apachefriends.org/ and install it first — the
defaults are fine.

## 1. Start MySQL

1. Open **XAMPP Control Panel** (`C:\xampp\xampp-control.exe`).
2. Click **Start** next to **MySQL**. The row turns green when it's running.
   - If it won't start because the port is in use, another MySQL instance is
     probably already running — check Windows Task Manager for `mysqld.exe`.

You can also start it without the Control Panel UI, from a terminal:

```
C:\xampp\mysql_start.bat
```

## 2. Import the database (schema + data, one file)

From the project root, run:

```
"C:\xampp\mysql\bin\mysql.exe" -u root < database\schema.sql
```

Or via phpMyAdmin: open http://localhost/phpmyadmin → **Import** tab →
choose `database/schema.sql` → **Go**.

This single command creates the `securityand_patrol` database, all 6
tables (`services`, `blog_posts`, `offices`, `pages`, `content_blocks`,
`site_settings`), and inserts every row of real content — 9 services, 39
blog posts, 6 offices, and the site's contact/offices page content. It is
**safe to run more than once**: table creation is skipped if tables already
exist, and every row is inserted with `REPLACE INTO`, so re-running this
file resets content back to what's in this file without creating
duplicates or erroring.

To confirm it worked:

```
"C:\xampp\mysql\bin\mysql.exe" -u root -e "USE securityand_patrol; SELECT COUNT(*) FROM services;"
```

Should return `9`.

## 3. Configure the app's database connection

The project reads connection settings from an env file in the project
root. There are two files, both already created:

- **`.env.example`** — a template showing which variables are needed, with
  no real values. This one *is* committed to git, so anyone cloning the
  repo can see what to set.
- **`.env.local`** — your actual local values. This one is **not**
  committed (it's in `.gitignore`) since in general it could hold real
  credentials. On this project the local default has no password, but
  treat it the same way on any other machine.

To set up on a new machine: copy `.env.example` to `.env.local`, then edit
`.env.local` with your real values. Default XAMPP has no MySQL root
password, so these defaults normally work as-is:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=securityand_patrol
DB_CONNECTION_LIMIT=1
```

If your XAMPP MySQL has a root password set, put it in `DB_PASSWORD`.
`DB_CONNECTION_LIMIT` controls how many MySQL connections one app process
can open; keep it low when several app processes share the same database.

## 4. Run the site

```
npm install
npm run dev
```

Visit http://localhost:3000 — services, blog posts, offices, the header's
menus, and the contact-us/offices pages are now rendered live from the
database.

## 5. Editing content (day to day)

Use **phpMyAdmin**, which comes bundled with XAMPP, as a point-and-click
editor — no SQL knowledge required for simple edits:

1. With MySQL running, open http://localhost/phpmyadmin in a browser.
2. Click `securityand_patrol` in the left sidebar.
3. Click a table (e.g. `services`), then click **Browse** to see rows, or
   **Edit** (pencil icon) on a row to change its fields, or **Insert** to
   add a new row.
4. Click **Go** to save. Refresh the site to see the change — it's
   immediate, not delayed.

Which table to edit for what:

| Table | Controls |
|---|---|
| `services` | Each of the 9 service detail pages, their home-page cards, and the header's Services menu (title/summary/links all come from here) |
| `blog_posts` | Each blog post shown on `/ads-blog` and its own page |
| `offices` | The 6 office locations shown on the home page and the header's Our Offices menu |
| `pages` | Whole-page HTML for `offices`, `ads-guards-contact-us`, and the (currently unused) `home-why-choose` block |
| `site_settings` | Single shared values: `company_name`, `phone`, `email` |
| `content_blocks` | Reserved for future smaller, named page sections — empty for now |

A note on the `services` table's `content_html` column: this holds the
full body of each service page (paragraphs, accordions, images) as HTML —
that's standard practice for rich page content in any CMS, the same way
WordPress itself stores post content. Everything else (title, summary,
links, SEO fields) is plain data, not HTML.

## 6. Resetting to a fresh database (e.g. for a client, or a new server)

Re-run step 2 on the new server — `database/schema.sql` is fully
self-contained, so this is the entire setup:

```
"C:\xampp\mysql\bin\mysql.exe" -u root < database\schema.sql
```

To capture a **new** snapshot of whatever is currently in the database
(e.g. after making edits you want to ship as the new baseline), regenerate
the data portion of `schema.sql`:

```
"C:\xampp\mysql\bin\mysqldump.exe" -u root --no-create-info --complete-insert --replace --skip-triggers --extended-insert=FALSE securityand_patrol > database\data-only.sql
```

Then replace everything in `schema.sql` after the
`-- Starting data below` marker with the contents of `data-only.sql`, and
delete `data-only.sql`.

## Troubleshooting

- **"Can't connect to MySQL server"** — MySQL isn't running; go back to
  step 1.
- **App shows empty content / falls back oddly** — check `.env.local`
  matches your actual MySQL credentials, and that `database/schema.sql`
  was imported.
- **Want to start over from scratch** — re-run `database/schema.sql`; it
  resets every row back to what's in the file (see step 2).
