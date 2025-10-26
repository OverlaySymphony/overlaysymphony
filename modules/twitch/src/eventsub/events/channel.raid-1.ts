import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.raid": ChannelRaid
  }
}

/** Channel Raid v1: When the broadcaster raids another broadcaster's channel. */
type ChannelRaid = EventConfig<{
  Type: "channel.raid"
  Version: "1"
  /** The conditions to listen for when the broadcaster raids another broadcaster's channel. */
  Condition: {
    /** The broadcaster user ID that created the channel raid you want to get notifications for. Use this parameter if you want to know when a specific broadcaster raids another broadcaster. The channel raid condition must include either from_broadcaster_user_id or to_broadcaster_user_id. */
    from_broadcaster_user_id?: string
    /** The broadcaster user ID that received the channel raid you want to get notifications for. Use this parameter if you want to know when a specific broadcaster is raided by another broadcaster. The channel raid condition must include either from_broadcaster_user_id or to_broadcaster_user_id. */
    to_broadcaster_user_id?: string
  }
  /** The event fired when the broadcaster raids another broadcaster's channel. */
  Event: {
    /** The broadcaster ID that created the raid. */
    from_broadcaster_user_id: string
    /** The broadcaster login that created the raid. */
    from_broadcaster_user_login: string
    /** The broadcaster display name that created the raid. */
    from_broadcaster_user_name: string
    /** The broadcaster ID that received the raid. */
    to_broadcaster_user_id: string
    /** The broadcaster login that received the raid. */
    to_broadcaster_user_login: string
    /** The broadcaster display name that received the raid. */
    to_broadcaster_user_name: string
    /** The number of viewers in the raid. */
    viewers: number
  }
}>

registerEvent("channel.raid", {
  scopes: [],
  subscriber: (userId) => ({
    type: "channel.raid",
    version: "1",
    condition: {
      to_broadcaster_user_id: userId,
    },
  }),
})
