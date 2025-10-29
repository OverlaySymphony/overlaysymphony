import fs from "node:fs"
import path from "node:path"

import trim from "#shared/trim"
import { makeTypeDefinition } from "#shared/type"

import configs, { type EventConfig } from "../data/index.ts"

const basePath = path.join(
  import.meta.dirname,
  "../../../../../../modules/obs/src/browser/events",
)

const contents = makeIndexFile()
fs.writeFileSync(path.join(basePath, "index.ts"), contents)

for (const id in configs) {
  const config = configs[id]
  const contents = makeEventFile(config)

  fs.writeFileSync(path.join(basePath, `${id}.ts`), contents)
}

function makeIndexFile() {
  const ids = Object.entries(configs)
    .map(([id]) => id)
    .sort()

  return trim(ids.map((id) => `import "./${id}.ts"`).join("\n"), true)
}

function makeEventFile({
  label,
  type,
  listener,
  permissions,
  description,
  event,
}: EventConfig) {
  const name = type.replace(/(?:[^a-z]|^)([a-z])/gi, (match, letter: string) =>
    letter.toUpperCase(),
  )

  return trim(
    `
      import { type EventConfig, registerEvent } from "../events-helpers.ts"

      declare module "../events-helpers.ts" {
        interface EventConfigs {
          "${type}": ${name}
        }
      }

      /** ${label}: When ${description} */
      type ${name} = EventConfig<{
        Type: "${type}"
        /** The event fired when ${description} */
        Event: {
${makeTypeDefinition(event.fields, "          ")}
        }
      }>

      registerEvent("${type}", {
        permissions: "${permissions}",
        subscribe: async (notify) => {
          window.addEventListener("${listener}", () => {
            notify({
              type: "${type}",
              event: {},
            })
          })
        },
      })
    `,
    true,
  )
}
