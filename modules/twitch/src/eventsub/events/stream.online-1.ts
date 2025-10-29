import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "stream.online": StreamOnline
  }
}

/** Stream Online v1: When the specified broadcaster starts a stream. */
type StreamOnline = EventConfig<{
  Type: "stream.online"
  Version: "1"
  /** The conditions to listen for when the specified broadcaster starts a stream. */
  Condition: {
    /** The broadcaster user ID you want to get stream online notifications for. */
    broadcaster_user_id: string
  }
  /** The event fired when the specified broadcaster starts a stream. */
  Event: {
    /** The id of the stream. */
    id: string
    /** The broadcaster's user id. */
    broadcaster_user_id: string
    /** The broadcaster's user login. */
    broadcaster_user_login: string
    /** The broadcaster's user display name. */
    broadcaster_user_name: string
    /** The stream type. Valid values are: live, playlist, watch_party, premiere, rerun. */
    type: string
    /** The timestamp at which the stream went online at. */
    started_at: string
  }
}>

registerEvent("stream.online", {
  scopes: [],
  subscriber: (userId) => ({
    type: "stream.online",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
