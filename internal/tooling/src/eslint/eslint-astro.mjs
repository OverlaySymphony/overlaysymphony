import config from "@christopherjbaker/eslint-config/base-strict"
import eslintPluginAstro from "eslint-plugin-astro"
import globals from "globals"

export default [
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
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/consistent-type-definitions": "off",

      "import/no-unresolved": ["error", { ignore: ["^astro:"] }],
    },
  },
  ...eslintPluginAstro.configs["flat/recommended"],
]
