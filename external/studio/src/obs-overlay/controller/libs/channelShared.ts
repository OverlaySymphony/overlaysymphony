import { type SharedChannel, createSharedChannel } from "#shared/controller"

export async function initSharedChannel(name: string): Promise<SharedChannel> {
  const broadcast = await createSharedChannel(async (data) => {
    if (data.type === "dock:ready") {
      broadcast.send({
        type: "overlay:register",
        name,
      })
    }
  })

  broadcast.send({
    type: "overlay:register",
    name,
  })

  return broadcast
}
