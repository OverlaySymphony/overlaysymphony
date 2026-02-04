import {
  type Edge as XYEdge,
  type EdgeProps as XYEdgeProps,
  type Node as XYNode,
  type NodeProps as XYNodeProps,
} from "@xyflow/react"

import {
  type FlowEdgeConfigs,
  type FlowEdgeType,
  type FlowNodeConfigs,
  type FlowNodeType,
} from "#shared/Flow"

type RequiredFields<T, K extends keyof T> = T &
  Required<{ [K2 in K]: NonNullable<T[K2]> }>

export type FlowCanvasNode<Type extends FlowNodeType = FlowNodeType> = XYNode<
  (FlowNodeConfigs[Type]["data"] extends Record<string, unknown>
    ? FlowNodeConfigs[Type]["data"]
    : Record<string, unknown>) & { moduleId: string },
  FlowNodeConfigs[Type]["type"]
>

type NodeProps<Type extends FlowNodeType> = XYNodeProps<
  FlowCanvasNode<Type>
> & {
  type: FlowNodeConfigs[Type]["type"]
}

export type NodeComponent<Type extends FlowNodeType> = React.FC<NodeProps<Type>>

export type NodeComponentType<Type extends FlowNodeType> = React.ComponentType<
  NodeProps<Type>
>

export type FlowCanvasEdge<Type extends FlowEdgeType = FlowEdgeType> =
  RequiredFields<
    XYEdge<
      (FlowEdgeConfigs[Type]["data"] extends Record<string, unknown>
        ? FlowEdgeConfigs[Type]["data"]
        : Record<string, unknown>) & { moduleId: string },
      FlowEdgeConfigs[Type]["type"]
    >,
    "type" | "data" | "sourceHandle" | "targetHandle"
  >

type EdgeProps<Type extends FlowEdgeType> = RequiredFields<
  XYEdgeProps<FlowCanvasEdge<Type>>,
  "data"
> & {
  type: FlowEdgeConfigs[Type]["type"]
}

export type EdgeComponent<Type extends FlowEdgeType> = React.FC<EdgeProps<Type>>

export type EdgeComponentType<Type extends FlowEdgeType> = React.ComponentType<
  EdgeProps<Type>
>
