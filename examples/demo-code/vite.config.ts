import { readdirSync } from "node:fs"
import { resolve } from "node:path"

import { defineConfig } from "vite"
import { coverageConfigDefaults } from "vitest/config"

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

      coverage: {
        enabled: !!process.env.CI,
        reporter: ["text", "json", "html"],
        include: ["src/**/*.{js,ts}"],
        exclude: [
          ...coverageConfigDefaults.exclude,
          "**/__mocks__/**",
          "**/*.d.ts",
          "**/index.ts",
        ],

        // thresholds: {
        //   statements: 90,
        //   branches: 90,
        //   functions: 90,
        //   lines: 90,
        // },
      },
    },
  }
})
