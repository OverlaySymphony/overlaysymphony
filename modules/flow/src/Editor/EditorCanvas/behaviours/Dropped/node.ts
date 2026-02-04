import {
  type Edge as XYEdge,
  type Node as XYNode,
  useReactFlow,
} from "@xyflow/react"
import { useMemo } from "react"

export function useDroppedNode<Node extends XYNode, Edge extends XYEdge>({
  setNodes,
  setEdges,
}: {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}): (
  nodeConfig: Omit<Node, "id" | "position">,
  position: { x: number; y: number },
) => void {
  const { screenToFlowPosition } = useReactFlow()

  return useMemo(
    () =>
      (
        nodeConfig: Omit<Node, "id" | "position">,
        position: { x: number; y: number },
      ) => {
        const newNode = {
          ...nodeConfig,
          id: crypto.randomUUID(),
          position: screenToFlowPosition(position),
        } as Node

        setNodes((nodes) => nodes.concat(newNode))
      },
    [screenToFlowPosition, setNodes],
  )
}
