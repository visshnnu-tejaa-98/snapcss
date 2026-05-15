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
  // Loaded by docs-site so console.log / debugger statements in the TS source
  // are visible in the browser DevTools console.
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
]);
