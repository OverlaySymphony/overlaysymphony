import { type EventConfigs, type EventType } from "../../eventsub/index.ts"
import { type Connection } from "../index.ts"

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

export type HelixSubscription<Type extends EventType> =
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

type ActiveSubscriptionResponse<Type extends EventType> = {
  data: Array<HelixSubscription<Type>>
}

export async function createSubscription<Type extends EventType>(
  connection: Connection,
  transport: SubscriptionTransport,
  subscription: EventConfigs[Type]["Subscription"],
): Promise<HelixSubscription<Type>> {
  const {
    data: [activeSubscription],
  } = await connection.helix<
    ActiveSubscriptionResponse<EventType>,
    never,
    SubscriptionRequest<EventType>
  >({
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
  connection: Connection,
): Promise<Array<HelixSubscription<EventType>>> {
  const { data: subscriptions } = await connection.helix<
    ActiveSubscriptionResponse<EventType>,
    never,
    {
      status?: HelixSubscription<EventType>["status"]
      type?: EventType
      user_id?: string
      after?: string
    }
  >({
    method: "GET",
    path: "/eventsub/subscriptions",
  })

  return subscriptions
}

export async function deleteSubscription(
  connection: Connection,
  id: string,
): Promise<void> {
  await connection.helix<never, { id: string }>({
    method: "DELETE",
    path: "/eventsub/subscriptions",
    params: {
      id,
    },
  })
}
