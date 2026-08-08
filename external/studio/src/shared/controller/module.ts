import { type Field } from "./fields.ts"
import { loadScripts } from "./scripts.ts"

export type ModuleManifest = {
  label: string
  notes?: string
  script: string

  config: Record<
    string,
    Field & {
      scope?: "editor" | "dock"
      required: boolean
    }
  >

  nodes: Record<
    string,
    {
      type: "trigger" | "condition" | "action"
      notes?: string
      inputs: Record<string, Field & { required: boolean }>
      outputs: Record<string, Field>
    }
  >
}

export type ModuleConfig = {
  label: string
  module: string
  config?: Record<string, unknown>
}

export type ModuleStore = {
  state: ""
  store: Record<string, unknown>
}

export type ModuleRunner = (
  config: ModuleConfig,
  store: ModuleStore,
) => Promise<ModuleInstance>

export type ModuleInstance = {
  foo: () => void
}

const builtin: Record<string, string> = {
  "@core": "./modules/@core.json",
  datastore: "./modules/datastore.json",
  overlay: "./modules/overlay.json",
  twitch: "./modules/twitch.json",
}

export async function loadManifest(module: string): Promise<ModuleManifest> {
  if (module in builtin) {
    module = builtin[module]
  }

  // TODO: load the manifest

  return {
    label: "",
    script: "",
    config: {},
    nodes: {},
  }
}

export async function loadManifestScripts(
  manifest: ModuleManifest,
): Promise<void> {
  const scripts = [manifest.script]
  for (const key in manifest.config) {
    if (manifest.config[key].type === "custom") {
      const field = manifest.config[key] as Field<"custom">
      scripts.push(field.script)
    }
  }

  await loadScripts(...scripts)
}
