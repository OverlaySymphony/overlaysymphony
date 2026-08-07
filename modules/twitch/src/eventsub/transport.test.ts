import { type Connection } from "../helix/index.ts"

import { type EventPayload } from "./events-helpers.ts"
import createEventSub from "./eventsub.ts"
import createSocketTransport from "./transport.ts"

type Listener = (event: { data: string }) => void

class FakeSocket {
  static current: FakeSocket

  private listeners: Listener[] = []

  constructor() {
    FakeSocket.current = this
  }

  addEventListener(type: string, listener: Listener): void {
    if (type === "message") this.listeners.push(listener)
  }

  receive(message: unknown): void {
    for (const listener of this.listeners) {
      listener({ data: JSON.stringify(message) })
    }
  }
}

const welcome = {
  metadata: { message_id: "w", message_type: "session_welcome" },
  payload: { session: { id: "session-1" } },
}

function notification(subscriptionId: string, userLogin: string) {
  return {
    metadata: {
      message_id: `m-${subscriptionId}`,
      message_type: "notification",
    },
    payload: {
      subscription: {
        id: subscriptionId,
        type: "channel.follow",
        version: "2",
      },
      event: { user_login: userLogin },
    },
  }
}

function stubConnection(): Connection & { requests: string[] } {
  const requests: string[] = []

  return {
    requests,
    helix: (({
      path,
      body,
    }: {
      path: string
      body?: { condition: { broadcaster_user_id: string } }
    }) => {
      requests.push(path)

      if (path === "/users") {
        return Promise.resolve({
          data: [{ id: "current", login: "current", created_at: "2020-01-01" }],
        })
      }

      return Promise.resolve({
        data: [{ id: `sub-${body?.condition.broadcaster_user_id}` }],
      })
    }) as Connection["helix"],
  }
}

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0))
}

async function connect(connection: Connection) {
  const pending = createSocketTransport(connection)
  FakeSocket.current.receive(welcome)

  return await pending
}

describe("createSocketTransport", () => {
  beforeEach(() => {
    vi.stubGlobal("WebSocket", FakeSocket)
  })

  it("routes a notification only to the EventSub that subscribed", async () => {
    const connection = stubConnection()
    const transport = await connect(connection)

    const mine = await createEventSub(transport)
    const theirs = await createEventSub(transport, "other")

    const myFollows: EventPayload[] = []
    const theirFollows: EventPayload[] = []
    mine.on(["channel.follow"], (payload) => myFollows.push(payload))
    theirs.on(["channel.follow"], (payload) => theirFollows.push(payload))
    await flush()

    FakeSocket.current.receive(notification("sub-current", "mine"))
    FakeSocket.current.receive(notification("sub-other", "theirs"))

    expect(myFollows).toHaveLength(1)
    expect(theirFollows).toHaveLength(1)
    expect(myFollows[0].event).toMatchObject({ user_login: "mine" })
    expect(theirFollows[0].event).toMatchObject({ user_login: "theirs" })
  })

  it("creates one Twitch subscription when two EventSubs want the same one", async () => {
    const connection = stubConnection()
    const transport = await connect(connection)

    const one = await createEventSub(transport)
    const two = await createEventSub(transport)

    const received: EventPayload[] = []
    one.on(["channel.follow"], (payload) => received.push(payload))
    two.on(["channel.follow"], (payload) => received.push(payload))
    await flush()

    expect(
      connection.requests.filter((path) => path === "/eventsub/subscriptions"),
    ).toHaveLength(1)

    FakeSocket.current.receive(notification("sub-current", "shared"))
    expect(received).toHaveLength(2)
  })
})
