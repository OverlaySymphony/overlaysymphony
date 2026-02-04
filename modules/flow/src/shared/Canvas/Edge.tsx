import {
  type EdgeProps as XYEdgeProps,
  BaseEdge as XYBaseEdge,
  getBezierPath,
} from "@xyflow/react"

import { type FlowEdgeType } from "#shared/Flow"

export function Edge<Type extends FlowEdgeType = FlowEdgeType>({
  type,
  edgeProps: {
    id,

    selected,
    animated,
    selectable,
    deletable,

    source,
    sourceHandleId,
    sourceX,
    sourceY,
    sourcePosition,
    target,
    targetHandleId,
    targetX,
    targetY,
    targetPosition,
    pathOptions,

    label,
    labelStyle,
    labelShowBg,
    labelBgStyle,
    labelBgPadding,
    labelBgBorderRadius,

    data,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
  },
}: {
  type: Type
  edgeProps: XYEdgeProps
}): React.ReactNode {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: undefined,
  })

  return (
    <XYBaseEdge
      data-id={id}
      data-type={type}
      path={path}
      label={label}
      labelX={labelX}
      labelY={labelY}
      labelStyle={labelStyle}
      labelShowBg={labelShowBg}
      labelBgStyle={labelBgStyle}
      labelBgPadding={labelBgPadding}
      labelBgBorderRadius={labelBgBorderRadius}
      markerStart={markerStart}
      markerEnd={markerEnd ?? "url('#arrow')"}
      interactionWidth={interactionWidth}
      style={{
        ...style,
        strokeWidth: 2,
      }}
    />
  )
}
