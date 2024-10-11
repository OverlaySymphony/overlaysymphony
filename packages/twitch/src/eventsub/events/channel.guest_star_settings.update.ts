import { BaseSubscription } from "../events-helpers"

type ChannelGuestStarSettingsUpdateType = "channel.guest_star_settings.update"
type ChannelGuestStarSettingsUpdateVersion = "beta"

/** The parameters under which an event fires when The broadcaster updates preferences for Guest Star. */
export interface ChannelGuestStarSettingsUpdateCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when The broadcaster updates preferences for Guest Star. */
export interface ChannelGuestStarSettingsUpdateEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** Flag determining if Guest Star moderators have access to control whether a guest is live once assigned to a slot. */
  is_moderator_send_live_enabled: boolean
  /** Integer. Number of slots the Guest Star call interface will allow the host to add to a call. */
  slot_count: number
  /** Flag determining if browser sources subscribed to sessions on this channel should output audio. */
  is_browser_source_audio_enabled: boolean
  /** This setting determines how the guests within a session should be laid out within a group browser source. Can be one of the following values:\n  - tiled — All live guests are tiled within the browser source with the same size.\n  - screenshare — All live guests are tiled within the browser source with the same size. If there is an active screen share, it is sized larger than the other guests.\n  - horizontal_top — Indicates the group layout will contain all participants in a top-aligned horizontal stack.\n  - horizontal_bottom — Indicates the group layout will contain all participants in a bottom-aligned horizontal stack.\n  - vertical_left — Indicates the group layout will contain all participants in a left-aligned vertical stack.\n  - vertical_right — Indicates the group layout will contain all participants in a right-aligned vertical stack. */
  group_layout: string
}

/** The event notification received when The broadcaster updates preferences for Guest Star. */
export type ChannelGuestStarSettingsUpdateSubscription = BaseSubscription<
  ChannelGuestStarSettingsUpdateType,
  ChannelGuestStarSettingsUpdateVersion,
  ChannelGuestStarSettingsUpdateCondition
>

export function makeChannelGuestStarSettingsUpdateSubscription(
  userId: string,
): ChannelGuestStarSettingsUpdateSubscription {
  return {
    type: "channel.guest_star_settings.update",
    version: "beta",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
