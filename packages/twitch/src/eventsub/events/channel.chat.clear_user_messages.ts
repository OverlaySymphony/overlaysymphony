import { BaseSubscription } from "../events-helpers"

type ChannelChatClearUserMessagesType = "channel.chat.clear_user_messages"
type ChannelChatClearUserMessagesVersion = "1"

/** The parameters under which an event fires when A moderator clears all messages from a specific user. */
export interface ChannelChatClearUserMessagesCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID to read chat as. */
  user_id: string
}

/** The event information when A moderator clears all messages from a specific user. */
export interface ChannelChatClearUserMessagesEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the user who was banned or put in a timeout. */
  target_user_id: string
  /** The user name of the user who was banned or put in a timeout. */
  target_user_login: string
  /** The user login of the user who was banned or put in a timeout. */
  target_user_name: string
}

/** The event notification received when A moderator clears all messages from a specific user. */
export type ChannelChatClearUserMessagesSubscription = BaseSubscription<
  ChannelChatClearUserMessagesType,
  ChannelChatClearUserMessagesVersion,
  ChannelChatClearUserMessagesCondition
>

export function makeChannelChatClearUserMessagesSubscription(
  userId: string,
): ChannelChatClearUserMessagesSubscription {
  return {
    type: "channel.chat.clear_user_messages",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }
}
