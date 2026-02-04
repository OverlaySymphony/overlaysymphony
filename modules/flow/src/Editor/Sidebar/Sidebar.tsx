import { type FlowCanvasNode } from "#shared/Canvas"

const nodeTypes: Array<{
  label: string
  node: Omit<FlowCanvasNode, "id" | "position">
}> = [
  {
    label: "Placeholder",
    node: {
      type: "placeholder",
      data: {
        moduleId: "",
        label: "Placeholder",
      },
    },
  },
  {
    label: "Audio: Speak",
    node: { type: "audio-speak", data: { moduleId: "" } },
  },
  {
    label: "Format: String",
    node: { type: "format-string", data: { moduleId: "" } },
  },
  {
    label: "Twitch: Redeem",
    node: { type: "twitch-redeem", data: { moduleId: "" } },
  },
]

const Sidebar: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent,
    node: Omit<FlowCanvasNode, "id" | "position">,
  ) => {
    event.dataTransfer.effectAllowed = "copy"
    event.dataTransfer.setData("application/json", JSON.stringify(node))
  }

  return (
    <aside style={{ flex: 1 }}>
      <div>You can drag these nodes to the canvas.</div>

      {nodeTypes.map(({ label, node }) => (
        <div
          key={label}
          draggable
          onDragStart={(event) => onDragStart(event, node)}
        >
          {label}
        </div>
      ))}
    </aside>
  )
}

export default Sidebar
