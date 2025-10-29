import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.warning.acknowledge": ChannelWarningAcknowledge
  }
}

/** Channel Warning Acknowledge v1: When a user awknowledges a warning. Broadcasters and moderators can see the warning's details. */
type ChannelWarningAcknowledge = EventConfig<{
  Type: "channel.warning.acknowledge"
  Version: "1"
  /** The conditions to listen for when a user awknowledges a warning. Broadcasters and moderators can see the warning's details. */
  Condition: {
    /** The User ID of the broadcaster. */
    broadcaster_user_id: string
    /** The User ID of the moderator. */
    moderator_user_id: string
  }
  /** The event fired when a user awknowledges a warning. Broadcasters and moderators can see the warning's details. */
  Event: {
    /** The user ID of the broadcaster. */
    broadcaster_user_id: string
    /** The login of the broadcaster. */
    broadcaster_user_login: string
    /** The user name of the broadcaster. */
    broadcaster_user_name: string
    /** The ID of the user that has acknowledged their warning. */
    user_id: string
    /** The login of the user that has acknowledged their warning. */
    user_login: string
    /** The user name of the user that has acknowledged their warning. */
    user_name: string
  }
}>

registerEvent("channel.warning.acknowledge", {
  scopes: ["moderator:manage:warnings", "moderator:read:warnings"],
  subscriber: (userId) => ({
    type: "channel.warning.acknowledge",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
