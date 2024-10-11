import { BaseSubscription } from "../events-helpers"

type CharityDonationType = "channel.charity_campaign.donate"
type CharityDonationVersion = "1"

/** The parameters under which an event fires when A user donates to the broadcaster's charity campaign. */
export interface CharityDonationCondition {
  /** The user ID of the broadcaster. */
  broadcaster_user_id: string
}

/** The event information when A user donates to the broadcaster's charity campaign. */
export interface CharityDonationEvent {
  /** An ID of the donation. The ID is unique across campaigns. */
  id: string
  /** The ID of the charity campaign. */
  campaign_id: string
  /** The user ID of the broadcaster. */
  broadcaster_id: string
  /** The user login of the broadcaster. */
  broadcaster_login: string
  /** The user name of the broadcaster. */
  broadcaster_name: string
  /** The user ID of the user who donated to the campaign. */
  user_id: string
  /** The user login of the user who donated to the campaign. */
  user_login: string
  /** The user name of the user who donated to the campaign. */
  user_name: string
  /** The charity's name. */
  charity_name: string
  /** A description of the charity. */
  charity_description: string
  /** A URL to an image of the charity's logo. The image's type is PNG and its size is 100px X 100px. */
  charity_logo: string
  /** A URL to the charity's website. */
  charity_website: string
  /** An object that contains the current amount of donations that the campaign has received. */
  amount: {
    /** Integer. The monetary amount. The amount is specified in the currency's minor unit. For example, the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550. */
    value: number
    /** Integer. The number of decimal places used by the currency. For example, USD uses two decimal places. Use this number to translate value from minor units to major units by using the formula:\n\nvalue / 10^decimal_places */
    decimal_places: number
    /** The ISO-4217 three-letter currency code that identifies the type of currency in value. */
    currency: string
  }
}

/** The event notification received when A user donates to the broadcaster's charity campaign. */
export type CharityDonationSubscription = BaseSubscription<
  CharityDonationType,
  CharityDonationVersion,
  CharityDonationCondition
>

export function makeCharityDonationSubscription(
  userId: string,
): CharityDonationSubscription {
  return {
    type: "channel.charity_campaign.donate",
    version: "1",
    condition: {
      broadcaster_user_id: userId,
    },
  }
}
