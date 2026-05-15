import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@snapcss/parser": path.resolve(__dirname, "packages/parser/src/index.ts"),
      "@snapcss/utilities": path.resolve(__dirname, "packages/utilities/src/index.ts"),
      "@snapcss/themes": path.resolve(__dirname, "packages/themes/src/index.ts"),
      "@snapcss/core": path.resolve(__dirname, "packages/core/src/index.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
