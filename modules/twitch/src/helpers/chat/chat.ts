import { type EventPayload } from "../../eventsub/events-helpers.ts"
import { type TwitchEventSub } from "../../eventsub/index.ts"
import {
  type HelixChatAnnouncement,
  type HelixChatMessage,
  type HelixChatShoutout,
  sendChatAnnouncement,
  sendChatMessage,
  sendChatShoutout,
} from "../../helix/chat/index.ts"

type ChatMessage = EventPayload<"channel.chat.message">["event"]
type ChatCommand = ChatMessage & {
  message: {
    command: string
    parameters?: string
  } & ChatMessage["message"]
}

export interface TwitchChat {
  send: (message: string) => Promise<HelixChatMessage>
  announce: (message: string, color?: string) => Promise<HelixChatAnnouncement>
  shoutout: (to_broadcaster_id: string) => Promise<HelixChatShoutout>
  onMessage: (callback: (event: ChatMessage) => void) => () => void
  onCommand: (
    name: string,
    callback: (event: ChatCommand) => void,
  ) => () => void
}

export function onChatMessage(
  eventsub: TwitchEventSub,
  callback: (event: ChatMessage) => void,
): () => void {
  return eventsub.on(["channel.chat.message"], (payload) => {
    if (payload.event.source_broadcaster_user_id) return

    callback(payload.event)
  })
}

export function onChatCommand(
  eventsub: TwitchEventSub,
  name: string,
  callback: (event: ChatCommand) => void,
): () => void {
  const regex = /^\s*!([a-z0-9]+)(?:\s+(.+))?$/i

  return onChatMessage(eventsub, (payload) => {
    const [, command, parameters] =
      payload.message.text.match(regex) ?? ([] as Array<string | undefined>)

    if (command !== name) {
      return
    }

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

export default function createChat(eventsub: TwitchEventSub): TwitchChat {
  const send: TwitchChat["send"] = async (message) => {
    return await sendChatMessage(
      eventsub,
      eventsub.currentUserId,
      eventsub.targetUserId,
      message,
    )
  }

  const announce: TwitchChat["announce"] = async (message, color) => {
    return await sendChatAnnouncement(
      eventsub,
      eventsub.currentUserId,
      eventsub.targetUserId,
      message,
      color,
    )
  }

  const shoutout: TwitchChat["shoutout"] = async (
    to_broadcaster_id: string,
  ) => {
    return await sendChatShoutout(
      eventsub,
      eventsub.currentUserId,
      eventsub.targetUserId,
      to_broadcaster_id,
    )
  }

  const onMessage: TwitchChat["onMessage"] = (callback) => {
    return onChatMessage(eventsub, callback)
  }

  const onCommand: TwitchChat["onCommand"] = (name, callback) => {
    return onChatCommand(eventsub, name, callback)
  }

  return {
    send,
    announce,
    shoutout,
    onMessage,
    onCommand,
  }
}
