import { BaseSubscription } from "../events-helpers.js"

type ChannelCheerType = "channel.cheer"
type ChannelCheerVersion = "1"

/** The parameters under which an event fires when A user cheers. */
export interface ChannelCheerCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A user cheers. */
export interface ChannelCheerEvent {
  /** Whether the user cheered anonymously or not. */
  is_anonymous: boolean
  /** The user ID of the user who cheered. This is null if is_anonymous is true. */
  user_id: string
  /** The user login of the user who cheered. This is null if is_anonymous is true. */
  user_login: string
  /** The user name of the user who cheered. This is null if is_anonymous is true. */
  user_name: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The message sent with the cheer. */
  message: string
  /** Integer. The number of bits cheered. */
  bits: number
}

/** The event notification received when A user cheers. */
export type ChannelCheerSubscription = BaseSubscription<
  ChannelCheerType,
  ChannelCheerVersion,
  ChannelCheerCondition
>

export function makeChannelCheerSubscription(
  userId: string,
): ChannelCheerSubscription {
  return {
    type: "channel.cheer",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
