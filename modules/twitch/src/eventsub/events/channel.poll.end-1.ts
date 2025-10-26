import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.poll.end": ChannelPollEnd
  }
}

/** Channel Poll End v1: When a poll ended on the specified channel. */
type ChannelPollEnd = EventConfig<{
  Type: "channel.poll.end"
  Version: "1"
  /** The conditions to listen for when a poll ended on the specified channel. */
  Condition: {
    /** The broadcaster user ID of the channel for which "poll end" notifications will be received. */
    broadcaster_user_id: string
  }
  /** The event fired when a poll ended on the specified channel. */
  Event: {
    /** ID of the poll. */
    id: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** Question displayed for the poll. */
    title: string
    /** An array of choices for the poll. Includes vote counts. */
    choices: Array<{
      /** ID for the choice. */
      id: string
      /** Text displayed for the choice. */
      title: string
      /** Not used; will be set to 0. */
      bits_votes: number
      /** Number of votes received via Channel Points. */
      channel_points_votes: number
      /** Total number of votes received for the choice across all methods of voting. */
      votes: number
    }>
    /** Not supported. */
    bits_voting: {
      /** Not used; will be set to false. */
      is_enabled: boolean
      /** Not used; will be set to 0. */
      amount_per_vote: number
    }
    /** The Channel Points voting settings for the poll. */
    channel_points_voting: {
      /** Indicates if Channel Points can be used for voting. */
      is_enabled: boolean
      /** Number of Channel Points required to vote once with Channel Points. */
      amount_per_vote: number
    }
    /** The status of the poll. Valid values are completed, archived, and terminated. */
    status: string
    /** The time the poll started. */
    started_at: string
    /** The time the poll ended. */
    ended_at: string
  }
}>

registerEvent("channel.poll.end", {
  scopes: ["channel:manage:polls", "channel:read:polls"],
  subscriber: (userId) => ({
    type: "channel.poll.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
