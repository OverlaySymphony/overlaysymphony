import events_ from "./data.json" with { type: "json" }

export type TwitchConfig = {
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

export type FieldType = {
  type: string
  required: boolean
  description: string
  fields?: Record<string, FieldType>
}

const events: Record<string, TwitchConfig> = events_

export default events
