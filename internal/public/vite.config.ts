import { readdirSync } from "node:fs"
import { resolve } from "node:path"

import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      input: readdirSync(import.meta.dirname)
        .filter((filename) => filename.endsWith(".html"))
        .map((filename) => resolve(__dirname, filename)),
    },
  },
})
