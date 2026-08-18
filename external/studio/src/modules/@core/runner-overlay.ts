import { type ModuleRunner } from "@overlaysymphony/core/module"

import type manifest from "./manifest.ts"

const runner: ModuleRunner<"overlay", typeof manifest> = async (
  config,
  store,
) => {
  return {
    close: async () => undefined,
    nodes: {
      "composition-init": async (node, inputs, data) => {
        return {
          outputs: {},
        }
      },

      manual: async (node, inputs, data) => {
        return {
          outputs: {},
        }
      },

      delay: async (node, inputs, data) => {
        await new Promise((resolve) =>
          setTimeout(resolve, inputs.duration * 1000),
        )

        return {
          outputs: {},
        }
      },
    },
  }
}

window.registerOSOverlayModule?.(import.meta.url, runner)
