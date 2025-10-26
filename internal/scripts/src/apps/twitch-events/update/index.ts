import fs from "node:fs"
import path from "node:path"

import { type TwitchConfig } from "../data/index.ts"

import getSubscriptions from "./getSubscriptions.ts"
import getTypes from "./getTypes.ts"

const { subscriptions, conditionsFb } = await getSubscriptions()

const { conditions, events } = await getTypes(conditionsFb)

const configs: Record<string, TwitchConfig> = {}
for (const id in subscriptions) {
  const subscription = subscriptions[id]
  const condition = conditions[id] ?? conditions[id.replace(/@.+$/, "")]
  const event = events[id] ?? events[id.replace(/@.+$/, "")]

  if (!subscription || !condition || !event) {
    throw new Error("Source tree structure changed.")
  }

  const { label, type, version, scopes, description } = subscription

  configs[id] = {
    id,
    label,
    type,
    version,
    primary: false,
    scopes,
    description,
    condition: {
      type: "object",
      required: true,
      description: "",
      fields: condition,
    },
    event: {
      type: "object",
      required: true,
      description: "",
      fields: event,
    },
  }
}

const versions: Record<string, string[]> = {}
for (const id in configs) {
  const type = configs[id].type

  if (!versions[type]) versions[type] = []
  versions[type].push(id)
}
for (const type in versions) {
  versions[type].sort().reverse()

  const id = versions[type][0]
  configs[id].primary = true
}

fs.writeFileSync(
  path.resolve(import.meta.dirname, "..", "data", "data.json"),
  JSON.stringify(configs, null, 2) + "\n",
)
