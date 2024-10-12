import react from "@vitejs/plugin-react"
import { defineConfig as defineViteConfig } from "vite"
import { coverageConfigDefaults } from "vitest/config"

export default defineViteConfig((baseEnv) => {
  const env = {
    ...baseEnv,
    environment: process.env.VITE_ENV || baseEnv.mode,
  }

  if (env.environment === "production") {
    //
  }

  if (env.environment === "staging") {
    //
  }

  if (env.environment === "beta") {
    //
  }

  if (env.environment === "development") {
    //
  }

  if (env.environment === "test") {
    //
  }

  return {
    build: {
      sourcemap: true,
      manifest: true,
      outDir: "dist",
    },
    plugins: [react({})],
    test: {
      environment: "jsdom",
      globals: true,
      css: false,
      setupFiles: "./src/setupTests.ts",
      restoreMocks: true,
      reporters: process.env.CI
        ? ["verbose", ["junit", { outputFile: "junit.xml" }]]
        : ["verbose"],

      coverage: {
        enabled: !!process.env.CI,
        reporter: ["text", "json", "html"],
        include: ["src"],
        exclude: [
          ...coverageConfigDefaults.exclude,
          "**/__mocks__/**",
          "**/index.ts",
          "**/index.tsx",
        ],

        thresholds: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },
      },
    },
  }
})
