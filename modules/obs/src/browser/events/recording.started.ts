import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "recording.started": RecordingStarted
  }
}

/** Recording Started: When recording has successfully started. */
type RecordingStarted = EventConfig<{
  Type: "recording.started"
  /** The event fired when recording has successfully started. */
  Event: {
    status: "active"
  }
}>

registerEvent("recording.started", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsRecordingStarted", () => {
      notify({
        type: "recording.started",
        event: { status: "active" },
      })
    })
  },
})
