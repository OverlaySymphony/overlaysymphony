import createDefer from "@overlaysymphony/core/libs/defer"

import { type DirectChannel, createDirectChannel } from "#shared/controller"

export async function initDirectChannel(
  overlayId: string,
  payload: {}, // TODO
): Promise<DirectChannel> {
  const defer = createDefer()

  const broadcast = await createDirectChannel(overlayId, async (data) => {
    if (data.type === "dock:registered") {
      defer.resolve()
    }

    if (data.type === "dock:connected") {
      broadcast.send({
        type: "overlay:register",
        ...payload,
      })
    }
  })

  await defer.promise

  return broadcast
}
