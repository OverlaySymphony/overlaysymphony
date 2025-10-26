import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.subscription.message": ChannelSubscriptionMessage
  }
}

/** Channel Subscription Message v1: When a user sends a resubscription chat message in a specific channel. */
type ChannelSubscriptionMessage = EventConfig<{
  Type: "channel.subscription.message"
  Version: "1"
  /** The conditions to listen for when a user sends a resubscription chat message in a specific channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get resubscription chat message notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a user sends a resubscription chat message in a specific channel. */
  Event: {
    /** The user ID of the user who sent a resubscription chat message. */
    user_id: string
    /** The user login of the user who sent a resubscription chat message. */
    user_login: string
    /** The user display name of the user who a resubscription chat message. */
    user_name: string
    /** The broadcaster user ID. */
    broadcaster_user_id: string
    /** The broadcaster login. */
    broadcaster_user_login: string
    /** The broadcaster display name. */
    broadcaster_user_name: string
    /** The tier of the user's subscription. */
    tier: string
    /** An object that contains the resubscription message and emote information needed to recreate the message. */
    message: {
      /** The text of the resubscription chat message. */
      text: string
      /** An array that includes the emote ID and start and end positions for where the emote appears in the text. */
      emotes: {
        /** The index of where the Emote starts in the text. */
        begin: number
        /** The index of where the Emote ends in the text. */
        end: number
        /** The emote ID. */
        id: string
      }
    }
    /** The total number of months the user has been subscribed to the channel. */
    cumulative_months: number
    /** The number of consecutive months the user's current subscription has been active. This value is null if the user has opted out of sharing this information. */
    streak_months: number
    /** The month duration of the subscription. */
    duration_months: number
  }
}>

registerEvent("channel.subscription.message", {
  scopes: ["channel:read:subscriptions"],
  subscriber: (userId) => ({
    type: "channel.subscription.message",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
