import { type ModuleRunner } from "@overlaysymphony/core/module"

import type manifest from "./manifest.ts"

const runner: ModuleRunner<"dock", typeof manifest> = async (config, store) => {
  return {
    close: async () => undefined,
    nodes: {
      "composition-init": async (node, inputs, data) => {
        return {}
      },

      manual: async (node, inputs, data) => {
        return {}
      },
    },
  }
}

window.registerOSDockModule?.(import.meta.url, runner)
