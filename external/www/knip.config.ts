import { type KnipConfig } from "knip"

const config: KnipConfig = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreDependencies: ["@overlaysymphony/design"],

  ignoreIssues: {
    "src/**": ["types"],
    "src/shared/design/**": ["files"],
  },
}

export default config
