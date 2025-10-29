import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
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
