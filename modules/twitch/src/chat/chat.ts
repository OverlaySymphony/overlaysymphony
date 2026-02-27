import { type Authentication } from "../authentication/index.ts"
import { type EventPayload } from "../eventsub/events-helpers.ts"
import createEventSub, { type TwitchEventSub } from "../eventsub/index.ts"
import { sendChatAnnouncement, sendChatMessage } from "../helix/chat/index.ts"

type ChatMessage = EventPayload<"channel.chat.message">["event"]
type ChatCommand = ChatMessage & {
  message: {
    command: string
    parameters?: string[]
  } & ChatMessage["message"]
}

type ChatSender = (message: string) => Promise<void>
type ChatAnnouncer = (message: string, color?: string) => Promise<void>

type ChatMessageSubscriber = (
  callback: (event: ChatMessage) => void,
) => () => void

type ChatCommandSubscriber = (
  name: string,
  callback: (event: ChatCommand) => void,
) => () => void

export interface TwitchChat {
  send: ChatSender
  announce: ChatAnnouncer
  onMessage: ChatMessageSubscriber
  onCommand: ChatCommandSubscriber
}

export default async function createChat(
  authentication: Authentication,
  eventsub?: TwitchEventSub,
): Promise<TwitchChat> {
  eventsub ??= await createEventSub(authentication)

  const send: ChatSender = async (message) => {
    await sendChatMessage(authentication, message)
  }

  const announce: ChatAnnouncer = async (message, color) => {
    await sendChatAnnouncement(authentication, message, color)
  }

  const onMessage: ChatMessageSubscriber = (callback) => {
    return eventsub.on(["channel.chat.message"], (payload) => {
      callback(payload.event)
    })
  }

  const onCommand: ChatCommandSubscriber = (name, callback) => {
    const regex = /^\s*!([a-z0-9]+)(?:\s+(.+))?$/i

    return onMessage((payload) => {
      const [, command, text] =
        payload.message.text.match(regex) ?? ([] as Array<string | undefined>)

      if (command !== name) {
        return
      }

      const parameters = text?.split(" ")

      callback({
        ...payload,
        message: {
          command: "",
          parameters,
          ...payload.message,
        },
      })
    })
  }

  return {
    send,
    announce,
    onMessage,
    onCommand,
  }
}
