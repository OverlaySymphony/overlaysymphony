import { type Field } from "@overlaysymphony/core/module"

export type OverlayManifest = {
  label: string
  notes?: string

  config: Record<
    string,
    Field & {
      scope?: "editor" | "studio"
      required: boolean
    }
  >

  elements: Record<
    string,
    {
      label: string
      notes?: string
      script: string
      attributes: Record<string, Field<"string"> & { required: boolean }>
      actions: Record<
        string,
        {
          label: string
          arguments: Record<string, Field & { required: boolean }>
        }
      >
    }
  >
}
