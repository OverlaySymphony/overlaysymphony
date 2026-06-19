import "./events/index.ts"

import createDefer from "@overlaysymphony/core/libs/defer"
import createEvents, { type Events } from "@overlaysymphony/core/libs/events"

import { type Authentication } from "../authentication/index.ts"
import { createSubscription } from "../helix/subscriptions/index.ts"

import { type EventPayload, buildSubscription } from "./events-helpers.ts"
import { type TwitchMessage } from "./messages.ts"

export type TwitchEventSub = Events<EventPayload> & {
  targetUserId: string
}

// TODO: connection instead of authentication
export default async function createEventSub(
  authentication: Authentication,
  targetUserId?: string,
): Promise<TwitchEventSub> {
  const currentUserId = authentication.user.id
  targetUserId ??= currentUserId

  return {
    targetUserId,
    ...(await createEvents<EventPayload, string>(
      async (pubsub) => {
        const socket = new WebSocket("wss://eventsub.wss.twitch.tv/ws")

        const { promise, resolve } = createDefer<string>()
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

        return await promise
      },
      async (pubsub, sessionId, type) => {
        await createSubscription(
          authentication,
          { method: "websocket", session_id: sessionId },
          buildSubscription(type, currentUserId, targetUserId),
        )
      },
      (type) => {
        const subscription = buildSubscription(
          type,
          currentUserId,
          targetUserId,
        )
        return `${type}-${JSON.stringify(subscription)}`
      },
    )),
  }
}
