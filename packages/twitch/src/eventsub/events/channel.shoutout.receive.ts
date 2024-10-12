import { BaseSubscription } from "../events-helpers.js"

type ShoutoutReceiveType = "channel.shoutout.receive"
type ShoutoutReceiveVersion = "1"

/** The parameters under which an event fires when The broadcaster receives a Shoutout. */
export interface ShoutoutReceiveCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when The broadcaster receives a Shoutout. */
export interface ShoutoutReceiveEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the broadcaster that sent the shoutout. */
  from_broadcaster_user_id: string
  /** The user login of the broadcaster. */
  from_broadcaster_user_login: string
  /** The user name of the broadcaster. */
  from_broadcaster_user_name: string
  /** Integer. The number of users that were watching the from-broadcaster's stream at the time of the shoutout. */
  viewer_count: number
  /** The time the moderator sent the shoutout. */
  started_at: Date
}

/** The event notification received when The broadcaster receives a Shoutout. */
export type ShoutoutReceiveSubscription = BaseSubscription<
  ShoutoutReceiveType,
  ShoutoutReceiveVersion,
  ShoutoutReceiveCondition
>

export function makeShoutoutReceiveSubscription(
  userId: string,
): ShoutoutReceiveSubscription {
  return {
    type: "channel.shoutout.receive",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
