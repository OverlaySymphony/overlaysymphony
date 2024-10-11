import { BaseSubscription } from "../events-helpers"

type ChannelFollowType = "channel.follow"
type ChannelFollowVersion = "2"

/** The parameters under which an event fires when A user follows. */
export interface ChannelFollowCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when A user follows. */
export interface ChannelFollowEvent {
  /** The user ID of the user who followed. */
  user_id: string
  /** The user login of the user who followed. */
  user_login: string
  /** The user name of the user who followed. */
  user_name: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The time the follow occurred. */
  followed_at: Date
}

/** The event notification received when A user follows. */
export type ChannelFollowSubscription = BaseSubscription<
  ChannelFollowType,
  ChannelFollowVersion,
  ChannelFollowCondition
>

export function makeChannelFollowSubscription(
  userId: string,
): ChannelFollowSubscription {
  return {
    type: "channel.follow",
    version: "2",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
