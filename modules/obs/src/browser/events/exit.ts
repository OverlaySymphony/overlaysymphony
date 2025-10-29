import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    exit: Exit
  }
}

/** Exit: When The program is about to exit. This is the last chance to call any frontend API functions for any saving / cleanup / etc. After returning from this event callback, it is not permitted to make any further frontend API calls. */
type Exit = EventConfig<{
  Type: "exit"
  /** The event fired when The program is about to exit. This is the last chance to call any frontend API functions for any saving / cleanup / etc. After returning from this event callback, it is not permitted to make any further frontend API calls. */
  Event: {
    status: "exiting"
  }
}>

registerEvent("exit", {
  permissions: "READ_OBS",
  subscribe: async (notify) => {
    window.addEventListener("obsExit", () => {
      notify({
        type: "exit",
        event: { status: "exiting" },
      })
    })
  },
})
