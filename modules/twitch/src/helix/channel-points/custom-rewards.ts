import { type Authentication } from "../../authentication/index.js"
import { helix } from "../helix.js"

interface CustomReward {
  broadcaster_id: string
  broadcaster_login: string
  broadcaster_name: string
  id: string
  title: string
  prompt: string
  cost: number
  image: {
    url_1x: string
    url_2x: string
    url_4x: string
  }
  default_image: {
    url_1x: string
    url_2x: string
    url_4x: string
  }
  background_color: string
  is_enabled: boolean
  is_user_input_required: boolean
  max_per_stream_setting: {
    is_enabled: boolean
    max_per_stream: number
  }
  max_per_user_per_stream_setting: {
    is_enabled: boolean
    max_per_user_per_stream: number
  }
  global_cooldown_setting: {
    is_enabled: boolean
    global_cooldown_seconds: number
  }
  is_paused: boolean
  is_in_stock: boolean
  should_redemptions_skip_request_queue: boolean
  redemptions_redeemed_current_stream: number
  cooldown_expires_at: string
}

export async function getCustomRewards(
  authentication: Authentication,
): Promise<CustomReward[]> {
  const subscriptions = await helix<
    CustomReward,
    never,
    {
      broadcaster_id: string
    }
  >(authentication, {
    method: "get",
    path: "/channel_points/custom_rewards",
    params: {
      broadcaster_id: authentication.user.id,
    },
  })

  return subscriptions
}
