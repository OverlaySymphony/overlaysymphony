import {
  type Edge as BaseEdge,
  type Node as BaseNode,
  useReactFlow,
} from "@xyflow/react"
import { useMemo } from "react"

export function useDroppedEdge<Node extends BaseNode, Edge extends BaseEdge>({
  setNodes,
  setEdges,
}: {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}): (
  source: Node,
  sourceHandle: string,
  position: { x: number; y: number },
) => void {
  const { screenToFlowPosition } = useReactFlow<Node, Edge>()

  return useMemo(
    () =>
      (
        source: Node,
        sourceHandle: string,
        position: { x: number; y: number },
      ) => {
        const target = {
          id: crypto.randomUUID(),
          type: "placeholder",
          data: {},
          position: screenToFlowPosition(position),
        } as Node

        const edge = {
          id: crypto.randomUUID(),
          type: "placeholder",
          data: {},
          source: source.id,
          sourceHandle,
          target: target.id,
          targetHandle: "placeholder",
        } as Edge

        setNodes((nodes) => nodes.concat(target))
        setEdges((edges) => edges.concat(edge))
      },
    [screenToFlowPosition, setNodes, setEdges],
  )
}
