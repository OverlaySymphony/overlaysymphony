import FlowCanvas, {
  type FlowCanvasEdge,
  type FlowCanvasNode,
} from "#shared/Canvas"

const ViewerCanvas: React.FC<{
  nodes: FlowCanvasNode[]
  edges: FlowCanvasEdge[]
}> = ({ nodes, edges }) => {
  return (
    <div style={{ flex: 1 }}>
      <FlowCanvas nodes={nodes} edges={edges} />
    </div>
  )
}

export default ViewerCanvas
