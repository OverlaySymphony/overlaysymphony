import { type BaseSubscription } from "../events-helpers.js"

import { type HypeTrainTopContribution } from "./channel.hype_train._.js"

type HypeTrainBeginType = "channel.hype_train.begin"
type HypeTrainBeginVersion = "1"

/** The parameters under which an event fires when A Hype Train begins. */
export interface HypeTrainBeginCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A Hype Train begins. */
export interface HypeTrainBeginEvent {
  /** The hype train ID. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** Integer. Total points contributed to the hype train. */
  total: number
  /** Integer. The number of points contributed to the hype train at the current level. */
  progress: number
  /** Integer. The number of points required to reach the next level. */
  goal: number
  /** The contributors with the most points contributed. */
  top_contributions: HypeTrainTopContribution[]
  /** Integer. The starting level of the hype train. */
  level: number
  /** The time the hype train started. */
  started_at: Date
  /** The time the hype train expires. The expiration is extended when the hype train reaches a new level. */
  expires_at: Date
}

/** The event notification received when A Hype Train begins. */
export type HypeTrainBeginSubscription = BaseSubscription<
  HypeTrainBeginType,
  HypeTrainBeginVersion,
  HypeTrainBeginCondition
>

export function makeHypeTrainBeginSubscription(
  userId: string,
): HypeTrainBeginSubscription {
  return {
    type: "channel.hype_train.begin",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
