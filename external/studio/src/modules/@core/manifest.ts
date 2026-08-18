import { type ModuleManifest } from "@overlaysymphony/core/module"

const manifest = {
  label: "Core",
  notes:
    "Provides foundational logic for event routing, timing, and data manipulation.",
  editorScript: "./runner-editor.js",
  dockScript: "./runner-dock.js",
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
      type: "action",
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
  },
} satisfies ModuleManifest

export default manifest
