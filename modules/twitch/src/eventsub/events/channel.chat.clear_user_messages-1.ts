import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.chat.clear_user_messages": ChannelChatClearUserMessages
  }
}

/** Channel Chat Clear User Messages v1: When a moderator or bot has cleared all messages from a specific user. */
type ChannelChatClearUserMessages = EventConfig<{
  Type: "channel.chat.clear_user_messages"
  Version: "1"
  /** The conditions to listen for when a moderator or bot has cleared all messages from a specific user. */
  Condition: {
    /** User ID of the channel to receive chat clear user messages events for. */
    broadcaster_user_id: string
    /** The user ID to read chat as. */
    user_id: string
  }
  /** The event fired when a moderator or bot has cleared all messages from a specific user. */
  Event: {
    /** The broadcaster user ID. */
    broadcaster_user_id: string
    /** The broadcaster display name. */
    broadcaster_user_name: string
    /** The broadcaster login. */
    broadcaster_user_login: string
    /** The ID of the user that was banned or put in a timeout. All of their messages are deleted. */
    target_user_id: string
    /** The user name of the user that was banned or put in a timeout. */
    target_user_name: string
    /** The user login of the user that was banned or put in a timeout. */
    target_user_login: string
  }
}>

registerEvent("channel.chat.clear_user_messages", {
  scopes: ["user:read:chat"],
  subscriber: (userId) => ({
    type: "channel.chat.clear_user_messages",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }),
})
