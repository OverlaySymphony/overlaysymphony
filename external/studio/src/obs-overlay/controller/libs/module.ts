import { loadScripts } from "@overlaysymphony/core/libs/scripts"
import {
  type ModuleConfig,
  type ModuleInstance,
  type ModuleManifest,
  type ModuleRunner,
  type ModuleStore,
} from "@overlaysymphony/core/module"

import { loadManifest } from "#shared/controller"

const moduleScripts: Record<string, string> = {}
const modules: Record<string, ModuleRunner> = {}
window.registerOSModule = (script, runner) => {
  modules[moduleScripts[script]] = runner
}

export async function loadModules(
  config: Record<string, ModuleConfig>,
  store: Record<string, ModuleStore>,
): Promise<Record<string, ModuleInstance>> {
  const modules: Record<string, ModuleInstance> = {}
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
): Promise<ModuleInstance> {
  const manifest = await loadManifest(config.module)
  moduleScripts[manifest.script] = config.module

  await loadManifestScripts(manifest)
  if (!modules[config.module]) {
    throw new Error(`Module "${config.module} failed to load.`)
  }

  return await modules[config.module](config, store)
}

export async function loadManifestScripts(
  manifest: ModuleManifest,
): Promise<void> {
  const scripts = [manifest.script]

  await loadScripts(...scripts)
}
