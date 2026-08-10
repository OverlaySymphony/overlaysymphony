import { type DirectChannel, createDirectChannel } from "#shared/controller"

export async function initDirectChannel(
  overlayId: string,
  onRegister: (config: {}) => Promise<void>,
): Promise<DirectChannel> {
  const broadcast = await createDirectChannel(overlayId, async (data) => {
    if (data.type === "overlay:register") {
      await onRegister({
        // fields and assets
      })

      broadcast.send({ type: "dock:registered" })
    }
  })

  broadcast.send({ type: "dock:connected" })

  return broadcast
}
