import { type FlowEdge } from "./edge.ts"
import { type FlowNode } from "./node.ts"

export type FlowGraph = {
  id: string
  name: string
  path: string
  nodes: FlowNode[]
  edges: FlowEdge[]
}
