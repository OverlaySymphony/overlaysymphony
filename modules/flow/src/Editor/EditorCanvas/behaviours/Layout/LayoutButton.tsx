import dagre from "@dagrejs/dagre"
import {
  ControlButton,
  useReactFlow,
  useStore,
  type Edge as BaseEdge,
  type Node as BaseNode,
} from "@xyflow/react"
import { useCallback } from "react"

export const LayoutButton: React.FC = () => {
  const { getNodes, setNodes, getEdges, setEdges, fitView } = useReactFlow()

  const { nodeOrigin, snapGrid } = useStore(
    ({ nodeOrigin, snapToGrid, snapGrid }) => ({
      nodeOrigin,
      snapGrid: snapToGrid ? snapGrid : undefined,
    }),
  )

  const onLayout = useCallback(() => {
    const nodes = getNodes()
    const edges = getEdges()

    const { nodes: newNodes, edges: newEdges } = compute(
      nodes,
      edges,
      nodeOrigin,
      snapGrid,
    )

    setNodes([...newNodes])
    setEdges([...newEdges])

    void fitView()
  }, [getNodes, setNodes, getEdges, setEdges, fitView, nodeOrigin, snapGrid])

  return <ControlButton onClick={() => onLayout()}>L</ControlButton>
}

function compute<Node extends BaseNode, Edge extends BaseEdge>(
  nodes: Node[],
  edges: Edge[],
  nodeOrigin: [number, number],
  snapGrid?: [number, number],
): {
  nodes: Node[]
  edges: Edge[]
} {
  const graph = new dagre.graphlib.Graph({
    directed: true,
    multigraph: true,
    compound: false,
  })
  graph.setDefaultEdgeLabel(() => ({}))
  graph.setGraph({ rankdir: "LR" })

  for (const node of nodes) {
    const { width, height } = node.measured ?? {}
    graph.setNode(node.id, { width, height })
  }

  for (const edge of edges) {
    const name = `${edge.sourceHandle}-${edge.targetHandle}`
    graph.setEdge(edge.source, edge.target, {}, name)
  }

  dagre.layout(graph)

  const newNodes = nodes.map((node) => {
    let { x, y } = graph.node(node.id)
    const { width, height } = graph.node(node.id)

    // snap to grid
    if (snapGrid) {
      x = Math.round((x - width / 2) / snapGrid[0]) * snapGrid[0] + width / 2
      y = Math.round((y - height / 2) / snapGrid[1]) * snapGrid[1] + height / 2
    }

    // compensate origin
    x += width * (nodeOrigin[0] - 0.5)
    y += width * (nodeOrigin[1] - 0.5)

    return {
      ...node,
      position: { x, y },
    }
  })

  return { nodes: newNodes, edges }
}
