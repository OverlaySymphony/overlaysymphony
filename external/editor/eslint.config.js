import config from "@overlaysymphony/tooling/eslint-react"
import { globalIgnores } from "eslint/config"

export default [
  //
  globalIgnores(["coverage/", "dist/"]),
  ...config,
]
