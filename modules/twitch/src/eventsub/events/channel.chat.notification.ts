import { type BaseSubscription } from "../events-helpers.js"

type ChannelChatNotificationType = "channel.chat.notification"
type ChannelChatNotificationVersion = "1"

/** The parameters under which an event fires when An event appears in chat. */
export interface ChannelChatNotificationCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID to read chat as. */
  user_id: string
}

/** The event information when An event appears in chat. */
export interface ChannelChatNotificationEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the user who sent the message. */
  chatter_user_id: string
  /** The user login of the user who sent the message. */
  chatter_user_login: string
  /** The user name of the user who sent the message. */
  chatter_user_name: string
  /** The UUID of the message. */
  message_id: string
}

/** The event notification received when An event appears in chat. */
export type ChannelChatNotificationSubscription = BaseSubscription<
  ChannelChatNotificationType,
  ChannelChatNotificationVersion,
  ChannelChatNotificationCondition
>

export function makeChannelChatNotificationSubscription(
  userId: string,
): ChannelChatNotificationSubscription {
  return {
    type: "channel.chat.notification",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }
}
