import { defineConfig } from "tsup";

export default defineConfig([
  // ── npm package (ESM + CJS, minified) ────────────────────────────────────
  {
    entry: ["packages/core/src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    minify: true,
    sourcemap: true,
    clean: true,
    outDir: "dist",
    treeshake: true,
    target: "es2020",
  },

  // ── browser debug build (IIFE, unminified) ────────────────────────────────
  // Local only - loaded by docs-site for DevTools debuging. Gitignored
  {
    entry: { "snap-core": "packages/core/src/index.ts" },
    format: ["iife"],
    globalName: "SnapCore",
    minify: false,
    sourcemap: true,
    outDir: "docs-site/public",
    outExtension: () => ({ js: ".js" }),
    target: "es2020",
    define: {
      "process.env.NODE_ENV": '"development"',
    },
  },

  // ──CDN build (IIFE, minified) ────────────────────────────────
  // Published in dist/ so users can load via unpkg / jsdeliver with a plain
  // <script> tag. Auto-inits on DOMContentLoaded (baked into index.ts).
  // Global exposed: window.SnapCSS
  {
    entry: { snapcss: "packages/core/src/index.ts" },
    format: ["iife"],
    globalName: "SnapCSS",
    minify: true,
    sourcemap: true,
    outDir: "dist",
    outExtension: () => ({ js: ".min.js" }),
    target: "es2020",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  },
]);
