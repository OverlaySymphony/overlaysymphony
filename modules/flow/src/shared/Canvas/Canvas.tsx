import {
  type ReactFlowProps,
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
} from "@xyflow/react"

import { type FlowCanvasEdge, type FlowCanvasNode } from "./interfaces.ts"
import { edgeComponents, nodeComponents } from "./register.ts"

import "@xyflow/react/dist/base.css"
import "./style/index.css"

const Canvas: React.FC<
  {
    nodes: FlowCanvasNode[]
    edges: FlowCanvasEdge[]
    controls?: React.ReactNode
    children?: React.ReactNode
  } & ReactFlowProps<FlowCanvasNode, FlowCanvasEdge>
> = ({ nodes, edges, controls, children, ...props }) => {
  return (
    <ReactFlow
      fitView
      snapToGrid
      nodes={nodes}
      edges={edges}
      {...props}
      snapGrid={[5, 5]}
      nodeOrigin={[0.5, 0.5]}
      nodeTypes={nodeComponents}
      edgeTypes={edgeComponents}
    >
      <EdgeMarkerDefinitons />
      {children}

      <Controls>{controls}</Controls>

      <Background
        id="dots"
        gap={20}
        offset={0.5}
        color="rgb(140, 140, 140)"
        variant={BackgroundVariant.Dots}
      />
      <Background
        id="lines"
        gap={200}
        offset={100}
        color="rgb(200, 200, 200)"
        variant={BackgroundVariant.Lines}
      />
    </ReactFlow>
  )
}

export default Canvas

const EdgeMarkerDefinitons: React.FC = () => {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0 }}>
      <defs>
        <marker
          id="arrow"
          viewBox="-10 -10 20 20"
          refX="0"
          refY="0"
          markerUnits="strokeWidth"
          markerWidth="12.5"
          markerHeight="12.5"
          orient="auto-start-reverse"
        >
          <polyline
            points="-5,-4 0,0 -5,4 -5,-4"
            stroke="context-stroke"
            fill="context-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
    </svg>
  )
}
