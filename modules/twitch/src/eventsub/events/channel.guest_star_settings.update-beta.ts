import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.guest_star_settings.update@be": ChannelGuestStarSettingsUpdateBe
  }
}

/** Channel Guest Star Settings Update Be vbeta: When the host preferences for Guest Star have been updated. */
type ChannelGuestStarSettingsUpdateBe = EventConfig<{
  Type: "channel.guest_star_settings.update@be"
  Version: "beta"
  /** The conditions to listen for when the host preferences for Guest Star have been updated. */
  Condition: {
    /** The broadcaster user ID of the channel hosting the Guest Star Session */
    broadcaster_user_id: string
    /** The user ID of the moderator or broadcaster of the specified channel. */
    moderator_user_id: string
  }
  /** The event fired when the host preferences for Guest Star have been updated. */
  Event: {
    /** User ID of the host channel. */
    broadcaster_user_id: string
    /** The broadcaster display name */
    broadcaster_user_name: string
    /** he broadcaster login. */
    broadcaster_user_login: string
    /** Flag determining if Guest Star moderators have access to control whether a guest is live once assigned to a slot. */
    is_moderator_send_live_enabled: boolean
    /** Number of slots the Guest Star call interface will allow the host to add to a call. */
    slot_count: number
    /** Flag determining if browser sources subscribed to sessions on this channel should output audio. */
    is_browser_source_audio_enabled: boolean
    /**
     * This setting determines how the guests within a session should be laid out within a group browser source. Can be one of the following values:
     * - tiled — All live guests are tiled within the browser source with the same size.
     * - screenshare — All live guests are tiled within the browser source with the same size. If there is an active screen share, it is sized larger than the other guests.
     * - horizontal_top — Indicates the group layout will contain all participants in a top-aligned horizontal stack.
     * - horizontal_bottom — Indicates the group layout will contain all participants in a bottom-aligned horizontal stack.
     * - vertical_left — Indicates the group layout will contain all participants in a left-aligned vertical stack.
     * - vertical_right — Indicates the group layout will contain all participants in a right-aligned vertical stack.
     */
    group_layout: string
  }
}>

registerEvent("channel.guest_star_settings.update@be", {
  scopes: [
    "channel:manage:guest",
    "channel:read:guest",
    "moderator:manage:guest",
    "moderator:read:guest",
  ],
  subscriber: (userId) => ({
    type: "channel.guest_star_settings.update@be",
    version: "beta",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
