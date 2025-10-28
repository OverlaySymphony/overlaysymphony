import { type FieldType } from "#shared/type"

import events_ from "./data.json" with { type: "json" }

export type EventConfig = {
  label: string
  type: string
  listener: string
  permissions: string
  description: string
  event: FieldType
}

const events: Record<string, EventConfig> = events_

export default events
