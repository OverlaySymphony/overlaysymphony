import config from "@overlaysymphony/tooling/eslint"
import eslintPluginAstro from "eslint-plugin-astro"
import globals from "globals"

export default [
  {
    ignores: [".astro", "dist"],
  },
  {
    settings: {
      "import/core-modules": [
        "astro",
        "astro:actions",
        "astro:assets",
        "astro:config",
        "astro:content",
        "astro:env",
        "astro:i18n",
        "astro:middleware",
        "astro:static-paths",
        "astro:transitions",
      ],
    },
  },
  ...config,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        astroHTML: false,
      },
    },
  },
  {
    rules: {
      "import/no-unresolved": ["error", { ignore: ["^astro:"] }],
    },
  },
  ...eslintPluginAstro.configs["flat/recommended"],
]
