import createDefer from "@overlaysymphony/core/libs/defer"

import { type DirectChannel, createDirectChannel } from "#shared/controller"

export async function initDirectChannel(
  compositionId: string,
  payload: {}, // TODO
): Promise<DirectChannel> {
  const defer = createDefer()

  const broadcast = await createDirectChannel(compositionId, async (data) => {
    if (data.type === "dock:registered") {
      defer.resolve()
    }

    if (data.type === "dock:connected") {
      broadcast.send({
        type: "composition:register",
        ...payload,
      })
    }
  })

  await defer.promise

  return broadcast
}
