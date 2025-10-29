import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "user.update": UserUpdate
  }
}

/** User Update v1: When a user has updated their account. */
type UserUpdate = EventConfig<{
  Type: "user.update"
  Version: "1"
  /** The conditions to listen for when a user has updated their account. */
  Condition: {
    /** The user ID for the user you want update notifications for. */
    user_id: string
  }
  /** The event fired when a user has updated their account. */
  Event: {
    /** The user's user id. */
    user_id: string
    /** The user's user login. */
    user_login: string
    /** The user's user display name. */
    user_name: string
    /** The user's email address. The event includes the user's email address only if the app used to request this event type includes the user:read:email scope for the user; otherwise, the field is set to an empty string. See "Create EventSub Subscription". */
    email: string
    /**
     * A Boolean value that determines whether Twitch has verified the user's email address. Is true if Twitch has verified the email address; otherwise, false.
     *
     * NOTE: Ignore this field if the email field contains an empty string.
     */
    email_verified: boolean
    /** The user's description. */
    description: string
  }
}>

registerEvent("user.update", {
  scopes: ["user:read:email"],
  subscriber: (userId) => ({
    type: "user.update",
    version: "1",
    condition: {
      user_id: userId,
    },
  }),
})
