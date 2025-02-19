import events_ from "./data.json" assert { type: "json" }

export type Nested<Type> = Record<string, Type & { fields?: Nested<Type> }>

export interface TwitchEvent {
  name: string
  type: string
  version: string
  description: string
  condition: Nested<{
    type: string
    required: boolean
    description: string
  }>
  definition: Nested<{
    type: string
    required: boolean
    description: string
  }>
}

export default events_ as unknown as TwitchEvent[]
