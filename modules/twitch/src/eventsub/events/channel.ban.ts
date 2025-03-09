import { type BaseSubscription } from "../events-helpers.js"

type ChannelBanType = "channel.ban"
type ChannelBanVersion = "1"

/** The parameters under which an event fires when A moderator bans a user. */
export interface ChannelBanCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A moderator bans a user. */
export interface ChannelBanEvent {
  /** The user ID of the user who was banned. */
  user_id: string
  /** The user login of the user who was banned. */
  user_login: string
  /** The user name of the user who was banned. */
  user_name: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the issuer of the ban. */
  moderator_user_id: string
  /** The user login of the issuer of the ban. */
  moderator_user_login: string
  /** The user name of the issuer of the ban. */
  moderator_user_name: string
  /** The reason behind the ban. */
  reason: string
  /** The time the user was banned or put in a timeout. */
  banned_at: Date
  /** The time the timeout ends. Is null if the user was banned instead of put in a timeout. */
  ends_at: Date
  /** Indicates whether the ban is permanent (true) or a timeout (false). If true, ends_at will be null. */
  is_permanent: boolean
}

/** The event notification received when A moderator bans a user. */
export type ChannelBanSubscription = BaseSubscription<
  ChannelBanType,
  ChannelBanVersion,
  ChannelBanCondition
>

export function makeChannelBanSubscription(
  userId: string,
): ChannelBanSubscription {
  return {
    type: "channel.ban",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
