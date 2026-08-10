import { type SharedChannel, createSharedChannel } from "#shared/controller"

export async function initSharedChannel(
  overlayId: string,
): Promise<SharedChannel> {
  const broadcast = await createSharedChannel(async (data) => {
    if (data.type === "dock:ready") {
      broadcast.send({
        type: "overlay:register",
        overlayId,
      })
    }
  })

  broadcast.send({
    type: "overlay:register",
    overlayId,
  })

  return broadcast
}
