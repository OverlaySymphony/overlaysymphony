import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.follow": ChannelFollow
  }
}

/** Channel Follow v2: When the specified channel receives a follow. */
type ChannelFollow = EventConfig<{
  Type: "channel.follow"
  Version: "2"
  /** The conditions to listen for when the specified channel receives a follow. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get follow notifications for. */
    broadcaster_user_id: string
    /** The ID of the moderator of the channel you want to get follow notifications for. If you have authorization from the broadcaster rather than a moderator, specify the broadcaster's user ID here. */
    moderator_user_id: string
  }
  /** The event fired when the specified channel receives a follow. */
  Event: {
    /** The user ID for the user now following the specified channel. */
    user_id: string
    /** The user login for the user now following the specified channel. */
    user_login: string
    /** The user display name for the user now following the specified channel. */
    user_name: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** RFC3339 timestamp of when the follow occurred. */
    followed_at: string
  }
}>

registerEvent("channel.follow", {
  scopes: ["moderator:read:followers"],
  subscriber: (userId) => ({
    type: "channel.follow",
    version: "2",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
