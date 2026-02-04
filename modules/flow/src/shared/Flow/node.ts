import { type DataTypes } from "./data.ts"

export interface FlowNodeConfigs {}
export type FlowNodeType = keyof FlowNodeConfigs

export type FlowNodeConfig<
  Type extends string,
  Inputs extends Record<string, FlowNodePort>,
  Outputs extends Record<string, FlowNodePort>,
> = {
  type: Type
  inputs: Inputs
  outputs: Outputs
  data: PortValues<Inputs>
}

export type FlowNodePort = (
  | { type: "placeholder" }
  | { type: "event" }
  | { type: "data"; dataType: keyof DataTypes }
) & {
  required?: boolean
}

export type FlowNode<Type extends FlowNodeType = FlowNodeType> = {
  id: string
  position: { x: number; y: number }
  type: FlowNodeConfigs[Type]["type"]
  data: FlowNodeConfigs[Type]["data"] & { moduleId: string }
}

export type FlowNodeLogic<Type extends FlowNodeType> = (
  node: FlowNode<Type>,
) => void

export const nodeConfigs: {
  [Type in FlowNodeType]?: {
    logic: FlowNodeLogic<Type>
  }
} = {}

export function registerNode<Type extends FlowNodeType>(
  type: Type,
  logic: FlowNodeLogic<Type>,
): void {
  // @ts-expect-error too complex for typescript
  nodeConfigs[type] = logic
}

export function registerNodes<Type extends FlowNodeType>(nodes: {
  [T in Type]: FlowNodeLogic<T>
}): void {
  for (const type in nodes) {
    registerNode(type, nodes[type])
  }
}

type PortKeys<Ports extends Record<string, FlowNodePort>> = {
  [Key in keyof Ports]: Ports[Key] extends { type: "data" } ? Key : never
}[keyof Ports]

type PortValues<Ports extends Record<string, FlowNodePort>> = {
  [Key in PortKeys<Ports>]?: Ports[Key] extends {
    type: "data"
    dataType: infer DataType
  }
    ? DataType extends keyof DataTypes
      ? DataTypes[DataType]
      : never
    : never
}
