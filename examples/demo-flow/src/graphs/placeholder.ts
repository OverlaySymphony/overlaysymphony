import { type FlowGraph } from "@overlaysymphony/flow"

const graph: FlowGraph = {
  id: "basic",
  name: "Basic",
  path: "/",
  nodes: [
    {
      id: "trigger",
      type: "placeholder",
      position: { x: -175, y: 25 },
      data: {
        moduleId: "",
        label: "Trigger",
        inputs: {
          event: { label: "Event", type: "event" },
          data: { label: "Data", type: "data", dataType: "unknown" },
        },
        outputs: {
          event: { label: "Event", type: "event" },
          data: { label: "Data", type: "data", dataType: "unknown" },
        },
      },
    },
    {
      id: "logic",
      type: "placeholder",
      position: { x: 0, y: 0 },
      data: {
        moduleId: "",
        label: "Logic",
        inputs: {
          event: { label: "Event", type: "event" },
          data: { label: "Data", type: "data", dataType: "unknown" },
        },
        outputs: {
          event: { label: "Event", type: "event" },
          data: { label: "Data", type: "data", dataType: "unknown" },
        },
      },
    },
    {
      id: "action",
      type: "placeholder",
      position: { x: 175, y: 25 },
      data: {
        moduleId: "",
        label: "Action",
        inputs: {
          event: { label: "Event", type: "event" },
          data: { label: "Data", type: "data", dataType: "unknown" },
        },

        outputs: {
          event: { label: "Event", type: "event" },
          data: { label: "Data", type: "data", dataType: "unknown" },
        },
      },
    },
  ],
  edges: [
    {
      id: "trigger-logic-event",
      type: "event",
      source: "trigger",
      sourceHandle: "event",
      target: "logic",
      targetHandle: "event",
      data: {
        moduleId: "",
      },
    },
    {
      id: "trigger-action-data",
      type: "data",
      source: "trigger",
      sourceHandle: "data",
      target: "action",
      targetHandle: "data",
      data: {
        moduleId: "",
      },
    },
    {
      id: "logic-action-data",
      type: "data",
      source: "logic",
      sourceHandle: "data",
      target: "action",
      targetHandle: "data",
      data: {
        moduleId: "",
      },
    },
    {
      id: "logic-action-event",
      type: "event",
      source: "logic",
      sourceHandle: "event",
      target: "action",
      targetHandle: "event",
      data: {
        moduleId: "",
      },
    },
  ],
}

export default graph
