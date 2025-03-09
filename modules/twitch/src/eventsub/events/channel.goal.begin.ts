import { type BaseSubscription } from "../events-helpers.js"

type GoalBeginType = "channel.goal.begin"
type GoalBeginVersion = "1"

/** The parameters under which an event fires when The broadcaster begins a goal. */
export interface GoalBeginCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when The broadcaster begins a goal. */
export interface GoalBeginEvent {
  /** The ID of the goal. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
  /** The user name of the broadcaster. */
  broadcaster_user_name: string
  /** The user login of the broadcaster. */
  broadcaster_user_login: string
  /** The type of goal. Possible values are:\nfollow — The goal is to increase followers.\nsubscription — The goal is to increase subscriptions. This type shows the net increase or decrease in tier points associated with the subscriptions.\nsubscription_count — The goal is to increase subscriptions. This type shows the net increase or decrease in the number of subscriptions.\nnew_subscription — The goal is to increase subscriptions. This type shows only the net increase in tier points associated with the subscriptions (it does not account for users that unsubscribed since the goal started).\nnew_subscription_count — The goal is to increase subscriptions. This type shows only the net increase in the number of subscriptions (it does not account for users that unsubscribed since the goal started). */
  type: string
  /** A description of the goal, if specified. The description may contain a maximum of 40 characters. */
  description: string
  /** Integer. The goal's current value.\n\nThe goal's type determines how this value is increased or decreased.\nIf type is follow, this field is set to the broadcaster's current number of followers. This number increases with new followers and decreases when users unfollow the broadcaster.\nIf type is subscription, this field is increased and decreased by the points value associated with the subscription tier. For example, if a tier-two subscription is worth 2 points, this field is increased or decreased by 2, not 1.\nIf type is subscription_count, this field is increased by 1 for each new subscription and decreased by 1 for each user that unsubscribes.\nIf type is new_subscription, this field is increased by the points value associated with the subscription tier. For example, if a tier-two subscription is worth 2 points, this field is increased by 2, not 1.\nIf type is new_subscription_count, this field is increased by 1 for each new subscription. */
  current_amount: number
  /** Integer. The goal's target value. For example, if the broadcaster has 200 followers before creating the goal, and their goal is to double that number, this field is set to 400. */
  target_amount: number
  /** The time the broadcaster created the goal. */
  started_at: Date
}

/** The event notification received when The broadcaster begins a goal. */
export type GoalBeginSubscription = BaseSubscription<
  GoalBeginType,
  GoalBeginVersion,
  GoalBeginCondition
>

export function makeGoalBeginSubscription(
  userId: string,
): GoalBeginSubscription {
  return {
    type: "channel.goal.begin",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
