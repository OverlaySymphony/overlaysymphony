import { type BaseSubscription } from "../events-helpers.js"

import { type ChannelPollBitsVoting, type ChannelPollChoice, type ChannelPollPointsVoting } from "./channel.poll._.js"

type ChannelPollBeginType = "channel.poll.begin"
type ChannelPollBeginVersion = "1"

/** The parameters under which an event fires when A poll starts. */
export interface ChannelPollBeginCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A poll starts. */
export interface ChannelPollBeginEvent {
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
  /** An array of choices for the poll. */
  choices: ChannelPollChoice[]
  /** The bits voting settings for the poll. */
  bits_voting: ChannelPollBitsVoting
  /** The Channel Points voting settings for the poll. */
  channel_points_voting: ChannelPollPointsVoting
  /** The time the poll started. */
  started_at: Date
  /** The time the poll will end. */
  ends_at: Date
}

/** The event notification received when A poll starts. */
export type ChannelPollBeginSubscription = BaseSubscription<
  ChannelPollBeginType,
  ChannelPollBeginVersion,
  ChannelPollBeginCondition
>

export function makeChannelPollBeginSubscription(
  userId: string,
): ChannelPollBeginSubscription {
  return {
    type: "channel.poll.begin",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
