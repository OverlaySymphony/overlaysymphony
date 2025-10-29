import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "source.visible": SourceVisible
  }
}

/** Source Visible: When This source changes visible. */
type SourceVisible = EventConfig<{
  Type: "source.visible"
  /** The event fired when This source changes visible. */
  Event: {
    visible: boolean
  }
}>

registerEvent("source.visible", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsSourceVisibleChanged", (event) => {
      notify({
        type: "source.visible",
        event: { visible: event.detail.visible },
      })
    })
  },
})
