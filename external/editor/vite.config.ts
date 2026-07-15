import { readdirSync } from "node:fs"
import { resolve } from "node:path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    rollupOptions: {
      input: readdirSync(import.meta.dirname)
        .filter((filename) => filename.endsWith(".html"))
        .map((filename) => resolve(__dirname, filename)),
    },
  },
})
