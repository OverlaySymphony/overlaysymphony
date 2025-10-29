import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.shared_chat.begin": ChannelSharedChatBegin
  }
}

/** Channel Shared Chat Begin v1: When a channel becomes active in an active shared chat session. */
type ChannelSharedChatBegin = EventConfig<{
  Type: "channel.shared_chat.begin"
  Version: "1"
  /** The conditions to listen for when a channel becomes active in an active shared chat session. */
  Condition: {
    /** The User ID of the channel to receive shared chat session begin events for. */
    broadcaster_user_id: string
  }
  /** The event fired when a channel becomes active in an active shared chat session. */
  Event: {
    /** The unique identifier for the shared chat session. */
    session_id: string
    /** The User ID of the channel in the subscription condition which is now active in the shared chat session. */
    broadcaster_user_id: string
    /** The display name of the channel in the subscription condition which is now active in the shared chat session. */
    broadcaster_user_name: string
    /** The user login of the channel in the subscription condition which is now active in the shared chat session. */
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

registerEvent("channel.shared_chat.begin", {
  scopes: [],
  subscriber: (userId) => ({
    type: "channel.shared_chat.begin",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
