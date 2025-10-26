import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.shared_chat.end": ChannelSharedChatEnd
  }
}

/** Channel Shared Chat End v1: When a channel leaves a shared chat session or the session ends. */
type ChannelSharedChatEnd = EventConfig<{
  Type: "channel.shared_chat.end"
  Version: "1"
  /** The conditions to listen for when a channel leaves a shared chat session or the session ends. */
  Condition: {
    /** The User ID of the channel to receive shared chat session end events for. */
    broadcaster_user_id: string
  }
  /** The event fired when a channel leaves a shared chat session or the session ends. */
  Event: {
    /** The unique identifier for the shared chat session. */
    session_id: string
    /** The User ID of the channel in the subscription condition which is no longer active in the shared chat session. */
    broadcaster_user_id: string
    /** The display name of the channel in the subscription condition which is no longer active in the shared chat session. */
    broadcaster_user_name: string
    /** The user login of the channel in the subscription condition which is no longer active in the shared chat session. */
    broadcaster_user_login: string
    /** The User ID of the host channel. */
    host_broadcaster_user_id: string
    /** The display name of the host channel. */
    host_broadcaster_user_name: string
    /** The user login of the host channel. */
    host_broadcaster_user_login: string
  }
}>

registerEvent("channel.shared_chat.end", {
  scopes: [],
  subscriber: (userId) => ({
    type: "channel.shared_chat.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
