import { loadScripts } from "@overlaysymphony/core/libs/scripts"
import {
  type ModuleConfig,
  type ModuleInstance,
  type ModuleManifestResolved,
  type ModuleRunner,
  type ModuleStore,
} from "@overlaysymphony/core/module"

import { loadManifest } from "#shared/controller"

const moduleScripts: Record<string, string> = {}
const modules: Record<string, ModuleRunner<"dock">> = {}
window.registerOSDockModule = (script, runner) => {
  modules[moduleScripts[script]] = runner
}

export async function loadModules(
  config: Record<string, ModuleConfig>,
  store: Record<string, ModuleStore>,
): Promise<Record<string, ModuleInstance<"dock">>> {
  const modules: Record<string, ModuleInstance<"dock">> = {}
  await Promise.all(
    Object.keys(config).map(async (id) => {
      if (!store[id]) {
        store[id] = {}
      }

      const moduleConfig = config[id]
      const moduleStore = store[id]

      modules[id] = await loadModule(moduleConfig, moduleStore)
    }),
  )

  return modules
}

export async function loadModule(
  config: ModuleConfig,
  store: ModuleStore,
): Promise<ModuleInstance<"dock">> {
  const manifest = await loadManifest(config.module)
  moduleScripts[manifest.dockScript] = config.module

  await loadManifestScripts(manifest)
  if (!modules[config.module]) {
    throw new Error(`Module "${config.module}" failed to load.`)
  }

  return await modules[config.module](config, store)
}

export async function loadManifestScripts(
  manifest: ModuleManifestResolved,
): Promise<void> {
  const scripts = [manifest.dockScript]
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
