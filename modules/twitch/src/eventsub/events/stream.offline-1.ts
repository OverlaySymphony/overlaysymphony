import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "stream.offline": StreamOffline
  }
}

/** Stream Offline v1: When the specified broadcaster stops a stream. */
type StreamOffline = EventConfig<{
  Type: "stream.offline"
  Version: "1"
  /** The conditions to listen for when the specified broadcaster stops a stream. */
  Condition: {
    /** The broadcaster user ID you want to get stream offline notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when the specified broadcaster stops a stream. */
  Event: {
    /** The broadcaster's user id. */
    broadcaster_user_id: string
    /** The broadcaster's user login. */
    broadcaster_user_login: string
    /** The broadcaster's user display name. */
    broadcaster_user_name: string
  }
}>

registerEvent("stream.offline", {
  scopes: [],
  subscriber: (userId) => ({
    type: "stream.offline",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
