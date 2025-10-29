import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.guest_star_session.end@be": ChannelGuestStarSessionEndBe
  }
}

/** Channel Guest Star Session End Be vbeta: When a running Guest Star session has ended. */
type ChannelGuestStarSessionEndBe = EventConfig<{
  Type: "channel.guest_star_session.end@be"
  Version: "beta"
  /** The conditions to listen for when a running Guest Star session has ended. */
  Condition: {
    /** The broadcaster user ID of the channel hosting the Guest Star Session */
    broadcaster_user_id: string
    /** The user ID of the moderator or broadcaster of the specified channel. */
    moderator_user_id: string
  }
  /** The event fired when a running Guest Star session has ended. */
  Event: {
    /** The non-host broadcaster user ID. */
    broadcaster_user_id: string
    /** The non-host broadcaster display name. */
    broadcaster_user_name: string
    /** The non-host broadcaster login. */
    broadcaster_user_login: string
    /** ID representing the unique session that was started. */
    session_id: string
    /** RFC3339 timestamp indicating the time the session began. */
    started_at: string
    /** RFC3339 timestamp indicating the time the session ended. */
    ended_at: string
    /** User ID of the host channel. */
    host_user_id: string
    /** The host display name. */
    host_user_name: string
    /** The host login. */
    host_user_login: string
  }
}>

registerEvent("channel.guest_star_session.end@be", {
  scopes: [
    "channel:manage:guest",
    "channel:read:guest",
    "moderator:manage:guest",
    "moderator:read:guest",
  ],
  subscriber: (userId) => ({
    type: "channel.guest_star_session.end@be",
    version: "beta",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
