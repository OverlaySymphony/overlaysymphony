import { type Field } from "./fields.ts"

export type ModuleManifest = {
  label: string
  notes?: string
  script: string

  config: Record<
    string,
    Field & {
      scope?: "editor" | "studio"
      required: boolean
    }
  >

  nodes: Record<
    string,
    {
      type: "trigger" | "condition" | "action"
      notes?: string
      inputs?: Record<string, Field & { required: boolean }>
      outputs?: Record<string, Field>
    }
  >
}

export type ModuleManifestRaw = Omit<ModuleManifest, "config"> & {
  config?: ModuleManifest["config"]
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
