# Deploying the site with the admin panel (Plesk on Windows)

The admin panel (`/admin`) and its API need a running Node.js server: they log you in and save content. The **static export** (`npm run build:static`, the `out/` folder) is plain HTML files, so it has **no admin panel**. Uploading `out/` is why `/admin/login` shows *"404 - File or directory not found"* from IIS.

To get the admin working on `devtech.aviorconventschool.com`, run the site as a Node.js application in Plesk. Plesk on Windows does this through **iisnode**. The project includes what that needs:

| File | Purpose |
| --- | --- |
| `server.js` | Starts the app. Listens on the named pipe iisnode provides (works with a normal port too). |
| `web.config` | Sends every request to `server.js`, hides internal folders, and shows the site's own 404 pages. |
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
2. Plesk may rewrite `web.config` when settings change. Open `web.config` in the application root. If it doesn't contain the rule `<rule name="NextApp"`, upload the project's `web.config` again.
3. Click **Restart App**.

### 6. File permissions

The app writes to `data/` (content, backups), `public/uploads/` (uploaded images) and `.next/` (page cache). In Plesk → **Files**, make sure the site's system user / application-pool user has **Modify** permission on the application root (this is the Plesk default for subscription users).

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
| "500 - iisnode encountered an error" | Open the `iisnode/` folder in the application root (logs) in Plesk Files. Usually a Node.js version below 20.9, or **NPM install** not run. |
| Sign-in page says *"Admin login is not configured on this server"* | `.env.local` is missing or incomplete (step 2). Then **Restart App**. |
| "Unable to save content" in the admin | Missing write permission on `data/` in the application root (step 6). |
| Changes uploaded but site unchanged | Click **Restart App** (the app only restarts by itself when `server.js`, `web.config` or `.env.local` change). |

The site is served over `http://`, so the admin login cookie is sent unencrypted. Add an SSL certificate in Plesk (free Let's Encrypt) and use `https://`. The app marks the cookie `Secure` automatically on HTTPS.
