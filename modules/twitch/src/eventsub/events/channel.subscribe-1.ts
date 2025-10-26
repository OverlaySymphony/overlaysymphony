import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "channel.subscribe": ChannelSubscribe
  }
}

/** Channel Subscribe v1: When the specified channel receives a subscriber. This does not include resubscribes. */
type ChannelSubscribe = EventConfig<{
  Type: "channel.subscribe"
  Version: "1"
  /** The conditions to listen for when the specified channel receives a subscriber. This does not include resubscribes. */
  Condition: {
    /** The broadcaster user ID for the channel you want to get subscribe notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when the specified channel receives a subscriber. This does not include resubscribes. */
  Event: {
    /** The user ID for the user who subscribed to the specified channel. */
    user_id: string
    /** The user login for the user who subscribed to the specified channel. */
    user_login: string
    /** The user display name for the user who subscribed to the specified channel. */
    user_name: string
    /** The requested broadcaster ID. */
    broadcaster_user_id: string
    /** The requested broadcaster login. */
    broadcaster_user_login: string
    /** The requested broadcaster display name. */
    broadcaster_user_name: string
    /** The tier of the subscription. Valid values are 1000, 2000, and 3000. */
    tier: string
    /** Whether the subscription is a gift. */
    is_gift: boolean
  }
}>

registerEvent("channel.subscribe", {
  scopes: ["channel:read:subscriptions"],
  subscriber: (userId) => ({
    type: "channel.subscribe",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
