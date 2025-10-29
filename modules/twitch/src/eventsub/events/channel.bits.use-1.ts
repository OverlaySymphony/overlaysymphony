import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.bits.use": ChannelBitsUse
  }
}

/** Channel Bits Use v1: When Bits are used on a channel. */
type ChannelBitsUse = EventConfig<{
  Type: "channel.bits.use"
  Version: "1"
  /** The conditions to listen for when Bits are used on a channel. */
  Condition: {
    /** The user ID of the channel broadcaster. Maximum: 1. */
    broadcaster_user_id: string
  }
  /** The event fired when Bits are used on a channel. */
  Event: {
    /** The User ID of the channel where the Bits were redeemed. */
    broadcaster_user_id: string
    /** The login of the channel where the Bits were used. */
    broadcaster_user_login: string
    /** The display name of the channel where the Bits were used. */
    broadcaster_user_name: string
    /** The User ID of the redeeming user. */
    user_id: string
    /** The login name of the redeeming user. */
    user_login: string
    /** The display name of the redeeming user. */
    user_name: string
    /** The number of Bits used. */
    bits: number
    /**
     * Possible values are:
     * - cheer
     * - power_up
     */
    type: string
    /** An object that contains the user message and emote information needed to recreate the message. */
    message?: {
      /** The chat message in plain text. */
      text: string
      /** The ordered list of chat message fragments. */
      fragments: Array<{
        /** The message text in fragment. */
        text: string
        /**
         * The type of message fragment. Possible values are:
         * - text
         * - cheermote
         * - emote
         */
        type: string
        /** The metadata pertaining to the emote. */
        emote?: {
          /** The ID that uniquely identifies this emote. */
          id: string
          /** The ID that identifies the emote set that the emote belongs to. */
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
        /** The metadata pertaining to the cheermote. */
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
    /** Data about Power-up. */
    power_up?: {
      /**
       * Possible values:
       * - message_effect
       * - celebration
       * - gigantify_an_emote
       */
      type: string
      /** Emote associated with the reward. */
      emote?: {
        /** The ID that uniquely identifies this emote. */
        id: string
        /** The human readable emote token. */
        name: string
      }
      /** The ID of the message effect. */
      message_effect_id?: string
    }
  }
}>

registerEvent("channel.bits.use", {
  scopes: ["bits:read"],
  subscriber: (userId) => ({
    type: "channel.bits.use",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
