import { TwitchEventSub } from "../../eventsub"

export interface Charity {
  name: string
  description: string
  logo: string
  website: string
  currency: string
  currentAmount: number
  targetAmount: number
}

export interface CharityDonation {
  userId: string
  userLogin: string
  userName: string
  amount: number
}

const mapTypeToTrigger = {
  "channel.charity_campaign.donate": "donate",
  "channel.charity_campaign.progress": "progress",
  "channel.charity_campaign.start": "start",
  "channel.charity_campaign.stop": "stop",
} as const

export default function onCharity(
  eventsub: TwitchEventSub,
  onUpdate: (charity: Charity, trigger: "progress" | "start" | "stop") => void,
  onDonate: (donation: CharityDonation, charity: Charity) => void,
): void {
  const charity: Charity = {
    name: "",
    description: "",
    logo: "",
    website: "",
    currency: "",
    currentAmount: 0,
    targetAmount: 0,
  }

  eventsub.subscribe(
    [
      "channel.charity_campaign.start",
      "channel.charity_campaign.progress",
      "channel.charity_campaign.stop",
      "channel.charity_campaign.donate",
    ],
    (payload) => {
      charity.name = payload.event.charity_name
      charity.description = payload.event.charity_description
      charity.logo = payload.event.charity_logo
      charity.website = payload.event.charity_website

      if (
        payload.type === "channel.charity_campaign.start" ||
        payload.type === "channel.charity_campaign.progress" ||
        payload.type === "channel.charity_campaign.stop"
      ) {
        charity.currency = payload.event.target_amount.currency
        charity.currentAmount =
          payload.event.current_amount.value /
          10 ** payload.event.current_amount.decimal_places
        charity.targetAmount =
          payload.event.target_amount.value /
          10 ** payload.event.target_amount.decimal_places

        onUpdate(charity, mapTypeToTrigger[payload.type])
      }

      if (payload.type === "channel.charity_campaign.donate") {
        onDonate(
          {
            userId: payload.event.user_id,
            userLogin: payload.event.user_login,
            userName: payload.event.user_name,
            amount:
              payload.event.amount.value /
              10 ** payload.event.amount.decimal_places,
          },
          charity,
        )
      }
    },
  )
}
