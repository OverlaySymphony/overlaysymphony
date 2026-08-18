import { type CompositionConfig } from "@overlaysymphony/core/composition"

const composition: CompositionConfig = {
  id: "alerts",
  label: "Alerts",
  secretKey: JSON.stringify({
    alg: "A256GCM",
    ext: true,
    k: "iXp8kKW3pTD2_t2h5oDr0rpWSETIDcz-bk8VpMtWJ-c",
    key_ops: ["encrypt", "decrypt"],
    kty: "oct",
  }),
  modules: {
    elements: {
      label: "Elements",
      module: "elements",
      config: {
        manifest: "./elements-alerts.json",
      },
    },
  },
  automations: {
    follow: {
      type: "rule",
      notes: "Every new follower gets a speech bubble on the overlay.",
      trigger: {
        moduleId: "twitch",
        node: "follow",
      },
      actions: {
        bubble: {
          moduleId: "elements",
          node: "add-element",
          inputs: {
            element: "speech-bubble",
            attributes: {
              text: "Thanks for the follow!",
            },
          },
        },
      },
    },
  },
}

export default composition
