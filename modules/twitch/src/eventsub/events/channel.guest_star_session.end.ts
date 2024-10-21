import { BaseSubscription } from "../events-helpers.js"

type ChannelGuestStarSessionEndType = "channel.guest_star_session.end"
type ChannelGuestStarSessionEndVersion = "beta"

/** The parameters under which an event fires when A running Guest Star session ends. */
export interface ChannelGuestStarSessionEndCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when A running Guest Star session ends. */
export interface ChannelGuestStarSessionEndEvent {
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
  /** The time the session ended. */
  ended_at: Date
}

/** The event notification received when A running Guest Star session ends. */
export type ChannelGuestStarSessionEndSubscription = BaseSubscription<
  ChannelGuestStarSessionEndType,
  ChannelGuestStarSessionEndVersion,
  ChannelGuestStarSessionEndCondition
>

export function makeChannelGuestStarSessionEndSubscription(
  userId: string,
): ChannelGuestStarSessionEndSubscription {
  return {
    type: "channel.guest_star_session.end",
    version: "beta",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
