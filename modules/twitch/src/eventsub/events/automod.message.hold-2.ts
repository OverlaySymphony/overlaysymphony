import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "automod.message.hold": AutomodMessageHold
  }
}

/** Automod Message Hold v2: When The user's message is caught by automod for review.  Only public blocked terms trigger notifications, not private ones. */
type AutomodMessageHold = EventConfig<{
  Type: "automod.message.hold"
  Version: "2"
  /** The conditions to listen for when The user's message is caught by automod for review.  Only public blocked terms trigger notifications, not private ones. */
  Condition: {
    /** User ID of the broadcaster (channel). */
    broadcaster_user_id: string
    /** User ID of the moderator. */
    moderator_user_id: string
  }
  /** The event fired when The user's message is caught by automod for review.  Only public blocked terms trigger notifications, not private ones. */
  Event: {
    /** The ID of the broadcaster specified in the request. */
    broadcaster_user_id: string
    /** The login of the broadcaster specified in the request. */
    broadcaster_user_login: string
    /** The user name of the broadcaster specified in the request. */
    broadcaster_user_name: string
    /** The message sender's user ID. */
    user_id: string
    /** The message sender's login name. */
    user_login: string
    /** The message sender's display name. */
    user_name: string
    /** The ID of the message that was flagged by automod. */
    message_id: string
    /** The body of the message. */
    message: {
      /** The contents of the message caught by automod. */
      text: string
      /** Metadata surrounding the potential inappropriate fragments of the message. */
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
    /** The category of the message. */
    category: string
    /** The level of severity. Measured between 1 to 4. */
    level: number
    /** The timestamp of when automod saved the message. */
    held_at: string
  }
}>

registerEvent("automod.message.hold", {
  scopes: ["moderator:manage:automod"],
  subscriber: (userId) => ({
    type: "automod.message.hold",
    version: "2",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
