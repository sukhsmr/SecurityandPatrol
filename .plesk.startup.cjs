/* eslint-disable @typescript-eslint/no-require-imports -- plain Node CommonJS entry point */
// Startup file name Plesk's Node.js "Auto-configure" uses. It simply runs
// server.js, so the app works whether Plesk's "Application Startup File"
// is set to .plesk.startup.cjs or server.js.
require("./server.js");
