import { BaseSubscription } from "../events-helpers.js"

type ShoutoutCreateType = "channel.shoutout.create"
type ShoutoutCreateVersion = "1"

/** The parameters under which an event fires when The broadcaster sends a Shoutout. */
export interface ShoutoutCreateCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when The broadcaster sends a Shoutout. */
export interface ShoutoutCreateEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the broadcaster that received the shoutout. */
  to_broadcaster_user_id: string
  /** The user login of the broadcaster. */
  to_broadcaster_user_login: string
  /** The user name of the broadcaster. */
  to_broadcaster_user_name: string
  /** The user ID of the moderator that sent the shoutout. If the broadcaster sent the shoutout, this ID is the same as the ID in broadcaster_user_id. */
  moderator_user_id: string
  /** The user login of the moderator. */
  moderator_user_login: string
  /** The user name of the moderator. */
  moderator_user_name: string
  /** Integer. The number of users that were watching the broadcaster's stream at the time of the shoutout. */
  viewer_count: number
  /** The time the moderator sent the shoutout. */
  started_at: Date
  /** The time the broadcaster may send a shoutout to a different broadcaster. */
  cooldown_ends_at: Date
  /** The time the broadcaster may send another shoutout to the broadcaster in to_broadcaster_user_id. */
  target_cooldown_ends_at: Date
}

/** The event notification received when The broadcaster sends a Shoutout. */
export type ShoutoutCreateSubscription = BaseSubscription<
  ShoutoutCreateType,
  ShoutoutCreateVersion,
  ShoutoutCreateCondition
>

export function makeShoutoutCreateSubscription(
  userId: string,
): ShoutoutCreateSubscription {
  return {
    type: "channel.shoutout.create",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
