export interface FlowEdgeConfigs {}
export type FlowEdgeType = keyof FlowEdgeConfigs

export type FlowEdgeConfig<
  Type extends string,
  Data extends Record<string, unknown>,
> = {
  type: Type
  data: Data
}

export type FlowEdge<Type extends FlowEdgeType = FlowEdgeType> = {
  id: string
  type: FlowEdgeConfigs[Type]["type"]
  data: FlowEdgeConfigs[Type]["data"] & { moduleId: string }

  source: string
  sourceHandle: string
  target: string
  targetHandle: string
}

export type FlowEdgeLogic<Type extends FlowEdgeType> = (
  edge: FlowEdge<Type>,
) => void

export const edgeConfigs: {
  [Type in FlowEdgeType]?: {
    logic: FlowEdgeLogic<Type>
  }
} = {}

export function registerEdge<Type extends FlowEdgeType>(
  type: Type,
  logic: FlowEdgeLogic<Type>,
): void {
  // @ts-expect-error too complex for typescript
  edgeConfigs[type] = logic
}

export function registerEdges<Type extends FlowEdgeType>(edges: {
  [T in Type]: FlowEdgeLogic<T>
}): void {
  for (const type in edges) {
    registerEdge(type, edges[type])
  }
}
