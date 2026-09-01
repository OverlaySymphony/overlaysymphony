import { loadScripts } from "@overlaysymphony/core/libs/scripts"
import {
  type ModuleConfig,
  type ModuleEvent,
  type ModuleManifestResolved,
  type ModuleRunner,
  type ModuleRuntime,
  type ModuleStore,
} from "@overlaysymphony/core/module"

import { loadManifest } from "#shared/controller"

const moduleScripts: Record<string, string> = {}
const modules: Record<string, ModuleRunner<"owner">> = {}
window.registerOSOwnerModule = (script, runner) => {
  modules[moduleScripts[script]] = runner
}

export async function loadModules(
  config: Record<string, ModuleConfig>,
  store: Record<string, ModuleStore>,
  emit: (event: ModuleEvent) => void,
): Promise<Record<string, ModuleRuntime<"owner">>> {
  const modules: Record<string, ModuleRuntime<"owner">> = {}
  await Promise.all(
    Object.keys(config).map(async (id) => {
      if (!store[id]) {
        store[id] = {}
      }

      const moduleConfig = config[id]
      const moduleStore = store[id]

      modules[id] = await loadModule(moduleConfig, moduleStore, emit)
    }),
  )

  return modules
}

export async function loadModule(
  config: ModuleConfig,
  store: ModuleStore,
  emit: (event: ModuleEvent) => void,
): Promise<ModuleRuntime<"owner">> {
  const manifest = await loadManifest(config.module)
  moduleScripts[manifest.ownerScript] = config.module

  await loadManifestScripts(manifest)
  if (!modules[config.module]) {
    throw new Error(`Module "${config.module}" failed to load.`)
  }

  return await modules[config.module](config, store, emit)
}

export async function loadManifestScripts(
  manifest: ModuleManifestResolved,
): Promise<void> {
  const scripts = [manifest.ownerScript]
  for (const key in manifest.config) {
    const field = manifest.config[key]
    if (field.scope === "studio") {
      if (field.type === "custom") {
        scripts.push(field.script)
      }
    }
  }

  await loadScripts(...scripts)
}
