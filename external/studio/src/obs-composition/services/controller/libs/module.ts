import { loadScripts } from "@overlaysymphony/core/libs/scripts"
import {
  type ModuleConfig,
  type ModuleInstance,
  type ModuleManifest,
  type ModuleRunner,
  type ModuleStore,
} from "@overlaysymphony/core/module"

import { loadManifest } from "#shared/controller"

declare global {
  interface Window {
    registerOSModule: typeof registerModule
  }
}

const modules: Record<string, ModuleRunner> = {}
export function registerModule(id: string, runner: ModuleRunner): void {
  modules[id] = runner
}

export async function loadModule(
  config: ModuleConfig,
  store: ModuleStore,
): Promise<ModuleInstance> {
  const manifest = await loadManifest(config.module)
  await loadManifestScripts(manifest)

  const module = await modules[config.module](config, store)

  return module
}

export async function loadManifestScripts(
  manifest: ModuleManifest,
): Promise<void> {
  const scripts = [manifest.script]

  await loadScripts(...scripts)
}

window.registerOSModule = registerModule
