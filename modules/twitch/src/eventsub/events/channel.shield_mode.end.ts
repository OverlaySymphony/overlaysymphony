import { type BaseSubscription } from "../events-helpers.js"

type ShieldModeEndType = "channel.shield_mode.end"
type ShieldModeEndVersion = "1"

/** The parameters under which an event fires when The broadcaster deactivates Shield Mode. */
export interface ShieldModeEndCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when The broadcaster deactivates Shield Mode. */
export interface ShieldModeEndEvent {
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
  /** The time the moderator deactivated shield mode. */
  ended_at: Date
}

/** The event notification received when The broadcaster deactivates Shield Mode. */
export type ShieldModeEndSubscription = BaseSubscription<
  ShieldModeEndType,
  ShieldModeEndVersion,
  ShieldModeEndCondition
>

export function makeShieldModeEndSubscription(
  userId: string,
): ShieldModeEndSubscription {
  return {
    type: "channel.shield_mode.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
