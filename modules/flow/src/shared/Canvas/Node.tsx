import {
  type HandleType,
  type NodeProps as XYNodeProps,
  Handle as XYHandle,
  NodeToolbar as XYNodeToolbar,
  Position,
} from "@xyflow/react"
import cx from "classnames"

import {
  type FlowNodeConfigs,
  type FlowNodePort,
  type FlowNodeType,
} from "#shared/Flow"

export function Node<Type extends FlowNodeType = FlowNodeType>({
  type,
  iconModule,
  iconAction,
  title,
  subtitle,
  inputs,
  outputs,
  nodeProps,
}: {
  type: Type
  iconModule: string
  iconAction: string
  title: string
  subtitle: string
  inputs: {
    [Key in keyof FlowNodeConfigs[Type]["inputs"]]: FlowNodeConfigs[Type]["inputs"][Key] & {
      label: string
    }
  }
  outputs: {
    [Key in keyof FlowNodeConfigs[Type]["outputs"]]: FlowNodeConfigs[Type]["outputs"][Key] & {
      label: string
    }
  }
  nodeProps: XYNodeProps
}): React.ReactNode {
  return (
    <>
      {/* <div>{iconModule}</div> */}
      <div>
        {/* <div>{iconAction}</div> */}
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>

      <div className="os-flow__ports">
        <NodePorts
          type="target"
          handles={inputs as Record<string, FlowNodePort & { label: string }>}
          data={nodeProps.data}
        />
        <NodePorts
          type="source"
          handles={outputs as Record<string, FlowNodePort & { label: string }>}
        />
      </div>
    </>
  )
}

const NodePorts: React.FC<{
  type: HandleType
  handles: Record<string, FlowNodePort & { label: string }>
  data?: Record<string, unknown>
}> = ({ type, handles, data }) => {
  return (
    <div
      className={cx(
        "os-flow__ports-list",
        {
          source: "os-flow__ports-outputs",
          target: "os-flow__ports-inputs",
        }[type],
      )}
    >
      {Object.entries(handles).map(([id, { label }]) => {
        const value = data?.[id]

        return (
          <div key={id} className="os-flow__port">
            <XYHandle
              id={id}
              type={type}
              position={{ source: Position.Right, target: Position.Left }[type]}
              isConnectable={!value}
            />
            <div className="os-flow__port-label">{label}</div>
          </div>
        )
      })}
    </div>
  )
}

export const NodeToolbar: React.FC<{
  buttons: Array<{
    label: string
    onClick: () => void
  }>
}> = ({ buttons }) => {
  return (
    <XYNodeToolbar className="nodrag" offset={16}>
      {buttons.map(({ label, onClick }) => (
        <button key={label} onClick={onClick}>
          {label}
        </button>
      ))}
    </XYNodeToolbar>
  )
}
