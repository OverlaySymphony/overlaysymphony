import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "replaybuffer.saved": ReplaybufferSaved
  }
}

/** Replaybuffer.saved: When the replay buffer has been saved. */
type ReplaybufferSaved = EventConfig<{
  Type: "replaybuffer.saved"
  /** The event fired when the replay buffer has been saved. */
  Event: {
    status: "active"
  }
}>

registerEvent("replaybuffer.saved", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsReplaybufferSaved", () => {
      notify({
        type: "replaybuffer.saved",
        event: { status: "active" },
      })
    })
  },
})
