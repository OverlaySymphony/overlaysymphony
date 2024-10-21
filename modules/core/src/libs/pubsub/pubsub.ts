type Handler<Data> = (data: Data) => void

type Subscriber<Data> = (handler: (data: Data) => void) => () => void
type Dispatcher<Data> = (data: Data) => void

export interface PubSub<Data> {
  subscribe: Subscriber<Data>
  dispatch: Dispatcher<Data>
}

export default function createPubSub<Data>(): PubSub<Data> {
  const handlers: Array<Handler<Data>> = []

  function subscribe(handler: Handler<Data>) {
    handlers.push(handler)

    return () => {
      const index = handlers.indexOf(handler)
      if (index === -1) return false

      handlers.splice(index, 1)
      return true
    }
  }

  function dispatch(data: Data) {
    for (const handler of handlers) {
      handler(data)
    }
  }

  return {
    subscribe,
    dispatch,
  }
}
