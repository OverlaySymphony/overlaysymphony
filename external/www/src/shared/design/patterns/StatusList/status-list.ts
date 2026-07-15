import { type NodeKind } from "#design/patterns/NodeGraph"

export type Tone = NodeKind | "muted"

export type StatusItem = {
  tone?: Tone
  key?: string
  value?: string
  highlight?: boolean
  dim?: boolean
}
