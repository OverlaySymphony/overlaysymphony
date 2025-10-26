import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.chat.user_message_update": ChannelChatUserMessageUpdate
  }
}

/** Channel Chat User Message Update v1: When The user's message's automod status is updated. */
type ChannelChatUserMessageUpdate = EventConfig<{
  Type: "channel.chat.user_message_update"
  Version: "1"
  /** The conditions to listen for when The user's message's automod status is updated. */
  Condition: {
    /** User ID of the channel to receive chat message events for. */
    broadcaster_user_id: string
    /** The user ID to read chat as. */
    user_id: string
  }
  /** The event fired when The user's message's automod status is updated. */
  Event: {
    /** The ID of the broadcaster specified in the request. */
    broadcaster_user_id: string
    /** The login of the broadcaster specified in the request. */
    broadcaster_user_login: string
    /** The user name of the broadcaster specified in the request. */
    broadcaster_user_name: string
    /** The User ID of the message sender. */
    user_id: string
    /** The message sender's login. */
    user_login: string
    /** The message sender's user name. */
    user_name: string
    /**
     * The message's status. Possible values are:
     * - approved
     * - denied
     * - invalid
     */
    status: string
    /** The ID of the message that was flagged by automod. */
    message_id: string
    /** The body of the message. */
    message: {
      /** The contents of the message caught by automod. */
      text: string
      /** Ordered list of chat message fragments. */
      fragments: Array<{
        /** Message text in a fragment. */
        text: string
        /** Metadata pertaining to the emote. */
        emote?: {
          /** An ID that uniquely identifies this emote. */
          id: string
          /** An ID that identifies the emote set that the emote belongs to. */
          emote_set_id: string
        }
        /** Metadata pertaining to the cheermote. */
        cheermote?: {
          /** The name portion of the Cheermote string that you use in chat to cheer Bits. The full Cheermote string is the concatenation of {prefix} + {number of Bits}. */
          prefix: string
          /** The amount of Bits cheered. */
          bits: number
          /** The tier level of the cheermote. */
          tier: number
        }
      }>
    }
  }
}>

registerEvent("channel.chat.user_message_update", {
  scopes: ["user:read:chat"],
  subscriber: (userId) => ({
    type: "channel.chat.user_message_update",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }),
})
