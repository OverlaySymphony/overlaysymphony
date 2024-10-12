import { BaseSubscription } from "../events-helpers.js"

type ChannelModeratorRemoveType = "channel.moderator.remove"
type ChannelModeratorRemoveVersion = "1"

/** The parameters under which an event fires when The broadcaster removes moderator privileges from a user. */
export interface ChannelModeratorRemoveCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when The broadcaster removes moderator privileges from a user. */
export interface ChannelModeratorRemoveEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the removed moderator. */
  user_id: string
  /** The user login of the removed moderator. */
  user_login: string
  /** The user name of the removed moderator. */
  user_name: string
}

/** The event notification received when The broadcaster removes moderator privileges from a user. */
export type ChannelModeratorRemoveSubscription = BaseSubscription<
  ChannelModeratorRemoveType,
  ChannelModeratorRemoveVersion,
  ChannelModeratorRemoveCondition
>

export function makeChannelModeratorRemoveSubscription(
  userId: string,
): ChannelModeratorRemoveSubscription {
  return {
    type: "channel.moderator.remove",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
