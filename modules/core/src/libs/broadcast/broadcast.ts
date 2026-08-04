export type BroadcastHandler<Data> = (data: Data) => void
export type BroadcastSender<Data> = (data: Data) => void
export type BroadcastCloser = () => void
export type BroadcastChannel<Data> = {
  send: BroadcastSender<Data>
  close: BroadcastCloser
}

export default function createBroadcaster<Data>(
  name: string,
  handler?: BroadcastHandler<Data>,
): BroadcastChannel<Data> {
  const channel = new BroadcastChannel(name)

  if (handler) {
    channel.onmessage = (_event) => {
      handler(_event.data as Data)
    }
  }

  return {
    send: (data: Data) => channel.postMessage(data),
    close: () => channel.close(),
  }
}
