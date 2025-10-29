import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.prediction.lock": ChannelPredictionLock
  }
}

/** Channel Prediction Lock v1: When a Prediction was locked on the specified channel. */
type ChannelPredictionLock = EventConfig<{
  Type: "channel.prediction.lock"
  Version: "1"
  /** The conditions to listen for when a Prediction was locked on the specified channel. */
  Condition: {
    /** The broadcaster user ID of the channel for which "prediction lock" notifications will be received. */
    broadcaster_user_id: string
  }
  /** The event fired when a Prediction was locked on the specified channel. */
  Event: {
    /** Channel Points Prediction ID. */
    id: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** Title for the Channel Points Prediction. */
    title: string
    /** An array of outcomes for the Channel Points Prediction. Includes top_predictors. */
    outcomes: Array<{
      /** The outcome ID. */
      id: string
      /** The outcome title. */
      title: string
      /** The color for the outcome. Valid values are pink and blue. */
      color: string
      /** The number of users who used Channel Points on this outcome. */
      users: number
      /** The total number of Channel Points used on this outcome. */
      channel_points: number
      /** An array of users who used the most Channel Points on this outcome. */
      top_predictors: {
        /** The ID of the user. */
        user_id: string
        /** The login of the user. */
        user_login: string
        /** The display name of the user. */
        user_name: string
        /** The number of Channel Points won. This value is always null in the event payload for Prediction progress and Prediction lock. This value is 0 if the outcome did not win or if the Prediction was canceled and Channel Points were refunded. */
        channel_points_won: number
        /** The number of Channel Points used to participate in the Prediction. */
        channel_points_used: number
      }
    }>
    /** The time the Channel Points Prediction started. */
    started_at: string
    /** The time the Channel Points Prediction was locked. */
    locked_at: string
  }
}>

registerEvent("channel.prediction.lock", {
  scopes: ["channel:manage:predictions", "channel:read:predictions"],
  subscriber: (userId) => ({
    type: "channel.prediction.lock",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
