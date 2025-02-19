import fs from "node:fs"
import path from "node:path"

import trimTemplateString from "../../lib/trimTemplateString.js"

import events, { Nested, TwitchEvent } from "./data/index.js"

const eventsByType = events.slice().sort((a, b) => (a.type > b.type ? 1 : -1))
const eventsByName = events.slice().sort((a, b) => (a.name > b.name ? 1 : -1))

const basePath = "../../packages/twitch/src/eventsub/events"

const contents = makeIndexFile()
fs.writeFileSync(path.join(basePath, "index.ts"), contents)

for (const event of events) {
  const contents = makeEventFile(event)
  fs.writeFileSync(path.join(basePath, `${event.type}.ts`), contents)
}

function makeIndexFile() {
  return trimTemplateString(
    `
  import { NotificationMessage } from "../events-helpers.js"

  ${eventsByType
    .map(({ name, type }) =>
      trimTemplateString(`
      import { ${name}Event, ${name}Subscription, make${name}Subscription } from "./${type}.js"
      `),
    )
    .join("\n")}

  ${eventsByType.map(({ type }) => `export * from "./${type}.js"`).join("\n")}

  type AllSubscription =
${eventsByName.map(({ name }) => `    | ${name}Subscription`).join("\n")}

  type AllNotificationMessage =
${eventsByName
  .map(
    ({ name }) =>
      `    | NotificationMessage<${name}Subscription, ${name}Event>`,
  )
  .join("\n")}

  export type TwitchSubscriptionType = AllSubscription["type"]

  export type TwitchSubscription<
    Type extends TwitchSubscriptionType = TwitchSubscriptionType,
  > = Extract<AllSubscription, { type: Type }>

  export type TwitchNotificationMessage<
    Type extends TwitchSubscriptionType = TwitchSubscriptionType,
  > = Extract<AllNotificationMessage, { payload: { type: Type } }>

  const subscriptionBuilders: {
    [Type in TwitchSubscriptionType]: (userId: string) => TwitchSubscription<Type>
  } = {
${eventsByType
  .map(({ name, type }) => `    "${type}": make${name}Subscription,`)
  .join("\n")}
  }

  export function buildSubscription<
    Type extends TwitchSubscriptionType,
    Subscription extends TwitchSubscription<Type>,
  >(type: Type, userId: string): Subscription {
    const creator = subscriptionBuilders[type]
    if (!creator) {
      throw new Error(\`Unknown type \${type}\`)
    }

    return creator(userId) as Subscription
  }
  `,
    true,
  )
}

function makeEventFile({
  name,
  type,
  version,
  description,
  condition,
  definition,
}: TwitchEvent) {
  const imports = Object.entries(definition)
    .filter(([key, { type }]) => {
      if (["Object", "Array", "Date"].includes(type)) return false
      // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
      if (type[0] === type[0].toLowerCase()) return false

      return true
    })
    .map(([, { type }]) => (type.endsWith("[]") ? type.slice(0, -2) : type))
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort()
  const helper = `${type.slice(0, type.lastIndexOf("."))}._`

  return trimTemplateString(
    `
      import { BaseSubscription } from "../events-helpers.js"
${
  imports.length === 0
    ? ""
    : `\n      import { ${imports.join(", ")} } from "./${helper}.js"\n`
}
      type ${name}Type = "${type}"
      type ${name}Version = "${version}"

      /** The parameters under which an event fires when ${description}. */
      export interface ${name}Condition {
${makeTypeDefinition(condition, "        ")}
      }

      /** The event information when ${description}. */
      export interface ${name}Event {
${makeTypeDefinition(definition, "        ")}
      }

      /** The event notification received when ${description}. */
      export type ${name}Subscription = BaseSubscription<
        ${name}Type,
        ${name}Version,
        ${name}Condition
      >

      export function make${name}Subscription(
        userId: string,
      ): ${name}Subscription {
        return {
          type: "${type}",
          version: "${version}",
          condition: {
${Object.entries(condition)
  .filter(([key]) => key.endsWith("user_id") || key === "broadcaster_id")
  .filter(
    ([key]) => type !== "channel.raid" || key !== "from_broadcaster_user_id",
  )
  .map(([key, { type, required }]) => `            ${key}: userId,`)
  .join("\n")}
          },
        }
      }
  `,
    true,
  )
}

function makeTypeDefinition(
  definition: Nested<{
    type: string
    required?: boolean
    description: string
  }>,
  prefix: string,
): string {
  return Object.entries(definition)
    .map(([key, { type, required, description, fields }]) => {
      if (type === "Object" && fields) {
        return [
          `${prefix}/** ${description} */`,
          `${prefix}${key}${required === false ? "?" : ""}: {`,
          makeTypeDefinition(fields, `${prefix}  `),
          `${prefix}}`,
        ].join("\n")
      }

      if (type === "Array" && fields) {
        return [
          `${prefix}/** ${description} */`,
          `${prefix}${key}${required === false ? "?" : ""}: Array<{`,
          makeTypeDefinition(fields, `${prefix}  `),
          `${prefix}}>`,
        ].join("\n")
      }

      if (type === "integer") {
        type = "number"
        description = `Integer. ${description}`
      }

      return [
        `${prefix}/** ${description} */`,
        `${prefix}${key}${required === false ? "?" : ""}: ${type}`,
      ].join("\n")
    })
    .join("\n")
}
