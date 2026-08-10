import { type ModuleManifestRaw } from "@overlaysymphony/core/module"

const manifest: ModuleManifestRaw = {
  label: "Core",
  notes:
    "Provides foundational logic for event routing, timing, and data manipulation.",
  script: "./runner.js",
  nodes: {
    "composition-init": {
      type: "trigger",
      notes: "The composition finished initializing.",
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
    },
  },
}

export default manifest
