import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.chat.message": ChannelChatMessage
  }
}

/** Channel Chat Message v1: When a user sends a message to a specific chat room. */
type ChannelChatMessage = EventConfig<{
  Type: "channel.chat.message"
  Version: "1"
  /** The conditions to listen for when a user sends a message to a specific chat room. */
  Condition: {
    /** The User ID of the channel to receive chat message events for. */
    broadcaster_user_id: string
    /** The User ID to read chat as. */
    user_id: string
  }
  /** The event fired when a user sends a message to a specific chat room. */
  Event: {
    /** The broadcaster user ID. */
    broadcaster_user_id: string
    /** The broadcaster display name. */
    broadcaster_user_name: string
    /** The broadcaster login. */
    broadcaster_user_login: string
    /** The user ID of the user that sent the message. */
    chatter_user_id: string
    /** The user name of the user that sent the message. */
    chatter_user_name: string
    /** The user login of the user that sent the message. */
    chatter_user_login: string
    /** A UUID that identifies the message. */
    message_id: string
    /** The structured chat message. */
    message: {
      /** The chat message in plain text. */
      text: string
      /** Ordered list of chat message fragments. */
      fragments: Array<{
        /**
         * The type of message fragment. Possible values:
         * - text
         * - cheermote
         * - emote
         * - mention
         */
        type: string
        /** Message text in fragment. */
        text: string
        /** Metadata pertaining to the cheermote. */
        cheermote?: {
          /** The name portion of the Cheermote string that you use in chat to cheer Bits. The full Cheermote string is the concatenation of {prefix} + {number of Bits}. */
          prefix: string
          /** The amount of Bits cheered. */
          bits: number
          /** The tier level of the cheermote. */
          tier: number
        }
        /** Metadata pertaining to the emote. */
        emote?: {
          /** An ID that uniquely identifies this emote. */
          id: string
          /** An ID that identifies the emote set that the emote belongs to. */
          emote_set_id: string
          /** The ID of the broadcaster who owns the emote. */
          owner_id: string
          /**
           * The formats that the emote is available in.
           * - animated - An animated GIF is available for this emote.
           * - static - A static PNG file is available for this emote.
           */
          format: string[]
        }
        /** Metadata pertaining to the mention. */
        mention?: {
          /** The user ID of the mentioned user. */
          user_id: string
          /** The user name of the mentioned user. */
          user_name: string
          /** The user login of the mentioned user. */
          user_login: string
        }
      }>
    }
    /** The type of message. Possible values: <ul><li>text</li><li>channel_points_highlighted</li><li>channel_points_sub_only</li><li>user_intro</li><li>power_ups_message_effect</li><li>power_ups_gigantified_emote</li></ul> */
    message_type: string
    /** List of chat badges. */
    badges: Array<{
      /** An ID that identifies this set of chat badges. */
      set_id: string
      /** An ID that identifies this version of the badge. The ID can be any value. */
      id: string
      /** Contains metadata related to the chat badges in the badges tag. Currently, this tag contains metadata only for subscriber badges, to indicate the number of months the user has been a subscriber. */
      info: string
    }>
    /** Metadata if this message is a cheer. */
    cheer?: {
      /** The amount of Bits the user cheered. */
      bits: number
    }
    /** The color of the user's name in the chat room. This is a hexadecimal RGB color code in the form, #&lt;RGB&gt;. This tag may be empty if it is never set. */
    color: string
    /** Metadata if this message is a reply. */
    reply?: {
      /** An ID that uniquely identifies the parent message that this message is replying to. */
      parent_message_id: string
      /** The message body of the parent message. */
      parent_message_body: string
      /** User ID of the sender of the parent message. */
      parent_user_id: string
      /** User name of the sender of the parent message. */
      parent_user_name: string
      /** User login of the sender of the parent message. */
      parent_user_login: string
      /** An ID that identifies the parent message of the reply thread. */
      thread_message_id: string
      /** User ID of the sender of the thread's parent message. */
      thread_user_id: string
      /** User name of the sender of the thread's parent message. */
      thread_user_name: string
      /** User login of the sender of the thread's parent message. */
      thread_user_login: string
    }
    /** The ID of a channel points custom reward that was redeemed. */
    channel_points_custom_reward_id?: string
    /** The broadcaster user ID of the channel the message was sent from. Is null when the message happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
    source_broadcaster_user_id?: string
    /** The user name of the broadcaster of the channel the message was sent from. Is null when the message happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
    source_broadcaster_user_name?: string
    /** The login of the broadcaster of the channel the message was sent from. Is null when the message happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
    source_broadcaster_user_login?: string
    /** The UUID that identifies the source message from the channel the message was sent from. Is null when the message happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
    source_message_id?: string
    /** The list of chat badges for the chatter in the channel the message was sent from. Is null when the message happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
    source_badges?: {
      /** The ID that identifies this set of chat badges. */
      set_id: string
      /** The ID that identifies this version of the badge. The ID can be any value. */
      id: string
      /** Contains metadata related to the chat badges in the badges tag. Currently, this tag contains metadata only for subscriber badges, to indicate the number of months the user has been a subscriber. */
      info: string
    }
    /** Determines if a message delivered during a shared chat session is only sent to the source channel. Has no effect if the message is not sent during a shared chat session. */
    is_source_only?: boolean
  }
}>

registerEvent("channel.chat.message", {
  scopes: ["user:read:chat"],
  subscriber: (userId) => ({
    type: "channel.chat.message",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }),
})
