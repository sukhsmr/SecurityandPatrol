# Rayven Security Protection website

Next.js site with a JSON-file CMS and a protected admin panel at `/admin`.

```bash
npm install
cp .env.example .env.local     # set admin credentials: npm run cms:hash-password -- "your-password"
npm run dev                    # http://localhost:3000 and http://localhost:3000/admin
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (site + admin) |
| `npm run build` / `npm start` | Production server build (site + admin + API) |
| `npm run deploy:package` | Build and assemble the server version in `deploy/` for upload |
| `npm run build:static` | Static export of the public site to `out/` (no admin) |
| `npm run cms:hash-password -- "<password>"` | Generate admin password hash and session secret |
| `npm run css:bundle` | Rebuild the combined site stylesheet (runs automatically with dev/build) |
| `npm run lint` | ESLint |

Content lives in `data/` (pages, sections, posts, header, footer, settings, offices).

**Deploying with the admin panel (Plesk/IIS):** see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). The static export has no admin.

See **[docs/CMS.md](docs/CMS.md)** for the full guide: managing pages and sections, header/footer, SEO, images, JSON structure, authentication, architecture and API.
