import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.warning.send": ChannelWarningSend
  }
}

/** Channel Warning Send v1: When a user is sent a warning. Broadcasters and moderators can see the warning's details. */
type ChannelWarningSend = EventConfig<{
  Type: "channel.warning.send"
  Version: "1"
  /** The conditions to listen for when a user is sent a warning. Broadcasters and moderators can see the warning's details. */
  Condition: {
    /** The User ID of the broadcaster. */
    broadcaster_user_id: string
    /** The User ID of the moderator. */
    moderator_user_id: string
  }
  /** The event fired when a user is sent a warning. Broadcasters and moderators can see the warning's details. */
  Event: {
    /** The user ID of the broadcaster. */
    broadcaster_user_id: string
    /** The login of the broadcaster. */
    broadcaster_user_login: string
    /** The user name of the broadcaster. */
    broadcaster_user_name: string
    /** The user ID of the moderator who sent the warning. */
    moderator_user_id: string
    /** The login of the moderator. */
    moderator_user_login: string
    /** The user name of the moderator. */
    moderator_user_name: string
    /** The ID of the user being warned. */
    user_id: string
    /** The login of the user being warned. */
    user_login: string
    /** The user name of the user being. */
    user_name: string
    /** The reason given for the warning. */
    reason?: string
    /** The chat rules cited for the warning. */
    chat_rules_cited?: string[]
  }
}>

registerEvent("channel.warning.send", {
  scopes: ["moderator:manage:warnings", "moderator:read:warnings"],
  subscriber: (userId) => ({
    type: "channel.warning.send",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
