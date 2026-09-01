import { type CompositionConfig } from "@overlaysymphony/core/composition"

const composition: CompositionConfig = {
  id: "games",
  label: "Games",
  secretKey: JSON.stringify({
    alg: "A256GCM",
    ext: true,
    k: "iqdBvwGYg3QKnMqHN2fvOBXyxQ6im8piTDjJGgclrNw",
    key_ops: ["encrypt", "decrypt"],
    kty: "oct",
  }),
  modules: {
    platforms: {
      label: "Platforms",
      module: "datastore",
    },
    codes: {
      label: "Codes",
      module: "datastore",
    },
  },
  automations: {
    friendcode: {
      type: "rule",
      notes: "Provides the friend code for the active game platform or game.",
      trigger: {
        moduleId: "twitch",
        node: "chat-command",
        inputs: {
          command: "friendcode",
        },
      },
      conditions: {
        platform: {
          moduleId: "platforms",
          node: "lookup",
          inputs: {
            key: "${trigger.channel.game_name}",
            fallback: "${trigger.channel.game_name}",
          },
        },
        code: {
          moduleId: "codes",
          node: "contains",
          inputs: {
            key: "${platform.value}",
          },
        },
      },
      actions: {
        output: {
          moduleId: "twitch",
          node: "send-chat-message",
          inputs: {
            message: "Friend Code: ${code.value}",
          },
        },
      },
    },
  },
}

export default composition
