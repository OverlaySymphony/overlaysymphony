import { type NodeComponent, Node } from "#shared/Canvas"

import { type FlowNodeConfig } from "#shared/Flow"

declare module "#shared/Flow" {
  interface FlowNodeConfigs {
    "audio-speak": FlowNodeConfig<
      "audio-speak",
      {
        speak: { type: "event" }
        voice: { type: "data"; dataType: "string" }
        text: { type: "data"; dataType: "string" }
      },
      {
        done: { type: "event" }
      }
    >
  }
}

const AudioSpeakNodeComponent: NodeComponent<"audio-speak"> = ({
  ...nodeProps
}) => {
  return (
    <Node
      type="audio-speak"
      iconModule="A"
      iconAction="S"
      title="Speak"
      subtitle="Audio"
      inputs={{
        speak: { label: "Speak", type: "event" },
        voice: { label: "Voice", type: "data", dataType: "string" },
        text: { label: "Text", type: "data", dataType: "string" },
      }}
      outputs={{
        done: { label: "Done", type: "event" },
      }}
      nodeProps={nodeProps}
    />
  )
}

export default AudioSpeakNodeComponent
