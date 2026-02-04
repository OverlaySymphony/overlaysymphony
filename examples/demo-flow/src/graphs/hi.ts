import { type FlowGraph } from "@overlaysymphony/flow"

const graph: FlowGraph = {
  id: "hi",
  name: "Hi!",
  path: "/",
  nodes: [
    {
      id: "command",
      type: "twitch-command",
      position: { x: 0, y: 0 },
      data: {
        moduleId: "",
        command: "hi",
      },
    },
    {
      id: "message",
      type: "format-string",
      position: { x: 200, y: 75 },
      data: {
        moduleId: "",
        template: "Hi, {user.name}!",
      },
    },
    {
      id: "tts",
      type: "audio-speak",
      position: { x: 400, y: 0 },
      data: {
        moduleId: "",
        voice: "Alice",
      },
    },
  ],
  edges: [
    {
      id: "135ed924-4b40-4518-a3d7-8e5083be2538",
      type: "event",
      source: "command",
      sourceHandle: "commanded",
      target: "tts",
      targetHandle: "speak",
      data: {
        moduleId: "",
      },
    },
    {
      id: "c6529df1-6241-4b65-94fe-12baf0d1d787",
      type: "event",
      source: "command",
      sourceHandle: "user",
      target: "message",
      targetHandle: "data",
      data: {
        moduleId: "",
      },
    },
    {
      id: "1652ef83-c48f-4e68-a888-0e499c936f52",
      type: "data",
      source: "message",
      sourceHandle: "value",
      target: "tts",
      targetHandle: "text",
      data: {
        // TODO: Why doesn't this have full types?
        moduleId: "",
      },
    },
  ],
}

export default graph
