import { type KnipConfig } from "knip"

const config: KnipConfig = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  entry: ["src/obs-composition/index.ts", "src/obs-dock/index.ts"],
}

export default config
