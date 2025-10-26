export type EventConfig<
  Config extends {
    Type: string
    Version: string
    Condition: {}
    Event: {}
  },
> = Config & {
  Subscription: {
    type: Config["Type"]
    version: Config["Version"]
    condition: Config["Condition"]
  }
  Payload: {
    id: string
    type: Config["Type"]
    subscription: {
      type: Config["Type"]
      version: Config["Version"]
      condition: Config["Condition"]
    }
    event: Config["Event"]
  }
}

export interface EventConfigs {}

export type EventType = keyof EventConfigs

const events: {
  [Type in EventType]?: {
    scopes: string[]
    subscriber: (userId: string) => EventConfigs[Type]["Subscription"]
  }
} = {}

export function registerEvent<Type extends EventType>(
  type: Type,
  config: {
    scopes: string[]
    subscriber: (userId: string) => EventConfigs[Type]["Subscription"]
  },
): void {
  // @ts-expect-error too complex for typescript
  events[type] = config
}

export function buildSubscription<Type extends EventType>(
  type: Type,
  userId: string,
): EventConfigs[Type]["Subscription"] {
  if (!events[type]) throw new Error(`Event ${type} is not registered.`)

  return events[type].subscriber(userId)
}
