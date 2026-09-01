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

export type ModuleRuntimes = {
  owner: ModuleRuntime<"owner">
  overlay: ModuleRuntime<"overlay">
}

const moduleScripts: Record<string, string> = {}
const owners: Record<string, ModuleRunner<"owner">> = {}
const overlays: Record<string, ModuleRunner<"overlay">> = {}
window.registerOSOwnerModule = (script, runner) => {
  owners[moduleScripts[script]] = runner
}
window.registerOSOverlayModule = (script, runner) => {
  overlays[moduleScripts[script]] = runner
}

export async function loadModules(
  config: Record<string, ModuleConfig>,
  store: Record<string, ModuleStore>,
  emit: (event: ModuleEvent) => void,
): Promise<Record<string, ModuleRuntimes>> {
  const modules: Record<string, ModuleRuntimes> = {}
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
): Promise<ModuleRuntimes> {
  const manifest = await loadManifest(config.module)
  moduleScripts[manifest.ownerScript] = config.module
  moduleScripts[manifest.overlayScript] = config.module

  await loadManifestScripts(manifest)
  if (!owners[config.module] || !overlays[config.module]) {
    throw new Error(`Module "${config.module}" failed to load.`)
  }

  return {
    owner: await owners[config.module](config, store, emit),
    overlay: await overlays[config.module](config, store),
  }
}

export async function loadManifestScripts(
  manifest: ModuleManifestResolved,
): Promise<void> {
  const scripts = [manifest.ownerScript, manifest.overlayScript]

  await loadScripts(...scripts)
}
