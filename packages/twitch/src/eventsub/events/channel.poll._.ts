export interface ChannelPollPointsVoting {
  /** Indicates if channel points can be used for voting. */
  is_enabled: boolean
  /** Integer. Number of channel points required to vote once with channel points. */
  amount_per_vote: number
}

export interface ChannelPollBitsVoting {
  /** Indicates if bits can be used for voting. */
  is_enabled: boolean
  /** Integer. Number of bits required to vote once with bits. */
  amount_per_vote: number
}

export interface ChannelPollChoice {
  /** ID for the choice. */
  id: string
  /** Text displayed for the choice. */
  title: string
  /** Integer. Not used; will be set to 0. */
  bits_votes: number
  /** Integer. Number of votes received via Channel Points. */
  channel_points_votes: number
  /** Integer. Total number of votes received for the choice across all methods of voting. */
  votes: number
}
