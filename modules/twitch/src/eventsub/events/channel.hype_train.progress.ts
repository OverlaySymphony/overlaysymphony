import { type BaseSubscription } from "../events-helpers.js"

import { type HypeTrainTopContribution } from "./channel.hype_train._.js"

type HypeTrainProgressType = "channel.hype_train.progress"
type HypeTrainProgressVersion = "1"

/** The parameters under which an event fires when A Hype Train makes progress. */
export interface HypeTrainProgressCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A Hype Train makes progress. */
export interface HypeTrainProgressEvent {
  /** The hype train ID. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** Integer. The current level of the hype train. */
  level: number
  /** Integer. Total points contributed to the hype train. */
  total: number
  /** Integer. The number of points contributed to the hype train at the current level. */
  progress: number
  /** Integer. The number of points required to reach the next level. */
  goal: number
  /** The contributors with the most points contributed. */
  top_contributions: HypeTrainTopContribution[]
  /** The most recent contribution. */
  last_contribution: {
    /** The user ID of the user who made the contribution. */
    user_id: string
    /** The user login name. */
    user_login: string
    /** The user name. */
    user_name: string
    /** The contribution method used. Possible values are:\n  bits — Cheering with Bits.\n  subscription — Subscription activity like subscribing or gifting subscriptions.\n  other — Covers other contribution methods not listed. */
    type: string
    /** Integer. The total amount contributed. If type is bits, total represents the amount of Bits used. If type is subscription, total is 500, 1000, or 2500 to represent tier 1, 2, or 3 subscriptions, respectively. */
    total: number
  }
  /** The time the hype train started. */
  started_at: Date
  /** The time the hype train expires. The expiration is extended when the hype train reaches a new level. */
  expires_at: Date
}

/** The event notification received when A Hype Train makes progress. */
export type HypeTrainProgressSubscription = BaseSubscription<
  HypeTrainProgressType,
  HypeTrainProgressVersion,
  HypeTrainProgressCondition
>

export function makeHypeTrainProgressSubscription(
  userId: string,
): HypeTrainProgressSubscription {
  return {
    type: "channel.hype_train.progress",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
