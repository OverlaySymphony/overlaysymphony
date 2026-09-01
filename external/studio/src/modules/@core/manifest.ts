import { type ModuleManifest } from "@overlaysymphony/core/module"

const manifest = {
  label: "Core",
  notes:
    "Provides foundational logic for event routing, timing, and data manipulation.",
  editorScript: "./runner-editor.js",
  ownerScript: "./runner-owner.js",
  overlayScript: "./runner-overlay.js",
  nodes: {
    "composition-init": {
      type: "trigger",
      notes: "The composition finished initializing.",
      outputs: {},
    },
    manual: {
      type: "trigger",
      notes: "The dock button was pressed.",
      inputs: {
        label: {
          type: "string",
          label: "Label",
          notes: "the text of the button",
          required: true,
        },
      },
      outputs: {},
    },
    delay: {
      type: "logic",
      notes: "Waits before the following nodes run.",
      inputs: {
        duration: {
          type: "number",
          label: "Duration",
          notes: "how long to wait, in seconds",
          required: true,
        },
      },
      outputs: {},
    },
    interval: {
      type: "trigger",
      notes: "Runs every configured duration.",
      inputs: {
        duration: {
          type: "number",
          label: "Duration",
          notes: "how long to wait, in seconds",
          required: true,
        },
      },
      outputs: {},
    },
    log: {
      type: "action",
      notes: "Writes an entry to the dock event log.",
      inputs: {
        source: {
          type: "string",
          label: "Source",
          notes:
            "what the entry is attributed to, defaulting to the automation",
          required: false,
        },
        message: {
          type: "string",
          label: "Message",
          notes: "the text of the entry",
          required: true,
        },
        status: {
          type: "string", // TODO: enum "ok" | "info" | "warn" | "err"
          label: "Status",
          notes: "one of ok, info, warn, err",
          required: true,
        },
      },
      outputs: {},
    },
  },
} satisfies ModuleManifest

export default manifest
