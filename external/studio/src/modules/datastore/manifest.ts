import { type ModuleManifest } from "@overlaysymphony/core/module"

const manifest = {
  label: "Data Store",
  notes: "Manages a persistent, scoped state of text values.",
  editorScript: "./runner-editor.js",
  ownerScript: "./runner-owner.js",
  overlayScript: "./runner-overlay.js",
  config: {
    duration: {
      scope: "editor",
      type: "string", // TODO: enum "forever" | "session"
      label: "Duration",
      notes: "how long the data is maintained",
      required: true,
    },
  },
  nodes: {
    init: {
      type: "trigger",
      notes: "The module finished initializing.",
    },
    changed: {
      type: "trigger",
      notes: "A value changed, at the named key if provided.",
      inputs: {
        key: {
          type: "string",
          label: "Key",
          notes: "the single key to watch, rather than the whole store",
          required: false,
        },
      },
      outputs: {
        key: {
          type: "string",
          label: "Key",
          notes: "the key that changed",
        },
        value: {
          type: "string",
          label: "Value",
          notes: "the new value",
        },
      },
    },
    contains: {
      type: "logic",
      notes:
        "Checks for the specified key, stopping the automation if it is not found.",
      inputs: {
        key: {
          type: "string",
          label: "Key",
          notes: "the key to look for",
          required: true,
        },
      },
      outputs: {
        key: {
          type: "string",
          label: "Key",
          notes: "the key that was found",
        },
        value: {
          type: "string",
          label: "Value",
          notes: "the stored value",
        },
      },
    },
    lookup: {
      type: "logic",
      notes:
        "Looks up the specified key, continuing either way and using the fallback if it is not found.",
      inputs: {
        key: {
          type: "string",
          label: "Key",
          notes: "the key to look for",
          required: true,
        },
        fallback: {
          type: "string",
          label: "Fallback",
          notes: "used when the key is missing",
          required: false,
        },
      },
      outputs: {
        key: {
          type: "string",
          label: "Key",
          notes: "the key that was found",
        },
        value: {
          type: "string",
          label: "Value",
          notes: "the stored value, or the fallback",
        },
      },
    },
    set: {
      type: "action",
      notes: "Sets a value at the named key.",
      inputs: {
        key: {
          type: "string",
          label: "Key",
          notes: "the key to write",
          required: true,
        },
        value: {
          type: "string",
          label: "Value",
          notes: "the value to store",
          required: true,
        },
      },
    },
  },
} satisfies ModuleManifest

export default manifest
