import config from "@christopherjbaker/eslint-config/base-strict"

export default [
  //
  ...config,
  {
    rules: {
      // TODO: Remove this
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/require-await": "off",
    },
  },
]
