import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "virtualcam.started": VirtualcamStarted
  }
}

/** Virtualcam.started: When the virtual camera is started. */
type VirtualcamStarted = EventConfig<{
  Type: "virtualcam.started"
  /** The event fired when the virtual camera is started. */
  Event: {
    status: "active"
  }
}>

registerEvent("virtualcam.started", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsVirtualcamStarted", () => {
      notify({
        type: "virtualcam.started",
        event: { status: "active" },
      })
    })
  },
})
