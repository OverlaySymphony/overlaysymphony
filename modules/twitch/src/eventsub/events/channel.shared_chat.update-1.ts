import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.shared_chat.update": ChannelSharedChatUpdate
  }
}

/** Channel Shared Chat Update v1: When the active shared chat session the channel is in changes. */
type ChannelSharedChatUpdate = EventConfig<{
  Type: "channel.shared_chat.update"
  Version: "1"
  /** The conditions to listen for when the active shared chat session the channel is in changes. */
  Condition: {
    /** The User ID of the channel to receive shared chat session update events for. */
    broadcaster_user_id: string
  }
  /** The event fired when the active shared chat session the channel is in changes. */
  Event: {
    /** The unique identifier for the shared chat session. */
    session_id: string
    /** The User ID of the channel in the subscription condition. */
    broadcaster_user_id: string
    /** The display name of the channel in the subscription condition. */
    broadcaster_user_name: string
    /** The user login of the channel in the subscription condition. */
    broadcaster_user_login: string
    /** The User ID of the host channel. */
    host_broadcaster_user_id: string
    /** The display name of the host channel. */
    host_broadcaster_user_name: string
    /** The user login of the host channel. */
    host_broadcaster_user_login: string
    /** The list of participants in the session. */
    participants: {
      /** The User ID of the participant channel. */
      broadcaster_user_id: string
      /** The display name of the participant channel. */
      broadcaster_user_name: string
      /** The user login of the participant channel. */
      broadcaster_user_login: string
    }
  }
}>

registerEvent("channel.shared_chat.update", {
  scopes: [],
  subscriber: (userId) => ({
    type: "channel.shared_chat.update",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
