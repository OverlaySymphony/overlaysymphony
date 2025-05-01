import config from "@christopherjbaker/eslint-config/base-strict"

export default [
  //
  ...config,
  {
    rules: {
      // TODO: Remove this
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },
]
