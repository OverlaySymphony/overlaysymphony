import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.unban_request.create": ChannelUnbanRequestCreate
  }
}

/** Channel Unban Request Create v1: When a user creates an unban request. */
type ChannelUnbanRequestCreate = EventConfig<{
  Type: "channel.unban_request.create"
  Version: "1"
  /** The conditions to listen for when a user creates an unban request. */
  Condition: {
    /** The ID of the user that has permission to moderate the broadcaster's channel and has granted your app permission to subscribe to this subscription type. */
    moderator_user_id: string
    /** The ID of the broadcaster you want to get chat unban request notifications for. Maximum: 1. */
    broadcaster_user_id: string
  }
  /** The event fired when a user creates an unban request. */
  Event: {
    /** The ID of the unban request. */
    id: string
    /** The broadcaster's user ID for the channel the unban request was created for. */
    broadcaster_user_id: string
    /** The broadcaster's login name. */
    broadcaster_user_login: string
    /** The broadcaster's display name. */
    broadcaster_user_name: string
    /** User ID of user that is requesting to be unbanned. */
    user_id: string
    /** The user's login name. */
    user_login: string
    /** The user's display name. */
    user_name: string
    /** Message sent in the unban request. */
    text: string
    /** The UTC timestamp (in RFC3339 format) of when the unban request was created. */
    created_at: string
  }
}>

registerEvent("channel.unban_request.create", {
  scopes: ["moderator:manage:unban", "moderator:read:unban"],
  subscriber: (userId) => ({
    type: "channel.unban_request.create",
    version: "1",
    condition: {
      moderator_user_id: userId,
      broadcaster_user_id: userId,
    },
  }),
})
