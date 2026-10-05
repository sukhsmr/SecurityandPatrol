# Deploying the site with the admin panel (Plesk on Windows)

The admin panel (`/admin`) and its API need a running Node.js server: they log you in and save content. The **static export** (`npm run build:static`, the `out/` folder) is plain HTML files, so it has **no admin panel**. Uploading `out/` is why `/admin/login` shows *"404 - File or directory not found"* from IIS.

To get the admin working on `devtech.aviorconventschool.com`, run the site as a Node.js application in Plesk. The project includes what that needs:

| File | Purpose |
| --- | --- |
| `server.js` | Starts the app on whatever address IIS provides (ASP.NET Core Module port, iisnode pipe, or a normal port), keeps `logs/server.log`, and maps IIS's default-document rewrite back to `/`. |
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

### 6. Give the app write access (required for the admin)

The app must write to `data/` (content and backups), `public/uploads/` (images), `.next/` (page cache) and `logs/` (server log). By default the site's **application pool group (`IWPG_aviorcon`) has read-only access**: pages load, but saving in the admin fails with *"Unable to save content"*.

In Plesk → **Files** → `devTech.aviorconventschool.com`:

1. Create the folders `logs` and `public/uploads` if they don't exist.
2. For each of `data`, `logs`, `.next` and `public/uploads`: click the folder's **⋯ menu → Change Permissions**, select **Application pool group (IWPG_aviorcon)**, tick **Allow → Modify**, make sure it applies to *this folder, subfolders and files*, and click **OK**.

Only grant write access on these four folders, not on the whole site. The app never needs to modify its own code.

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

1. Upload the contents of `deploy/` into the application root (`/devTech.aviorconventschool.com`). This replaces `.next/`, `public/`, `server.js` and the other code files. It does **not** touch `data/` or `.env.local`.
2. If `package.json` changed, click **NPM install**.
3. Click **Restart App**.

> **Never upload `data/` again after the first deployment.** It would overwrite every edit made in the live admin. To move content from the live site back to your computer, download `data/` from the application root in Plesk.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| IIS "404 - File or directory not found" on `/admin/login` | Document Root still points to `out/` (step 4), or `web.config` is missing or was replaced (step 5). Also check the URL is `/admin/login`. |
| App does not start | Read `logs/server.log` in Plesk Files. Usually a Node.js version below 20.9, or **NPM install** not run. |
| Sign-in page says *"Admin login is not configured on this server"* | `.env.local` is missing or incomplete (step 2). Then **Restart App**. |
| "Unable to save content" in the admin | The application pool group has no write access (step 6). |
| IIS 500.21 / 500.19 on every page | `web.config` was replaced by Plesk's iisnode version. Upload the project's `web.config` (step 5). |
| Home page (`/`) shows 500 but other pages work | An old `server.js`. The current one maps IIS's default document (`/.plesk.startup.cjs`) back to `/`. |
| Need the server's error messages | Read `logs/server.log` in Plesk Files (after step 6). |
| Changes uploaded but site unchanged | Click **Restart App**, or re-save `web.config` in Plesk Files. |

The site is served over `http://`, so the admin login cookie is sent unencrypted. Add an SSL certificate in Plesk (free Let's Encrypt) and use `https://`. The app marks the cookie `Secure` automatically on HTTPS.
