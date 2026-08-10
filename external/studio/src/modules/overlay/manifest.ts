import { type ModuleManifestRaw } from "@overlaysymphony/core/module"

const manifest: ModuleManifestRaw = {
  label: "Overlay",
  notes: "A set of overlay elements to display on the scene.",
  script: "./runner.js",
  config: {
    manifest: {
      type: "string",
      label: "Manifest URL",
      required: true,
    },
  },
  nodes: {
    init: {
      type: "trigger",
      notes: "The module has finished initialization.",
    },
    "add-element": {
      type: "action",
      notes: "Adds one of the manifest's elements.",
      inputs: {
        id: {
          type: "string",
          label: "Id",
          notes: "Required only to reference the element from another action.",
          required: false,
        },
        element: {
          type: "string",
          label: "Element",
          notes: "A key from the manifest's elements.",
          required: true,
        },
        attributes: {
          type: "fields",
          label: "Attributes",
          required: false,
          fields: {}, // TODO
        },
      },
    },
    "remove-element": {
      type: "action",
      notes: "Removes one of the existing elements.",
      inputs: {
        id: {
          type: "string",
          label: "Id",
          required: true,
        },
      },
    },
    "run-action": {
      type: "action",
      notes: "Calls one of the element's own actions.",
      inputs: {
        id: {
          type: "string",
          label: "Id",
          required: true,
        },
        action: {
          type: "string",
          label: "Action",
          notes: "A key from the element's actions.",
          required: true,
        },
        arguments: {
          type: "fields",
          label: "Arguments",
          required: false,
          fields: {}, // TODO
        },
      },
    },
  },
}

export default manifest
