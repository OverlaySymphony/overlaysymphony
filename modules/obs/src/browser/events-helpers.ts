import { ControlLevel } from "./actions-helpers.ts"

export type EventConfig<
  Config extends {
    Type: string
    Event: {}
  },
> = Config & {
  Payload: {
    type: Config["Type"]
    event: Config["Event"]
  }
}

export interface EventConfigs {}

export type EventType = keyof EventConfigs
export type EventPayload = EventConfigs[EventType]["Payload"]

const events: {
  [Type in EventType]?: {
    permissions: Exclude<keyof typeof ControlLevel, "MISSING">
    subscribe: (
      notify: (event: EventConfigs[Type]["Payload"]) => void,
    ) => Promise<void>
  }
} = {}

export function registerEvent<Type extends EventType>(
  type: Type,
  config: {
    permissions: Exclude<keyof typeof ControlLevel, "MISSING">
    subscribe: (
      notify: (event: EventConfigs[Type]["Payload"]) => void,
    ) => Promise<void>
  },
): void {
  // @ts-expect-error too complex for typescript
  events[type] = config
}

export async function createSubscription<Type extends EventType>(
  level: ControlLevel,
  type: Type,
  notify: (event: EventConfigs[Type]["Payload"]) => void,
): Promise<void> {
  const config = events[type]
  if (!config) throw new Error(`Event ${type} is not registered.`)

  if (level < ControlLevel[config.permissions]) {
    console.warn(
      `OBS event ${type} requires page permission level ${config.permissions}.`,
    )
    return undefined
  }

  return config.subscribe(notify)
}
