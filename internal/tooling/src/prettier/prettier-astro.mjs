import * as prettierPluginAstro from "prettier-plugin-astro"

export default {
  plugins: [prettierPluginAstro],
  semi: false,
  trailingComma: "all",
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
