import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "streaming.starting": StreamingStarting
  }
}

/** Streaming Starting: When streaming is starting. */
type StreamingStarting = EventConfig<{
  Type: "streaming.starting"
  /** The event fired when streaming is starting. */
  Event: {
    status: "starting"
  }
}>

registerEvent("streaming.starting", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsStreamingStarting", () => {
      notify({
        type: "streaming.starting",
        event: { status: "starting" },
      })
    })
  },
})
