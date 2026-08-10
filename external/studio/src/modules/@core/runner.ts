import {
  type ModuleInstance,
  type ModuleRunner,
} from "@overlaysymphony/core/module"

// import manifest from "./manifest.ts"

const runner: ModuleRunner = async (config, store) => {
  const instance: ModuleInstance = {
    foo: async () => undefined,
  }

  return instance
}

window.registerOSModule?.(import.meta.url, runner)
