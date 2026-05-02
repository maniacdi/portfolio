import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["__tests__/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "cypress"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/app/services/**", "src/app/store/**", "src/utils/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/app/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
