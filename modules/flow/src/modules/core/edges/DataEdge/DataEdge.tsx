import { type EdgeComponent, Edge } from "#shared/Canvas"

import { type DataTypes, type FlowEdgeConfig } from "#shared/Flow"

declare module "#shared/Flow" {
  interface FlowEdgeConfigs {
    data: FlowEdgeConfig<
      "data",
      {
        dataType: keyof DataTypes
      }
    >
  }
}

const DataEdgeComponent: EdgeComponent<"data"> = ({ ...edgeProps }) => {
  return (
    <>
      <Edge type="data" edgeProps={edgeProps} />
    </>
  )
}

export default DataEdgeComponent
