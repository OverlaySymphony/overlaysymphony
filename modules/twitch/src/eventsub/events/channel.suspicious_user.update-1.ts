import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.suspicious_user.update": ChannelSuspiciousUserUpdate
  }
}

/** Channel Suspicious User Update v1: When a suspicious user has been updated. */
type ChannelSuspiciousUserUpdate = EventConfig<{
  Type: "channel.suspicious_user.update"
  Version: "1"
  /** The conditions to listen for when a suspicious user has been updated. */
  Condition: {
    /** The ID of a user that has permission to moderate the broadcaster's channel and has granted your app permission to subscribe to this subscription type. */
    moderator_user_id: string
    /** The broadcaster you want to get chat unban request notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a suspicious user has been updated. */
  Event: {
    /** The ID of the channel where the treatment for a suspicious user was updated. */
    broadcaster_user_id: string
    /** The display name of the channel where the treatment for a suspicious user was updated. */
    broadcaster_user_name: string
    /** The Login of the channel where the treatment for a suspicious user was updated. */
    broadcaster_user_login: string
    /** The ID of the moderator that updated the treatment for a suspicious user. */
    moderator_user_id: string
    /** The display name of the moderator that updated the treatment for a suspicious user. */
    moderator_user_name: string
    /** The login of the moderator that updated the treatment for a suspicious user. */
    moderator_user_login: string
    /** The ID of the suspicious user whose treatment was updated. */
    user_id: string
    /** The display name of the suspicious user whose treatment was updated. */
    user_name: string
    /** The login of the suspicious user whose treatment was updated. */
    user_login: string
    /** The status set for the suspicious user. Can be the following: "none", "active_monitoring", or "restricted". */
    low_trust_status: string
  }
}>

registerEvent("channel.suspicious_user.update", {
  scopes: ["moderator:read:suspicious"],
  subscriber: (userId) => ({
    type: "channel.suspicious_user.update",
    version: "1",
    condition: {
      moderator_user_id: userId,
      broadcaster_user_id: userId,
    },
  }),
})
