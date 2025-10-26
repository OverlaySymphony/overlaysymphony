import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.chat.message_delete": ChannelChatMessageDelete
  }
}

/** Channel Chat Message Delete v1: When a moderator has removed a specific message. */
type ChannelChatMessageDelete = EventConfig<{
  Type: "channel.chat.message_delete"
  Version: "1"
  /** The conditions to listen for when a moderator has removed a specific message. */
  Condition: {
    /** User ID of the channel to receive chat message delete events for. */
    broadcaster_user_id: string
    /** The user ID to read chat as. */
    user_id: string
  }
  /** The event fired when a moderator has removed a specific message. */
  Event: {
    /** The broadcaster user ID. */
    broadcaster_user_id: string
    /** The broadcaster display name. */
    broadcaster_user_name: string
    /** The broadcaster login. */
    broadcaster_user_login: string
    /** The ID of the user whose message was deleted. */
    target_user_id: string
    /** The user name of the user whose message was deleted. */
    target_user_name: string
    /** The user login of the user whose message was deleted. */
    target_user_login: string
    /** A UUID that identifies the message that was removed. */
    message_id: string
  }
}>

registerEvent("channel.chat.message_delete", {
  scopes: ["user:read:chat"],
  subscriber: (userId) => ({
    type: "channel.chat.message_delete",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }),
})
