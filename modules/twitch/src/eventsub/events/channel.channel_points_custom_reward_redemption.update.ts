import { type BaseSubscription } from "../events-helpers.js"

import { type ChannelPointsCustomRewardRedemptionReward } from "./channel.channel_points_custom_reward_redemption._.js"

type ChannelPointsCustomRewardRedemptionUpdateType = "channel.channel_points_custom_reward_redemption.update"
type ChannelPointsCustomRewardRedemptionUpdateVersion = "1"

/** The parameters under which an event fires when A moderator updates the redemption of a channel points custom reward. */
export interface ChannelPointsCustomRewardRedemptionUpdateCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** Optional. Specify a reward ID to only receive notifications for a specific reward. */
  reward_id?: string
}

/** The event information when A moderator updates the redemption of a channel points custom reward. */
export interface ChannelPointsCustomRewardRedemptionUpdateEvent {
  /** The redemption identifier. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the user who redeemed the reward. */
  user_id: string
  /** The user login of the user who redeemed the reward. */
  user_login: string
  /** The user name of the user who redeemed the reward. */
  user_name: string
  /** The user input provided. Empty string if not provided. */
  user_input: string
  /** Will be fulfilled or canceled. Possible values are unknown, unfulfilled, fulfilled, and canceled. */
  status: string
  /** Basic information about the reward that was redeemed, at the time it was redeemed. */
  reward: ChannelPointsCustomRewardRedemptionReward
  /** The time the reward was redeemed. */
  redeemed_at: Date
}

/** The event notification received when A moderator updates the redemption of a channel points custom reward. */
export type ChannelPointsCustomRewardRedemptionUpdateSubscription = BaseSubscription<
  ChannelPointsCustomRewardRedemptionUpdateType,
  ChannelPointsCustomRewardRedemptionUpdateVersion,
  ChannelPointsCustomRewardRedemptionUpdateCondition
>

export function makeChannelPointsCustomRewardRedemptionUpdateSubscription(
  userId: string,
): ChannelPointsCustomRewardRedemptionUpdateSubscription {
  return {
    type: "channel.channel_points_custom_reward_redemption.update",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
