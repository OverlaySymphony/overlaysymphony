import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.moderator.remove": ChannelModeratorRemove
  }
}

/** Channel Moderator Remove v1: When moderator privileges were removed from a user on the specified channel. */
type ChannelModeratorRemove = EventConfig<{
  Type: "channel.moderator.remove"
  Version: "1"
  /** The conditions to listen for when moderator privileges were removed from a user on the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get moderator removal notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when moderator privileges were removed from a user on the specified channel. */
  Event: {
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** The user ID of the removed moderator. */
    user_id: string
    /** The user login of the removed moderator. */
    user_login: string
    /** The display name of the removed moderator. */
    user_name: string
  }
}>

registerEvent("channel.moderator.remove", {
  scopes: ["moderation:read"],
  subscriber: (userId) => ({
    type: "channel.moderator.remove",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
