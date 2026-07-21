import { type KnipConfig } from "knip"

const config: KnipConfig = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreIssues: {
    "src/shared/design/**": ["types"],
  },
}

export default config
