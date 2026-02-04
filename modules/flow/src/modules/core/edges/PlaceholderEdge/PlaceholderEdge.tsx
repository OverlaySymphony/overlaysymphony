import { type EdgeComponent, Edge } from "#shared/Canvas"

import { type FlowEdgeConfig } from "#shared/Flow"

declare module "#shared/Flow" {
  interface FlowEdgeConfigs {
    placeholder: FlowEdgeConfig<"placeholder", {}>
  }
}

const PlaceholderEdgeComponent: EdgeComponent<"placeholder"> = ({
  ...edgeProps
}) => {
  return (
    <>
      <Edge type="placeholder" edgeProps={edgeProps} />
    </>
  )
}

export default PlaceholderEdgeComponent
