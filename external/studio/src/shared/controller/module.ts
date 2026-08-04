import { type Field } from "./fields.ts"
import { loadScripts } from "./scripts.ts"

export type ModuleManifest = {
  label: string
  script: string

  config: Record<
    string,
    {
      scope?: "editor" | "dock"
      id: string
      required: boolean
    } & Field
  >

  nodes: Array<{
    id: string
    type: "trigger" | "condition" | "action"
    inputs: Record<
      string,
      {
        id: string
        required: boolean
      } & Field
    >
    outputs: Record<
      string,
      {
        id: string
      } & Field
    >
  }>

  components?: Record<
    string,
    {
      label: string
      script: string
      element: string
      attributes: Record<
        string,
        {
          label: string
          required: boolean
          type: "string"
        }
      >
      actions: Record<
        string,
        {
          label: string
          arguments: Record<
            string,
            {
              label: string
              required: boolean
            } & Field
          >
        }
      >
    }
  >
}

export type ModuleConfig = {
  label: string
  module: string
  config: Record<string, unknown>
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
  twitch: "./modules/twitch.json",
}

export async function loadManifest(id: string): Promise<ModuleManifest> {
  if (id in builtin) {
    id = builtin[id]
  }

  return {
    label: "",
    script: "",
    config: {},
    nodes: [],
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
