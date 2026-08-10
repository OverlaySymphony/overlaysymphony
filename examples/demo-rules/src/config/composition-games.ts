import { type CompositionConfigRaw } from "@overlaysymphony/core/composition"

const composition: CompositionConfigRaw = {
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
        config: {
          command: "friendcode",
        },
      },
      conditions: {
        platform: {
          moduleId: "platforms",
          node: "lookup",
          config: {
            key: "${channel.game_name}",
            fallback: "${channel.game_name}",
          },
        },
        code: {
          moduleId: "codes",
          node: "contains",
          config: {
            key: "${platform.value}",
          },
        },
      },
      actions: {
        output: {
          moduleId: "twitch",
          node: "send-chat-message",
          config: {
            message: "Friend Code: ${code.value}",
          },
        },
      },
    },
  },
}

export default composition
