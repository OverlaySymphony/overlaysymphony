import { type ModuleManifestRaw } from "@overlaysymphony/core/module"

const manifest: ModuleManifestRaw = {
  label: "Twitch",
  notes: "A connection to a Twitch channel.",
  script: "./runner.js",
  config: {
    token: {
      scope: "studio",
      type: "custom",
      label: "Twitch Auth",
      required: true,
      script: "./field-auth.js",
      element: "overlaysymfony-twitch-authentication",
    },
  },
  nodes: {
    init: {
      type: "trigger",
      notes: "The module has finished initialization.",
    },
    follow: {
      type: "trigger",
      notes: "A user follows the channel.",
      outputs: {
        user: {
          type: "placeholder", // TODO
          label: "User",
        },
      },
    },
    "chatter-has-role": {
      type: "logic",
      notes: "Checks if the chatter has the given role.",
      inputs: {
        chatter: {
          type: "placeholder", // TODO
          label: "Chatter",
          required: true,
        },
        role: {
          type: "string",
          label: "Role",
          required: true,
        },
      },
    },
    "chat-command": {
      type: "trigger",
      notes: "A user types a `!<command>` in chat.",
      inputs: {
        command: {
          type: "string",
          label: "Command",
          required: true,
        },
        arguments: {
          type: "custom",
          label: "Arguments",
          script: "./field-command-arguments.js",
          element: "os-twitch-command-arguments",
          required: false,
        },
      },
      outputs: {
        chatter: {
          type: "string",
          label: "Chatter",
        },
        channel: {
          type: "string",
          label: "Channel",
        },
        arguments: {
          type: "placeholder", // TODO
          label: "Arguments",
        },
      },
    },
    "chat-send": {
      type: "action",
      notes: "Send a message in chat.",
      inputs: {
        message: {
          type: "string",
          label: "Message",
          required: true,
        },
      },
    },
    "chat-shoutout": {
      type: "action",
      notes: "Send a shoutout in chat.",
      inputs: {
        broadcaster: {
          type: "placeholder", // TODO
          label: "Broadcaster",
          required: true,
        },
      },
    },
  },
}

export default manifest
