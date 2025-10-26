import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.hype_train.end": ChannelHypeTrainEnd
  }
}

/** Channel Hype Train End v2: When a Hype Train ends on the specified channel. */
type ChannelHypeTrainEnd = EventConfig<{
  Type: "channel.hype_train.end"
  Version: "2"
  /** The conditions to listen for when a Hype Train ends on the specified channel. */
  Condition: {
    /** The ID of the broadcaster that you want to get Hype Train end notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a Hype Train ends on the specified channel. */
  Event: {
    /** The Hype Train ID. */
    id: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** The final level of the Hype Train. */
    level: number
    /** Total points contributed to the Hype Train. */
    total: number
    /** The contributors with the most points contributed. */
    top_contributions: {
      /** The ID of the user that made the contribution. */
      user_id: string
      /** The user's login name. */
      user_login: string
      /** The user's display name. */
      user_name: string
      /**
       * The contribution method used. Possible values are:
       * - bits - Bits contributions with Cheering, Power-ups, and Extensions.
       * - subscription - Subscription activity like subscribing or gifting subscriptions.
       * - other - Covers other contribution methods not listed.
       */
      type: string
      /** The total amount contributed. If type is bits, total represents the amount of Bits used. If type is subscription, total is 500, 1000, or 2500 to represent tier 1, 2, or 3 subscriptions, respectively. */
      total: number
    }
    /** The time when the Hype Train started. */
    started_at: string
    /** The time when the Hype Train ended. */
    ended_at: string
    /** The time when the Hype Train cooldown ends so that the next Hype Train can start. */
    cooldown_ends_at: string
    /** Indicates if the Hype Train is a Golden Kappa Train. */
    is_golden_kappa_train: boolean
  }
}>

registerEvent("channel.hype_train.end", {
  scopes: ["channel:read:hype"],
  subscriber: (userId) => ({
    type: "channel.hype_train.end",
    version: "2",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
