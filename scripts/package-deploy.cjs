/* eslint-disable @typescript-eslint/no-require-imports -- plain Node CommonJS script */
/**
 * Builds the Node.js server version and assembles everything the server
 * needs into ./deploy, ready to upload to the host (e.g. Plesk httpdocs).
 *
 *   npm run deploy:package               code + build only (keeps live content)
 *   npm run deploy:package -- --with-data   also include data/ (first deploy only)
 *
 * Content edited in the live admin lives in data/ on the server, so data/ is
 * left out by default: re-uploading it would overwrite those edits.
 * On the server, run `npm install --omit=dev` once (Plesk: "NPM install").
 */
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "deploy");
const withData = process.argv.includes("--with-data");

const build = spawnSync(process.execPath, [path.join(root, "scripts", "build.cjs")], { cwd: root, stdio: "inherit" });
if (build.status !== 0) process.exit(build.status ?? 1);

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);

const copy = (rel, filter) => {
  const from = path.join(root, rel);
  if (!fs.existsSync(from)) return;
  fs.cpSync(from, path.join(out, rel), { recursive: true, filter: filter ?? (() => true) });
};

for (const file of ["server.js", "web.config", "package.json", "package-lock.json", "next.config.ts", ".env.example"]) copy(file);
copy("public", (src) => !src.includes(`${path.sep}uploads${path.sep}`) || withData);
// Build output without the local build cache and dev-server files.
copy(".next", (src) => {
  const rel = path.relative(path.join(root, ".next"), src);
  return !/^(cache|dev|types|trace)(\\|\/|$)/.test(rel);
});
if (withData) copy("data", (src) => !src.includes(`${path.sep}.backups`));

const size = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).reduce((total, entry) => {
    const p = path.join(dir, entry.name);
    return total + (entry.isDirectory() ? size(p) : fs.statSync(p).size);
  }, 0);

console.log(`\nDeployment package ready: ${path.relative(root, out)}/ (${Math.round(size(out) / 1024 / 1024)} MB)`);
console.log(withData ? "Includes data/ — upload it only on the FIRST deploy." : "data/ not included — the server keeps its live content.");
console.log("Next steps: see docs/DEPLOYMENT.md");
