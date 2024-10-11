export interface ChannelPointsCustomRewardGlobalCooldown {
  /** Is the setting enabled. */
  is_enabled: boolean
  /** Integer. The cooldown in seconds. */
  seconds: number
}

export interface ChannelPointsCustomRewardMaxPerStream {
  /** Is the setting enabled. */
  is_enabled: boolean
  /** Integer. The max per stream limit. */
  value: number
}

export interface ChannelPointsCustomRewardMaxPerUserPerStream {
  /** Is the setting enabled. */
  is_enabled: boolean
  /** Integer. The max per user per stream limit. */
  value: number
}

export interface ChannelPointsCustomRewardImage {
  /** URL for the image at 1x size. */
  url_1x: string
  /** URL for the image at 2x size. */
  url_2x: string
  /** URL for the image at 3x size. */
  url_4x: string
}
