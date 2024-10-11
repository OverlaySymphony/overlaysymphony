import { TwitchEventSub } from "../../eventsub"

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

export default function onGoal(
  eventsub: TwitchEventSub,
  onUpdate: (goal: Goal, trigger: "begin" | "progress" | "end") => void,
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

      onUpdate(goal, mapTypeToTrigger[payload.type])
    },
  )
}
