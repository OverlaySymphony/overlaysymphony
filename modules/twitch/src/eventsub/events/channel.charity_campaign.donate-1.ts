import { type EventConfig, registerEvent } from "../events-helpers.ts"

declare module "../events-helpers.ts" {
  interface EventConfigs {
    "channel.charity_campaign.donate": ChannelCharityCampaignDonate
  }
}

/** Channel Charity Campaign Donate v1: When a user donates to the broadcaster's charity campaign. */
type ChannelCharityCampaignDonate = EventConfig<{
  Type: "channel.charity_campaign.donate"
  Version: "1"
  /** The conditions to listen for when a user donates to the broadcaster's charity campaign. */
  Condition: {
    /** The ID of the broadcaster that you want to receive notifications about when users donate to their campaign. */
    broadcaster_user_id: string
  }
  /** The event fired when a user donates to the broadcaster's charity campaign. */
  Event: {
    /** An ID that identifies the donation. The ID is unique across campaigns. */
    id: string
    /** An ID that identifies the charity campaign. */
    campaign_id: string
    /** An ID that identifies the broadcaster that's running the campaign. */
    broadcaster_user_id: string
    /** The broadcaster's login name. */
    broadcaster_user_login: string
    /** The broadcaster's display name. */
    broadcaster_user_name: string
    /** An ID that identifies the user that donated to the campaign. */
    user_id: string
    /** The user's login name. */
    user_login: string
    /** The user's display name. */
    user_name: string
    /** The charity's name. */
    charity_name: string
    /** A description of the charity. */
    charity_description: string
    /** A URL to an image of the charity's logo. The image's type is PNG and its size is 100px X 100px. */
    charity_logo: string
    /** A URL to the charity's website. */
    charity_website: string
    /** An object that contains the amount of money that the user donated. */
    amount: {
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
  }
}>

registerEvent("channel.charity_campaign.donate", {
  scopes: ["channel:read:charity"],
  subscriber: (userId) => ({
    type: "channel.charity_campaign.donate",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }),
})
