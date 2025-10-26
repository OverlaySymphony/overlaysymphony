import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.guest_star_guest.update@be": ChannelGuestStarGuestUpdateBe
  }
}

/** Channel Guest Star Guest Update Be vbeta: When a guest or a slot is updated in an active Guest Star session. */
type ChannelGuestStarGuestUpdateBe = EventConfig<{
  Type: "channel.guest_star_guest.update@be"
  Version: "beta"
  /** The conditions to listen for when a guest or a slot is updated in an active Guest Star session. */
  Condition: {
    /** The broadcaster user ID of the channel hosting the Guest Star Session */
    broadcaster_user_id: string
    /** The user ID of the moderator or broadcaster of the specified channel. */
    moderator_user_id: string
  }
  /** The event fired when a guest or a slot is updated in an active Guest Star session. */
  Event: {
    /** The non-host broadcaster user ID. */
    broadcaster_user_id: string
    /** The non-host broadcaster display name. */
    broadcaster_user_name: string
    /** The non-host broadcaster login. */
    broadcaster_user_login: string
    /** ID representing the unique session that was started. */
    session_id: string
    /** The user ID of the moderator who updated the guest's state (could be the host). null if the update was performed by the guest. */
    moderator_user_id: string
    /** The moderator display name. null if the update was performed by the guest. */
    moderator_user_name: string
    /** The moderator login. null if the update was performed by the guest. */
    moderator_user_login: string
    /** The user ID of the guest who transitioned states in the session. null if the slot is now empty. */
    guest_user_id: string
    /** The guest display name. null if the slot is now empty. */
    guest_user_name: string
    /** The guest login. null if the slot is now empty. */
    guest_user_login: string
    /** The ID of the slot assignment the guest is assigned to. null if the guest is in the INVITED, REMOVED, READY, or ACCEPTED state. */
    slot_id: string
    /**
     * The current state of the user after the update has taken place. null if the slot is now empty. Can otherwise be one of the following:
     * - invited — The guest has transitioned to the invite queue. This can take place when the guest was previously assigned a slot, but have been removed from the call and are sent back to the invite queue.
     * - accepted — The guest has accepted the invite and is currently in the process of setting up to join the session.
     * - ready — The guest has signaled they are ready and can be assigned a slot.
     * - backstage — The guest has been assigned a slot in the session, but is not currently seen live in the broadcasting software.
     * - live — The guest is now live in the host's broadcasting software.
     * - removed — The guest was removed from the call or queue.
     * - accepted — The guest has accepted the invite to the call.
     */
    state: string
    /** User ID of the host channel. */
    host_user_id: string
    /** The host display name. */
    host_user_name: string
    /** The host login. */
    host_user_login: string
    /** Flag that signals whether the host is allowing the slot's video to be seen by participants within the session. null if the guest is not slotted. */
    host_video_enabled: boolean
    /** Flag that signals whether the host is allowing the slot's audio to be heard by participants within the session. null if the guest is not slotted. */
    host_audio_enabled: boolean
    /** Value between 0-100 that represents the slot's audio level as heard by participants within the session. null if the guest is not slotted. */
    host_volume: number
  }
}>

registerEvent("channel.guest_star_guest.update@be", {
  scopes: [
    "channel:manage:guest",
    "channel:read:guest",
    "moderator:manage:guest",
    "moderator:read:guest",
  ],
  subscriber: (userId) => ({
    type: "channel.guest_star_guest.update@be",
    version: "beta",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
