import { type DirectChannel, createDirectChannel } from "#shared/controller"

export async function initDirectChannel(
  compositionId: string,
  onRegister: (config: {}) => Promise<void>,
): Promise<DirectChannel> {
  const broadcast = await createDirectChannel(compositionId, async (data) => {
    if (data.type === "composition:register") {
      await onRegister({
        // fields and assets
      })

      broadcast.send({ type: "dock:registered" })
    }
  })

  broadcast.send({ type: "dock:connected" })

  return broadcast
}
