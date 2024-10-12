import { BaseSubscription } from "../events-helpers.js"

import { ChannelPredictionOutcome } from "./channel.prediction._.js"

type ChannelPredictionBeginType = "channel.prediction.begin"
type ChannelPredictionBeginVersion = "1"

/** The parameters under which an event fires when A Prediction startn. */
export interface ChannelPredictionBeginCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A Prediction startn. */
export interface ChannelPredictionBeginEvent {
  /** Channel Points Prediction ID. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** Title for the Channel Points Prediction. */
  title: string
  /** An array of outcomes for the Channel Points Prediction. */
  outcomes: ChannelPredictionOutcome[]
  /** The time the Channel Points Prediction started. */
  started_at: Date
  /** The time the Channel Points Prediction will automatically lock. */
  locks_at: Date
}

/** The event notification received when A Prediction startn. */
export type ChannelPredictionBeginSubscription = BaseSubscription<
  ChannelPredictionBeginType,
  ChannelPredictionBeginVersion,
  ChannelPredictionBeginCondition
>

export function makeChannelPredictionBeginSubscription(
  userId: string,
): ChannelPredictionBeginSubscription {
  return {
    type: "channel.prediction.begin",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
