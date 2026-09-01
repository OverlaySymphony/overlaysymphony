import {
  type Field,
  type ModuleManifestResolved,
  type ModuleManifest,
} from "@overlaysymphony/core/module"

const builtin: Record<string, string> = {
  "@core": "./modules/@core/manifest.json",
  datastore: "./modules/datastore/manifest.json",
  elements: "./modules/elements/manifest.json",
  twitch: "./modules/twitch/manifest.json",
}

export async function loadManifest(
  module: string,
): Promise<ModuleManifestResolved> {
  const url = new URL(builtin[module] ?? module, document.baseURI)
  const manifest = (await (await fetch(url)).json()) as ModuleManifest

  return {
    ...manifest,
    editorScript: new URL(manifest.editorScript, url).href,
    ownerScript: new URL(manifest.ownerScript, url).href,
    overlayScript: new URL(manifest.overlayScript, url).href,
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
