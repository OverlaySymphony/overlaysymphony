import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "replaybuffer.stopped": ReplaybufferStopped
  }
}

/** Replaybuffer.stopped: When the replay buffer has fully stopped. */
type ReplaybufferStopped = EventConfig<{
  Type: "replaybuffer.stopped"
  /** The event fired when the replay buffer has fully stopped. */
  Event: {
    status: "inactive"
  }
}>

registerEvent("replaybuffer.stopped", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsReplaybufferStopped", () => {
      notify({
        type: "replaybuffer.stopped",
        event: { status: "inactive" },
      })
    })
  },
})
