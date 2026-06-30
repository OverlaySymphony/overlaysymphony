// @ts-check

import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://www.overlaysymphony.com",
  trailingSlash: "never",

  integrations: [mdx()],
})
