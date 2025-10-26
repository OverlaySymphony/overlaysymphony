import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.shield_mode.end": ChannelShieldModeEnd
  }
}

/** Channel Shield Mode End v1: When the broadcaster deactivates Shield Mode. */
type ChannelShieldModeEnd = EventConfig<{
  Type: "channel.shield_mode.end"
  Version: "1"
  /** The conditions to listen for when the broadcaster deactivates Shield Mode. */
  Condition: {
    /** The ID of the broadcaster that you want to receive notifications about when they deactivate Shield Mode. */
    broadcaster_user_id: string
    /** The ID of the broadcaster or one of the broadcaster's moderators. */
    moderator_user_id: string
  }
  /** The event fired when the broadcaster deactivates Shield Mode. */
  Event: {
    /** An ID that identifies the broadcaster whose Shield Mode status was updated. */
    broadcaster_user_id: string
    /** The broadcaster's login name. */
    broadcaster_user_login: string
    /** The broadcaster's display name. */
    broadcaster_user_name: string
    /** An ID that identifies the moderator that updated the Shield Mode's status. If the broadcaster updated the status, this ID will be the same as broadcaster_user_id. */
    moderator_user_id: string
    /** The moderator's login name. */
    moderator_user_login: string
    /** The moderator's display name. */
    moderator_user_name: string
    /** The UTC timestamp (in RFC3339 format) of when the moderator activated Shield Mode. The object includes this field only for channel.shield_mode.begin events. */
    started_at: string
    /** The UTC timestamp (in RFC3339 format) of when the moderator deactivated Shield Mode. The object includes this field only for channel.shield_mode.end events. */
    ended_at: string
  }
}>

registerEvent("channel.shield_mode.end", {
  scopes: ["moderator:manage:shield", "moderator:read:shield"],
  subscriber: (userId) => ({
    type: "channel.shield_mode.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
