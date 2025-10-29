import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.subscription.end": ChannelSubscriptionEnd
  }
}

/** Channel Subscription End v1: When a subscription to the specified channel ends. */
type ChannelSubscriptionEnd = EventConfig<{
  Type: "channel.subscription.end"
  Version: "1"
  /** The conditions to listen for when a subscription to the specified channel ends. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get subscription end notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a subscription to the specified channel ends. */
  Event: {
    /** The user ID for the user whose subscription ended. */
    user_id: string
    /** The user login for the user whose subscription ended. */
    user_login: string
    /** The user display name for the user whose subscription ended. */
    user_name: string
    /** The broadcaster user ID. */
    broadcaster_user_id: string
    /** The broadcaster login. */
    broadcaster_user_login: string
    /** The broadcaster display name. */
    broadcaster_user_name: string
    /** The tier of the subscription that ended. Valid values are 1000, 2000, and 3000. */
    tier: string
    /** Whether the subscription was a gift. */
    is_gift: boolean
  }
}>

registerEvent("channel.subscription.end", {
  scopes: ["channel:read:subscriptions"],
  subscriber: (userId) => ({
    type: "channel.subscription.end",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
