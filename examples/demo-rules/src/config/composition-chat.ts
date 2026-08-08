import { type CompositionConfigString } from "studio/controller"

const composition: CompositionConfigString = {
  id: "chat",
  label: "Chat",
  secretKey: JSON.stringify({
    alg: "A256GCM",
    ext: true,
    k: "jncoqV5gzc5NKzwUc5K_HQh8kcLdj7fylmqlm8HQvMM",
    key_ops: ["encrypt", "decrypt"],
    kty: "oct",
  }),
  automations: {
    shoutout: {
      type: "rule",
      notes:
        "A moderator running `!so <user>` gets a plug in chat and a Twitch shoutout for the target.",
      trigger: {
        moduleId: "twitch",
        node: "chat-command",
        config: {
          command: "so",
          arguments: [
            {
              id: "target",
              type: "channel",
              required: true,
            },
          ],
        },
      },
      conditions: {
        moderator: {
          moduleId: "twitch",
          node: "chatter-has-role",
          config: {
            chatter: "${chatter}",
            role: "moderator",
          },
        },
      },
      actions: {
        plug: {
          moduleId: "twitch",
          node: "chat-send",
          config: {
            message: "check out @${target.broadcaster_login}",
          },
        },
        shoutout: {
          moduleId: "twitch",
          node: "chat-shoutout",
          config: {
            broadcaster: "${target.broadcaster_id}",
          },
        },
      },
    },
  },
}

export default composition
