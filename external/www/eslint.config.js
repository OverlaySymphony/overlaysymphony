import config from "@overlaysymphony/tooling/eslint-astro"
import { globalIgnores } from "eslint/config"

export default [
  //
  globalIgnores([".astro/", "coverage/", "dist/"]),
  ...config,
]
