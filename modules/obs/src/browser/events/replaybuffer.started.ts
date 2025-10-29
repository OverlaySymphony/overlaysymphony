import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "replaybuffer.started": ReplaybufferStarted
  }
}

/** Replaybuffer.started: When the replay buffer has successfully started. */
type ReplaybufferStarted = EventConfig<{
  Type: "replaybuffer.started"
  /** The event fired when the replay buffer has successfully started. */
  Event: {
    status: "active"
  }
}>

registerEvent("replaybuffer.started", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsReplaybufferStarted", () => {
      notify({
        type: "replaybuffer.started",
        event: { status: "active" },
      })
    })
  },
})
