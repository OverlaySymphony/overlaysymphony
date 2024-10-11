import createDefer from "@overlaysymphony/core/libs/defer"
import createPubSub from "@overlaysymphony/core/libs/pubsub"

import { Authentication } from "../authentication"
import { createSubscription } from "../helix/subscriptions"

import { TwitchNotificationMessage, TwitchSubscriptionType } from "./events"
import { TwitchMessage } from "./messages"

type EventSubListener = (
  callback: (event: TwitchNotificationMessage["payload"]) => void,
) => () => void

type EventSubSubscriber = <
  EventType extends TwitchSubscriptionType,
  Event extends TwitchNotificationMessage<EventType>["payload"],
>(
  types: EventType[],
  callback: (event: Event) => void,
) => () => void

export interface TwitchEventSub {
  listen: EventSubListener
  subscribe: EventSubSubscriber
}

export async function createEventSub(
  authentication: Authentication,
): Promise<TwitchEventSub> {
  const { promise, resolve } = createDefer<string>()

  const pubsub = createPubSub<TwitchNotificationMessage["payload"]>()
  const socket = new WebSocket("wss://eventsub.wss.twitch.tv/ws")

  socket.addEventListener("message", async ({ data: rawData }) => {
    const data = JSON.parse(rawData) as TwitchMessage
    data.type = data.metadata.message_type

    if (data.type === "session_welcome") {
      resolve(data.payload.session.id)
      return
    }

    if (data.type === "notification") {
      data.payload.id = data.metadata.message_id
      data.payload.type = data.payload.subscription.type

      pubsub.dispatch(data.payload)
      return
    }
  })

  return promise.then((sessionId) => {
    const subscriptions: Partial<Record<TwitchSubscriptionType, boolean>> = {}

    const listen: EventSubListener = (callback) => {
      return pubsub.subscribe((event) => {
        // @ts-ignore
        callback(event)
      })
    }

    const subscribe: EventSubSubscriber = (types, callback) => {
      for (const type of types) {
        if (!subscriptions[type]) {
          subscriptions[type] = true
          createSubscription(sessionId, authentication, type)
        }
      }

      return pubsub.subscribe((event) => {
        // @ts-ignore
        if (types.includes(event.type)) {
          // @ts-ignore
          callback(event)
        }
      })
    }

    return {
      listen,
      subscribe,
    }
  })
}
