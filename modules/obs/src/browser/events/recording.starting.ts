import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "recording.starting": RecordingStarting
  }
}

/** Recording Starting: When recording is starting. */
type RecordingStarting = EventConfig<{
  Type: "recording.starting"
  /** The event fired when recording is starting. */
  Event: {
    status: "starting"
  }
}>

registerEvent("recording.starting", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsRecordingStarting", () => {
      notify({
        type: "recording.starting",
        event: { status: "starting" },
      })
    })
  },
})
