const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = fs.realpathSync.native(path.resolve(__dirname, ".."));

const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");

console.log("Building from:", root);

const result = spawnSync(process.execPath, [nextCli, "build", "--webpack"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
