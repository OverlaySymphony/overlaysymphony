import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "recording.paused": RecordingPaused
  }
}

/** Recording.paused: When the recording has been paused. */
type RecordingPaused = EventConfig<{
  Type: "recording.paused"
  /** The event fired when the recording has been paused. */
  Event: {
    status: "paused"
  }
}>

registerEvent("recording.paused", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsRecordingPaused", () => {
      notify({
        type: "recording.paused",
        event: { status: "paused" },
      })
    })
  },
})
