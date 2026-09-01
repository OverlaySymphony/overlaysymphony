import { type CompositionConfig } from "@overlaysymphony/core/composition"

const composition: CompositionConfig = {
  id: "core",
  label: "Core",
  secretKey: JSON.stringify({
    alg: "A256GCM",
    ext: true,
    k: "deNSH6gfkCErtIES1gionrfNWHnQDQmAJvfmFgChMwc",
    key_ops: ["encrypt", "decrypt"],
    kty: "oct",
  }),
  automations: {
    greeting: {
      type: "rule",
      notes:
        "A dock button that logs a greeting two seconds after it is pressed.",
      trigger: {
        moduleId: "@core",
        node: "manual",
        inputs: {
          label: "Say Hello",
        },
      },
      conditions: {
        pause: {
          moduleId: "@core",
          node: "delay",
          inputs: {
            duration: 2,
          },
        },
      },
      actions: {
        entry: {
          moduleId: "@core",
          node: "log",
          inputs: {
            message: "Hello, two seconds later.",
            status: "ok",
          },
        },
      },
    },
    heartbeat: {
      type: "rule",
      notes:
        "Logs an entry every minute, so a quiet stream still shows the system is alive.",
      trigger: {
        moduleId: "@core",
        node: "interval",
        inputs: {
          duration: 60,
        },
      },
      actions: {
        entry: {
          moduleId: "@core",
          node: "log",
          inputs: {
            source: "heartbeat",
            message: "Still running.",
            status: "info",
          },
        },
      },
    },
  },
}

export default composition
