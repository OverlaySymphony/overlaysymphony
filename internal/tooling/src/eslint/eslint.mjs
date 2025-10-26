import config from "@christopherjbaker/eslint-config/base-strict"

export default [
  ...config,
  {
    rules: {
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },
]
