import { BaseSubscription } from "../events-helpers.js"

import { ChannelPollBitsVoting, ChannelPollChoice, ChannelPollPointsVoting } from "./channel.poll._.js"

type ChannelPollEndType = "channel.poll.end"
type ChannelPollEndVersion = "1"

/** The parameters under which an event fires when A poll ends. */
export interface ChannelPollEndCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A poll ends. */
export interface ChannelPollEndEvent {
  /** ID of the poll. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** Question displayed for the poll. */
  title: string
  /** An array of choices for the poll. Includes vote counts. */
  choices: ChannelPollChoice[]
  /** The bits voting settings for the poll. */
  bits_voting: ChannelPollBitsVoting
  /** The Channel Points voting settings for the poll. */
  channel_points_voting: ChannelPollPointsVoting
  /** The status of the poll. Valid values are completed, archived, and terminated. */
  status: string
  /** The time the poll started. */
  started_at: Date
  /** The time the poll ended. */
  ended_at: Date
}

/** The event notification received when A poll ends. */
export type ChannelPollEndSubscription = BaseSubscription<
  ChannelPollEndType,
  ChannelPollEndVersion,
  ChannelPollEndCondition
>

export function makeChannelPollEndSubscription(
  userId: string,
): ChannelPollEndSubscription {
  return {
    type: "channel.poll.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
