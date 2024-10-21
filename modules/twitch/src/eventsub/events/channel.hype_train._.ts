export interface HypeTrainTopContribution {
  /** The ID of the user that made the contribution. */
  user_id: string
  /** The user’s login name. */
  user_login: string
  /** The user’s display name. */
  user_name: string
  /** The contribution method used. Possible values are:\n  bits — Cheering with Bits.\n  subscription — Subscription activity like subscribing or gifting subscriptions.\n  other — Covers other contribution methods not listed. */
  type: string
  /** Integer. 	The total amount contributed. If type is bits, total represents the amount of Bits used. If type is subscription, total is 500, 1000, or 2500 to represent tier 1, 2, or 3 subscriptions, respectively. */
  total: number
}
