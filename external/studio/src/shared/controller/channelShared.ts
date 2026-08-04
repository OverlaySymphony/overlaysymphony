import createBroadcaster, {
  type BroadcastChannel,
  type BroadcastHandler,
} from "@overlaysymphony/core/libs/broadcast"

export type SharedReadyEvent = {
  type: "dock:ready"
}

export type SharedRegisterEvent = {
  type: "composition:register"
  compositionId: string
}

type SharedBroadcastEvent = SharedReadyEvent | SharedRegisterEvent

export type SharedChannel = BroadcastChannel<SharedBroadcastEvent>

export async function createSharedChannel(
  handler: BroadcastHandler<SharedBroadcastEvent>,
): Promise<SharedChannel> {
  const broadcast = createBroadcaster<SharedBroadcastEvent>("dock", handler)

  return broadcast
}
