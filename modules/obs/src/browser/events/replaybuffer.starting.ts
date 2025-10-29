import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "replaybuffer.starting": ReplaybufferStarting
  }
}

/** Replaybuffer.starting: When the replay buffer is starting. */
type ReplaybufferStarting = EventConfig<{
  Type: "replaybuffer.starting"
  /** The event fired when the replay buffer is starting. */
  Event: {
    status: "starting"
  }
}>

registerEvent("replaybuffer.starting", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsReplaybufferStarting", () => {
      notify({
        type: "replaybuffer.starting",
        event: { status: "starting" },
      })
    })
  },
})
