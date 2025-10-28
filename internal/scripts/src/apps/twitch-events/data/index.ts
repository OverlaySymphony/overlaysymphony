import { type FieldType } from "#shared/type"

import events_ from "./data.json" with { type: "json" }

export type EventConfig = {
  id: string
  label: string
  type: string
  version: string
  primary: boolean
  scopes: string[] | null
  description: string
  condition: FieldType
  event: FieldType
}

const events: Record<string, EventConfig> = events_

export default events
