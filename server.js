/* eslint-disable @typescript-eslint/no-require-imports -- plain Node CommonJS entry point */
/**
 * Production entry point for the server build (site + admin + API).
 *
 * `next start` only accepts a numeric port, but IIS hosts Node apps through
 * modules that pass the address in different ways (ASP.NET Core Module,
 * HttpPlatformHandler, iisnode's named pipe). This server listens on whatever
 * it is given, so the same file works under IIS/Plesk, PM2, Docker or plain
 * `node server.js`.
 *
 *   npm run build   →   node server.js   (PORT defaults to 3000)
 */
const { createServer } = require("node:http");
const path = require("node:path");

// IIS does not guarantee the working directory; content (data/), the
// build (.next/) and .env.local are all resolved relative to this folder.
process.chdir(__dirname);
process.env.NODE_ENV = "production";

// Under IIS there is no console to read, so keep a log file (logs/server.log,
// hidden from the web by web.config). Rotated when it passes 5 MB.
if (process.env.ASPNETCORE_PORT || process.env.HTTP_PLATFORM_PORT || process.env.IISNODE_VERSION) {
  const fs = require("node:fs");
  const util = require("node:util");
  const logDir = path.join(__dirname, "logs");
  const logFile = path.join(logDir, "server.log");
  try {
    fs.mkdirSync(logDir, { recursive: true });
    if (fs.existsSync(logFile) && fs.statSync(logFile).size > 5 * 1024 * 1024) fs.renameSync(logFile, `${logFile}.old`);
  } catch {
    // Logging must never stop the site from starting.
  }
  const write = (level, args) => {
    try {
      fs.appendFileSync(logFile, `${new Date().toISOString()} ${level} ${util.format(...args)}\n`);
    } catch {
      // ignore
    }
  };
  for (const level of ["log", "info", "warn", "error"]) {
    const original = console[level].bind(console);
    console[level] = (...args) => {
      write(level.toUpperCase(), args);
      original(...args);
    };
  }
  process.on("uncaughtException", (error) => write("FATAL", [error]));
  process.on("unhandledRejection", (error) => write("FATAL", [error]));
}

const next = require("next");

// IIS ASP.NET Core Module (ANCM) passes ASPNETCORE_PORT, HttpPlatformHandler
// HTTP_PLATFORM_PORT, iisnode a named pipe in PORT; otherwise default to 3000.
const port = process.env.ASPNETCORE_PORT || process.env.HTTP_PLATFORM_PORT || process.env.PORT || 3000;
const app = next({ dev: false, dir: path.resolve(__dirname) });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      // Plesk lists its startup file as the IIS default document, so IIS turns
      // a request for "/" into "/.plesk.startup.cjs" before Node sees it.
      // That file is never served, so map it back to the home page.
      req.url = req.url.replace(/^\/\.plesk\.startup\.cjs(?=\?|$)/i, "/");
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
