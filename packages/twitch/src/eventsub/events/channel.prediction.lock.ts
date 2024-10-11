import { BaseSubscription } from "../events-helpers"

import { ChannelPredictionOutcome } from "./channel.prediction._"

type ChannelPredictionLockType = "channel.prediction.lock"
type ChannelPredictionLockVersion = "1"

/** The parameters under which an event fires when A Prediction lockeds. */
export interface ChannelPredictionLockCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A Prediction lockeds. */
export interface ChannelPredictionLockEvent {
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
  /** The time the Channel Points Prediction was locked. */
  locked_at: Date
}

/** The event notification received when A Prediction lockeds. */
export type ChannelPredictionLockSubscription = BaseSubscription<
  ChannelPredictionLockType,
  ChannelPredictionLockVersion,
  ChannelPredictionLockCondition
>

export function makeChannelPredictionLockSubscription(
  userId: string,
): ChannelPredictionLockSubscription {
  return {
    type: "channel.prediction.lock",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
