import { type ModuleRunner } from "@overlaysymphony/core/module"

import type manifest from "./manifest.ts"

const runner: ModuleRunner<"overlay", typeof manifest> = async (
  config,
  store,
) => {
  return {
    nodes: {
      "composition-init": async (instance, node, inputs, data) => {
        return {
          outputs: {},
        }
      },

      manual: async (instance, node, inputs, data) => {
        return {
          outputs: {},
        }
      },

      delay: async (instance, node, inputs, data) => {
        await new Promise((resolve) =>
          setTimeout(resolve, inputs.duration * 1000),
        )

        return {
          outputs: {},
        }
      },

      interval: async (instance, node, inputs, data) => {
        return {
          outputs: {},
        }
      },

      log: async (instance, node, inputs, data) => {
        console.log({
          source: inputs.source,
          message: inputs.message,
          status: inputs.status,
        })

        return {
          outputs: {},
        }
      },
    },
  }
}

window.registerOSOverlayModule?.(import.meta.url, runner)
