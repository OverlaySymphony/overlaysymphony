import config from "@overlaysymphony/tooling/eslint"

export default [
  ...config,
  {
    rules: {
      "no-console": "off",
    },
  },
]
