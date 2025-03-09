import { type BaseSubscription } from "../events-helpers.js"

type ChannelSubscriptionGiftType = "channel.subscription.gift"
type ChannelSubscriptionGiftVersion = "1"

/** The parameters under which an event fires when A user gives a gift subscription to one or more users. */
export interface ChannelSubscriptionGiftCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A user gives a gift subscription to one or more users. */
export interface ChannelSubscriptionGiftEvent {
  /** The user ID of the user who sent the subscription gift. Set to null if it was an anonymous subscription gift. */
  user_id: string
  /** The user login of the user who sent the gift. Set to null if it was an anonymous subscription gift. */
  user_login: string
  /** The user name of the user who sent the gift. Set to null if it was an anonymous subscription gift. */
  user_name: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** Integer. The number of subscriptions in the subscription gift. */
  total: number
  /** The tier of the subscriptions in the subscription gift. */
  tier: string
  /** Integer. The number of subscriptions gifted by this user in the channel. This value is null for anonymous gifts or if the gifter has opted out of sharing this information. */
  cumulative_total: number
  /** Whether the subscription gift was anonymous. */
  is_anonymous: boolean
}

/** The event notification received when A user gives a gift subscription to one or more users. */
export type ChannelSubscriptionGiftSubscription = BaseSubscription<
  ChannelSubscriptionGiftType,
  ChannelSubscriptionGiftVersion,
  ChannelSubscriptionGiftCondition
>

export function makeChannelSubscriptionGiftSubscription(
  userId: string,
): ChannelSubscriptionGiftSubscription {
  return {
    type: "channel.subscription.gift",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
