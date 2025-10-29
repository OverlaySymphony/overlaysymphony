import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.ad_break.begin": ChannelAdBreakBegin
  }
}

/** Channel Ad Break Begin v1: When a midroll commercial break has started running. */
type ChannelAdBreakBegin = EventConfig<{
  Type: "channel.ad_break.begin"
  Version: "1"
  /** The conditions to listen for when a midroll commercial break has started running. */
  Condition: {
    /** The ID of the broadcaster that you want to get Channel Ad Break begin notifications for. Maximum: 1 */
    broadcaster_id: string
  }
  /** The event fired when a midroll commercial break has started running. */
  Event: {
    /** Length in seconds of the mid-roll ad break requested */
    duration_seconds: number
    /** The UTC timestamp of when the ad break began, in RFC3339 format. Note that there is potential delay between this event, when the streamer requested the ad break, and when the viewers will see ads. */
    started_at: string
    /** Indicates if the ad was automatically scheduled via Ads Manager */
    is_automatic: boolean
    /** The broadcaster's user ID for the channel the ad was run on. */
    broadcaster_user_id: string
    /** The broadcaster's user login for the channel the ad was run on. */
    broadcaster_user_login: string
    /** The broadcaster's user display name for the channel the ad was run on. */
    broadcaster_user_name: string
    /** The ID of the user that requested the ad. For automatic ads, this will be the ID of the broadcaster. */
    requester_user_id: string
    /** The login of the user that requested the ad. */
    requester_user_login: string
    /** The display name of the user that requested the ad. */
    requester_user_name: string
  }
}>

registerEvent("channel.ad_break.begin", {
  scopes: ["channel:read:ads"],
  subscriber: (userId) => ({
    type: "channel.ad_break.begin",
    version: "1",
    condition: {
      broadcaster_id: userId,
    },
  }),
})
