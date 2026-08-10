import { type ModuleManifestRaw } from "@overlaysymphony/core/module"

const manifest: ModuleManifestRaw = {
  label: "Data Store",
  notes: "A key-value data store.",
  script: "./runner.js",
  nodes: {
    init: {
      type: "trigger",
      notes: "The module has finished initialization.",
    },
    contains: {
      type: "logic",
      notes: "Checks for the specified key, stopping if not found.",
      inputs: {
        key: {
          type: "string",
          label: "Key",
          required: true,
        },
      },
      outputs: {
        value: {
          type: "string",
          label: "Value",
        },
      },
    },
    lookup: {
      type: "logic",
      notes: "Looks up the specified key, using the default if not found.",
      inputs: {
        key: {
          type: "string",
          label: "Key",
          required: true,
        },
        fallback: {
          type: "string",
          label: "Fallback",
          required: false,
        },
      },
      outputs: {
        value: {
          type: "string",
          label: "Value",
        },
      },
    },
    changed: {
      type: "trigger",
      notes: "A value has changed, at the named key if provided.",
      inputs: {
        key: {
          type: "string",
          label: "Key",
          required: false,
        },
      },
      outputs: {
        key: {
          type: "string",
          label: "Key",
        },
        value: {
          type: "string",
          label: "Value",
        },
      },
    },
    set: {
      type: "action",
      notes: "Set a value at the named key.",
      inputs: {
        key: {
          type: "string",
          label: "Key",
          required: true,
        },
        value: {
          type: "string",
          label: "Value",
          required: true,
        },
      },
    },
  },
}

export default manifest
