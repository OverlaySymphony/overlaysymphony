import { type BaseSubscription } from "../events-helpers.js"

type ChannelChatClearType = "channel.chat.clear"
type ChannelChatClearVersion = "1"

/** The parameters under which an event fires when A moderator clears all messages from the chat room. */
export interface ChannelChatClearCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID to read chat as. */
  user_id: string
}

/** The event information when A moderator clears all messages from the chat room. */
export interface ChannelChatClearEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
}

/** The event notification received when A moderator clears all messages from the chat room. */
export type ChannelChatClearSubscription = BaseSubscription<
  ChannelChatClearType,
  ChannelChatClearVersion,
  ChannelChatClearCondition
>

export function makeChannelChatClearSubscription(
  userId: string,
): ChannelChatClearSubscription {
  return {
    type: "channel.chat.clear",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }
}
