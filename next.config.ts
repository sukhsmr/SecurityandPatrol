import type { NextConfig } from "next";

/**
 * Two build modes share one codebase:
 *
 * - Server build (default, `npm run build` + `npm start`): public site, admin
 *   panel and JSON write API. Content edits go live without a rebuild.
 * - Static export (`npm run build:static`): public site only, written to
 *   `out/` for static hosting (the current IIS deployment). Admin, API and
 *   preview routes are excluded.
 *
 * Route files that need a Node server use the `.runtime.ts(x)` extension;
 * files only used by the static export use `.export.tsx`.
 */
const isStaticExport = process.env.CMS_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  pageExtensions: isStaticExport
    ? ["export.tsx", "export.ts", "tsx", "ts"]
    : ["runtime.tsx", "runtime.ts", "tsx", "ts"],
  ...(isStaticExport ? { typescript: { tsconfigPath: "tsconfig.export.json" } } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
