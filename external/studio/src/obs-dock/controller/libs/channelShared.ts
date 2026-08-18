import { type SharedChannel, createSharedChannel } from "#shared/controller"

export async function initSharedChannel(
  onRegister: (name: string) => Promise<void>,
): Promise<SharedChannel> {
  const broadcast = await createSharedChannel(async (data) => {
    if (data.type === "overlay:register") {
      await onRegister(data.name)
    }

    if (data.type === "dock:ready") {
      console.error(`Received ${data.type}. Initiate shutdown...`)
    }
  })

  broadcast.send({ type: "dock:ready" })

  return broadcast
}
