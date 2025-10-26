import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.ban": ChannelBan
  }
}

/** Channel Ban v1: When a viewer is banned from the specified channel. */
type ChannelBan = EventConfig<{
  Type: "channel.ban"
  Version: "1"
  /** The conditions to listen for when a viewer is banned from the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get ban notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a viewer is banned from the specified channel. */
  Event: {
    /** The user ID for the user who was banned on the specified channel. */
    user_id: string
    /** The user login for the user who was banned on the specified channel. */
    user_login: string
    /** The user display name for the user who was banned on the specified channel. */
    user_name: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** The user ID of the issuer of the ban. */
    moderator_user_id: string
    /** The user login of the issuer of the ban. */
    moderator_user_login: string
    /** The user name of the issuer of the ban. */
    moderator_user_name: string
    /** The reason behind the ban. */
    reason: string
    /** The UTC date and time (in RFC3339 format) of when the user was banned or put in a timeout. */
    banned_at: string
    /** The UTC date and time (in RFC3339 format) of when the timeout ends. Is null if the user was banned instead of put in a timeout. */
    ends_at: string
    /** Indicates whether the ban is permanent (true) or a timeout (false). If true, ends_at will be null. */
    is_permanent: boolean
  }
}>

registerEvent("channel.ban", {
  scopes: ["channel:moderate"],
  subscriber: (userId) => ({
    type: "channel.ban",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
