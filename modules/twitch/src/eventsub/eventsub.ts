import "./events/index.js"

import createDefer from "@overlaysymphony/core/libs/defer"
import createPubSub from "@overlaysymphony/core/libs/pubsub"

import { type Authentication } from "../authentication/index.js"
import { createSubscription } from "../helix/subscriptions/index.js"

import {
  type EventType,
  type EventConfigs,
  buildSubscription,
} from "./events-helpers.js"
import { type TwitchMessage } from "./messages.js"

type EventSubSubscriber = <Type extends EventType>(
  types: Type[],
  callback: (event: EventConfigs[Type]["Payload"]) => void,
) => () => void

export type TwitchEventSub = {
  subscribe: EventSubSubscriber
}

export async function createEventSub(
  authentication: Authentication,
): Promise<TwitchEventSub> {
  const { promise, resolve } = createDefer<string>()

  const pubsub = createPubSub<EventConfigs[EventType]["Payload"]>()
  const socket = new WebSocket("wss://eventsub.wss.twitch.tv/ws")

  socket.addEventListener("message", ({ data: rawData }) => {
    const data = JSON.parse(rawData as string) as TwitchMessage
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
    const subscriptions: Partial<Record<EventType, boolean>> = {}

    const subscribe: EventSubSubscriber = (types, callback) => {
      for (const type of types) {
        if (!subscriptions[type]) {
          subscriptions[type] = true

          void createSubscription(
            authentication,
            { method: "websocket", session_id: sessionId },
            buildSubscription(type, authentication.user.id),
          )
        }
      }

      return pubsub.subscribe((event) => {
        // @ts-expect-error: generic events are complicated
        if (types.includes(event.type)) {
          callback(event)
        }
      })
    }

    return {
      subscribe,
    }
  })
}
