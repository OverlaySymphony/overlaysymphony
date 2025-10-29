import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "source.active": SourceActive
  }
}

/** Source Active: When This source changes active. */
type SourceActive = EventConfig<{
  Type: "source.active"
  /** The event fired when This source changes active. */
  Event: {
    active: boolean
  }
}>

registerEvent("source.active", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsSourceActiveChanged", (event) => {
      notify({
        type: "source.active",
        event: { active: event.detail.active },
      })
    })
  },
})
