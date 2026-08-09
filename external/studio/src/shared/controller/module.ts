import {
  type Field,
  type ModuleManifest,
  type ModuleManifestRaw,
} from "@overlaysymphony/core/module"

const builtin: Record<string, string> = {
  "@core": "./modules/@core.json",
  datastore: "./modules/datastore.json",
  overlay: "./modules/overlay.json",
  twitch: "./modules/twitch.json",
}

export async function loadManifest(module: string): Promise<ModuleManifest> {
  const url = new URL(builtin[module] ?? module, document.baseURI)

  // TODO: load the manifest

  const manifest: ModuleManifestRaw = {
    label: "",
    script: "",
    nodes: {},
  }

  return {
    ...manifest,
    script: new URL(manifest.script, url).href,
    config: resolveScripts(manifest.config, url) ?? {},
    nodes: Object.fromEntries(
      Object.entries(manifest.nodes).map(([id, node]) => [
        id,
        {
          ...node,
          inputs: resolveScripts(node.inputs, url),
          outputs: resolveScripts(node.outputs, url),
        },
      ]),
    ),
  }
}

function resolveScripts<Fields extends Record<string, Field>>(
  fields: Fields | undefined,
  base: URL,
): Fields | undefined {
  if (!fields) return fields

  const resolved = Object.entries(fields).map<[string, Field]>(
    ([id, field]) => {
      if (field.type == "custom") {
        return [id, { ...field, script: new URL(field.script, base).href }]
      }

      return [id, field]
    },
  )

  return Object.fromEntries(resolved) as Fields
}
