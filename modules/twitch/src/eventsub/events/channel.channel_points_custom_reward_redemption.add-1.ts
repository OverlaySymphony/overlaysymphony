import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.channel_points_custom_reward_redemption.add": ChannelChannelPointsCustomRewardRedemptionAdd
  }
}

/** Channel Channel Points Custom Reward Redemption Add v1: When a viewer has redeemed a custom channel points reward on the specified channel. */
type ChannelChannelPointsCustomRewardRedemptionAdd = EventConfig<{
  Type: "channel.channel_points_custom_reward_redemption.add"
  Version: "1"
  /** The conditions to listen for when a viewer has redeemed a custom channel points reward on the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to receive channel points custom reward redemption add notifications for. */
    broadcaster_user_id: string
    /** Specify a reward id to only receive notifications for a specific reward. */
    reward_id?: string
  }
  /** The event fired when a viewer has redeemed a custom channel points reward on the specified channel. */
  Event: {
    /** The redemption identifier. */
    id: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** User ID of the user that redeemed the reward. */
    user_id: string
    /** Login of the user that redeemed the reward. */
    user_login: string
    /** Display name of the user that redeemed the reward. */
    user_name: string
    /** The user input provided. Empty string if not provided. */
    user_input: string
    /** Defaults to unfulfilled. Possible values are unknown, unfulfilled, fulfilled, and canceled . */
    status: string
    /** Basic information about the reward that was redeemed, at the time it was redeemed. */
    reward: {
      /** The reward identifier. */
      id: string
      /** The reward name. */
      title: string
      /** The reward cost. */
      cost: number
      /** The reward description. */
      prompt: string
    }
    /** RFC3339 timestamp of when the reward was redeemed. */
    redeemed_at: string
  }
}>

registerEvent("channel.channel_points_custom_reward_redemption.add", {
  scopes: ["channel:manage:redemptions", "channel:read:redemptions"],
  subscriber: (userId) => ({
    type: "channel.channel_points_custom_reward_redemption.add",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
