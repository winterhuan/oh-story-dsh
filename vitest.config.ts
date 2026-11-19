import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Keep this repository's tests independent of any enclosing workspace config.
export default defineConfig({
  root: fileURLToPath(new URL("./packages/dsh-plugin", import.meta.url)),
  test: { include: ["tests/**/*.test.{ts,tsx}"] }
});
