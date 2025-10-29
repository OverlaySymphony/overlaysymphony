import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.chat_settings.update": ChannelChatSettingsUpdate
  }
}

/** Channel Chat Settings Update v1: When the broadcaster's chat settings are updated. */
type ChannelChatSettingsUpdate = EventConfig<{
  Type: "channel.chat_settings.update"
  Version: "1"
  /** The conditions to listen for when the broadcaster's chat settings are updated. */
  Condition: {
    /** User ID of the channel to receive chat settings update events for. */
    broadcaster_user_id: string
    /** The user ID to read chat as. */
    user_id: string
  }
  /** The event fired when the broadcaster's chat settings are updated. */
  Event: {
    /** The ID of the broadcaster specified in the request. */
    broadcaster_user_id: string
    /** The login of the broadcaster specified in the request. */
    broadcaster_user_login: string
    /** The user name of the broadcaster specified in the request. */
    broadcaster_user_name: string
    /** A Boolean value that determines whether chat messages must contain only emotes. True if only messages that are 100% emotes are allowed; otherwise false. */
    emote_mode: boolean
    /**
     * A Boolean value that determines whether the broadcaster restricts the chat room to followers only, based on how long they've followed.
     *
     * True if the broadcaster restricts the chat room to followers only; otherwise false.
     *
     * See follower_mode_duration_minutes for how long the followers must have followed the broadcaster to participate in the chat room.
     */
    follower_mode: boolean
    /**
     * The length of time, in minutes, that the followers must have followed the broadcaster to participate in the chat room. See follower_mode.
     *
     * Null if follower_mode is false.
     */
    follower_mode_duration_minutes: number
    /**
     * A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages.
     *
     * Is true, if the broadcaster applies a delay; otherwise, false.
     *
     * See slow_mode_wait_time_seconds for the delay.
     */
    slow_mode: boolean
    /**
     * The amount of time, in seconds, that users need to wait between sending messages. See slow_mode.
     *
     * Null if slow_mode is false.
     */
    slow_mode_wait_time_seconds: number
    /**
     * A Boolean value that determines whether only users that subscribe to the broadcaster's channel can talk in the chat room.
     *
     * True if the broadcaster restricts the chat room to subscribers only; otherwise false.
     */
    subscriber_mode: boolean
    /**
     * A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room.
     *
     * True if the broadcaster requires unique messages only; otherwise false.
     */
    unique_chat_mode: boolean
  }
}>

registerEvent("channel.chat_settings.update", {
  scopes: ["user:read:chat"],
  subscriber: (userId) => ({
    type: "channel.chat_settings.update",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }),
})
