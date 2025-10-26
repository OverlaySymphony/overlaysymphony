import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.cheer": ChannelCheer
  }
}

/** Channel Cheer v1: When a user cheers on the specified channel. */
type ChannelCheer = EventConfig<{
  Type: "channel.cheer"
  Version: "1"
  /** The conditions to listen for when a user cheers on the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get cheer notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a user cheers on the specified channel. */
  Event: {
    /** Whether the user cheered anonymously or not. */
    is_anonymous: boolean
    /** The user ID for the user who cheered on the specified channel. This is null if is_anonymous is true. */
    user_id: string
    /** The user login for the user who cheered on the specified channel. This is null if is_anonymous is true. */
    user_login: string
    /** The user display name for the user who cheered on the specified channel. This is null if is_anonymous is true. */
    user_name: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** The message sent with the cheer. */
    message: string
    /** The number of Bits cheered. */
    bits: number
  }
}>

registerEvent("channel.cheer", {
  scopes: ["bits:read"],
  subscriber: (userId) => ({
    type: "channel.cheer",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
