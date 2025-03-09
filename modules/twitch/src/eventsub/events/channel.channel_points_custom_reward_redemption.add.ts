import { type BaseSubscription } from "../events-helpers.js"

import { type ChannelPointsCustomRewardRedemptionReward } from "./channel.channel_points_custom_reward_redemption._.js"

type ChannelPointsCustomRewardRedemptionAddType = "channel.channel_points_custom_reward_redemption.add"
type ChannelPointsCustomRewardRedemptionAddVersion = "1"

/** The parameters under which an event fires when A user redeems a custom channel points reward. */
export interface ChannelPointsCustomRewardRedemptionAddCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** Optional. Specify a reward ID to only receive notifications for a specific reward. */
  reward_id?: string
}

/** The event information when A user redeems a custom channel points reward. */
export interface ChannelPointsCustomRewardRedemptionAddEvent {
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
  /** Defaults to unfulfilled. Possible values are unknown, unfulfilled, fulfilled, and canceled. */
  status: string
  /** Basic information about the reward that was redeemed, at the time it was redeemed. */
  reward: ChannelPointsCustomRewardRedemptionReward
  /** The time the reward was redeemed. */
  redeemed_at: Date
}

/** The event notification received when A user redeems a custom channel points reward. */
export type ChannelPointsCustomRewardRedemptionAddSubscription = BaseSubscription<
  ChannelPointsCustomRewardRedemptionAddType,
  ChannelPointsCustomRewardRedemptionAddVersion,
  ChannelPointsCustomRewardRedemptionAddCondition
>

export function makeChannelPointsCustomRewardRedemptionAddSubscription(
  userId: string,
): ChannelPointsCustomRewardRedemptionAddSubscription {
  return {
    type: "channel.channel_points_custom_reward_redemption.add",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
