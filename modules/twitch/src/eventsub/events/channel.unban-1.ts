import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.unban": ChannelUnban
  }
}

/** Channel Unban v1: When a viewer is unbanned from the specified channel. */
type ChannelUnban = EventConfig<{
  Type: "channel.unban"
  Version: "1"
  /** The conditions to listen for when a viewer is unbanned from the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get unban notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a viewer is unbanned from the specified channel. */
  Event: {
    /** The user id for the user who was unbanned on the specified channel. */
    user_id: string
    /** The user login for the user who was unbanned on the specified channel. */
    user_login: string
    /** The user display name for the user who was unbanned on the specified channel. */
    user_name: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** The user ID of the issuer of the unban. */
    moderator_user_id: string
    /** The user login of the issuer of the unban. */
    moderator_user_login: string
    /** The user name of the issuer of the unban. */
    moderator_user_name: string
  }
}>

registerEvent("channel.unban", {
  scopes: ["channel:moderate"],
  subscriber: (userId) => ({
    type: "channel.unban",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
