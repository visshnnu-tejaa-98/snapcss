import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["packages/core/src/index.ts"], // Entry point
  format: ["esm", "cjs"], // Allowed formats are express module and common js module
  dts: true, // To include type definations in d.ts files
  minify: true, // To minify the output bundle
  sourcemap: true, // Helps in debug - without source map, occured errors points to minified js file, with this true, the errors points to original ts file
  clean: true, // Delets previous dist folter after every build
  outDir: "dist", // Out directory
  treeshake: true, // Removes unused code in bundle
  target: "es2020", // Generates JS compatible with ES2020
});
