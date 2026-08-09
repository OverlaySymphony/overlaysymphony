import { loadScripts } from "@overlaysymphony/core/libs/scripts"
import {
  type ModuleConfig,
  type ModuleManifest,
  type ModuleStore,
} from "@overlaysymphony/core/module"

import { loadManifest } from "#shared/controller"

export async function loadModule(
  config: ModuleConfig,
  store: ModuleStore,
): Promise<ModuleManifest> {
  const manifest = await loadManifest(config.module)
  await loadManifestScripts(manifest)

  return manifest
}

export async function loadManifestScripts(
  manifest: ModuleManifest,
): Promise<void> {
  const scripts = []
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
