import { type TwitchEventSub } from "../../eventsub/index.ts"

export interface Redemption {
  id: string
  userId: string
  userLogin: string
  userName: string
  userInput: string
  reward: {
    id: string
    title: string
    cost: number
    prompt: string
  }
}

export function onRedemption(
  eventsub: TwitchEventSub,
  handleRedemption: (redemption: Redemption) => void,
): void
export function onRedemption(
  eventsub: TwitchEventSub,
  id: string,
  handleRedemption: (redemption: Redemption) => void,
): void

export function onRedemption(
  eventsub: TwitchEventSub,
  ...config:
    | [string, (redemption: Redemption) => void]
    | [(redemption: Redemption) => void]
): void {
  const id = typeof config[0] === "string" ? config[0] : undefined
  const handleRedemption =
    typeof config[0] === "function"
      ? config[0]
      : typeof config[1] === "function"
        ? config[1]
        : undefined

  eventsub.on(
    ["channel.channel_points_custom_reward_redemption.add"],
    (payload) => {
      if (typeof id === "undefined" || payload.event.reward.id === id) {
        handleRedemption?.({
          id: payload.event.id,
          userId: payload.event.user_id,
          userLogin: payload.event.user_login,
          userName: payload.event.user_name,
          userInput: payload.event.user_input,
          reward: {
            id: payload.event.reward.id,
            title: payload.event.reward.title,
            cost: payload.event.reward.cost,
            prompt: payload.event.reward.prompt,
          },
        })
      }
    },
  )
}
