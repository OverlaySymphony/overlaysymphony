import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    scene: Scene
  }
}

/** Scene Change: When The current scene has changed. */
type Scene = EventConfig<{
  Type: "scene"
  /** The event fired when The current scene has changed. */
  Event: {
    scene: string
  }
}>

registerEvent("scene", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsSceneChanged", (event) => {
      notify({
        type: "scene",
        event: { scene: event.detail.name },
      })
    })
  },
})
