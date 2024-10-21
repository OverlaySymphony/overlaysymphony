import { BaseSubscription } from "../events-helpers.js"

type StreamOnlineType = "stream.online"
type StreamOnlineVersion = "1"

/** The parameters under which an event fires when The broadcaster starts a stream. */
export interface StreamOnlineCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when The broadcaster starts a stream. */
export interface StreamOnlineEvent {
  /** The ID of the stream. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The stream type. Valid values are: live, playlist, watch_party, premiere, rerun. */
  type: string
  /** The time the stream went online. */
  started_at: Date
}

/** The event notification received when The broadcaster starts a stream. */
export type StreamOnlineSubscription = BaseSubscription<
  StreamOnlineType,
  StreamOnlineVersion,
  StreamOnlineCondition
>

export function makeStreamOnlineSubscription(
  userId: string,
): StreamOnlineSubscription {
  return {
    type: "stream.online",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
