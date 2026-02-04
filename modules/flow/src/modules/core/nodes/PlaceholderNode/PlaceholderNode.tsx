import { type NodeComponent, Node } from "#shared/Canvas"

import { type FlowNodeConfig, type FlowNodePort } from "#shared/Flow"

declare module "#shared/Flow" {
  interface FlowNodeConfigs {
    placeholder: FlowNodeConfig<
      "placeholder",
      Record<string, FlowNodePort>,
      Record<string, FlowNodePort>
    > & {
      data: {
        label: string
        inputs: Record<string, FlowNodePort & { label: string }>
        outputs: Record<string, FlowNodePort & { label: string }>
      }
    }
  }
}

const PlaceholderNodeComponent: NodeComponent<"placeholder"> = ({
  ...nodeProps
}) => {
  return (
    <Node
      type="placeholder"
      iconModule="C"
      iconAction="P"
      title={(nodeProps.data.label as string | undefined) ?? "Placeholder"}
      subtitle="Placeholder"
      inputs={
        (nodeProps.data.inputs as {} | undefined) ?? {
          placeholder: { label: "Placeholder", type: "placeholder" },
          event: { label: "Event", type: "event" },
          data: { label: "Data", type: "data", dataType: "unknown" },
        }
      }
      outputs={
        (nodeProps.data.outputs as {} | undefined) ?? {
          placeholder: { label: "Placeholder", type: "placeholder" },
          event: { label: "Event", type: "event" },
          data: { label: "Data", type: "data", dataType: "unknown" },
        }
      }
      nodeProps={nodeProps}
    />
  )
}

export default PlaceholderNodeComponent
