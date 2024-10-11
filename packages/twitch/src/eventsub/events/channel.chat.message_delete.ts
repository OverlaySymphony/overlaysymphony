import { BaseSubscription } from "../events-helpers"

type ChannelChatMessageDeleteType = "channel.chat.message_delete"
type ChannelChatMessageDeleteVersion = "1"

/** The parameters under which an event fires when A moderator removes a specific message. */
export interface ChannelChatMessageDeleteCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID to read chat as. */
  user_id: string
}

/** The event information when A moderator removes a specific message. */
export interface ChannelChatMessageDeleteEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the user whose message was deleted. */
  target_user_id: string
  /** The user name of the user whose message was deleted. */
  target_user_login: string
  /** The user login of the user whose message was deleted. */
  target_user_name: string
  /** The UUID of the message that was removed. */
  message_id: string
}

/** The event notification received when A moderator removes a specific message. */
export type ChannelChatMessageDeleteSubscription = BaseSubscription<
  ChannelChatMessageDeleteType,
  ChannelChatMessageDeleteVersion,
  ChannelChatMessageDeleteCondition
>

export function makeChannelChatMessageDeleteSubscription(
  userId: string,
): ChannelChatMessageDeleteSubscription {
  return {
    type: "channel.chat.message_delete",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }
}
