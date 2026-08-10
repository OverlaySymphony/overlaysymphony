import { type SharedChannel, createSharedChannel } from "#shared/controller"

export async function initSharedChannel(
  onRegister: (overlayId: string) => Promise<void>,
): Promise<SharedChannel> {
  const broadcast = await createSharedChannel(async (data) => {
    if (data.type === "overlay:register") {
      await onRegister(data.overlayId)
    }

    if (data.type === "dock:ready") {
      console.error(`Received ${data.type}. Initiate shutdown...`)
    }
  })

  broadcast.send({ type: "dock:ready" })

  return broadcast
}
