import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "user.whisper.message": UserWhisperMessage
  }
}

/** User Whisper Message v1: When a user receives a whisper. */
type UserWhisperMessage = EventConfig<{
  Type: "user.whisper.message"
  Version: "1"
  /** The conditions to listen for when a user receives a whisper. */
  Condition: {
    /** The user_id of the person receiving whispers. */
    user_id: string
  }
  /** The event fired when a user receives a whisper. */
  Event: {
    /** The ID of the user sending the message. */
    from_user_id: string
    /** The name of the user sending the message. */
    from_user_name: string
    /** The login of the user sending the message. */
    from_user_login: string
    /** The ID of the user receiving the message. */
    to_user_id: string
    /** The name of the user receiving the message. */
    to_user_name: string
    /** The login of the user receiving the message. */
    to_user_login: string
    /** The whisper ID. */
    whisper_id: string
    /** Object containing whisper information. */
    whisper: {
      /** The body of the whisper message. */
      text: string
    }
  }
}>

registerEvent("user.whisper.message", {
  scopes: ["user:manage:whispers", "user:read:whispers"],
  subscriber: (userId) => ({
    type: "user.whisper.message",
    version: "1",
    condition: {
      user_id: userId,
    },
  }),
})
