export default function createBroadcaster<Data>(
  name: string,
  handler?: (data: Data) => void,
): (data: Data) => void {
  const channel = new BroadcastChannel(name)

  if (handler) {
    channel.onmessage = (_event) => {
      handler(_event.data as Data)
    }
  }

  return (data: Data) => {
    channel.postMessage(data)
  }
}
