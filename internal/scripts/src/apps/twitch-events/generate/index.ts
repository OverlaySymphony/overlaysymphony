import fs from "node:fs"
import path from "node:path"

import trim from "#shared/trim"
import { makeTypeDefinition } from "#shared/type"

import configs, { type EventConfig } from "../data/index.ts"

const basePath = path.join(
  import.meta.dirname,
  "../../../../../../modules/twitch/src/eventsub/events",
)

const contents = makeIndexFile()
fs.writeFileSync(path.join(basePath, "index.ts"), contents)

function shouldSkip(config: EventConfig) {
  if (!config.primary) return true
  if (config.id.startsWith("conduit.")) return true
  if (config.id.startsWith("drop.")) return true
  if (config.id.startsWith("extension.")) return true
  if (config.id.startsWith("user.authorization.")) return true

  return false
}

for (const id in configs) {
  const config = configs[id]
  if (shouldSkip(config)) continue

  const contents = makeEventFile(config)

  fs.writeFileSync(path.join(basePath, `${id.replace("@", "-")}.ts`), contents)
}

function makeIndexFile() {
  const ids = Object.entries(configs)
    .filter(([id, config]) => !shouldSkip(config))
    .map(([id]) => id)
    .sort()

  return trim(
    ids.map((id) => `import "./${id.replace("@", "-")}.ts"`).join("\n"),
    true,
  )
}

function makeEventFile({
  id,
  type,
  version,
  primary,
  scopes,
  description,
  condition,
  event,
}: EventConfig) {
  const name = type.replace(/(?:[^a-z]|^)([a-z])/gi, (match, letter: string) =>
    letter.toUpperCase(),
  )
  const label = `${type
    .replace(
      /(?:[^a-z]|^)([a-z])/gi,
      (match, letter: string) => ` ${letter.toUpperCase()}`,
    )
    .trim()} v${version}`

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
        Version: "${version}"
        /** The conditions to listen for when ${description} */
        Condition: {
${makeTypeDefinition(condition.fields, "          ")}
        }
        /** The event fired when ${description} */
        Event: {
${makeTypeDefinition(event.fields, "          ")}
        }
      }>

      registerEvent("${type}", {
        scopes: [${(scopes ?? [])
          .sort()
          .map((scope) => `"${scope}"`)
          .join(", ")}],
        subscriber: (userId) => ({
          type: "${type}",
          version: "${version}",
          condition: {
${Object.entries(condition.fields ?? {})
  .filter(
    ([key]) =>
      key.endsWith("user_id") ||
      key.endsWith("broadcaster_id") ||
      key.endsWith("client_id"),
  )
  .filter(
    ([key]) => type !== "channel.raid" || key !== "from_broadcaster_user_id",
  )
  .map(([key, { type, required }]) => `            ${key}: userId,`)
  .join("\n")}
          },
        }),
      })
    `,
    true,
  )
}
