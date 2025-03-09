import { defineConfig as defineViteConfig } from "vite"

export default defineViteConfig((baseEnv) => {
  return {
    plugins: [],
    build: {
      target: "esnext",
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
