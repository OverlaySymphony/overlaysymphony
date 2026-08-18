import { type ModuleManifest } from "@overlaysymphony/core/module"

const manifest = {
  label: "Twitch",
  notes: "Integrates with Twitch to handle events and call actions.",
  editorScript: "./runner-editor.js",
  dockScript: "./runner-dock.js",
  overlayScript: "./runner-overlay.js",
  config: {
    authentication: {
      scope: "studio",
      type: "custom",
      label: "Twitch Auth",
      notes: "the authenticated Twitch account",
      required: true,
      script: "./field-auth.js",
      element: "overlaysymfony-twitch-authentication",
    },
  },
  nodes: {
    init: {
      type: "trigger",
      notes: "The module finished initializing.",
    },
    "chat-command": {
      type: "trigger",
      notes: "A chatter typed a `!<command>` in chat.",
      inputs: {
        command: {
          type: "string",
          label: "Command",
          notes: "the command name to look for",
          required: true,
        },
        arguments: {
          type: "custom",
          label: "Arguments",
          notes: "the named arguments the command accepts",
          script: "./field-command-arguments.js",
          element: "os-twitch-command-arguments",
          required: false,
        },
      },
      outputs: {
        chatter: {
          type: "placeholder", // TODO: Twitch Chatter
          label: "Chatter",
          notes: "the originating chatter",
        },
        channel: {
          type: "placeholder", // TODO: Twitch Channel
          label: "Channel",
          notes: "the channel the command was used in",
        },
        arguments: {
          type: "placeholder", // TODO: runtime definition
          label: "Arguments",
          notes: "the parsed arguments, by name",
        },
      },
    },
    "chat-message": {
      type: "trigger",
      notes: "A chatter sent a message in chat.",
      outputs: {
        chatter: {
          type: "placeholder", // TODO: Twitch Chatter
          label: "Chatter",
          notes: "the originating chatter",
        },
        message: {
          type: "string",
          label: "Message",
          notes: "the chat message",
        },
      },
    },
    follow: {
      type: "trigger",
      notes: "A chatter followed the channel.",
      outputs: {
        chatter: {
          type: "placeholder", // TODO: Twitch Chatter
          label: "Chatter",
          notes: "the originating chatter",
        },
      },
    },
    "first-interaction": {
      type: "trigger",
      notes:
        "A chatter interacted with the channel for the first time, whether by chatting, redeeming, or otherwise.",
      outputs: {
        chatter: {
          type: "placeholder", // TODO: Twitch Chatter
          label: "Chatter",
          notes: "the originating chatter",
        },
      },
    },
    "send-chat-message": {
      type: "action",
      notes: "Sends a message to Twitch chat.",
      inputs: {
        message: {
          type: "string",
          label: "Message",
          notes: "the message",
          required: true,
        },
      },
    },
    "send-chat-shoutout": {
      type: "action",
      notes: "Executes a Twitch shoutout for the target broadcaster.",
      inputs: {
        broadcaster: {
          type: "string",
          label: "Broadcaster",
          notes: "the target broadcaster",
          required: true,
        },
      },
    },
    "chatter-has-role": {
      type: "logic",
      notes: "Checks whether the chatter holds any of the given roles.",
      inputs: {
        chatter: {
          type: "placeholder", // TODO: Twitch Chatter
          label: "Chatter",
          notes: "the chatter to check",
          required: true,
        },
        roles: {
          type: "string", // TODO: list of strings
          label: "Roles",
          notes: "any of streamer, editor, moderator, vip, subscriber",
          required: true,
        },
      },
    },
  },
} satisfies ModuleManifest

export default manifest
