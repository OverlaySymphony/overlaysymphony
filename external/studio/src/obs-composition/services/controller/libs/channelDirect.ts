import { type DirectChannel, createDirectChannel } from "#shared/controller"

export async function initDirectChannel(
  compositionId: string,
  onRegistered: (data: {}) => Promise<void>,
): Promise<DirectChannel> {
  const broadcast = await createDirectChannel(compositionId, async (data) => {
    if (data.type === "dock:registered") {
      await onRegistered({})
    }

    if (data.type === "dock:connected") {
      broadcast.send({
        type: "composition:register",
        // fields and assets
      })
    }
  })

  return broadcast
}
