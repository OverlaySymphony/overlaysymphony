import { BaseSubscription } from "../events-helpers"

type ChannelGuestStarSessionBeginType = "channel.guest_star_session.begin"
type ChannelGuestStarSessionBeginVersion = "beta"

/** The parameters under which an event fires when The broadcaster began a new Guest Star session. */
export interface ChannelGuestStarSessionBeginCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when The broadcaster began a new Guest Star session. */
export interface ChannelGuestStarSessionBeginEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** ID representing the unique session that was started. */
  session_id: string
  /** The time the session began. */
  started_at: Date
}

/** The event notification received when The broadcaster began a new Guest Star session. */
export type ChannelGuestStarSessionBeginSubscription = BaseSubscription<
  ChannelGuestStarSessionBeginType,
  ChannelGuestStarSessionBeginVersion,
  ChannelGuestStarSessionBeginCondition
>

export function makeChannelGuestStarSessionBeginSubscription(
  userId: string,
): ChannelGuestStarSessionBeginSubscription {
  return {
    type: "channel.guest_star_session.begin",
    version: "beta",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
