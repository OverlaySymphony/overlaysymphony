import {
  type ModuleConfig,
  type ModuleInstance,
  type ModuleRunner,
  type ModuleStore,
  loadManifest,
  loadManifestScripts,
} from "#shared/controller"

declare global {
  interface Window {
    registerOSModule: typeof registerModule
  }
}

const modules: Record<string, ModuleRunner> = {}

export async function loadModule(
  config: ModuleConfig,
  store: ModuleStore,
): Promise<ModuleInstance> {
  const manifest = await loadManifest(config.module)
  await loadManifestScripts(manifest)

  const module = await modules[config.module](config, store)

  return module
}

export function registerModule(id: string, runner: ModuleRunner): void {
  modules[id] = runner
}

window.registerOSModule = registerModule
