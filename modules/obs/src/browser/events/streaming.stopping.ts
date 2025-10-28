import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "streaming.stopping": StreamingStopping
  }
}

/** Streaming Stopping: When streaming is stopping. */
type StreamingStopping = EventConfig<{
  Type: "streaming.stopping"
  /** The event fired when streaming is stopping. */
  Event: {
    status: "stopping"
  }
}>

registerEvent("streaming.stopping", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsStreamingStopping", () => {
      notify({
        type: "streaming.stopping",
        event: { status: "stopping" },
      })
    })
  },
})
