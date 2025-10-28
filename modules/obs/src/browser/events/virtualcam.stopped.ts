import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "virtualcam.stopped": VirtualcamStopped
  }
}

/** Virtualcam.stopped: When the virtual camera is stopped. */
type VirtualcamStopped = EventConfig<{
  Type: "virtualcam.stopped"
  /** The event fired when the virtual camera is stopped. */
  Event: {
    status: "inactive"
  }
}>

registerEvent("virtualcam.stopped", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsVirtualcamStopped", () => {
      notify({
        type: "virtualcam.stopped",
        event: { status: "inactive" },
      })
    })
  },
})
