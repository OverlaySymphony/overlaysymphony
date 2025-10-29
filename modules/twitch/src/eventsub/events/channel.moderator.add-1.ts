import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.moderator.add": ChannelModeratorAdd
  }
}

/** Channel Moderator Add v1: When moderator privileges were added to a user on the specified channel. */
type ChannelModeratorAdd = EventConfig<{
  Type: "channel.moderator.add"
  Version: "1"
  /** The conditions to listen for when moderator privileges were added to a user on the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get moderator addition notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when moderator privileges were added to a user on the specified channel. */
  Event: {
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** The user ID of the new moderator. */
    user_id: string
    /** The user login of the new moderator. */
    user_login: string
    /** The display name of the new moderator. */
    user_name: string
  }
}>

registerEvent("channel.moderator.add", {
  scopes: ["moderation:read"],
  subscriber: (userId) => ({
    type: "channel.moderator.add",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
