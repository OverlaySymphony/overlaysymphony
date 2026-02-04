import { type NodeComponent, Node } from "#shared/Canvas"

import { type FlowNodeConfig } from "#shared/Flow"

declare module "#shared/Flow" {
  interface FlowNodeConfigs {
    "twitch-command": FlowNodeConfig<
      "twitch-command",
      {
        command: { type: "data"; dataType: "string" }
      },
      {
        commanded: { type: "event" }
        user: { type: "data"; dataType: "unknown" }
      }
    >
  }
}

const TwitchCommandNodeComponent: NodeComponent<"twitch-command"> = ({
  ...nodeProps
}) => {
  return (
    <Node
      type="twitch-command"
      iconModule="T"
      iconAction="R"
      title="Command"
      subtitle="Twitch"
      inputs={{
        command: { label: "Command", type: "data", dataType: "string" },
      }}
      outputs={{
        commanded: { label: "Commanded", type: "event" },
        user: { label: "User", type: "data", dataType: "unknown" },
      }}
      nodeProps={nodeProps}
    />
  )
}

export default TwitchCommandNodeComponent
