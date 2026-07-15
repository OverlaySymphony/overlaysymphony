export type NodeKind = "trigger" | "condition" | "action"

export const NODE_LABELS: Record<NodeKind, string> = {
  trigger: "Trigger",
  condition: "Condition",
  action: "Action",
}

export type Node = {
  id: string
  kind: NodeKind
  module: string
  title: string
  meta?: string
}

export type Layout = "stack" | "fork"

export type Section = {
  label: string
  kind: NodeKind
  layout?: Layout
  forkLabel?: string
  insert?: string
  nodes: Node[]
}
