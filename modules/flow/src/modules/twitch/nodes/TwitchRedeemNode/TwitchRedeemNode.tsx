import { type NodeComponent, Node } from "#shared/Canvas"

import { type FlowNodeConfig } from "#shared/Flow"

declare module "#shared/Flow" {
  interface FlowNodeConfigs {
    "twitch-redeem": FlowNodeConfig<
      "twitch-redeem",
      {
        redeem: { type: "data"; dataType: "string" }
      },
      {
        redeemed: { type: "event" }
        user: { type: "data"; dataType: "unknown" }
        message: { type: "data"; dataType: "string" }
      }
    >
  }
}

const TwitchRedeemNodeComponent: NodeComponent<"twitch-redeem"> = ({
  ...nodeProps
}) => {
  return (
    <Node
      type="twitch-redeem"
      iconModule="T"
      iconAction="R"
      title="Redeem"
      subtitle="Twitch"
      inputs={{
        redeem: { label: "Redeem", type: "data", dataType: "string" },
      }}
      outputs={{
        redeemed: { label: "Redeemed", type: "event" },
        user: { label: "User", type: "data", dataType: "unknown" },
        message: { label: "Message", type: "data", dataType: "string" },
      }}
      nodeProps={nodeProps}
    />
  )
}

export default TwitchRedeemNodeComponent
