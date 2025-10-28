import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "streaming.started": StreamingStarted
  }
}

/** Streaming Started: When streaming has successfully started. */
type StreamingStarted = EventConfig<{
  Type: "streaming.started"
  /** The event fired when streaming has successfully started. */
  Event: {
    status: "active"
  }
}>

registerEvent("streaming.started", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsStreamingStarted", () => {
      notify({
        type: "streaming.started",
        event: { status: "active" },
      })
    })
  },
})
