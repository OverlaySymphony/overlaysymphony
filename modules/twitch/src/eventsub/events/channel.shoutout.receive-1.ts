import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.shoutout.receive": ChannelShoutoutReceive
  }
}

/** Channel Shoutout Receive v1: When the specified broadcaster receives a Shoutout. */
type ChannelShoutoutReceive = EventConfig<{
  Type: "channel.shoutout.receive"
  Version: "1"
  /** The conditions to listen for when the specified broadcaster receives a Shoutout. */
  Condition: {
    /** The ID of the broadcaster that you want to receive notifications about when they receive a Shoutout. */
    broadcaster_user_id: string
    /** The ID of the broadcaster that received the Shoutout or one of the broadcaster's moderators. */
    moderator_user_id: string
  }
  /** The event fired when the specified broadcaster receives a Shoutout. */
  Event: {
    /** An ID that identifies the broadcaster that received the Shoutout. */
    broadcaster_user_id: string
    /** The broadcaster's login name. */
    broadcaster_user_login: string
    /** The broadcaster's display name. */
    broadcaster_user_name: string
    /** An ID that identifies the broadcaster that sent the Shoutout. */
    from_broadcaster_user_id: string
    /** The broadcaster's login name. */
    from_broadcaster_user_login: string
    /** The broadcaster's display name. */
    from_broadcaster_user_name: string
    /** The number of users that were watching the from-broadcaster's stream at the time of the Shoutout. */
    viewer_count: number
    /** The UTC timestamp (in RFC3339 format) of when the moderator sent the Shoutout. */
    started_at: string
  }
}>

registerEvent("channel.shoutout.receive", {
  scopes: ["moderator:manage:shoutouts", "moderator:read:shoutouts"],
  subscriber: (userId) => ({
    type: "channel.shoutout.receive",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
