import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.suspicious_user.message": ChannelSuspiciousUserMessage
  }
}

/** Channel Suspicious User Message v1: When a chat message has been sent by a suspicious user. */
type ChannelSuspiciousUserMessage = EventConfig<{
  Type: "channel.suspicious_user.message"
  Version: "1"
  /** The conditions to listen for when a chat message has been sent by a suspicious user. */
  Condition: {
    /** The ID of a user that has permission to moderate the broadcaster's channel and has granted your app permission to subscribe to this subscription type. */
    moderator_user_id: string
    /** User ID of the channel to receive chat message events for. */
    broadcaster_user_id: string
  }
  /** The event fired when a chat message has been sent by a suspicious user. */
  Event: {
    /** The ID of the channel where the treatment for a suspicious user was updated. */
    broadcaster_user_id: string
    /** The display name of the channel where the treatment for a suspicious user was updated. */
    broadcaster_user_name: string
    /** The login of the channel where the treatment for a suspicious user was updated. */
    broadcaster_user_login: string
    /** The user ID of the user that sent the message. */
    user_id: string
    /** The user name of the user that sent the message. */
    user_name: string
    /** The user login of the user that sent the message. */
    user_login: string
    /** The status set for the suspicious user. Can be the following: "none", "active_monitoring", or "restricted" */
    low_trust_status: string
    /** A list of channel IDs where the suspicious user is also banned. */
    shared_ban_channel_ids: string[]
    /** User types (if any) that apply to the suspicious user, can be "manually_added", "ban_evader", or "banned_in_shared_channel". */
    types: string[]
    /** A ban evasion likelihood value (if any) that as been applied to the user automatically by Twitch, can be "unknown", "possible", or "likely". */
    ban_evasion_evaluation: string
    /** The structured chat message. */
    message: {
      /** The UUID that identifies the message. */
      message_id: string
      /** The chat message in plain text. */
      text: string
      /** Ordered list of chat message fragments. */
      fragments: Array<{
        /** The type of message fragment. Possible values: -text -cheermote -emote */
        type: string
        /** Message text in fragment. */
        text: string
        /** Metadata pertaining to the cheermote. */
        cheermote?: {
          /** The name portion of the Cheermote string that you use in chat to cheer Bits. The full Cheermote string is the concatenation of {prefix} + {number of Bits}. */
          prefix: string
          /** The amount of Bits cheered. */
          bits: string
          /** The tier level of the cheermote. */
          tier: string
        }
        /** Metadata pertaining to the emote. */
        emote?: {
          /** An ID that uniquely identifies this emote. */
          id: string
          /** An ID that identifies the emote set that the emote belongs to. */
          emote_set_id: string
        }
      }>
    }
  }
}>

registerEvent("channel.suspicious_user.message", {
  scopes: ["moderator:read:suspicious"],
  subscriber: (userId) => ({
    type: "channel.suspicious_user.message",
    version: "1",
    condition: {
      moderator_user_id: userId,
      broadcaster_user_id: userId,
    },
  }),
})
