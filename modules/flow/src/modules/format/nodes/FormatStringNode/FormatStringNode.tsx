import { type NodeComponent, Node } from "#shared/Canvas"

import { type FlowNodeConfig } from "#shared/Flow"

declare module "#shared/Flow" {
  interface FlowNodeConfigs {
    "format-string": FlowNodeConfig<
      "format-string",
      {
        template: { type: "data"; dataType: "string" }
        data: { type: "data"; dataType: "unknown" }
      },
      {
        value: { type: "data"; dataType: "string" }
      }
    >
  }
}

const FormatStringNodeComponent: NodeComponent<"format-string"> = ({
  ...nodeProps
}) => {
  return (
    <Node
      type="format-string"
      iconModule="F"
      iconAction="S"
      title="String"
      subtitle="Format"
      inputs={{
        template: { label: "Template", type: "data", dataType: "string" },
        data: { label: "Data", type: "data", dataType: "unknown" },
      }}
      outputs={{
        value: { label: "Value", type: "data", dataType: "string" },
      }}
      nodeProps={nodeProps}
    />
  )
}

export default FormatStringNodeComponent
