import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "streaming.stopped": StreamingStopped
  }
}

/** Streaming Stopped: When streaming has fully stopped. */
type StreamingStopped = EventConfig<{
  Type: "streaming.stopped"
  /** The event fired when streaming has fully stopped. */
  Event: {
    status: "inactive"
  }
}>

registerEvent("streaming.stopped", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsStreamingStopped", () => {
      notify({
        type: "streaming.stopped",
        event: { status: "inactive" },
      })
    })
  },
})
