import { type ChatEvent, type ChatEventSource } from "./interfaces/index.js"

// Parses an IRC message and returns a JSON object with the message's
// component parts (tags, source (nick and host), command, parameters).
// from https://dev.twitch.tv/docs/irc/example-parser/

export default function parseEvent(input: string): ChatEvent | undefined {
  let tags: Record<string, unknown> | undefined = undefined
  let source: ChatEventSource | undefined = undefined

  let idx = 0

  // tags
  if (input[idx] === "@") {
    const endIdx = input.indexOf(" ", idx)
    tags = parseTags(input.slice(idx + 1, endIdx))
    idx = endIdx + 1
  }

  // source
  if (input[idx] === ":") {
    const endIdx = input.indexOf(" ", idx)
    source = parseSource(input.slice(idx + 1, endIdx))
    idx = endIdx + 1

    if (source.user && tags?.["display-name"]) {
      source.user = tags["display-name"] as string
    }
  }

  // core
  try {
    const hasParameters = input.includes(":", idx)
    if (hasParameters) {
      const endIdx = input.indexOf(":", idx)

      const message = parseCore(
        input.slice(idx, endIdx - 1),
        input.slice(endIdx + 1),
      )

      return {
        ...message,
        source,
        // @ts-expect-error: generic objects are complicated
        tags,
      }
    } else {
      const message = parseCore(input.slice(idx, input.length), "")

      return {
        ...message,
        source,
        // @ts-expect-error: generic objects are complicated
        tags,
      }
    }
  } catch (error) {
    return undefined
  }
}

function parseSource(input: string): ChatEventSource {
  const parts = input.split("!")

  if (parts.length === 1) {
    return {
      host: parts[0],
    }
  }

  return {
    host: parts[1],
    user: parts[0],
  }
}

function parseTags(input: string): Record<string, unknown> {
  const tags: Record<string, unknown> = {}

  const parsedTags = input.split(";")
  for (const tag of parsedTags) {
    const [dashKey, value] = tag.split("=")
    const key = toCamelCase(dashKey)

    if (!value) {
      tags[key] = undefined
      continue
    }

    if (key === "badges" || key === "badgeInfo") {
      const dict: Record<string, number> = {}

      const badges = value.split(",")
      for (const badge of badges) {
        const parts = badge.split("/")
        dict[parts[0]] = parseInt(parts[1])
      }

      tags[key] = dict
      continue
    }

    if (key === "emotes") {
      const dict: Record<string, Array<[string, string]>> = {}

      const emotes = value.split("/")
      for (const emote of emotes) {
        const [id, rawPositions] = emote.split(":")
        dict[id] = []

        const positions = rawPositions.split(",")
        for (const position of positions) {
          const positionParts = position.split("-")
          dict[id].push([positionParts[0], positionParts[1]])
        }
      }

      tags[key] = dict
      continue
    }

    if (key === "emoteSets") {
      tags[key] = value.split(",")
      continue
    }

    if (
      key === "banDuration" ||
      key === "pinnedChatPaidAmount" ||
      key === "pinnedChatPaidExponent" ||
      key === "slow"
    ) {
      tags[key] = parseInt(value)
      continue
    }

    if (
      key === "firstMsg" ||
      key === "mod" ||
      key === "vip" ||
      key === "subscriber" ||
      key === "turbo" ||
      key === "emoteOnly" ||
      key === "followersOnly" ||
      key === "subsOnly" ||
      key === "pinnedChatPaidIsSystemMessage"
    ) {
      tags[key] = !!parseInt(value)
      continue
    }

    tags[key] = value
  }

  return tags
}

function parseCore(inputEvent: string, parameters: string): ChatEvent {
  const [type, ...parts] = inputEvent.split(" ")

  switch (type) {
    case "PING":
      return {
        type,
        message: parameters,
      }

    case "001":
      return {
        type,
        channel: parts[0],
        message: parameters,
      }

    case "CAP":
      return {
        type,
        enabled: parts[1] === "ACK",
        nickname: parts[0],
        capabilities: parameters.split(" "),
      }

    case "JOIN":
    case "PART":
      return {
        type,
        channel: parts[0],
      }

    case "GLOBALUSERSTATE":
    case "RECONNECT":
      return {
        type,
      }

    case "CLEARCHAT":
    case "HOSTTARGET":
    case "NOTICE":
    case "ROOMSTATE":
    case "USERSTATE":
      return {
        type,
        channel: parts[0],
      }

    case "CLEARMSG":
    case "USERNOTICE":
      return {
        type,
        channel: parts[0],
      }

    case "PRIVMSG":
    case "WHISPER":
      if (parameters.startsWith("!")) {
        const index = parameters.indexOf(" ")

        return {
          type: `${type}-COMMAND`,
          channel: parts[0],
          command: parameters.slice(1, index > -1 ? index : undefined),
          parameters: index > -1 ? parameters.slice(index + 1) : undefined,
        }
      } else {
        return {
          type,
          channel: parts[0],
          message: parameters,
        }
      }

    // Ignoring all other numeric messages.
    case "002":
    case "003":
    case "004":
    case "353": // Tells you who else is in the chat room you're joining.
    case "366":
    case "372":
    case "375":
    case "376":
      throw new Error(`Ignored message: ${type}`)

    case "421":
      throw new Error(`Unsupported message: ${type}`)

    default:
      throw new Error(`Unknown message: ${type}`)
  }
}

function toCamelCase(dashedCase: string): string {
  return dashedCase.replace(/[-:]([a-z])/g, (_, b: string) => b.toUpperCase())
}
