import parse, { reduceArrayToObject } from "./parser.ts"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getSubscriptions() {
  const raw = await fetchRaw()
  const parsed = parse(raw)
  if (
    !parsed.children?.[0]?.data ||
    parsed.children[0].id !== "subscription-types"
  ) {
    throw new Error("Source tree structure changed.")
  }

  const table = parsed.children[0].data

  const channel = parsed.children[0].children?.find(
    (child) => child.id === "channel-subscriptions",
  )?.children

  const goal = parsed.children[0].children?.find(
    (child) => child.id === "goal-subscriptions",
  )?.children

  const stream = parsed.children[0].children?.find(
    (child) => child.id === "stream-subscriptions",
  )?.children

  const user = parsed.children[0].children?.find(
    (child) => child.id === "user-subscriptions",
  )?.children

  if (!table || !channel || !goal || !stream || !user) {
    throw new Error("Source tree structure changed.")
  }

  return {
    subscriptions: reduceArrayToObject(
      [...channel, ...goal, ...stream, ...user],
      ({ label }) => {
        const tableKey = label.toLowerCase().replace(" v2", "@2")
        const { version } = table[tableKey] ?? {}
        if (typeof version !== "string") {
          throw new Error("Source tree structure changed.")
        }

        const key = label.toLowerCase().replace(" v2", "")
        return `${key}@${version}`
      },
      ({ children }, index, key) => {
        const authorization = children?.find(({ label }) =>
          label.includes("Authorization"),
        )?.description
        if (!authorization) {
          throw new Error("Source tree structure changed.")
        }

        const {
          ["subscription type"]: tableLabel,
          version,
          description: tableDescription,
        } = table[key] ?? table[key.replace(/@.+$/, "")] ?? {}
        if (
          typeof tableLabel !== "string" ||
          typeof version !== "string" ||
          typeof tableDescription !== "string"
        ) {
          throw new Error("Source tree structure changed.")
        }

        const [, label] = tableLabel.match(/\[(.+)( V2)?\]/) ?? []
        if (!label) {
          console.log(tableLabel)
          throw new Error("Source tree structure changed.")
        }

        const scopes = cleanScopes(authorization)

        const description = clearDescription(tableDescription)

        return {
          label,
          type: key.slice(0, key.length - 2),
          version,
          scopes,
          description,
        }
      },
    ),
    conditionsFb: [...channel, ...goal, ...stream, ...user]
      .map(({ label, children }) => {
        const requestNode = children?.find(({ label }) =>
          label.includes("Request Body"),
        )

        if (!requestNode) {
          throw new Error("Source tree structure changed.")
        }

        const {
          type: _type,
          version: _version,
          condition: _condition,
          transport: _transport,
          ...fallback
        } = requestNode.data ?? {}
        delete fallback.is_batching_enabled

        return Object.keys(fallback).length > 0
          ? {
              id: `${label}-condition`
                .toLocaleLowerCase()
                .replaceAll(".", "-")
                .replaceAll("_", "-"),
              fallback,
            }
          : undefined
      })
      .filter((value) => typeof value !== "undefined"),
  }
}

async function fetchRaw() {
  const response = await fetch(
    "https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types",
  )

  const raw = await response.text()

  return raw
    .replace(
      "Channel Chat Message Payload",
      "Channel Chat Message Notification Payload",
    )
    .replace(/^<h3 .+>(.+)<\/h3>$/gm, (match, label: string) => {
      if (label.includes(".")) return match

      return match.replaceAll("h3", "h4")
    })
}

function clearDescription(input: string) {
  return input
    .replace(/^./, (character) => character.toLowerCase())
    .replace(/^a user is notified if (their|a) /, "The user's ")
    .replace(/^a notification when /, "")
    .replace(/^a notification for when /, "")
    .replace(/^a notification is sent when /, "")
    .replace(/^a notification is sent whenever /, "")
    .replace(/^sends a notification when /, "")
    .replace(/^sends an event notification when /, "")
    .replace(/^get notified when /, "")
    .replace("any user", "a user")
    .replace("a specified channel", "the specified channel")
    .replace("a broadcaster", "the broadcaster")
    .replace(" or when ", " or ")
}

function cleanScopes(input: string) {
  if (input === "No authorization required.") return []

  const scopes = [
    ...new Set(
      input.matchAll(/[a-z]+:([a-z]+:)?[a-z]+/g).map(([match]) => match),
    ).values(),
  ].filter((scope) => !scope.endsWith(":bot"))

  if (scopes.length === 0) {
    return null
  }

  return scopes
}
