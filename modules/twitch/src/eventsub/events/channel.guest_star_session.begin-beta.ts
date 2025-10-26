import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.guest_star_session.begin@be": ChannelGuestStarSessionBeginBe
  }
}

/** Channel Guest Star Session Begin Be vbeta: When the host began a new Guest Star session. */
type ChannelGuestStarSessionBeginBe = EventConfig<{
  Type: "channel.guest_star_session.begin@be"
  Version: "beta"
  /** The conditions to listen for when the host began a new Guest Star session. */
  Condition: {
    /** The broadcaster user ID of the channel hosting the Guest Star Session */
    broadcaster_user_id: string
    /** The user ID of the moderator or broadcaster of the specified channel. */
    moderator_user_id: string
  }
  /** The event fired when the host began a new Guest Star session. */
  Event: {
    /** The broadcaster user ID. */
    broadcaster_user_id: string
    /** The broadcaster display name. */
    broadcaster_user_name: string
    /** The broadcaster login. */
    broadcaster_user_login: string
    /** ID representing the unique session that was started. */
    session_id: string
    /** RFC3339 timestamp indicating the time the session began. */
    started_at: string
  }
}>

registerEvent("channel.guest_star_session.begin@be", {
  scopes: [
    "channel:manage:guest",
    "channel:read:guest",
    "moderator:manage:guest",
    "moderator:read:guest",
  ],
  subscriber: (userId) => ({
    type: "channel.guest_star_session.begin@be",
    version: "beta",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
