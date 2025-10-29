import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.channel_points_custom_reward_redemption.update": ChannelChannelPointsCustomRewardRedemptionUpdate
  }
}

/** Channel Channel Points Custom Reward Redemption Update v1: When a redemption of a channel points custom reward has been updated for the specified channel. */
type ChannelChannelPointsCustomRewardRedemptionUpdate = EventConfig<{
  Type: "channel.channel_points_custom_reward_redemption.update"
  Version: "1"
  /** The conditions to listen for when a redemption of a channel points custom reward has been updated for the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to receive channel points custom reward redemption update notifications for. */
    broadcaster_user_id: string
    /** Specify a reward id to only receive notifications for a specific reward. */
    reward_id?: string
  }
  /** The event fired when a redemption of a channel points custom reward has been updated for the specified channel. */
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
    /** Will be fulfilled or canceled. Possible values are unknown, unfulfilled, fulfilled, and canceled . */
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

registerEvent("channel.channel_points_custom_reward_redemption.update", {
  scopes: ["channel:manage:redemptions", "channel:read:redemptions"],
  subscriber: (userId) => ({
    type: "channel.channel_points_custom_reward_redemption.update",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
