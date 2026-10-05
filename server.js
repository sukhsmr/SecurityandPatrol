/* eslint-disable @typescript-eslint/no-require-imports -- plain Node CommonJS entry point */
/**
 * Production entry point for the server build (site + admin + API).
 *
 * `next start` only accepts a numeric port, but IIS/iisnode (Plesk on
 * Windows) hands the app a named pipe in process.env.PORT. This server
 * listens on whatever it is given, so the same file works under iisnode,
 * Plesk Node.js, PM2, Docker or plain `node server.js`.
 *
 *   npm run build   →   node server.js   (PORT defaults to 3000)
 */
const { createServer } = require("node:http");
const path = require("node:path");

// iisnode does not guarantee the working directory; content (data/), the
// build (.next/) and .env.local are all resolved relative to this folder.
process.chdir(__dirname);
process.env.NODE_ENV = "production";

const next = require("next");

const port = process.env.PORT || 3000; // number, or a named pipe under iisnode
const app = next({ dev: false, dir: path.resolve(__dirname) });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res).catch((error) => {
        console.error("[server] Request failed", req.url, error);
        if (!res.headersSent) res.statusCode = 500;
        res.end("Internal Server Error");
      });
    }).listen(port, () => {
      console.log(`> Server ready on ${typeof port === "string" && !/^\d+$/.test(port) ? port : `http://localhost:${port}`}`);
    });
  })
  .catch((error) => {
    console.error("[server] Failed to start", error);
    process.exit(1);
  });
