import { type ModuleEvent } from "@overlaysymphony/core/module"

export type EventLog = {
  entries: ModuleEvent[]
  record: (event: ModuleEvent) => void
}

export function createEventLog(): EventLog {
  const entries: ModuleEvent[] = []

  return {
    entries,

    record: (event) => {
      entries.push(event)
      console.log("event", event)
    },
  }
}
