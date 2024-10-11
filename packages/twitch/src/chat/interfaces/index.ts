import { ChatEvent } from "./events"

export type { ChatEvent } from "./events"

export interface ChatEventSource {
  host: string
  user?: string
}

export type TwitchChatEventType = ChatEvent["type"]

export type TwitchChatEvent<
  Type extends TwitchChatEventType = TwitchChatEventType,
> = Extract<ChatEvent, { type: Type }>
