import { ChatEvent } from "./events.js"

export type { ChatEvent, ChatEventSource } from "./events.js"

export type TwitchChatEventType = ChatEvent["type"]

export type TwitchChatEvent<
  Type extends TwitchChatEventType = TwitchChatEventType,
> = Extract<ChatEvent, { type: Type }>
