export interface ChannelPredictionOutcome {
  /** The outcome ID. */
  id: string
  /** The outcome title. */
  title: string
  /** The color for the outcome. Valid values are pink and blue. */
  color: string
  /** Integer. The number of users who used Channel Points on this outcome. */
  users: number
  /** Integer. The total number of Channel Points used on this outcome. */
  channel_points: number
  /** An array of users who used the most Channel Points on this outcome. */
  top_predictors: Array<{
    /** The ID of the user. */
    user_id: string
    /** The login of the user. */
    user_login: string
    /** The display name of the user. */
    user_name: string
    /** Integer. The number of Channel Points won. This value is always null in the event payload for Prediction progress and Prediction lock. This value is 0 if the outcome did not win or if the Prediction was canceled and Channel Points were refunded. */
    channel_points_won: number
    /** Integer. The number of Channel Points used to participate in the Prediction. */
    channel_points_used: number
  }>
}
