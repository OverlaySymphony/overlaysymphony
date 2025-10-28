import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "recording.stopped": RecordingStopped
  }
}

/** Recording.stopped: When recording has fully stopped. */
type RecordingStopped = EventConfig<{
  Type: "recording.stopped"
  /** The event fired when recording has fully stopped. */
  Event: {
    status: "inactive"
  }
}>

registerEvent("recording.stopped", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsRecordingStopped", () => {
      notify({
        type: "recording.stopped",
        event: { status: "inactive" },
      })
    })
  },
})
