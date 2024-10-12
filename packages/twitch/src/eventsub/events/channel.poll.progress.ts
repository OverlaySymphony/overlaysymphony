import { BaseSubscription } from "../events-helpers.js"

import {
  ChannelPollBitsVoting,
  ChannelPollChoice,
  ChannelPollPointsVoting,
} from "./channel.poll._.js"

type ChannelPollProgressType = "channel.poll.progress"
type ChannelPollProgressVersion = "1"

/** The parameters under which an event fires when A user responds to a poll. */
export interface ChannelPollProgressCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A user responds to a poll. */
export interface ChannelPollProgressEvent {
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
  /** The time the poll started. */
  started_at: Date
  /** The time the poll will end. */
  ends_at: Date
}

/** The event notification received when A user responds to a poll. */
export type ChannelPollProgressSubscription = BaseSubscription<
  ChannelPollProgressType,
  ChannelPollProgressVersion,
  ChannelPollProgressCondition
>

export function makeChannelPollProgressSubscription(
  userId: string,
): ChannelPollProgressSubscription {
  return {
    type: "channel.poll.progress",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
