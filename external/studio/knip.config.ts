import { type KnipConfig } from "knip"

const config: KnipConfig = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  entry: ["src/obs-composition/index.ts", "src/obs-dock/index.ts"],
  ignoreDependencies: ["@overlaysymphony/design"],
  ignoreIssues: {
    "src/**": ["exports"],
    "src/shared/**": ["types"],
  },
}

export default config
