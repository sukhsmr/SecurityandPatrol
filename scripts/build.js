const fs = require('fs');
const { execSync } = require('child_process');

// Windows filesystem paths are case-insensitive but Node's module cache is
// case-sensitive. If this script is invoked from a differently-cased path
// than the folder's real on-disk casing (e.g. `cd C:\inetpub\...` on a
// server whose real path is `C:\Inetpub\...`), webpack can end up loading
// two separate copies of a Next.js internal module along two differently
// cased require paths. Next uses one of those internal modules (an
// AsyncLocalStorage-based request-context store) to pass request state
// across a page's render; if the copy that reads it isn't the same module
// instance as the copy that set it, the read finds nothing and throws
// "Invariant: Expected workStore to be initialized" during static
// generation. Normalizing cwd to its real path before building keeps every
// path Next.js resolves consistently cased.
process.chdir(fs.realpathSync(process.cwd()));

execSync('npx next build --webpack', { stdio: 'inherit', cwd: process.cwd() });

// next.config.ts sets output: 'standalone', which emits a minimal
// .next/standalone/server.js but deliberately does NOT include the public/
// and .next/static/ folders (Next's docs say to copy them in yourself —
// https://nextjs.org/docs/app/api-reference/config/next-config-js/output).
// Without them the standalone server 404s on every asset and CSS/JS/image
// request, which is what was producing the live-site 500.
fs.cpSync('public', '.next/standalone/public', { recursive: true });
fs.cpSync('.next/static', '.next/standalone/.next/static', { recursive: true });
