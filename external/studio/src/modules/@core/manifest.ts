import { type ModuleManifestRaw } from "@overlaysymphony/core/module"

const manifest: ModuleManifestRaw = {
  label: "Core",
  notes: "Core features intrinsic to the system.",
  script: "./runner.js",
  nodes: {
    "composition-init": {
      type: "trigger",
      notes: "The composition has finished initialization.",
    },
    fire: {
      type: "trigger",
      notes: "Fires when the named event is raised manually from the dock.",
      inputs: {
        event: {
          type: "string",
          label: "Event",
          required: true,
        },
      },
    },
    delay: {
      type: "action",
      notes: "Waits before the following actions run.",
      inputs: {
        duration: {
          type: "number",
          label: "Duration",
          notes: "in Seconds",
          required: true,
        },
      },
    },
  },
}

export default manifest
