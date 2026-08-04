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
  id: string,
  config: ModuleConfig,
  store: ModuleStore,
): Promise<ModuleInstance> {
  const manifest = await loadManifest(id)
  await loadManifestScripts(manifest)

  const module = await modules[id](config, store)

  return module
}

export function registerModule(id: string, runner: ModuleRunner): void {
  modules[id] = runner
}

window.registerOSModule = registerModule
