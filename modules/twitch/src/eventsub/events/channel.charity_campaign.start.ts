import { BaseSubscription } from "../events-helpers.js"

type CharityCampaignStartType = "channel.charity_campaign.start"
type CharityCampaignStartVersion = "1"

/** The parameters under which an event fires when The broadcaster starts a charity campaign. */
export interface CharityCampaignStartCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when The broadcaster starts a charity campaign. */
export interface CharityCampaignStartEvent {
  /** The ID of the charity campaign. */
  id: string
  /** The user ID of the broadcaster. */
  broadcaster_id: string
  /** The user login of the broadcaster. */
  broadcaster_login: string
  /** The user name of the broadcaster. */
  broadcaster_name: string
  /** The charity's name. */
  charity_name: string
  /** A description of the charity. */
  charity_description: string
  /** A URL to an image of the charity's logo. The image's type is PNG and its size is 100px X 100px. */
  charity_logo: string
  /** A URL to the charity's website. */
  charity_website: string
  /** An object that contains the current amount of donations that the campaign has received. */
  current_amount: {
    /** Integer. The monetary amount. The amount is specified in the currency's minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550. */
    value: number
    /** Integer. The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate value from minor units to major units by using the formula:\n\nvalue / 10^decimal_places */
    decimal_places: number
    /** The ISO-4217 three-letter currency code that identifies the type of currency in value. */
    currency: string
  }
  /** An object that contains the campaign's target fundraising goal. */
  target_amount: {
    /** Integer. The monetary amount. The amount is specified in the currency's minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550. */
    value: number
    /** Integer. The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate value from minor units to major units by using the formula:\n\nvalue / 10^decimal_places */
    decimal_places: number
    /** The ISO-4217 three-letter currency code that identifies the type of currency in value. */
    currency: string
  }
  /** The time the broadcaster started the campaign. */
  started_at: Date
}

/** The event notification received when The broadcaster starts a charity campaign. */
export type CharityCampaignStartSubscription = BaseSubscription<
  CharityCampaignStartType,
  CharityCampaignStartVersion,
  CharityCampaignStartCondition
>

export function makeCharityCampaignStartSubscription(
  userId: string,
): CharityCampaignStartSubscription {
  return {
    type: "channel.charity_campaign.start",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
