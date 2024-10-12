import { BaseSubscription } from "../events-helpers.js"

type ChannelSubscriptionEndType = "channel.subscription.end"
type ChannelSubscriptionEndVersion = "1"

/** The parameters under which an event fires when A subscription ends. */
export interface ChannelSubscriptionEndCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A subscription ends. */
export interface ChannelSubscriptionEndEvent {
  /** The user ID of the user whose subscription ended. */
  user_id: string
  /** The user login of the user whose subscription ended. */
  user_login: string
  /** The user name of the user whose subscription ended. */
  user_name: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The tier of the subscription that ended. Valid values are 1000, 2000, and 3000. */
  tier: string
  /** Whether the subscription was a gift. */
  is_gift: boolean
}

/** The event notification received when A subscription ends. */
export type ChannelSubscriptionEndSubscription = BaseSubscription<
  ChannelSubscriptionEndType,
  ChannelSubscriptionEndVersion,
  ChannelSubscriptionEndCondition
>

export function makeChannelSubscriptionEndSubscription(
  userId: string,
): ChannelSubscriptionEndSubscription {
  return {
    type: "channel.subscription.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
