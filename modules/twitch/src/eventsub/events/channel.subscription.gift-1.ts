import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.subscription.gift": ChannelSubscriptionGift
  }
}

/** Channel Subscription Gift v1: When a viewer gives a gift subscription to one or more users in the specified channel. */
type ChannelSubscriptionGift = EventConfig<{
  Type: "channel.subscription.gift"
  Version: "1"
  /** The conditions to listen for when a viewer gives a gift subscription to one or more users in the specified channel. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get subscription gift notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when a viewer gives a gift subscription to one or more users in the specified channel. */
  Event: {
    /** The user ID of the user who sent the subscription gift. Set to null if it was an anonymous subscription gift. */
    user_id: string
    /** The user login of the user who sent the gift. Set to null if it was an anonymous subscription gift. */
    user_login: string
    /** The user display name of the user who sent the gift. Set to null if it was an anonymous subscription gift. */
    user_name: string
    /** The broadcaster user ID. */
    broadcaster_user_id: string
    /** The broadcaster login. */
    broadcaster_user_login: string
    /** The broadcaster display name. */
    broadcaster_user_name: string
    /** The number of subscriptions in the subscription gift. */
    total: number
    /** The tier of subscriptions in the subscription gift. */
    tier: string
    /** The number of subscriptions gifted by this user in the channel. This value is null for anonymous gifts or if the gifter has opted out of sharing this information. */
    cumulative_total: number
    /** Whether the subscription gift was anonymous. */
    is_anonymous: boolean
  }
}>

registerEvent("channel.subscription.gift", {
  scopes: ["channel:read:subscriptions"],
  subscriber: (userId) => ({
    type: "channel.subscription.gift",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
