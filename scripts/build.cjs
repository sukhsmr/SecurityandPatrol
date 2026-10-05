/* eslint-disable @typescript-eslint/no-require-imports -- plain Node CommonJS script */
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = fs.realpathSync.native(path.resolve(__dirname, ".."));

const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");

// `--static` produces a static export of the public site in `out/`.
const isStatic = process.argv.includes("--static");

console.log(`Building ${isStatic ? "static export" : "server build"} from:`, root);

// Regenerate the combined site stylesheet first (see scripts/bundle-css.cjs).
const bundle = spawnSync(process.execPath, [path.join(root, "scripts", "bundle-css.cjs")], { cwd: root, stdio: "inherit" });
if (bundle.status !== 0) process.exit(bundle.status ?? 1);

const result = spawnSync(process.execPath, [nextCli, "build", "--webpack"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, ...(isStatic ? { CMS_STATIC_EXPORT: "1" } : {}) },
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
