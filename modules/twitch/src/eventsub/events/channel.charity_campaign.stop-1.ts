import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.charity_campaign.stop": ChannelCharityCampaignStop
  }
}

/** Channel Charity Campaign Stop v1: When the broadcaster stops a charity campaign. */
type ChannelCharityCampaignStop = EventConfig<{
  Type: "channel.charity_campaign.stop"
  Version: "1"
  /** The conditions to listen for when the broadcaster stops a charity campaign. */
  Condition: {
    /** The ID of the broadcaster that you want to receive notifications about when they stop a charity campaign. */
    broadcaster_user_id: string
  }
  /** The event fired when the broadcaster stops a charity campaign. */
  Event: {
    /** An ID that identifies the charity campaign. */
    id: string
    /** An ID that identifies the broadcaster that ran the campaign. */
    broadcaster_id: string
    /** The broadcaster's login name. */
    broadcaster_login: string
    /** The broadcaster's display name. */
    broadcaster_name: string
    /** The charity's name. */
    charity_name: string
    /** A description of the charity. */
    charity_description: string
    /** A URL to an image of the charity's logo. The image's type is PNG and its size is 100px X 100px. */
    charity_logo: string
    /** A URL to the charity's website. */
    charity_website: string
    /** An object that contains the final amount of donations that the campaign received. */
    current_amount: {
      /** The monetary amount. The amount is specified in the currency's minor unit. */
      value: number
      /**
       * The number of decimal places used by the currency.
       *
       * value / 10^decimal_places
       */
      decimal_places: number
      /** The ISO-4217 three-letter currency code that identifies the type of currency in value. */
      currency: string
    }
    /** An object that contains the campaign's target fundraising goal. */
    target_amount: {
      /** The monetary amount. The amount is specified in the currency's minor unit. */
      value: number
      /**
       * The number of decimal places used by the currency.
       *
       * value / 10^decimal_places
       */
      decimal_places: number
      /** The ISO-4217 three-letter currency code that identifies the type of currency in value. */
      currency: string
    }
    /** The UTC timestamp (in RFC3339 format) of when the broadcaster stopped the campaign. */
    stopped_at: string
  }
}>

registerEvent("channel.charity_campaign.stop", {
  scopes: ["channel:read:charity"],
  subscriber: (userId) => ({
    type: "channel.charity_campaign.stop",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
