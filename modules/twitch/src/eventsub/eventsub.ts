import "./events/index.ts"

import createEvents, { type Events } from "@overlaysymphony/core/libs/events"

import { type Connection } from "../helix/index.ts"

import {
  type EventPayload,
  type EventSubscription,
  buildSubscription,
} from "./events-helpers.ts"

export interface Transport extends Connection {
  currentUserId: string
  subscribe: (
    subscription: EventSubscription,
    dispatch: (payload: EventPayload) => void,
  ) => Promise<void>
}

export type TwitchEventSub = Events<EventPayload> &
  Connection & {
    currentUserId: string
    targetUserId: string
  }

export default async function createEventSub(
  transport: Transport,
  targetUserId?: string,
): Promise<TwitchEventSub> {
  const { subscribe, ...connection } = transport
  targetUserId ??= connection.currentUserId

  return {
    ...connection,
    targetUserId,
    ...(await createEvents<EventPayload, Transport>(
      async () => transport,
      async (pubsub, transport, type) => {
        await transport.subscribe(
          buildSubscription(type, transport.currentUserId, targetUserId),
          pubsub.dispatch,
        )
      },
    )),
  }
}
