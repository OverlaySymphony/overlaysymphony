import { type NodeKind } from "#design/marketing/NodeGraph"

export type Tone = NodeKind | "muted"

export type StatusItem = {
  tone?: Tone
  key?: string
  value?: string
  highlight?: boolean
  dim?: boolean
}
