import { coverageConfigDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
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
      ],

      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
})
