import { BaseSubscription } from "../events-helpers.js"

type ChannelSubscribeType = "channel.subscribe"
type ChannelSubscribeVersion = "1"

/** The parameters under which an event fires when A user subscribes. This does not include resubscribes. */
export interface ChannelSubscribeCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A user subscribes. This does not include resubscribes. */
export interface ChannelSubscribeEvent {
  /** The user ID of the user who subscribed. */
  user_id: string
  /** The user login of the user who subscribed. */
  user_login: string
  /** The user name of the user who subscribed. */
  user_name: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The tier of the subscription. Valid values are 1000, 2000, and 3000. */
  tier: string
  /** Whether the subscription is a gift. */
  is_gift: boolean
}

/** The event notification received when A user subscribes. This does not include resubscribes. */
export type ChannelSubscribeSubscription = BaseSubscription<
  ChannelSubscribeType,
  ChannelSubscribeVersion,
  ChannelSubscribeCondition
>

export function makeChannelSubscribeSubscription(
  userId: string,
): ChannelSubscribeSubscription {
  return {
    type: "channel.subscribe",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
