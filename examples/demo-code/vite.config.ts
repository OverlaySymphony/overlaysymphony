import { readdirSync } from "node:fs"
import { resolve } from "node:path"

import { defineConfig } from "vite"

export default defineConfig((baseEnv) => {
  return {
    plugins: [],
    build: {
      target: "esnext",
      rollupOptions: {
        input: readdirSync(__dirname)
          .filter((filename) => filename.endsWith(".html"))
          .map((filename) => resolve(__dirname, filename)),
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      css: false,
      setupFiles: "./src/setupTests.ts",
      restoreMocks: true,
    },
  }
})
