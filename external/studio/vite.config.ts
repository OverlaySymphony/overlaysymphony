import { existsSync, readdirSync } from "node:fs"
import { basename, posix, resolve } from "node:path"

import { type ModuleManifest } from "@overlaysymphony/core/module"
import { defineConfig } from "vite"
import { coverageConfigDefaults } from "vitest/config"

import modulesFiles from "./src/modules/index.ts"
import emitJson from "./vite-plugin.emit-json.ts"
import { importCssStyleSheets } from "./vite-plugin.import-css-style-sheets.ts"

// https://vitejs.dev/config/
export default defineConfig({
  appType: "mpa",
  plugins: [importCssStyleSheets(), emitJson(modulesFiles)],
  resolve: {
    alias: [{ find: /^\/(modules\/.+)\.js$/, replacement: "/src/$1.ts" }],
  },
  input: {
    ...Object.fromEntries(
      readdirSync(import.meta.dirname)
        .filter((filename) => filename.endsWith(".html"))
        .map((filename) => [
          basename(filename, ".html"),
          resolve(import.meta.dirname, filename),
        ]),
    ),
    ...Object.fromEntries(
      Object.entries(modulesFiles)
        .flatMap(([file, manifest]) =>
          extractManifestScripts(manifest).map((script) =>
            posix.join(posix.dirname(file), script).replace(/\.js$/, ""),
          ),
        )
        .map((script) => [
          script,
          resolve(import.meta.dirname, "src", `${script}.ts`),
        ])
        .filter(([, filename]) => existsSync(filename)),
    ),
  },
  build: {
    target: "esnext",
    rolldownOptions: {
      output: {
        entryFileNames: (chunk) =>
          chunk.name.startsWith("modules/")
            ? "[name].js"
            : "assets/[name]-[hash].js",
      },
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
})

function extractManifestScripts(manifest: ModuleManifest): string[] {
  const scripts = [
    manifest.editorScript,
    manifest.dockScript,
    manifest.overlayScript,
  ]

  for (const key in manifest.config) {
    const field = manifest.config[key]
    if (field.type === "custom") {
      scripts.push(field.script)
    }
  }

  return scripts
}
