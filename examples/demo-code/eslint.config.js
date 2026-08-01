import config from "@overlaysymphony/tooling/eslint"
import { globalIgnores } from "eslint/config"

export default [
  //
  globalIgnores(["coverage/", "dist/"]),
  ...config,
]
