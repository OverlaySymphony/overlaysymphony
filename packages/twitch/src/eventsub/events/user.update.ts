import { BaseSubscription } from "../events-helpers.js"

type UserUpdateType = "user.update"
type UserUpdateVersion = "1"

/** The parameters under which an event fires when A user updateds their account. */
export interface UserUpdateCondition {
  /** The user ID. */
  user_id: string
}

/** The event information when A user updateds their account. */
export interface UserUpdateEvent {
  /** The user ID of the user who was updated. */
  user_id: string
  /** The user login of the user who was updated. */
  user_login: string
  /** The user name of the user who was updated. */
  user_name: string
  /** The user email address. The event includes the user's email address only if the app used to request this event type includes the user:read:email scope for the user; otherwise, the field is set to an empty string. See Create EventSub Subscription. */
  email: string
  /** A Boolean value that determines whether Twitch has verified the user's email address. Is true if Twitch has verified the email address; otherwise, false.\n\nNOTE: Ignore this field if the email field contains an empty string. */
  email_verified: boolean
  /** The user description. */
  description: string
}

/** The event notification received when A user updateds their account. */
export type UserUpdateSubscription = BaseSubscription<
  UserUpdateType,
  UserUpdateVersion,
  UserUpdateCondition
>

export function makeUserUpdateSubscription(
  userId: string,
): UserUpdateSubscription {
  return {
    type: "user.update",
    version: "1",
    condition: {
      user_id: userId,
    },
  }
}
