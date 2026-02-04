import { type EdgeComponent, Edge } from "#shared/Canvas"

import { type FlowEdgeConfig } from "#shared/Flow"

declare module "#shared/Flow" {
  interface FlowEdgeConfigs {
    event: FlowEdgeConfig<"event", {}>
  }
}

const EventEdgeComponent: EdgeComponent<"event"> = ({ ...edgeProps }) => {
  return (
    <>
      <Edge type="event" edgeProps={edgeProps} />
    </>
  )
}

export default EventEdgeComponent
