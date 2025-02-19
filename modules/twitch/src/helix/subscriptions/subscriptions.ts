import { Authentication } from "../../authentication/index.js"
import {
  TwitchSubscription,
  TwitchSubscriptionType,
  buildSubscription,
} from "../../eventsub/events/index.js"
import { BaseSubscription } from "../../eventsub/events-helpers.js"
import { helix } from "../helix.js"

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

export interface SubscriptionRequest<Subscription extends BaseSubscription> {
  type: Subscription["type"]
  version: Subscription["version"]
  condition: Subscription["condition"]
  transport: SubscriptionTransport
}

export type ActiveSubscription<Subscription extends BaseSubscription> =
  Subscription & {
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

export async function createSubscription<
  Type extends TwitchSubscriptionType,
  Subscription extends TwitchSubscription<Type>,
>(
  sessionId: string,
  authentication: Authentication,
  type: Type,
): Promise<ActiveSubscription<Subscription>> {
  const subscription = buildSubscription(type, authentication.user.id)

  const [activeSubscription] = await helix(authentication, {
    method: "post",
    path: "/eventsub/subscriptions",
    body: {
      ...subscription,
      transport: {
        method: "websocket" as const,
        session_id: sessionId,
      },
    },
  })

  return activeSubscription
}

export async function deleteSubscription(
  authentication: Authentication,
  id: string,
): Promise<void> {
  await helix<never, never, { id: string }>(authentication, {
    method: "delete",
    path: "/eventsub/subscriptions",
    params: {
      id,
    },
  })
}

export async function getSubscriptions(
  authentication: Authentication,
): Promise<Array<ActiveSubscription<TwitchSubscription>>> {
  const subscriptions = await helix<
    ActiveSubscription<TwitchSubscription>,
    never,
    {
      status?: ActiveSubscription<TwitchSubscription>["status"]
      type?: TwitchSubscriptionType
      user_id?: string
      after?: string
    }
  >(authentication, {
    method: "get",
    path: "/eventsub/subscriptions",
  })

  return subscriptions
}
