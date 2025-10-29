import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.channel_points_custom_reward.update": ChannelChannelPointsCustomRewardUpdate
  }
}

/** Channel Channel Points Custom Reward Update v1: When a custom channel points reward has been updated for the specified channel. */
type ChannelChannelPointsCustomRewardUpdate = EventConfig<{
  Type: "channel.channel_points_custom_reward.update"
  Version: "1"
  /** The conditions to listen for when a custom channel points reward has been updated for the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to receive channel points custom reward update notifications for. */
    broadcaster_user_id: string
    /** Specify a reward id to only receive notifications for a specific reward. */
    reward_id?: string
  }
  /** The event fired when a custom channel points reward has been updated for the specified channel. */
  Event: {
    /** The reward identifier. */
    id: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** Is the reward currently enabled. If false, the reward won't show up to viewers. */
    is_enabled: boolean
    /** Is the reward currently paused. If true, viewers can't redeem. */
    is_paused: boolean
    /** Is the reward currently in stock. If false, viewers can't redeem. */
    is_in_stock: boolean
    /** The reward title. */
    title: string
    /** The reward cost. */
    cost: number
    /** The reward description. */
    prompt: string
    /** Does the viewer need to enter information when redeeming the reward. */
    is_user_input_required: boolean
    /** Should redemptions be set to fulfilled status immediately when redeemed and skip the request queue instead of the normal unfulfilled status. */
    should_redemptions_skip_request_queue: boolean
    /** Whether a maximum per stream is enabled and what the maximum is. */
    max_per_stream: {
      /** Is the setting enabled. */
      is_enabled: boolean
      /** The max per stream limit. */
      value: number
    }
    /** Whether a maximum per user per stream is enabled and what the maximum is. */
    max_per_user_per_stream: {
      /** Is the setting enabled. */
      is_enabled: boolean
      /** The max per user per stream limit. */
      value: number
    }
    /** Custom background color for the reward. Format: Hex with # prefix. Example: #FA1ED2. */
    background_color: string
    /** Set of custom images of 1x, 2x and 4x sizes for the reward. Can be null if no images have been uploaded. */
    image: {
      /** URL for the image at 1x size. */
      url_1x: string
      /** URL for the image at 2x size. */
      url_2x: string
      /** URL for the image at 4x size. */
      url_4x: string
    }
    /** Set of default images of 1x, 2x and 4x sizes for the reward. */
    default_image: {
      /** URL for the image at 1x size. */
      url_1x: string
      /** URL for the image at 2x size. */
      url_2x: string
      /** URL for the image at 4x size. */
      url_4x: string
    }
    /** Whether a cooldown is enabled and what the cooldown is in seconds. */
    global_cooldown: {
      /** Is the setting enabled. */
      is_enabled: boolean
      /** The cooldown in seconds. */
      seconds: number
    }
    /** Timestamp of the cooldown expiration. null if the reward isn't on cooldown. */
    cooldown_expires_at: string
    /** The number of redemptions redeemed during the current live stream. Counts against the max_per_stream limit. null if the broadcasters stream isn't live or max_per_stream isn't enabled. */
    redemptions_redeemed_current_stream: number
  }
}>

registerEvent("channel.channel_points_custom_reward.update", {
  scopes: ["channel:manage:redemptions", "channel:read:redemptions"],
  subscriber: (userId) => ({
    type: "channel.channel_points_custom_reward.update",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
