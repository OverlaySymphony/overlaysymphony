import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.unban_request.resolve": ChannelUnbanRequestResolve
  }
}

/** Channel Unban Request Resolve v1: When an unban request has been resolved. */
type ChannelUnbanRequestResolve = EventConfig<{
  Type: "channel.unban_request.resolve"
  Version: "1"
  /** The conditions to listen for when an unban request has been resolved. */
  Condition: {
    /** The ID of the user that has permission to moderate the broadcaster's channel and has granted your app permission to subscribe to this subscription type. */
    moderator_user_id: string
    /** The ID of the broadcaster you want to get unban request resolution notifications for. Maximum: 1. */
    broadcaster_user_id: string
  }
  /** The event fired when an unban request has been resolved. */
  Event: {
    /** The ID of the unban request. */
    id: string
    /** The broadcaster's user ID for the channel the unban request was updated for. */
    broadcaster_user_id: string
    /** The broadcaster's login name. */
    broadcaster_user_login: string
    /** The broadcaster's display name. */
    broadcaster_user_name: string
    /** User ID of moderator who approved/denied the request. */
    moderator_id?: string
    /** The moderator's login name */
    moderator_login?: string
    /** The moderator's display name */
    moderator_name?: string
    /** User ID of user that requested to be unbanned. */
    user_id: string
    /** The user's login name. */
    user_login: string
    /** The user's display name. */
    user_name: string
    /** Resolution text supplied by the mod/broadcaster upon approval/denial of the request. */
    resolution_text?: string
    /**
     * Dictates whether the unban request was approved or denied. Can be the following:
     * - approved
     * - canceled
     * - denied
     */
    status: string
  }
}>

registerEvent("channel.unban_request.resolve", {
  scopes: ["moderator:manage:unban", "moderator:read:unban"],
  subscriber: (userId) => ({
    type: "channel.unban_request.resolve",
    version: "1",
    condition: {
      moderator_user_id: userId,
      broadcaster_user_id: userId,
    },
  }),
})
