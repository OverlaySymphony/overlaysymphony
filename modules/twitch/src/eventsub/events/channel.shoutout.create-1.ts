import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.shoutout.create": ChannelShoutoutCreate
  }
}

/** Channel Shoutout Create v1: When the specified broadcaster sends a Shoutout. */
type ChannelShoutoutCreate = EventConfig<{
  Type: "channel.shoutout.create"
  Version: "1"
  /** The conditions to listen for when the specified broadcaster sends a Shoutout. */
  Condition: {
    /** The ID of the broadcaster that you want to receive notifications about when they send a Shoutout. */
    broadcaster_user_id: string
    /** The ID of the broadcaster that gave the Shoutout or one of the broadcaster's moderators. */
    moderator_user_id: string
  }
  /** The event fired when the specified broadcaster sends a Shoutout. */
  Event: {
    /** An ID that identifies the broadcaster that sent the Shoutout. */
    broadcaster_user_id: string
    /** The broadcaster's login name. */
    broadcaster_user_login: string
    /** The broadcaster's display name. */
    broadcaster_user_name: string
    /** An ID that identifies the broadcaster that received the Shoutout. */
    to_broadcaster_user_id: string
    /** The broadcaster's login name. */
    to_broadcaster_user_login: string
    /** The broadcaster's display name. */
    to_broadcaster_user_name: string
    /** An ID that identifies the moderator that sent the Shoutout. If the broadcaster sent the Shoutout, this ID is the same as the ID in broadcaster_user_id. */
    moderator_user_id: string
    /** The moderator's login name. */
    moderator_user_login: string
    /** The moderator's display name. */
    moderator_user_name: string
    /** The number of users that were watching the broadcaster's stream at the time of the Shoutout. */
    viewer_count: number
    /** The UTC timestamp (in RFC3339 format) of when the moderator sent the Shoutout. */
    started_at: string
    /** The UTC timestamp (in RFC3339 format) of when the broadcaster may send a Shoutout to a different broadcaster. */
    cooldown_ends_at: string
    /** The UTC timestamp (in RFC3339 format) of when the broadcaster may send another Shoutout to the broadcaster in to_broadcaster_user_id. */
    target_cooldown_ends_at: string
  }
}>

registerEvent("channel.shoutout.create", {
  scopes: ["moderator:manage:shoutouts", "moderator:read:shoutouts"],
  subscriber: (userId) => ({
    type: "channel.shoutout.create",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
