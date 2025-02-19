export interface BaseSubscription<
  Type = unknown,
  Version = unknown,
  Condition = unknown,
> {
  type: Type
  version: Version
  condition: Condition
}

export interface NotificationMessage<
  Subscription extends BaseSubscription,
  Event,
> {
  type: "notification"
  metadata: {
    message_id: string
    message_type: "notification"
    message_timestamp: Date
    subscription_type: Subscription["type"]
    subscription_version: Subscription["version"]
  }
  payload: {
    id: string
    type: Subscription["type"]
    subscription: Subscription
    event: Event
  }
}
