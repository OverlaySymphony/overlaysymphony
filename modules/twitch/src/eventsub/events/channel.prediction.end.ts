import { BaseSubscription } from "../events-helpers.js"

import { ChannelPredictionOutcome } from "./channel.prediction._.js"

type ChannelPredictionEndType = "channel.prediction.end"
type ChannelPredictionEndVersion = "1"

/** The parameters under which an event fires when A Prediction ends. */
export interface ChannelPredictionEndCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A Prediction ends. */
export interface ChannelPredictionEndEvent {
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
  /** ID of the winning outcome. */
  winning_outcome_id: string
  /** An array of outcomes for the Channel Points Prediction. Includes top_predictors. */
  outcomes: ChannelPredictionOutcome[]
  /** The status of the Channel Points Prediction. Valid values are resolved and canceled. */
  status: string
  /** The time the Channel Points Prediction started. */
  started_at: Date
  /** The time the Channel Points Prediction ended. */
  ended_at: Date
}

/** The event notification received when A Prediction ends. */
export type ChannelPredictionEndSubscription = BaseSubscription<
  ChannelPredictionEndType,
  ChannelPredictionEndVersion,
  ChannelPredictionEndCondition
>

export function makeChannelPredictionEndSubscription(
  userId: string,
): ChannelPredictionEndSubscription {
  return {
    type: "channel.prediction.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
