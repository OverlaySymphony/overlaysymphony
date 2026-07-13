export type NodeKind = "trigger" | "condition" | "action"

export type Node = {
  kind: NodeKind
  label?: string
  title: string
  meta?: string
}

export const NODE_LABELS: Record<NodeKind, string> = {
  trigger: "Trigger",
  condition: "Condition",
  action: "Action",
}
