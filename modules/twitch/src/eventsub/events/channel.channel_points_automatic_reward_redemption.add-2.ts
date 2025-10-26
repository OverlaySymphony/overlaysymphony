import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.channel_points_automatic_reward_redemption.add": ChannelChannelPointsAutomaticRewardRedemptionAdd
  }
}

/** Channel Channel Points Automatic Reward Redemption Add v2: When a viewer has redeemed an automatic channel points reward on the specified channel. */
type ChannelChannelPointsAutomaticRewardRedemptionAdd = EventConfig<{
  Type: "channel.channel_points_automatic_reward_redemption.add"
  Version: "2"
  /** The conditions to listen for when a viewer has redeemed an automatic channel points reward on the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to receive channel points reward add notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a viewer has redeemed an automatic channel points reward on the specified channel. */
  Event: {
    /** The ID of the channel where the reward was redeemed. */
    broadcaster_user_id: string
    /** The login of the channel where the reward was redeemed. */
    broadcaster_user_login: string
    /** The display name of the channel where the reward was redeemed. */
    broadcaster_user_name: string
    /** The ID of the redeeming user. */
    user_id: string
    /** The login of the redeeming user. */
    user_login: string
    /** The display name of the redeeming user. */
    user_name: string
    /** The ID of the Redemption. */
    id: string
    /** An object that contains the reward information. */
    reward: {
      /**
       * The type of reward. One of:
       * - single_message_bypass_sub_mode
       * - send_highlighted_message
       * - random_sub_emote_unlock
       * - chosen_sub_emote_unlock
       * - chosen_modified_sub_emote_unlock
       * - message_effect
       * - gigantify_an_emote
       * - celebration
       */
      type: string
      /** The reward cost. */
      cost: number
      /** Emote that was unlocked. */
      unlocked_emote?: {
        /** The emote ID. */
        id: string
        /** The human readable emote token. */
        name: string
      }
    }
    /** An object that contains the user message and emote information needed to recreate the message. */
    message: {
      /** The text of the chat message. */
      text: string
      /** An array that includes the emote ID and start and end positions for where the emote appears in the text. */
      emotes: Array<{
        /** The emote ID. */
        id: string
        /** The index of where the Emote starts in the text. */
        begin: number
        /** The index of where the Emote ends in the text. */
        end: number
      }>
    }
    /** A string that the user entered if the reward requires input. */
    user_input?: string
    /** The UTC date and time (in RFC3339 format) of when the reward was redeemed. */
    redeemed_at: string
  }
}>

registerEvent("channel.channel_points_automatic_reward_redemption.add", {
  scopes: ["channel:manage:redemptions", "channel:read:redemptions"],
  subscriber: (userId) => ({
    type: "channel.channel_points_automatic_reward_redemption.add",
    version: "2",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
