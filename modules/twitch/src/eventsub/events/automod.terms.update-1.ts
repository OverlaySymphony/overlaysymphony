import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "automod.terms.update": AutomodTermsUpdate
  }
}

/** Automod Terms Update v1: When the broadcaster's automod terms are updated. Changes to private terms are not sent. */
type AutomodTermsUpdate = EventConfig<{
  Type: "automod.terms.update"
  Version: "1"
  /** The conditions to listen for when the broadcaster's automod terms are updated. Changes to private terms are not sent. */
  Condition: {
    /** User ID of the broadcaster (channel). Maximum:1. */
    broadcaster_user_id: string
    /** User ID of the moderator creating the subscription. Maximum:1 */
    moderator_user_id: string
  }
  /** The event fired when the broadcaster's automod terms are updated. Changes to private terms are not sent. */
  Event: {
    /** The ID of the broadcaster specified in the request. */
    broadcaster_user_id: string
    /** The login of the broadcaster specified in the request. */
    broadcaster_user_login: string
    /** The user name of the broadcaster specified in the request. */
    broadcaster_user_name: string
    /** The ID of the moderator who changed the channel settings. */
    moderator_user_id: string
    /** The moderator's login. */
    moderator_user_login: string
    /** The moderator's user name. */
    moderator_user_name: string
    /**
     * The status change applied to the terms. Possible options are:
     * - add_permitted
     * - remove_permitted
     * - add_blocked
     * - remove_blocked
     */
    action: string
    /** Indicates whether this term was added due to an Automod message approve/deny action. */
    from_automod: boolean
    /** The list of terms that had a status change. */
    terms: string[]
  }
}>

registerEvent("automod.terms.update", {
  scopes: ["moderator:manage:automod"],
  subscriber: (userId) => ({
    type: "automod.terms.update",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
