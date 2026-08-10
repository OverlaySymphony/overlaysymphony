import { type SharedChannel, createSharedChannel } from "#shared/controller"

export async function initSharedChannel(
  compositionId: string,
): Promise<SharedChannel> {
  const broadcast = await createSharedChannel(async (data) => {
    if (data.type === "dock:ready") {
      broadcast.send({
        type: "composition:register",
        compositionId,
      })
    }
  })

  broadcast.send({
    type: "composition:register",
    compositionId,
  })

  return broadcast
}
