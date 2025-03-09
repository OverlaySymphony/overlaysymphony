import { type TwitchEventSub } from "../../eventsub/index.js"

export interface Goal {
  type: string
  description: string
  currentAmount: number
  targetAmount: number
}

const mapTypeToTrigger = {
  "channel.goal.begin": "begin",
  "channel.goal.progress": "progress",
  "channel.goal.end": "end",
} as const

export function onGoal(
  eventsub: TwitchEventSub,
  handleGoal: (goal: Goal, trigger: "begin" | "progress" | "end") => void,
): void {
  const goal: Goal = {
    type: "",
    description: "",
    currentAmount: 0,
    targetAmount: 0,
  }

  eventsub.subscribe(
    ["channel.goal.begin", "channel.goal.progress", "channel.goal.end"],
    (payload) => {
      goal.type = payload.event.type
      goal.description = payload.event.description
      goal.currentAmount = payload.event.current_amount
      goal.targetAmount = payload.event.target_amount

      handleGoal(goal, mapTypeToTrigger[payload.type])
    },
  )
}
