import { type FlowEdgeType, type FlowNodeType } from "#shared/Flow"

import { type EdgeComponentType, type NodeComponentType } from "./interfaces.ts"

export const nodeComponents: {
  [Type in FlowNodeType]?: NodeComponentType<Type>
} = {}
export const edgeComponents: {
  [Type in FlowEdgeType]?: EdgeComponentType<Type>
} = {}

export function registerNodeComponent<Type extends FlowNodeType>(
  type: Type,
  component: NodeComponentType<Type>,
): void {
  // @ts-expect-error too complex for typescript
  nodeComponents[type] = component
}

export function registerNodeComponents<Type extends FlowNodeType>(nodes: {
  [T in Type]: NodeComponentType<T>
}): void {
  for (const type in nodes) {
    registerNodeComponent(type, nodes[type])
  }
}

export function registerEdgeComponent<Type extends FlowEdgeType>(
  type: Type,
  comonent: EdgeComponentType<Type>,
): void {
  // @ts-expect-error too complex for typescript
  edgeComponents[type] = comonent
}

export function registerEdgeComponents<Type extends FlowEdgeType>(edges: {
  [T in Type]: EdgeComponentType<T>
}): void {
  for (const type in edges) {
    registerEdgeComponent(type, edges[type])
  }
}
