import { BaseSubscription } from "../events-helpers.js"

type ChannelSubscriptionMessageType = "channel.subscription.message"
type ChannelSubscriptionMessageVersion = "1"

/** The parameters under which an event fires when A user sends a resubscription chat message. */
export interface ChannelSubscriptionMessageCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A user sends a resubscription chat message. */
export interface ChannelSubscriptionMessageEvent {
  /** The user ID of the user who sent a resubscription chat message. */
  user_id: string
  /** The user login of the user who sent a resubscription chat message. */
  user_login: string
  /** The user name of the user who a resubscription chat message. */
  user_name: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The tier of the user's subscription. */
  tier: string
  /** An object that contains the resubscription message and emote information needed to recreate the message. */
  message: {
    /** The text of the resubscription chat message. */
    text: string
    /** An array that includes the emote ID and start and end positions for where the emote appears in the text. */
    emotes: Array<{
      /** Integer. The index of where the Emote starts in the text. */
      begin: number
      /** Integer. The index of where the Emote ends in the text. */
      end: number
      /** The emote ID. */
      id: string
    }>
  }
  /** Integer. The total number of months the user is subscribed to the channel. */
  cumulative_months: number
  /** Integer. The number of consecutive months the user's current subscription is active. This value is null if the user has opted out of sharing this information. */
  streak_months: number
  /** Integer. The month duration of the subscription. */
  duration_months: number
}

/** The event notification received when A user sends a resubscription chat message. */
export type ChannelSubscriptionMessageSubscription = BaseSubscription<
  ChannelSubscriptionMessageType,
  ChannelSubscriptionMessageVersion,
  ChannelSubscriptionMessageCondition
>

export function makeChannelSubscriptionMessageSubscription(
  userId: string,
): ChannelSubscriptionMessageSubscription {
  return {
    type: "channel.subscription.message",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
