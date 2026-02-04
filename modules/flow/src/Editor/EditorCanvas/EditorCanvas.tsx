import {
  type Connection,
  type EdgeChange,
  type FinalConnectionState,
  type HandleType,
  type NodeChange,
  SelectionMode,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  reconnectEdge,
} from "@xyflow/react"
import { useMemo } from "react"

import FlowCanvas, {
  type FlowCanvasEdge,
  type FlowCanvasNode,
} from "#shared/Canvas"

import { useDroppedEdge, useDroppedNode } from "./behaviours/Dropped/index.ts"
import Guides, { useGuides } from "./behaviours/Guides/index.ts"
import { LayoutButton } from "./behaviours/Layout/index.ts"

const EditorCanvas: React.FC<{
  nodes: FlowCanvasNode[]
  edges: FlowCanvasEdge[]
  setNodes: React.Dispatch<React.SetStateAction<FlowCanvasNode[]>>
  setEdges: React.Dispatch<React.SetStateAction<FlowCanvasEdge[]>>
}> = ({ nodes, edges, setNodes, setEdges }) => {
  const [guidesRef, handleGuides] = useGuides()
  const onDroppedNode = useDroppedNode({ setNodes, setEdges })
  const onDroppedEdge = useDroppedEdge({ setNodes, setEdges })

  const onNodesChange = useMemo(
    () => (changes: Array<NodeChange<FlowCanvasNode>>) => {
      handleGuides(changes)

      setNodes((nodes) => applyNodeChanges(changes, nodes))
    },
    [setNodes, handleGuides],
  )
  const onEdgesChange = useMemo(
    () => (changes: Array<EdgeChange<FlowCanvasEdge>>) => {
      setEdges((edges) => applyEdgeChanges(changes, edges))
    },
    [setEdges],
  )
  const onConnect = useMemo(
    () => (connection: Connection) => {
      setEdges((edges) => addEdge(connection, edges))
    },
    [setEdges],
  )
  const onConnectEnd = useMemo(
    () =>
      (
        event: MouseEvent | TouchEvent,
        connectionState: FinalConnectionState,
      ) => {
        // Dropped on empty space, add node+edge
        if (!connectionState.isValid && connectionState.fromNode) {
          const { clientX, clientY } =
            "changedTouches" in event ? event.changedTouches[0] : event

          onDroppedEdge(
            connectionState.fromNode as unknown as FlowCanvasNode,
            connectionState.fromHandle?.id ?? "",
            {
              x: clientX,
              y: clientY,
            },
          )
        }
      },
    [onDroppedEdge],
  )
  const onReconnect = useMemo(
    () => (oldEdge: FlowCanvasEdge, newConnection: Connection) => {
      setEdges((edges) => reconnectEdge(oldEdge, newConnection, edges))
    },
    [setEdges],
  )
  const onReconnectEnd = useMemo(
    () =>
      (
        event: MouseEvent | TouchEvent,
        edge: FlowCanvasEdge,
        handleType: HandleType,
        connectionState: FinalConnectionState,
      ) => {
        // Dropped on empty space, remove edge
        if (!connectionState.isValid) {
          setEdges((edges) => edges.filter((e) => e.id !== edge.id))
        }
      },
    [setEdges],
  )

  const onDragOver = useMemo(
    () => (event: React.DragEvent) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = "copy"
    },
    [],
  )
  const onDrop = useMemo(
    () => (event: React.DragEvent) => {
      event.preventDefault()

      const data = event.dataTransfer.getData("application/json")
      if (!data) return

      const nodeConfig = JSON.parse(data) as Omit<
        FlowCanvasNode,
        "id" | "position"
      >
      const { clientX, clientY } = event

      onDroppedNode(nodeConfig, {
        x: clientX,
        y: clientY,
      })
    },
    [onDroppedNode],
  )

  return (
    <div style={{ flex: 4 }}>
      <FlowCanvas
        selectionMode={SelectionMode.Partial}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        controls={
          <>
            <LayoutButton />
          </>
        }
      >
        <Guides ref={guidesRef} />
      </FlowCanvas>
    </div>
  )
}

export default EditorCanvas
