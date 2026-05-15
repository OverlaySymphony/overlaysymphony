type Handler<Data> = (data: Data) => unknown

type Listener<Data> = (handler: Handler<Data>) => () => void
type Enqueuer<Data> = (priority: number, data: Data) => void
type Dismisser = () => void

export interface Queue<Data> {
  listen: Listener<Data>
  enqueue: Enqueuer<Data>
  dismiss: Dismisser
}

interface QueueItem<Data> {
  priority: number
  data: Data
}

export default function createQueue<Data>(): Queue<Data> {
  const handlers: Array<Handler<Data>> = []
  const queue: Array<QueueItem<Data>> = []
  let current: { data: Data } | undefined = undefined

  function dispatch(data: Data | undefined) {
    if (typeof data === "undefined") {
      current = undefined
      return
    }

    current = { data }
    const results = handlers
      .map((handler) => handler(data))
      .filter(
        (item) =>
          item &&
          typeof item === "object" &&
          "then" in item &&
          typeof item.then === "function",
      )

    if (results.length > 0) {
      void Promise.all(results).then(dismiss)
    }
  }

  function listen(handler: Handler<Data>) {
    handlers.push(handler)

    return () => {
      const index = handlers.indexOf(handler)
      if (index === -1) return false

      handlers.splice(index, 1)
      return true
    }
  }

  function enqueue(priority: number, data: Data) {
    if (!current) {
      return dispatch(data)
    }

    const after = queue.findIndex((item) => item.priority < priority)

    if (after === -1) {
      queue.push({ priority, data })
    } else {
      queue.splice(after, 0, { priority, data })
    }
  }

  function dismiss() {
    const { data } = queue.shift() ?? {}
    return dispatch(data)
  }

  return {
    listen,
    enqueue,
    dismiss,
  }
}
