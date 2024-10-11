import { BaseSubscription } from "../events-helpers"

type ChannelModeratorAddType = "channel.moderator.add"
type ChannelModeratorAddVersion = "1"

/** The parameters under which an event fires when The broadcaster gives moderator privileges to a user. */
export interface ChannelModeratorAddCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when The broadcaster gives moderator privileges to a user. */
export interface ChannelModeratorAddEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user ID of the new moderator. */
  user_id: string
  /** The user login of the new moderator. */
  user_login: string
  /** The user name of the new moderator. */
  user_name: string
}

/** The event notification received when The broadcaster gives moderator privileges to a user. */
export type ChannelModeratorAddSubscription = BaseSubscription<
  ChannelModeratorAddType,
  ChannelModeratorAddVersion,
  ChannelModeratorAddCondition
>

export function makeChannelModeratorAddSubscription(
  userId: string,
): ChannelModeratorAddSubscription {
  return {
    type: "channel.moderator.add",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
