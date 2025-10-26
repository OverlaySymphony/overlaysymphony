import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.chat.notification": ChannelChatNotification
  }
}

/** Channel Chat Notification v1: When an event that appears in chat has occurred. */
type ChannelChatNotification = EventConfig<{
  Type: "channel.chat.notification"
  Version: "1"
  /** The conditions to listen for when an event that appears in chat has occurred. */
  Condition: {
    /** User ID of the channel to receive chat notification events for. */
    broadcaster_user_id: string
    /** The user ID to read chat as. */
    user_id: string
  }
  /** The event fired when an event that appears in chat has occurred. */
  Event: {
    /** The broadcaster user ID. */
    broadcaster_user_id: string
    /** The broadcaster display name. */
    broadcaster_user_name: string
    /** The broadcaster login. */
    broadcaster_user_login: string
    /** The user ID of the user that sent the message. */
    chatter_user_id: string
    /** The user login of the user that sent the message. */
    chatter_user_name: string
    /** Whether or not the chatter is anonymous. */
    chatter_is_anonymous: boolean
    /** The color of the user's name in the chat room. */
    color: string
    /** The color of the user's name in the chat room. */
    badges: Array<{
      /** An ID that identifies this set of chat badges. */
      set_id: string
      /** An ID that identifies this version of the badge. The ID can be any value. */
      id: string
      /** Contains metadata related to the chat badges in the badges tag. Currently, this tag contains metadata only for subscriber badges, to indicate the number of months the user has been a subscriber. */
      info: string
    }>
    /** The message Twitch shows in the chat room for this notice. */
    system_message: string
    /** A UUID that identifies the message. */
    message_id: string
    /** The structured chat message. */
    message: {
      /** The chat message in plain text. */
      text: object
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
          prefix: object
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
        /**  Metadata pertaining to the mention. */
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
    /**
     * The type of notice. Possible values are:
     * - sub
     * - resub
     * - sub_gift
     * - community_sub_gift
     * - gift_paid_upgrade
     * - prime_paid_upgrade
     * - raid
     * - unraid
     * - pay_it_forward
     * - announcement
     * - bits_badge_tier
     * - charity_donation
     * - shared_chat_sub
     * - shared_chat_resub
     * - shared_chat_sub_gift
     * - shared_chat_community_sub_gift
     * - shared_chat_gift_paid_upgrade
     * - shared_chat_prime_paid_upgrade
     * - shared_chat_raid
     * - shared_chat_pay_it_forward
     * - shared_chat_announcement
     */
    notice_type: string
    /** Information about the sub event. Null if notice_type is not sub. */
    sub: {
      /**
       * The type of subscription plan being used. Possible values are:
       * - 1000 - First level of paid or Prime subscription.
       * - 2000 - Second level of paid subscription.
       * - 3000 - Third level of paid subscription.
       */
      sub_tier: string
      /** Indicates if the subscription was obtained through Amazon Prime. */
      is_prime: boolean
      /** The number of months the subscription is for. */
      duration_months: number
    }
    /** Information about the resub event. Null if notice_type is not resub. */
    resub: {
      /** The total number of months the user has subscribed. */
      cumulative_months: number
      /** The number of months the subscription is for. */
      duration_months: number
      /** The total number of months the user has subscribed. */
      streak_months: number
      /**
       * The type of subscription plan being used. Possible values are:
       * - 1000 - First level of paid or Prime subscription.
       * - 2000 - Second level of paid subscription.
       * - 3000 - Third level of paid subscription.
       */
      sub_tier: string
      /** The number of consecutive months the user has subscribed. */
      is_prime?: boolean
      /** Whether or not the resub was a result of a gift. */
      is_gift: boolean
      /** Whether or not the gift was anonymous. */
      gifter_is_anonymous?: boolean
      /** The user ID of the subscription gifter. Null if anonymous. */
      gifter_user_id: string
      /** The user name of the subscription gifter. Null if anonymous. */
      gifter_user_name: string
      /** The user login of the subscription gifter. Null if anonymous. */
      gifter_user_login?: string
    }
    /** Information about the gift sub event. Null if notice_type is not sub_gift. */
    sub_gift: {
      /** The number of months the subscription is for. */
      duration_months: number
      /** The amount of gifts the gifter has given in this channel. Null if anonymous. */
      cumulative_total?: number
      /** The user ID of the subscription gift recipient. */
      recipient_user_id: string
      /** The user name of the subscription gift recipient. */
      recipient_user_name: string
      /** The user login of the subscription gift recipient. */
      recipient_user_login: string
      /**
       * The type of subscription plan being used. Possible values are:
       * - 1000 - First level of paid or Prime subscription.
       * - 2000 - Second level of paid subscription.
       * - 3000 - Third level of paid subscription.
       */
      sub_tier: string
      /** The ID of the associated community gift. Null if not associated with a community gift. */
      community_gift_id?: string
    }
    /** Information about the community gift sub event. Null if notice_type is not community_sub_gift. */
    community_sub_gift: {
      /** The ID of the associated community gift. */
      id: string
      /** Number of subscriptions being gifted. */
      total: number
      /** The type of subscription plan being used. Possible values are: <ul><li>1000 - First level of paid or Prime subscription.</li><li>2000 - Second level of paid subscription.</li><li>3000 - Third level of paid subscription.</li></ul> */
      sub_tier: string
      /** The amount of gifts the gifter has given in this channel. Null if anonymous. */
      cumulative_total?: number
    }
    /** Information about the community gift paid upgrade event. Null if notice_type is not gift_paid_upgrade. */
    gift_paid_upgrade: {
      /** Whether the gift was given anonymously. */
      gifter_is_anonymous: boolean
      /** The user ID of the user who gifted the subscription. Null if anonymous. */
      gifter_user_id?: string
      /** The user name of the user who gifted the subscription. Null if anonymous. */
      gifter_user_name?: string
    }
    /** Information about the Prime gift paid upgrade event. Null if notice_type is not prime_paid_upgrade */
    prime_paid_upgrade: {
      /**
       * The type of subscription plan being used. Possible values are:
       * - 1000 - First level of paid or Prime subscription.
       * - 2000 - Second level of paid subscription.
       * - 3000 - Third level of paid subscription.
       */
      sub_tier: string
    }
    /** Information about the pay it forward event. Null if notice_type is not pay_it_forward */
    pay_it_forward: {
      /** Whether the gift was given anonymously. */
      gifter_is_anonymous: boolean
      /** The user ID of the user who gifted the subscription. Null if anonymous. */
      gifter_user_id: string
      /** The user name of the user who gifted the subscription. Null if anonymous. */
      gifter_user_name?: string
      /** The user login of the user who gifted the subscription. Null if anonymous. */
      gifter_user_login: string
    }
    /** Information about the raid event. Null if notice_type is not raid */
    raid: {
      /** The user ID of the broadcaster raiding this channel. */
      user_id: string
      /** The user name of the broadcaster raiding this channel. */
      user_name: string
      /** The login name of the broadcaster raiding this channel. */
      user_login: string
      /** The number of viewers raiding this channel from the broadcaster's channel. */
      viewer_count: number
      /** Profile image URL of the broadcaster raiding this channel. */
      profile_image_url: string
    }
    /** Returns an empty payload if notice_type is not unraid, otherwise returns null. */
    unraid: object
    /** Information about the announcement event. Null if notice_type is not {::nomarkdown} announcement */
    announcement: {
      /** Color of the announcement. */
      color: string
    }
    /** Information about the Bits badge tier event. Null if notice_type is not bits_badge_tier */
    bits_badge_tier: {
      /** The tier of the Bits badge the user just earned. */
      tier: number
    }
    /** Information about the announcement event. Null if notice_type is not charity_donation */
    charity_donation: {
      /** Name of the charity. */
      charity_name: string
      /** An object that contains the amount of money that the user paid. */
      amount: {
        /** The monetary amount. The amount is specified in the currency's minor unit. */
        value: number
        /** The number of decimal places used by the currency. */
        decimal_place: number
        /** The ISO-4217 three-letter currency code that identifies the type of currency in value. */
        currency: string
      }
    }
    /** The broadcaster user ID of the channel the message was sent from. Is null when the message notification happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
    source_broadcaster_user_id?: string
    /** The user name of the broadcaster of the channel the message was sent from. Is null when the message notification happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
    source_broadcaster_user_name?: string
    /** The login of the broadcaster of the channel the message was sent from. Is null when the message notification happens in the same channel as the broadcaster. Is not null when in a shared chat session, and the action happens in the channel of a participant other than the broadcaster. */
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
    /** Information about the shared_chat_sub event. Is null if notice_type is not shared_chat_sub . This field has the same information as the sub field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_sub?: object
    /** Information about the shared_chat_resub event. Is null if notice_type is not shared_chat_resub . This field has the same information as the resub field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_resub?: object
    /** Information about the shared_chat_sub_gift event. Is null if notice_type is not shared_chat_sub_gift . This field has the same information as the chat_sub_gift field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_sub_gift?: object
    /** Information about the shared_chat_community_sub_gift event. Is null if notice_type is not shared_chat_community_sub_gift . This field has the same information as the community_sub_gift field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_community_sub_gift?: object
    /** Information about the shared_chat_gift_paid_upgrade event. Is null if notice_type is not shared_chat_gift_paid_upgrade . This field has the same information as the gift_paid_upgrade field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_gift_paid_upgrade?: object
    /** Information about the shared_chat_chat_prime_paid_upgrade event. Is null if notice_type is not shared_chat_prime_paid_upgrade . This field has the same information as the prime_paid_upgrade field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_prime_paid_upgrade?: object
    /** Information about the shared_chat_pay_it_forward event. Is null if notice_type is not shared_chat_pay_it_forward . This field has the same information as the pay_it_forward field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_pay_it_forward?: object
    /** Information about the shared_chat_raid event. Is null if notice_type is not shared_chat_raid . This field has the same information as the raid field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_raid?: object
    /** Information about the shared_chat_announcement event. Is null if notice_type is not shared_chat_announcement . This field has the same information as the announcement field but for a notice that happened for a channel in a shared chat session other than the broadcaster in the subscription condition. */
    shared_chat_announcement?: object
  }
}>

registerEvent("channel.chat.notification", {
  scopes: ["user:read:chat"],
  subscriber: (userId) => ({
    type: "channel.chat.notification",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      user_id: userId,
    },
  }),
})
