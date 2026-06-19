import createPubSub, { type PubSub } from "../pubsub/index.ts"

type EventSubSubscriber<Payload extends { type: string }> = <
  Type extends Payload["type"],
>(
  types: Type[],
  callback: (event: Extract<Payload, { type: Type }>) => void,
) => () => void

export type Events<Payload extends { type: string }> = {
  on: EventSubSubscriber<Payload>
}

export default async function createEvents<
  Payload extends { type: string },
  ConnectData,
>(
  connect: (pubsub: PubSub<Payload>) => Promise<ConnectData | null>,
  createSubscription: (
    pubsub: PubSub<Payload>,
    connectData: ConnectData,
    type: Payload["type"],
  ) => Promise<void>,
  unique?: (type: Payload["type"]) => string,
): Promise<Events<Payload>> {
  const pubsub = createPubSub<Payload>()

  const connectData = await connect(pubsub)
  if (connectData === null) {
    return {
      on: () => () => undefined,
    }
  }

  const subscriptions: Partial<Record<string, boolean>> = {}

  const on: EventSubSubscriber<Payload> = (types, callback) => {
    for (const type of types) {
      const key = unique?.(type) ?? type
      if (!subscriptions[key]) {
        subscriptions[key] = true

        void createSubscription(pubsub, connectData, type)
      }
    }

    return pubsub.subscribe((event) => {
      // @ts-expect-error: generic events are complicated
      if (types.includes(event.type)) {
        // @ts-expect-error: generic events are complicated
        callback(event)
      }
    })
  }

  return {
    on,
  }
}
