import { type Item } from "#design/patterns/ItemList"
import { type Section } from "#design/patterns/NodeGraph"

export type Composition = Item & {
  automations: Item[]
}

export const COMPOSITIONS: Composition[] = [
  {
    id: "alerts",
    name: "Alerts",
    badge: "4",
    automations: [
      { id: "follow", name: "New follower", badge: "ON" },
      { id: "sub", name: "Subscription", badge: "ON" },
      { id: "bits", name: "Bits", badge: "ON" },
      { id: "shoutout", name: "!so command", badge: "OFF" },
    ],
  },
  {
    id: "background",
    name: "Background",
    badge: "7",
    automations: [{ id: "rotate", name: "Rotate scene", badge: "ON" }],
  },
  {
    id: "commands",
    name: "Commands",
    badge: "12",
    automations: [{ id: "uptime", name: "!uptime", badge: "ON" }],
  },
]

export const PIPELINE: Section[] = [
  {
    label: "Trigger",
    kind: "trigger",
    nodes: [
      {
        id: "n1",
        kind: "trigger",
        module: "Twitch",
        title: "Channel · Follow",
        meta: "twitch.eventsub",
      },
    ],
  },
  {
    label: "Conditions · all must pass",
    kind: "condition",
    insert: "Add condition",
    nodes: [
      {
        id: "n2",
        kind: "condition",
        module: "Viewer",
        title: "Has role",
        meta: "viewer.role ≥ subscriber",
      },
    ],
  },
  {
    label: "Actions · run in parallel",
    kind: "action",
    layout: "fork",
    forkLabel: "Fork",
    insert: "Add action",
    nodes: [
      {
        id: "n3",
        kind: "action",
        module: "Overlay",
        title: "Show alert",
        meta: 'overlay.fire("welcome")',
      },
      {
        id: "n4",
        kind: "action",
        module: "Audio",
        title: "Speak text",
        meta: "audio.tts(elevenlabs)",
      },
    ],
  },
]
