import { BaseSubscription } from "../events-helpers.js"

type ChannelGuestStarGuestUpdateType = "channel.guest_star_guest.update"
type ChannelGuestStarGuestUpdateVersion = "beta"

/** The parameters under which an event fires when A guest or a slot is updated in an active Guest Star session. */
export interface ChannelGuestStarGuestUpdateCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user ID of the moderator or broadcaster. */
  moderator_user_id: string
}

/** The event information when A guest or a slot is updated in an active Guest Star session. */
export interface ChannelGuestStarGuestUpdateEvent {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** ID representing the unique session that was started. */
  session_id: string
  /** The user ID of the moderator who updated the guest's state. null if the update was performed by the guest. */
  moderator_user_id: string
  /** The user login of the moderator. null if the update was performed by the guest. */
  moderator_user_login: string
  /** The user name of the moderator. null if the update was performed by the guest. */
  moderator_user_name: string
  /** The user ID of the guest who transitioned states in the session. null if the slot is now empty. */
  guest_user_id: string
  /** The guest user login. null if the slot is now empty. */
  guest_user_login: string
  /** The guest user name. null if the slot is now empty. */
  guest_user_name: string
  /** The ID of the slot assignment the guest is assigned to. null if the guest is in the INVITED, REMOVED, READY, or ACCEPTED state. */
  slot_id: string
  /** The current state of the user after the update has taken place. null if the slot is now empty. Can otherwise be one of the following:\n  - invited — The guest has transitioned to the invite queue. This can take place when the guest was previously assigned a slot, but have been removed from the call and are sent back to the invite queue.\n  - accepted — The guest has accepted the invite and is currently in the process of setting up to join the session.\n  - ready — The guest has signaled they are ready and can be assigned a slot.\n  - backstage — The guest has been assigned a slot in the session, but is not currently seen live in the broadcasting software.\n  - live — The guest is now live in the host's broadcasting software.\n  - removed — The guest was removed from the call or queue.\n  - accepted — The guest has accepted the invite to the call. */
  state: string
  /** Flag that signals whether the host is allowing the slot's video to be seen by participants within the session. null if the guest is not slotted. */
  host_video_enabled: boolean
  /** Flag that signals whether the host is allowing the slot's audio to be heard by participants within the session. null if the guest is not slotted. */
  host_audio_enabled: boolean
  /** Integer. Value between 0-100 that represents the slot's audio level as heard by participants within the session. null if the guest is not slotted. */
  host_volume: number
}

/** The event notification received when A guest or a slot is updated in an active Guest Star session. */
export type ChannelGuestStarGuestUpdateSubscription = BaseSubscription<
  ChannelGuestStarGuestUpdateType,
  ChannelGuestStarGuestUpdateVersion,
  ChannelGuestStarGuestUpdateCondition
>

export function makeChannelGuestStarGuestUpdateSubscription(
  userId: string,
): ChannelGuestStarGuestUpdateSubscription {
  return {
    type: "channel.guest_star_guest.update",
    version: "beta",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }
}
