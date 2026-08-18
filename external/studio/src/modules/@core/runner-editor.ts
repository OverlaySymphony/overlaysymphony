import { type ModuleRunner } from "@overlaysymphony/core/module"

import type manifest from "./manifest.ts"

const runner: ModuleRunner<"editor", typeof manifest> = async (
  config,
  store,
) => {
  return {
    nodes: {},
  }
}

window.registerOSEditorModule?.(import.meta.url, runner)
