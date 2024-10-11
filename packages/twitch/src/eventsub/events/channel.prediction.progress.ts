import { BaseSubscription } from "../events-helpers"

import { ChannelPredictionOutcome } from "./channel.prediction._"

type ChannelPredictionProgressType = "channel.prediction.progress"
type ChannelPredictionProgressVersion = "1"

/** The parameters under which an event fires when A user participates in a Prediction. */
export interface ChannelPredictionProgressCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A user participates in a Prediction. */
export interface ChannelPredictionProgressEvent {
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
  /** An array of outcomes for the Channel Points Prediction. Includes top_predictors. */
  outcomes: ChannelPredictionOutcome[]
  /** The time the Channel Points Prediction started. */
  started_at: Date
  /** The time the Channel Points Prediction will automatically lock. */
  locks_at: Date
}

/** The event notification received when A user participates in a Prediction. */
export type ChannelPredictionProgressSubscription = BaseSubscription<
  ChannelPredictionProgressType,
  ChannelPredictionProgressVersion,
  ChannelPredictionProgressCondition
>

export function makeChannelPredictionProgressSubscription(
  userId: string,
): ChannelPredictionProgressSubscription {
  return {
    type: "channel.prediction.progress",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
