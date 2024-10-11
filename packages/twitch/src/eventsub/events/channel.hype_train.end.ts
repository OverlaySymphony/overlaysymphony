import { BaseSubscription } from "../events-helpers"

import { HypeTrainTopContribution } from "./channel.hype_train._"

type HypeTrainEndType = "channel.hype_train.end"
type HypeTrainEndVersion = "1"

/** The parameters under which an event fires when A Hype Train ends. */
export interface HypeTrainEndCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A Hype Train ends. */
export interface HypeTrainEndEvent {
  /** The hype train ID. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** Integer. The final level of the hype train. */
  level: number
  /** Integer. Total points contributed to the hype train. */
  total: number
  /** The contributors with the most points contributed. */
  top_contributions: HypeTrainTopContribution[]
  /** The time the hype train started. */
  started_at: Date
  /** The time the hype train ended. */
  ended_at: Date
  /** The time the hype train cooldown ends so that the next hype train can start. */
  cooldown_ends_at: Date
}

/** The event notification received when A Hype Train ends. */
export type HypeTrainEndSubscription = BaseSubscription<
  HypeTrainEndType,
  HypeTrainEndVersion,
  HypeTrainEndCondition
>

export function makeHypeTrainEndSubscription(
  userId: string,
): HypeTrainEndSubscription {
  return {
    type: "channel.hype_train.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
