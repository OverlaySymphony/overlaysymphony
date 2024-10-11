import { BaseSubscription } from "../events-helpers"

import { ChannelPointsCustomRewardGlobalCooldown, ChannelPointsCustomRewardImage, ChannelPointsCustomRewardMaxPerStream, ChannelPointsCustomRewardMaxPerUserPerStream } from "./channel.channel_points_custom_reward._"

type ChannelPointsCustomRewardAddType = "channel.channel_points_custom_reward.add"
type ChannelPointsCustomRewardAddVersion = "1"

/** The parameters under which an event fires when The broadcaster creates a custom channel points reward. */
export interface ChannelPointsCustomRewardAddCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when The broadcaster creates a custom channel points reward. */
export interface ChannelPointsCustomRewardAddEvent {
  /** The reward identifier. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** Is the reward currently enabled. If false, the reward won't show up to viewers. */
  is_enabled: boolean
  /** Is the reward currently paused. If true, viewers can't redeem. */
  is_paused: boolean
  /** Is the reward currently in stock. If false, viewers can't redeem. */
  is_in_stock: boolean
  /** The reward title. */
  title: string
  /** Integer. The reward cost. */
  cost: number
  /** The reward description. */
  prompt: string
  /** Does the viewer need to enter information when redeeming the reward. */
  is_user_input_required: boolean
  /** Should redemptions be set to fulfilled status immediately when redeemed and skip the request queue instead of the normal unfulfilled status. */
  should_redemptions_skip_request_queue: boolean
  /** Whether a maximum per stream is enabled and what the maximum is. */
  max_per_stream: ChannelPointsCustomRewardMaxPerStream
  /** Whether a maximum per user per stream is enabled and what the maximum is. */
  max_per_user_per_stream: ChannelPointsCustomRewardMaxPerUserPerStream
  /** Custom background color for the reward. Format: Hex with # prefix. Example: #FA1ED2. */
  background_color: string
  /** Set of custom images of 1x, 2x and 4x sizes for the reward. Can be null if no images have been uploaded. */
  image: ChannelPointsCustomRewardImage
  /** Set of default images of 1x, 2x and 4x sizes for the reward. */
  default_image: ChannelPointsCustomRewardImage
  /** Whether a cooldown is enabled and what the cooldown is in seconds. */
  global_cooldown: ChannelPointsCustomRewardGlobalCooldown
  /** The time the cooldown expires. null if the reward isn't on cooldown. */
  cooldown_expires_at: Date
  /** Integer. The number of redemptions redeemed during the current live stream. Counts against the max_per_stream limit. null if the broadcasters stream isn't live or max_per_stream isn't enabled. */
  redemptions_redeemed_current_stream: number
}

/** The event notification received when The broadcaster creates a custom channel points reward. */
export type ChannelPointsCustomRewardAddSubscription = BaseSubscription<
  ChannelPointsCustomRewardAddType,
  ChannelPointsCustomRewardAddVersion,
  ChannelPointsCustomRewardAddCondition
>

export function makeChannelPointsCustomRewardAddSubscription(
  userId: string,
): ChannelPointsCustomRewardAddSubscription {
  return {
    type: "channel.channel_points_custom_reward.add",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
