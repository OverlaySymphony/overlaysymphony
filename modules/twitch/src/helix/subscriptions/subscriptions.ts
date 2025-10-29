import { type Authentication } from "../../authentication/index.ts"
import { type EventConfigs, type EventType } from "../../eventsub/index.ts"

import { helix } from "../helix.ts"

interface SubscriptionWebhookTransport {
  method: "webhook"
  callback: string
  secret: string
}

interface SubscriptionWebsocketTransport {
  method: "websocket"
  session_id: string
}

type SubscriptionTransport =
  | SubscriptionWebhookTransport
  | SubscriptionWebsocketTransport

interface SubscriptionRequest<Type extends EventType> {
  type: EventConfigs[Type]["Type"]
  version: EventConfigs[Type]["Version"]
  condition: EventConfigs[Type]["Condition"]
  transport: SubscriptionTransport
}

type ActiveSubscription<Type extends EventType> =
  EventConfigs[Type]["Subscription"] & {
    id: string
    status:
      | "enabled"
      | "webhook_callback_verification_pending"
      | "webhook_callback_verification_failed"
      | "notification_failures_exceeded"
      | "authorization_revoked"
      | "moderator_removed"
      | "user_removed"
      | "version_removed"
      | "websocket_disconnected"
      | "websocket_failed_ping_pong"
      | "websocket_received_inbound_traffic"
      | "websocket_connection_unused"
      | "websocket_internal_error"
      | "websocket_network_timeout"
      | "websocket_network_error"
    cost: number
    created_at: Date
    transport: SubscriptionTransport
  }

export async function createSubscription<Type extends EventType>(
  authentication: Authentication,
  transport: SubscriptionTransport,
  subscription: EventConfigs[Type]["Subscription"],
): Promise<ActiveSubscription<Type>> {
  const [activeSubscription] = await helix<
    ActiveSubscription<EventType>,
    never,
    never,
    SubscriptionRequest<EventType>
  >(authentication, {
    method: "POST",
    path: "/eventsub/subscriptions",
    body: {
      ...subscription,
      transport,
    },
  })

  return activeSubscription
}

export async function getSubscriptions(
  authentication: Authentication,
): Promise<Array<ActiveSubscription<EventType>>> {
  const subscriptions = await helix<
    ActiveSubscription<EventType>,
    never,
    {
      status?: ActiveSubscription<EventType>["status"]
      type?: EventType
      user_id?: string
      after?: string
    }
  >(authentication, {
    method: "GET",
    path: "/eventsub/subscriptions",
  })

  return subscriptions
}

export async function deleteSubscription(
  authentication: Authentication,
  id: string,
): Promise<void> {
  await helix<never, never, { id: string }>(authentication, {
    method: "DELETE",
    path: "/eventsub/subscriptions",
    params: {
      id,
    },
  })
}
