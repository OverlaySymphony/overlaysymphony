import { type ModuleManifestRaw } from "@overlaysymphony/core/module"

const manifest: ModuleManifestRaw = {
  label: "Elements",
  notes: "Facilitates interaction with elements displaying on the scene.",
  script: "./runner.js",
  config: {
    manifest: {
      type: "string",
      label: "Manifest URL",
      notes:
        "the URL of the element manifest describing the available elements",
      required: true,
    },
  },
  nodes: {
    init: {
      type: "trigger",
      notes: "The module finished initializing.",
    },
    "add-element": {
      type: "action",
      notes:
        "Adds one of the available elements, optionally running one of its actions.",
      inputs: {
        id: {
          type: "string",
          label: "Id",
          notes: "only needed so a later automation can reference this element",
          required: false,
        },
        element: {
          type: "string",
          label: "Element",
          notes: "which of the available elements to add",
          required: true,
        },
        attributes: {
          type: "fields",
          label: "Attributes",
          notes: "the element's attributes",
          required: false,
          fields: {}, // TODO: runtime definition
        },
        action: {
          type: "string",
          label: "Action",
          notes: "one of the element's actions to run",
          required: false,
        },
        arguments: {
          type: "fields",
          label: "Arguments",
          notes: "the arguments for the action",
          required: false,
          fields: {}, // TODO: runtime definition
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
          notes: "the element to remove",
          required: true,
        },
      },
    },
    "run-action": {
      type: "action",
      notes: "Calls one of an existing element's own actions.",
      inputs: {
        id: {
          type: "string",
          label: "Id",
          notes: "the element to act on",
          required: true,
        },
        action: {
          type: "string",
          label: "Action",
          notes: "which of the element's actions to call",
          required: true,
        },
        arguments: {
          type: "fields",
          label: "Arguments",
          notes: "the arguments for the action",
          required: false,
          fields: {}, // TODO: runtime definition
        },
      },
    },
  },
}

export default manifest
