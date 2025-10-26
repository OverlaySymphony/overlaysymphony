import { type EventConfig, registerEvent } from "../events-helpers.js"

declare module "../events-helpers.js" {
  interface EventConfigs {
    "automod.settings.update": AutomodSettingsUpdate
  }
}

/** Automod Settings Update v1: When the broadcaster's automod settings are updated. */
type AutomodSettingsUpdate = EventConfig<{
  Type: "automod.settings.update"
  Version: "1"
  /** The conditions to listen for when the broadcaster's automod settings are updated. */
  Condition: {
    /** User ID of the broadcaster (channel). Maximum:1. */
    broadcaster_user_id: string
    /** User ID of the moderator. */
    moderator_user_id: string
  }
  /** The event fired when the broadcaster's automod settings are updated. */
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
    /** The Automod level for hostility involving name calling or insults. */
    bullying: number
    /** The default AutoMod level for the broadcaster. This field is null if the broadcaster has set one or more of the individual settings. */
    overall_level: number
    /** The Automod level for discrimination against disability. */
    disability: number
    /** The Automod level for racial discrimination. */
    race_ethnicity_or_religion: number
    /** The Automod level for discrimination against women. */
    misogyny: number
    /** The AutoMod level for discrimination based on sexuality, sex, or gender. */
    sexuality_sex_or_gender: number
    /** The Automod level for hostility involving aggression. */
    aggression: number
    /** The Automod level for sexual content. */
    sex_based_terms: number
    /** The Automod level for profanity. */
    swearing: number
  }
}>

registerEvent("automod.settings.update", {
  scopes: ["moderator:read:automod"],
  subscriber: (userId) => ({
    type: "automod.settings.update",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
      moderator_user_id: userId,
    },
  }),
})
