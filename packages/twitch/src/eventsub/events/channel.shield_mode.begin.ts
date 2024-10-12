import { BaseSubscription } from "../events-helpers.js"

type ShieldModeBeginType = "channel.shield_mode.begin"
type ShieldModeBeginVersion = "1"

/** The parameters under which an event fires when The broadcaster activates Shield Mode. */
export interface ShieldModeBeginCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when The broadcaster activates Shield Mode. */
export interface ShieldModeBeginEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the moderator that updated the shield mode's status. If the broadcaster updated the status, this ID will be the same as broadcaster_user_id. */
  moderator_user_id: string
  /** The user login of the moderator. */
  moderator_user_login: string
  /** The user name of the moderator. */
  moderator_user_name: string
  /** The time the moderator activated shield mode. */
  started_at: Date
}

/** The event notification received when The broadcaster activates Shield Mode. */
export type ShieldModeBeginSubscription = BaseSubscription<
  ShieldModeBeginType,
  ShieldModeBeginVersion,
  ShieldModeBeginCondition
>

export function makeShieldModeBeginSubscription(
  userId: string,
): ShieldModeBeginSubscription {
  return {
    type: "channel.shield_mode.begin",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
