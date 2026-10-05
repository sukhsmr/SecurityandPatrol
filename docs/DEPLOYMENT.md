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

### 3. Back up and clear the old static site

In Plesk → **Files**, back up `httpdocs`, then delete the old static export from it (`index.html`, the page folders, `_next`, `404.html`, etc.). Keep any Plesk-specific files you know you need. Leftover static files would not break anything, because every request goes to Node, but they are confusing to keep.

### 4. Upload

Upload the **contents** of `deploy/` into `httpdocs`, plus your `.env.local`. You should end up with:

```text
httpdocs/
├── .next/
├── data/
├── public/
├── .env.local
├── next.config.ts
├── package.json
├── package-lock.json
├── server.js
└── web.config
```

### 5. Enable Node.js in Plesk

Go to **Websites & Domains → devtech.aviorconventschool.com → Node.js** and set:

| Setting | Value |
| --- | --- |
| Node.js version | 20.9+ (22.x recommended) |
| Package manager | npm |
| Document root | `/httpdocs` |
| Application mode | production |
| Application root | `/httpdocs` |
| Application startup file | `server.js` |

Then:

1. Click **Enable Node.js**.
2. Click **NPM install**. It installs only production dependencies (about 30 packages).
3. Plesk may write its own `web.config` when you enable Node.js. If it replaced the project's file (look for the `NextApp` rewrite rule), upload the project's `web.config` again.
4. Click **Restart App**.

### 6. File permissions

The app writes to `data/` (content, backups), `public/uploads/` (uploaded images) and `.next/` (page cache). In Plesk → **Files**, make sure the site's system user / application-pool user has **Modify** permission on `httpdocs` (this is the Plesk default for subscription users).

### 7. Check

- `http://devtech.aviorconventschool.com/` shows the website.
- `http://devtech.aviorconventschool.com/admin/login` shows the sign-in page.
- Sign in, edit something small, save, and check the change on the public page.

---

## Updating the site

Whenever the **code** changes:

```bash
npm run deploy:package          # no --with-data: live content is kept
```

1. Upload the contents of `deploy/` over `httpdocs`. This replaces `.next/`, `public/`, `server.js` and the other code files. It does **not** touch `data/` or `.env.local`.
2. If `package.json` changed, click **NPM install**.
3. Click **Restart App**.

> **Never upload `data/` again after the first deployment.** It would overwrite every edit made in the live admin. To move content from the live site back to your computer, download `httpdocs/data/` from Plesk.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| IIS "404 - File or directory not found" on `/admin/login` | Node.js is not enabled, or `web.config` is missing or was replaced. Redo step 5. |
| "500 - iisnode encountered an error" | Open `httpdocs/iisnode/` (logs) in Plesk Files. Usually a Node.js version below 20.9, or **NPM install** not run. |
| Sign-in page says *"Admin login is not configured on this server"* | `.env.local` is missing or incomplete (step 2). Then **Restart App**. |
| "Unable to save content" in the admin | Missing write permission on `httpdocs/data` (step 6). |
| Changes uploaded but site unchanged | Click **Restart App** (the app only restarts by itself when `server.js`, `web.config` or `.env.local` change). |

The site is served over `http://`, so the admin login cookie is sent unencrypted. Add an SSL certificate in Plesk (free Let's Encrypt) and use `https://`. The app marks the cookie `Secure` automatically on HTTPS.
