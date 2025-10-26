import parse, { type DataNode, reduceArrayToObject } from "./parser.ts"

export type FieldType = {
  type: string
  required: boolean
  description: string
  fields?: Record<string, FieldType>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getTypes(
  conditionsFb: Array<{
    id: string
    fallback: Record<string, Record<string, unknown>>
  }>,
) {
  const raw = await fetchRaw()
  const parsed = parse(raw)
  if (
    parsed.children?.[0].id !== "eventsub-reference" ||
    parsed.children?.[1].id !== "objects"
  ) {
    throw new Error("Source tree structure changed.")
  }

  const conditionsList = parsed.children[1].children?.find(
    (child) => child.id === "conditions",
  )?.children
  const eventsList = parsed.children[1].children?.find(
    (child) => child.id === "events",
  )?.children

  const shieldmodeEvent = parsed.children[1].children?.find(
    (child) => child.id === "shield-mode",
  )
  // TODO: clean started_at and ended_at

  const shoutoutCreateEvent = parsed.children[1].children?.find(
    (child) => child.id === "shoutout-create",
  )
  const shoutoutReceivedEvent = parsed.children[1].children?.find(
    (child) => child.id === "shoutout-received",
  )

  const goalsCondition = conditionsList?.find(
    ({ id }) => id === "goals-condition",
  )
  const goalsEvent = eventsList?.find(({ id }) => id === "goals-event")
  // TODO: clean is_achieved and ended_at

  const sharedList = parsed.children[1].children
    ?.filter(
      (child) =>
        ![
          "conditions",
          "events",
          "shield-mode",
          "shoutout-create",
          "shoutout-received",
          "subscription",
          "transport",
        ].includes(child.id),
    )
    .sort((a, b) =>
      a.id === "top-predictors" ? -1 : b.id === "top-predictors" ? 1 : 0,
    )

  if (
    !conditionsList ||
    !eventsList ||
    !shieldmodeEvent ||
    !shoutoutCreateEvent ||
    !shoutoutReceivedEvent ||
    !goalsCondition ||
    !goalsEvent ||
    !sharedList
  ) {
    throw new Error("Source tree structure changed.")
  }

  shoutoutReceivedEvent.id = shoutoutReceivedEvent.id.replace(
    "received",
    "receive",
  )

  conditionsList.splice(conditionsList.indexOf(goalsCondition), 1)
  eventsList.splice(eventsList.indexOf(goalsEvent), 1)

  const additionalConditions = conditionsFb
    .filter(
      ({ id }) => !conditionsList.find((condition) => condition.id === id),
    )
    .map(({ id, fallback }) => {
      const data: Record<string, Partial<FieldType>> = {}
      for (const key in fallback) {
        data[key.replace("condition.", "")] = fallback[key]
      }

      return {
        id,
        data,
      }
    })

  const shared = reduceArrayToObject<Record<string, FieldType>, DataNode>(
    sharedList,
    ({ id }) => id,
    ({ data }, index, key, all) => cleanType(data, true, all),
  )

  const conditions = reduceArrayToObject(
    [
      ...conditionsList,
      { ...goalsCondition, id: `channel-${goalsCondition.id}-begin` },
      { ...goalsCondition, id: `channel-${goalsCondition.id}-progress` },
      { ...goalsCondition, id: `channel-${goalsCondition.id}-end` },
      ...additionalConditions,
    ],
    ({ id }) => cleanKey(id.replace("-condition", "")),
    ({ data }) => cleanType(data, false, shared),
  )

  const events = reduceArrayToObject(
    [
      ...eventsList,
      { ...goalsEvent, id: `channel-${goalsEvent.id}-begin` },
      { ...goalsEvent, id: `channel-${goalsEvent.id}-progress` },
      { ...goalsEvent, id: `channel-${goalsEvent.id}-end` },
      { ...shieldmodeEvent, id: `channel-${shieldmodeEvent.id}-begin` },
      { ...shieldmodeEvent, id: `channel-${shieldmodeEvent.id}-end` },
      { ...shoutoutCreateEvent, id: `channel-${shoutoutCreateEvent.id}` },
      { ...shoutoutReceivedEvent, id: `channel-${shoutoutReceivedEvent.id}` },
    ],
    ({ id }) => cleanKey(id.replace("-event", "")),
    ({ data }) => cleanType(data, true, shared),
  )

  return {
    conditions,
    events,
  }
}

async function fetchRaw() {
  const response = await fetch(
    "https://dev.twitch.tv/docs/eventsub/eventsub-reference/",
  )

  const raw = await response.text()

  if (!raw.match(/^<h1 .+[^>]$/m)) {
    console.warn("Warning: Source structure changed around 'Objects'.")
  }

  if (
    !raw.includes(
      '<p><code class="highlighter-rouge">data</code> Object</p>',
    ) ||
    !raw.includes(
      '<td><code class="highlighter-rouge">charity_donation</code></td>\n      <td>string</td>',
    )
  ) {
    console.warn(
      "Warning: Source structure changed around 'Drop Entitlement Grant Event' data.",
    )
  }

  return raw
    .replace(/^<h1 .+[^>]$/m, (match) => `${match}</h1>`)
    .replace(/\[\]string/gi, "string[]")
    .replaceAll('<a href="#choices">', '<a href="#choices[]">')
    .replaceAll('<a href="#outcomes">', '<a href="#outcomes[]">')
    .replace(
      '<td><code class="highlighter-rouge">charity_donation</code></td>\n      <td>string</td>',
      '<td><code class="highlighter-rouge">charity_donation</code></td>\n      <td>object</td>',
    )
    .replace(
      '<p><code class="highlighter-rouge">data</code> Object</p>',
      '<h4><code class="highlighter-rouge">data</code> Object</h4>',
    )
}

function cleanKey(key: string) {
  const v2 = key.endsWith("-v2")
  key = key.replace("-v2", "")

  if (key === "whisper-received") {
    key = "user-whisper-message"
  }
  if (key === "charity-donation") {
    key = "charity-campaign-donate"
  }

  key = key.replace(/^channel-points-/, "channel-channel-points-")
  key = key.replace(/^hype-/, "channel-hype-")
  key = key.replace(/^charity-/, "channel-charity-")
  key = key.replace(/-shared-chat-session-/, "-shared-chat-")
  key = key.replace(/-goals-/, "-goal-")

  const parts = key.split("-")

  if (key.startsWith("channel-chat-") && !key.includes("-settings-")) {
    const first = parts.shift()
    const second = parts.shift()

    return `${first}.${second}.${parts.join("_")}${v2 ? " @2" : ""}`.replace(
      "..",
      ".",
    )
  }

  const first = parts.shift()
  const last = parts.pop()

  return `${first}.${parts.join("_")}.${last}${v2 ? " @2" : ""}`.replace(
    "..",
    ".",
  )
}

function cleanType(
  input: Record<string, Partial<FieldType>> | undefined,
  fallbackRequired: boolean,
  lookup?: Record<string, Record<string, FieldType>>,
): Record<string, FieldType> | undefined {
  if (!input) return undefined

  const output: Record<string, FieldType> = {}

  for (const key in input) {
    const {
      type: rawType,
      required: rawRequired,
      description: rawDescription,
    } = input[key]
    if (
      typeof rawType !== "string" ||
      (typeof rawRequired !== "boolean" &&
        typeof rawRequired !== "undefined") ||
      typeof rawDescription !== "string"
    ) {
      throw new Error("Source tree structure changed.")
    }

    let current = output
    const parts = key.split(".")
    const part = parts.pop() ?? ""
    for (const part of parts) {
      current[part].fields ??= {}
      current = current[part].fields
    }

    const type = normalizeType(rawType) ?? "unknown"
    const baseType = type.replace("[]", "")
    const fields = baseType.startsWith("#")
      ? lookup?.[baseType.slice(1)]
      : undefined

    const required =
      rawRequired ??
      (rawDescription.match(/Optional ?\./) ? false : undefined) ??
      fallbackRequired

    const description = rawDescription
      .replace(/\[(.+)\]\(#.+\)/g, (match, group) => group as string)
      .replace(/ \./m, ".")
      .replace(/^Optional. /g, "")
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")

    current[part] = {
      type: fields ? (type.endsWith("[]") ? "object[]" : "object") : type,
      required,
      description,
      fields,
    }
  }

  return output
}

function normalizeType(input: string) {
  let rawType = input
    .toLowerCase()
    .replace(" (or null)", "")
    .replace("array", "object[]")

  const isArray = rawType.endsWith("[]")
  rawType = rawType.replace(/\[\]$/, "")

  const localType = {
    string: "string",
    int: "number",
    integer: "number",
    bool: "boolean",
    boolean: "boolean",
    object: "object",
  }[rawType]
  if (localType) {
    return `${localType}${isArray ? "[]" : ""}`
  }

  const sharedType = rawType.replace(
    /\[.+\]\((#.+)\)/,
    (match, href: string) => href,
  )
  if (sharedType) {
    return `${sharedType}${isArray ? "[]" : ""}`
  }

  console.warn(`Unknown type ${input}`)
  return "unknown"
}
