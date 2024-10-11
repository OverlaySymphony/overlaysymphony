import { BaseSubscription } from "../events-helpers"

type ChannelUpdateType = "channel.update"
type ChannelUpdateVersion = "2"

/** The parameters under which an event fires when The broadcaster updates their channel properties. e.g., category, title, content classification labels, broadcast, or language. */
export interface ChannelUpdateCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when The broadcaster updates their channel properties. e.g., category, title, content classification labels, broadcast, or language. */
export interface ChannelUpdateEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The channel's stream title. */
  title: string
  /** The channel's broadcast language. */
  language: string
  /** The channel's category ID. */
  category_id: string
  /** The category name. */
  category_name: string
  /** Array of content classification label IDs currently applied on the Channel. */
  content_classification_labels: string[]
}

/** The event notification received when The broadcaster updates their channel properties. e.g., category, title, content classification labels, broadcast, or language. */
export type ChannelUpdateSubscription = BaseSubscription<
  ChannelUpdateType,
  ChannelUpdateVersion,
  ChannelUpdateCondition
>

export function makeChannelUpdateSubscription(
  userId: string,
): ChannelUpdateSubscription {
  return {
    type: "channel.update",
    version: "2",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
