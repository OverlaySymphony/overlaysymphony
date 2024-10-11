import { BaseSubscription } from "../events-helpers"

type StreamOfflineType = "stream.offline"
type StreamOfflineVersion = "1"

/** The parameters under which an event fires when The broadcaster stops a stream. */
export interface StreamOfflineCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when The broadcaster stops a stream. */
export interface StreamOfflineEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
}

/** The event notification received when The broadcaster stops a stream. */
export type StreamOfflineSubscription = BaseSubscription<
  StreamOfflineType,
  StreamOfflineVersion,
  StreamOfflineCondition
>

export function makeStreamOfflineSubscription(
  userId: string,
): StreamOfflineSubscription {
  return {
    type: "stream.offline",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
