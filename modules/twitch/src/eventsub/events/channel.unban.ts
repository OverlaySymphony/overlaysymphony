import { type BaseSubscription } from "../events-helpers.js"

type ChannelUnbanType = "channel.unban"
type ChannelUnbanVersion = "1"

/** The parameters under which an event fires when A moderator unbans a user. */
export interface ChannelUnbanCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A moderator unbans a user. */
export interface ChannelUnbanEvent {
  /** The user ID of the user who was unbanned. */
  user_id: string
  /** The user login of the user who was unbanned. */
  user_login: string
  /** The user name of the user who was unbanned. */
  user_name: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the issuer of the unban. */
  moderator_user_id: string
  /** The user login of the issuer of the unban. */
  moderator_user_login: string
  /** The user name of the issuer of the unban. */
  moderator_user_name: string
}

/** The event notification received when A moderator unbans a user. */
export type ChannelUnbanSubscription = BaseSubscription<
  ChannelUnbanType,
  ChannelUnbanVersion,
  ChannelUnbanCondition
>

export function makeChannelUnbanSubscription(
  userId: string,
): ChannelUnbanSubscription {
  return {
    type: "channel.unban",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
