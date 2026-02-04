import { readdirSync } from "node:fs"
import { resolve } from "node:path"

import react from "@vitejs/plugin-react"
import { defineConfig as defineViteConfig } from "vite"

export default defineViteConfig((baseEnv) => {
  return {
    plugins: [react()],
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
