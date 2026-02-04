import { type Authentication } from "../../authentication/index.ts"
import { helix } from "../helix.ts"

interface CustomReward {
  broadcaster_id: string /* The ID that uniquely identifies the broadcaster. */
  broadcaster_login: string /* The broadcaster’s login name. */
  broadcaster_name: string /* The broadcaster’s display name. */
  id: string /* The ID that uniquely identifies this custom reward. */
  title: string /* The title of the reward. */
  prompt: string /* The prompt shown to the viewer when they redeem the reward if user input is required (see the is_user_input_required field). */
  cost: number /* The cost of the reward in Channel Points. */
  /** A set of custom images for the reward. This field is null if the broadcaster didn’t upload images. */
  image: {
    url_1x: string /* The URL to a small version of the image. */
    url_2x: string /* The URL to a medium version of the image. */
    url_4x: string /* The URL to a large version of the image. */
  }
  /** A set of default images for the reward. */
  default_image: {
    url_1x: string /* The URL to a small version of the image. */
    url_2x: string /* The URL to a medium version of the image. */
    url_4x: string /* The URL to a large version of the image. */
  }
  background_color: string /* The background color to use for the reward. The color is in Hex format (for example, #00E5CB). */
  is_enabled: boolean /* A Boolean value that determines whether the reward is enabled. Is true if enabled; otherwise, false. Disabled rewards aren’t shown to the user. */
  is_user_input_required: boolean /* A Boolean value that determines whether the user must enter information when redeeming the reward. Is true if the user is prompted. */
  /** The settings used to determine whether to apply a maximum to the number of redemptions allowed per live stream. */
  max_per_stream_setting: {
    is_enabled: boolean /* A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per live stream. Is true if the reward applies a limit. */
    max_per_stream: number /* The maximum number of redemptions allowed per live stream. */
  }
  /** The settings used to determine whether to apply a maximum to the number of redemptions allowed per user per live stream. */
  max_per_user_per_stream_setting: {
    is_enabled: boolean /* A Boolean value that determines whether the reward applies a limit on the number of redemptions allowed per user per live stream. Is true if the reward applies a limit. */
    max_per_user_per_stream: number /* The maximum number of redemptions allowed per user per live stream. */
  }
  /** The settings used to determine whether to apply a cooldown period between redemptions and the length of the cooldown. */
  global_cooldown_setting: {
    is_enabled: boolean /* A Boolean value that determines whether to apply a cooldown period. Is true if a cooldown period is enabled. */
    global_cooldown_seconds: number /* The cooldown period, in seconds. */
  }
  is_paused: boolean /* A Boolean value that determines whether the reward is currently paused. Is true if the reward is paused. Viewers can’t redeem paused rewards. */
  is_in_stock: boolean /* A Boolean value that determines whether the reward is currently in stock. Is true if the reward is in stock. Viewers can’t redeem out of stock rewards. */
  should_redemptions_skip_request_queue: boolean /* A Boolean value that determines whether redemptions should be set to FULFILLED status immediately when a reward is redeemed. If false, status is set to UNFULFILLED and follows the normal request queue process. */
  redemptions_redeemed_current_stream: number /* The number of redemptions redeemed during the current live stream. The number counts against the max_per_stream_setting limit. This field is null if the broadcaster’s stream isn’t live or max_per_stream_setting isn’t enabled. */
  cooldown_expires_at: string /* The timestamp of when the cooldown period expires. Is null if the reward isn’t in a cooldown state. See the global_cooldown_setting field. */
}

interface CustomRewardResponse {
  data: CustomReward[]
}

interface Redemption {
  broadcaster_id: string /** The ID that uniquely identifies the broadcaster. */
  broadcaster_login: string /** The broadcaster’s login name. */
  broadcaster_name: string /** The broadcaster’s display name. */
  id: string /** The ID that uniquely identifies this redemption. */
  user_login: string /** The user’s login name. */
  user_id: string /** The ID that uniquely identifies the user that redeemed the reward. */
  user_name: string /** The user’s display name. */
  user_input: string /** The text the user entered at the prompt when they redeemed the reward; otherwise, an empty string if user input was not required. */
  status: string /** The state of the redemption. Possible values are:\n  - CANCELED\n  - FULFILLED\n  - UNFULFILLED */
  redeemed_at: string /** The date and time of when the reward was redeemed, in RFC3339 format. */
  /** The reward that the user redeemed. */
  reward: {
    id: string /** The ID that uniquely identifies the redeemed reward. */
    title: string /** The reward’s title. */
    prompt: string /** The prompt displayed to the viewer if user input is required. */
    cost: number /** The reward’s cost, in Channel Points. */
  }
}

interface RedemptionResponse {
  data: Redemption[]
}

export async function getCustomRewards(
  authentication: Authentication,
): Promise<CustomReward[]> {
  const { data: subscriptions } = await helix<
    CustomRewardResponse,
    {
      broadcaster_id: string
    }
  >(authentication, {
    method: "GET",
    path: "/channel_points/custom_rewards",
    params: {
      broadcaster_id: authentication.user.id,
    },
  })

  return subscriptions
}

export async function getRedemptions(
  authentication: Authentication,
  reward_id: string,
  id: string,
): Promise<Redemption[]> {
  const { data: redemptions } = await helix<
    RedemptionResponse,
    {
      broadcaster_id: string
      reward_id: string
      id?: string
      status?: "CANCELED" | "FULFILLED" | "UNFULFILLED"
    }
  >(authentication, {
    method: "GET",
    path: "/channel_points/custom_rewards",
    params: {
      broadcaster_id: authentication.user.id,
      reward_id,
      id,
      status: id ? undefined : "UNFULFILLED",
    },
  })

  return redemptions
}

export async function updateRedemption(
  authentication: Authentication,
  reward_id: string,
  id: string,
  status: "CANCELED" | "FULFILLED",
): Promise<Redemption[]> {
  const { data: redemptions } = await helix<
    RedemptionResponse,
    {
      broadcaster_id: string
      reward_id: string
      id: string
      status: "CANCELED" | "FULFILLED"
    }
  >(authentication, {
    method: "GET",
    path: "/channel_points/custom_rewards",
    params: {
      broadcaster_id: authentication.user.id,
      reward_id,
      id,
      status,
    },
  })

  return redemptions
}
