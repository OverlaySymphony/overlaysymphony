import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "replaybuffer.stopping": ReplaybufferStopping
  }
}

/** Replaybuffer.stopping: When the replay buffer is stopping. */
type ReplaybufferStopping = EventConfig<{
  Type: "replaybuffer.stopping"
  /** The event fired when the replay buffer is stopping. */
  Event: {
    status: "stopping"
  }
}>

registerEvent("replaybuffer.stopping", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsReplaybufferStopping", () => {
      notify({
        type: "replaybuffer.stopping",
        event: { status: "stopping" },
      })
    })
  },
})
