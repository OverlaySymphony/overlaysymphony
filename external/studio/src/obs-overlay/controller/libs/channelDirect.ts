import { type CompositionConfigResolved } from "@overlaysymphony/core/composition"
import createDefer from "@overlaysymphony/core/libs/defer"

import { type DirectChannel, createDirectChannel } from "#shared/controller"

export type DirectConnection = DirectChannel & {
  channelName: string
  registered: Promise<void>
}

export async function initDirectChannel(
  config: CompositionConfigResolved,
  payload: {}, // TODO
): Promise<DirectConnection> {
  const defer = createDefer()

  const channelName = config.id
  const broadcast = await createDirectChannel(channelName, async (data) => {
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

  return {
    ...broadcast,
    channelName,
    registered: defer.promise,
  }
}
