import { BaseSubscription } from "../events-helpers"

type ChannelAdBreakBeginType = "channel.ad_break.begin"
type ChannelAdBreakBeginVersion = "beta"

/** The parameters under which an event fires when A midroll commercial break starts running. */
export interface ChannelAdBreakBeginCondition {
  /** The user ID of the broadcaster. */
  broadcaster_id: string
}

/** The event information when A midroll commercial break starts running. */
export interface ChannelAdBreakBeginEvent {
  /** Integer. Length in seconds of the mid-roll ad break requested. */
  length_seconds: number
  /** The time the ad break began. Note that there is potential delay between this event, when the streamer requested the ad break, and when the viewers will see ads. */
  timestamp: Date
  /** Indicates if the ad was automatically scheduled via Ads Manager. */
  is_automatic: boolean
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the user who requested the ad. For automatic ads, this will be the ID of the broadcaster. */
  requester_user_id: string
  /** The user name of the user who requested the ad. */
  requester_user_name: string
  /** The user login of the user who requested the ad. */
  requester_user_login: string
}

/** The event notification received when A midroll commercial break starts running. */
export type ChannelAdBreakBeginSubscription = BaseSubscription<
  ChannelAdBreakBeginType,
  ChannelAdBreakBeginVersion,
  ChannelAdBreakBeginCondition
>

export function makeChannelAdBreakBeginSubscription(
  userId: string,
): ChannelAdBreakBeginSubscription {
  return {
    type: "channel.ad_break.begin",
    version: "beta",
    condition: {
      broadcaster_id: userId,
    },
  }
}
