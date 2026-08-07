import createDefer from "@overlaysymphony/core/libs/defer"

import { type Connection } from "../helix/index.ts"
import { createSubscription } from "../helix/subscriptions/index.ts"
import { getCurrentUser } from "../helix/users/index.ts"

import { type EventPayload } from "./events-helpers.ts"
import { type Transport } from "./eventsub.ts"
import { type TwitchMessage } from "./messages.ts"

type Dispatch = (payload: EventPayload) => void

export default async function createSocketTransport(
  connection: Connection,
): Promise<Transport> {
  const dispatchers: Partial<Record<string, Dispatch[]>> = {}
  const subscriptions: Partial<Record<string, Promise<string>>> = {}

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

      for (const dispatch of dispatchers[data.payload.subscription.id] ?? []) {
        dispatch(data.payload)
      }
      return
    }
  })

  const [user, sessionId] = await Promise.all([
    getCurrentUser(connection),
    promise,
  ])

  return {
    ...connection,
    currentUserId: user.id,
    subscribe: async (subscription, dispatch) => {
      const key = `${subscription.type}-${subscription.version}-${JSON.stringify(subscription.condition)}`

      subscriptions[key] ??= createSubscription(
        connection,
        { method: "websocket", session_id: sessionId },
        subscription,
      ).then(({ id }) => id)

      const id = await subscriptions[key]
      dispatchers[id] ??= []
      dispatchers[id].push(dispatch)
    },
  }
}
