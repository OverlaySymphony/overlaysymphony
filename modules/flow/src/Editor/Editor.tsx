import { ReactFlowProvider } from "@xyflow/react"
import { useState } from "react"

import { type FlowGraph } from "#shared/Flow"

import EditorCanvas from "./EditorCanvas/index.ts"
import Sidebar from "./Sidebar/index.ts"

const Editor: React.FC<{ graph: FlowGraph }> = ({ graph }) => {
  const [nodes, setNodes] = useState(graph.nodes)
  const [edges, setEdges] = useState(graph.edges)

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
        <Sidebar />
        <EditorCanvas
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
    </ReactFlowProvider>
  )
}

export default Editor
