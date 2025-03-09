import { type BaseSubscription } from "../events-helpers.js"

import { type ChannelPointsCustomRewardGlobalCooldown, type ChannelPointsCustomRewardImage, type ChannelPointsCustomRewardMaxPerStream, type ChannelPointsCustomRewardMaxPerUserPerStream } from "./channel.channel_points_custom_reward._.js"

type ChannelPointsCustomRewardRemoveType = "channel.channel_points_custom_reward.remove"
type ChannelPointsCustomRewardRemoveVersion = "1"

/** The parameters under which an event fires when The broadcaster removes a custom channel points reward. */
export interface ChannelPointsCustomRewardRemoveCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** Optional. Specify a reward ID to only receive notifications for a specific reward. */
  reward_id?: string
}

/** The event information when The broadcaster removes a custom channel points reward. */
export interface ChannelPointsCustomRewardRemoveEvent {
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

/** The event notification received when The broadcaster removes a custom channel points reward. */
export type ChannelPointsCustomRewardRemoveSubscription = BaseSubscription<
  ChannelPointsCustomRewardRemoveType,
  ChannelPointsCustomRewardRemoveVersion,
  ChannelPointsCustomRewardRemoveCondition
>

export function makeChannelPointsCustomRewardRemoveSubscription(
  userId: string,
): ChannelPointsCustomRewardRemoveSubscription {
  return {
    type: "channel.channel_points_custom_reward.remove",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
