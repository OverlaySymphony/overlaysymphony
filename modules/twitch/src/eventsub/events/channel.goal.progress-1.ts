import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.goal.progress": ChannelGoalProgress
  }
}

/** Channel Goal Progress v1: When progress (either positive or negative) is made towards the broadcaster's goal. */
type ChannelGoalProgress = EventConfig<{
  Type: "channel.goal.progress"
  Version: "1"
  /** The conditions to listen for when progress (either positive or negative) is made towards the broadcaster's goal. */
  Condition: {
    /** The ID of the broadcaster to get notified about. The ID must match the user_id in the OAuth access token. */
    broadcaster_user_id: string
  }
  /** The event fired when progress (either positive or negative) is made towards the broadcaster's goal. */
  Event: {
    /** An ID that identifies this event. */
    id: string
    /** An ID that uniquely identifies the broadcaster. */
    broadcaster_user_id: string
    /** The broadcaster's display name. */
    broadcaster_user_name: string
    /** The broadcaster's user handle. */
    broadcaster_user_login: string
    /**
     * The type of goal. Possible values are:
     * - follow — The goal is to increase followers.
     * - subscription — The goal is to increase subscriptions. This type shows the net increase or decrease in tier points associated with the subscriptions.
     * - subscription_count — The goal is to increase subscriptions. This type shows the net increase or decrease in the number of subscriptions.
     * - new_subscription — The goal is to increase subscriptions. This type shows only the net increase in tier points associated with the subscriptions (it does not account for users that unsubscribed since the goal started).
     * - new_subscription_count — The goal is to increase subscriptions. This type shows only the net increase in the number of subscriptions (it does not account for users that unsubscribed since the goal started).
     * - new_bit — The goal is to increase the amount of Bits used on the channel.
     * - new_cheerer — The goal is to increase the number of unique Cheerers to Cheer on the channel.
     */
    type: string
    /** A description of the goal, if specified. The description may contain a maximum of 40 characters. */
    description: string
    /**
     * A Boolean value that indicates whether the broadcaster achieved their goal. Is true if the goal was achieved; otherwise, false.
     *
     * Only the channel.goal.end event includes this field.
     */
    is_achieved: boolean
    /**
     * The goal's current value.
     *
     * The goal's type determines how this value is increased or decreased.
     * - If type is follow, this field is set to the broadcaster's current number of followers. This number increases with new followers and decreases when users unfollow the broadcaster.
     * - If type is subscription, this field is increased and decreased by the points value associated with the subscription tier.
     * - If type is subscription_count, this field is increased by 1 for each new subscription and decreased by 1 for each user that unsubscribes.
     * - If type is new_subscription, this field is increased by the points value associated with the subscription tier.
     * - If type is new_subscription_count, this field is increased by 1 for each new subscription.
     */
    current_amount: number
    /** The goal's target value. */
    target_amount: number
    /** The UTC timestamp in RFC 3339 format, which indicates when the broadcaster created the goal. */
    started_at: string
    /**
     * The UTC timestamp in RFC 3339 format, which indicates when the broadcaster ended the goal.
     *
     * Only the channel.goal.end event includes this field.
     */
    ended_at: string
  }
}>

registerEvent("channel.goal.progress", {
  scopes: ["channel:read:goals"],
  subscriber: (userId) => ({
    type: "channel.goal.progress",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
