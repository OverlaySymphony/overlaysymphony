import createBroadcaster, {
  type BroadcastChannel,
  type BroadcastHandler,
} from "@overlaysymphony/core/libs/broadcast"

export type DirectConnectedEvent = {
  type: "dock:connected"
}

export type DirectRegisteredEvent = {
  type: "dock:registered"
}

export type DirectRegisterEvent = {
  type: "overlay:register"
  // fields and assets
}

type DirectBroadcastEvent =
  | DirectConnectedEvent
  | DirectRegisteredEvent
  | DirectRegisterEvent

export type DirectChannel = BroadcastChannel<DirectBroadcastEvent>

export async function createDirectChannel(
  name: string,
  handler: BroadcastHandler<DirectBroadcastEvent>,
): Promise<DirectChannel> {
  const broadcast = createBroadcaster<DirectBroadcastEvent>(
    `overlay-${name}`,
    handler,
  )

  return broadcast
}
