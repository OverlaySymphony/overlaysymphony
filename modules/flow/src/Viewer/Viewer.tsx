import { ReactFlowProvider } from "@xyflow/react"

import { type FlowGraph } from "#shared/Flow"

import ViewerCanvas from "./ViewerCanvas/index.ts"

const Viewer: React.FC<{ graph: FlowGraph }> = ({ graph }) => {
  return (
    <ReactFlowProvider>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ViewerCanvas nodes={graph.nodes} edges={graph.edges} />
      </div>
    </ReactFlowProvider>
  )
}

export default Viewer
