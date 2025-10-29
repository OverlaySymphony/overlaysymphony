import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "recording.stopping": RecordingStopping
  }
}

/** Recording.stopping: When recording is stopping. */
type RecordingStopping = EventConfig<{
  Type: "recording.stopping"
  /** The event fired when recording is stopping. */
  Event: {
    status: "stopping"
  }
}>

registerEvent("recording.stopping", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsRecordingStopping", () => {
      notify({
        type: "recording.stopping",
        event: { status: "stopping" },
      })
    })
  },
})
