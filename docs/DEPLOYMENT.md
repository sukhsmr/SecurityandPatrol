# Deploying the site with the admin panel (Plesk on Windows)

The admin panel (`/admin`) and its API need a running Node.js server: they log you in and save content. The **static export** (`npm run build:static`, the `out/` folder) is plain HTML files, so it has **no admin panel**. Uploading `out/` is why `/admin/login` shows *"404 - File or directory not found"* from IIS.

To get the admin working on `devtech.aviorconventschool.com`, run the site as a Node.js application in Plesk. The project includes what that needs:

| File | Purpose |
| --- | --- |
| `server.js` | Starts the app on whatever address IIS provides (ASP.NET Core Module port, iisnode pipe, or a normal port), keeps a server log (`App_Data/cms/logs/server.log`), copies `data/` into `App_Data` on first start, and maps IIS's default-document rewrite back to `/`. |
| `web.config` | Runs `server.js` through IIS (ASP.NET Core Module), hides internal folders, and shows the site's own 404 pages. |
| `npm run deploy:package` | Builds the server version and puts everything to upload in `deploy/`. |

Requirements: Plesk with the **Node.js** extension, and **Node.js 20.9 or newer** (Next.js 16 requirement; pick 22.x if offered).

---

## First deployment

### 1. Build the package (on your computer)

```bash
npm run deploy:package -- --with-data
```

`--with-data` includes the content (`data/` and `public/uploads/`). Use it **only for the first deployment**. After that, the live server owns the content (see [Updating the site](#updating-the-site)).

### 2. Create the admin credentials (on your computer)

```bash
npm run cms:hash-password -- "choose-a-long-strong-password"
```

Create a file named `.env.local` containing:

```bash
CMS_ADMIN_USERNAME=admin
CMS_ADMIN_PASSWORD_HASH=<the scrypt:... line printed above>
CMS_SESSION_SECRET=<the long random line printed above>
```

Use your own password; don't reuse the local development one. `web.config` blocks `.env.local` from ever being downloaded.

### 3. Upload into the application root

On this server the application root is **`/devTech.aviorconventschool.com`** (Plesk → Node.js → *Application Root*). It is the folder that currently contains `out/`, `package.json` and `.plesk.startup.cjs`.

1. In Plesk → **Files**, back up that folder (select it → *Archive*, or download it).
2. Upload the **contents** of `deploy/` into `/devTech.aviorconventschool.com`, replacing existing files, plus your `.env.local`. Leave the old `out/` folder alone; it is simply no longer used.

You should end up with:

```text
devTech.aviorconventschool.com/
├── .next/
├── data/
├── public/
├── .env.local
├── .plesk.startup.cjs
├── next.config.ts
├── package.json
├── package-lock.json
├── server.js
├── web.config
└── out/            (old static site, no longer served)
```

### 4. Fix the Node.js settings

Go to **Websites & Domains → devTech.aviorconventschool.com → Node.js**. The one setting that blocks the admin is the **Document Root**:

| Setting | Currently | Change to |
| --- | --- | --- |
| Document Root | `/devTech.aviorconventschool.com/out` | **`/devTech.aviorconventschool.com`** (same as Application Root) |
| Application Root | `/devTech.aviorconventschool.com` | keep |
| Application Startup File | `.plesk.startup.cjs` | keep (it starts `server.js`) |
| Application Mode | production | keep |
| Node.js Version | 20.20.2 | keep (20.9+ required) |

With the Document Root on `out/`, IIS serves the old static HTML files itself and never passes requests to Node.js, so `/admin` and `/api` return *"404 - File or directory not found"*.

### 5. Install and start

1. Click **NPM install**.
2. Open `web.config` in the application root. It must be the project's file: it starts the app with `<aspNetCore processPath="C:\Program Files
odejs
ode.exe" arguments=".\server.js" …>`. If Plesk replaced it (it writes an iisnode version when Node.js is enabled), upload the project's `web.config` again.
3. Click **Restart App** (or re-save `web.config`).

> **Why not iisnode?** On this server the iisnode module fails to load for the site (IIS error 500.21), so `web.config` runs Node through the **ASP.NET Core Module**, which is installed with IIS. Plesk's Node.js page still shows `.plesk.startup.cjs` as the startup file; that file only forwards to `server.js`, and the page's NPM install button keeps working.

### 6. Where content is saved (no permission changes needed)

The site's application pool (`IWPG_aviorcon`) can only **read** the application folder, but Plesk gives it full access to **`App_Data`**, which IIS never serves to visitors. `web.config` therefore sets:

| Variable | Value | Holds |
| --- | --- | --- |
| `CMS_DATA_DIR` | `App_Data\cms\data` | All content (pages, posts, header, footer, settings, backups) |
| `CMS_UPLOAD_DIR` | `App_Data\cms\uploads` | Images uploaded in the admin (served at `/uploads/...`) |
| `CMS_LOG_DIR` | `App_Data\cms\logs` | `server.log` |

On its first start, `server.js` copies the deployed `data/` folder into `App_Data\cms\data`. From then on **the live content is in `App_Data\cms\data`**; the `data/` folder is only the starting copy.

Public pages are rendered on request from that content, so edits appear immediately and the app never writes into `.next`.

### 7. Check

- `http://devtech.aviorconventschool.com/` shows the website.
- `http://devtech.aviorconventschool.com/admin/login` shows the sign-in page. (Note the spelling: `/admin`, not `/adminn`.)
- Sign in, edit something small, save, and check the change on the public page.

---

## Updating the site

Whenever the **code** changes:

```bash
npm run deploy:package          # no --with-data: live content is kept
```

1. Upload the contents of `deploy/` into the application root (`/devTech.aviorconventschool.com`). This replaces `.next/`, `public/`, `server.js` and the other code files. It does **not** touch `App_Data/` (live content) or `.env.local`.
   - Alternatively, upload only the changed source files and run the `build` script from Plesk → Node.js → **Run script**.
2. If `package.json` changed, click **NPM install**.
3. **Restart the app by re-saving `web.config`** in Plesk Files (open it and click Save). Plesk's *Restart App* button does not restart the ASP.NET Core Module process. Until the app restarts after a build, pages load without their JavaScript (popups and the admin don't work), because the running process still has the old file list.

> **The live content is in `App_Data/cms/data`.** Uploading `data/` again does not change the live site. To copy live content back to your computer, download `App_Data/cms/data` in Plesk Files and put it in your project's `data/` folder.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| IIS "404 - File or directory not found" on `/admin/login` | Document Root still points to `out/` (step 4), or `web.config` is missing or was replaced (step 5). Also check the URL is `/admin/login`. |
| App does not start | Read `App_Data/cms/logs/server.log` in Plesk Files. Usually a Node.js version below 20.9, or **NPM install** not run. |
| Sign-in page says *"Admin login is not configured on this server"* | `.env.local` is missing or incomplete (step 2). Then **Restart App**. |
| "Unable to save content" in the admin | `web.config` is missing the `CMS_DATA_DIR` / `CMS_UPLOAD_DIR` settings (step 6), or `App_Data` lost the application pool group's write access. |
| Popups don't open, `/admin` shows "Internal Server Error", browser console shows 404s for `/_next/static/...` | The app wasn't restarted after a build. Re-save `web.config`. |
| IIS 500.21 / 500.19 on every page | `web.config` was replaced by Plesk's iisnode version. Upload the project's `web.config` (step 5). |
| Home page (`/`) shows 500 but other pages work | An old `server.js`. The current one maps IIS's default document (`/.plesk.startup.cjs`) back to `/`. |
| Need the server's error messages | Read `App_Data/cms/logs/server.log` in Plesk Files. |
| Changes uploaded but site unchanged | Click **Restart App**, or re-save `web.config` in Plesk Files. |

The site is served over `http://`, so the admin login cookie is sent unencrypted. Add an SSL certificate in Plesk (free Let's Encrypt) and use `https://`. The app marks the cookie `Secure` automatically on HTTPS.
