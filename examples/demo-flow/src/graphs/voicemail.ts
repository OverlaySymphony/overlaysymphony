import { type FlowGraph } from "@overlaysymphony/flow"

const graph: FlowGraph = {
  id: "voicemail",
  name: "Voicemail",
  path: "/",
  nodes: [
    {
      id: "redeem",
      type: "twitch-redeem",
      position: { x: 0, y: 0 },
      data: {
        moduleId: "",
        redeem: "voicemail",
      },
    },
    {
      id: "tts-intro",
      type: "audio-speak",
      position: { x: 200, y: 0 },
      data: {
        moduleId: "",
        voice: "Alice",
        text: "You have one new message from",
      },
    },
    {
      id: "tts-name-text",
      type: "format-string",
      position: { x: 200, y: 75 },
      data: {
        moduleId: "",
        template: "{user.name}",
      },
    },
    {
      id: "tts-name",
      type: "audio-speak",
      position: { x: 400, y: 0 },
      data: {
        moduleId: "",
        voice: "Robot",
      },
    },
    {
      id: "tts-message-text",
      type: "format-string",
      position: { x: 200, y: 140 },
      data: {
        moduleId: "",
        template: "{message}",
      },
    },
    {
      id: "tts-message",
      type: "audio-speak",
      position: { x: 600, y: 0 },
      data: {
        moduleId: "",
        voice: "Bob",
      },
    },
  ],
  edges: [
    {
      id: "47e04f41-48d3-45ed-b6ce-8212891944d3",
      type: "event",
      source: "redeem",
      sourceHandle: "redeemed",
      target: "tts-intro",
      targetHandle: "speak",
      data: {
        moduleId: "",
      },
    },
    {
      id: "5e101521-088b-46b4-8ce8-8847472f31ca",
      type: "data",
      source: "redeem",
      sourceHandle: "user",
      target: "tts-name-text",
      targetHandle: "data",
      data: {
        moduleId: "",
      },
    },
    {
      id: "eedf1251-20ea-4336-8cb0-1699ad7ac0db",
      type: "data",
      source: "tts-name-text",
      sourceHandle: "value",
      target: "tts-name",
      targetHandle: "text",
      data: {
        moduleId: "",
      },
    },
    {
      id: "bf585830-d7ac-4304-8874-125c4b81ea5a",
      type: "event",
      source: "tts-intro",
      sourceHandle: "done",
      target: "tts-name",
      targetHandle: "speak",
      data: {
        moduleId: "",
      },
    },
    {
      id: "83ca4fe6-1b13-4f6e-85fe-21ec3092bf9f",
      type: "data",
      source: "redeem",
      sourceHandle: "message",
      target: "tts-message-text",
      targetHandle: "data",
      data: {
        moduleId: "",
      },
    },
    {
      id: "51ad3345-db2b-4e89-a8a4-4c7c0cd9b297",
      type: "data",
      source: "tts-message-text",
      sourceHandle: "value",
      target: "tts-message",
      targetHandle: "text",
      data: {
        moduleId: "",
      },
    },
    {
      id: "304fbbe5-e138-4cfa-851d-34ea7c0e966b",
      type: "event",
      source: "tts-name",
      sourceHandle: "done",
      target: "tts-message",
      targetHandle: "speak",
      data: {
        moduleId: "",
      },
    },
  ],
}

export default graph
