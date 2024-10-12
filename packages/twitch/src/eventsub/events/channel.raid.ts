import { BaseSubscription } from "../events-helpers.js"

type ChannelRaidType = "channel.raid"
type ChannelRaidVersion = "1"

/** The parameters under which an event fires when The broadcaster raids another broadcaster's channel. */
export interface ChannelRaidCondition {
  /** The user ID of the broadcaster that created the channel raid. */
  from_broadcaster_user_id?: string
  /** The user ID of the broadcaster that received the channel raid. */
  to_broadcaster_user_id?: string
}

/** The event information when The broadcaster raids another broadcaster's channel. */
export interface ChannelRaidEvent {
  /** The user ID of the broadcaster that created the raid. */
  from_broadcaster_user_id: string
  /** The user login of the broadcaster that created the raid. */
  from_broadcaster_user_login: string
  /** The user name of the broadcaster that created the raid. */
  from_broadcaster_user_name: string
  /** The user ID of the broadcaster that received the raid. */
  to_broadcaster_user_id: string
  /** The user login of the broadcaster that received the raid. */
  to_broadcaster_user_login: string
  /** The user name of the broadcaster that received the raid. */
  to_broadcaster_user_name: string
  /** Integer. The number of viewers in the raid. */
  viewers: number
}

/** The event notification received when The broadcaster raids another broadcaster's channel. */
export type ChannelRaidSubscription = BaseSubscription<
  ChannelRaidType,
  ChannelRaidVersion,
  ChannelRaidCondition
>

export function makeChannelRaidSubscription(
  userId: string,
): ChannelRaidSubscription {
  return {
    type: "channel.raid",
    version: "1",
    condition: {
      to_broadcaster_user_id: userId,
    },
  }
}
