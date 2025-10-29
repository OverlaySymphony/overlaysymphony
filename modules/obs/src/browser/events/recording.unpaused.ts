import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "recording.unpaused": RecordingUnpaused
  }
}

/** Recording.unpaused: When the recording has been unpaused. */
type RecordingUnpaused = EventConfig<{
  Type: "recording.unpaused"
  /** The event fired when the recording has been unpaused. */
  Event: {
    status: "active"
  }
}>

registerEvent("recording.unpaused", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsRecordingUnpaused", () => {
      notify({
        type: "recording.unpaused",
        event: { status: "active" },
      })
    })
  },
})
