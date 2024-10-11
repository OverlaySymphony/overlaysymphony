import { TwitchEventSub } from "../../eventsub"

export interface HypeTrain {
  level: number
  total: number
  progress: number
  goal: number
}

const mapTypeToTrigger = {
  "channel.hype_train.begin": "begin",
  "channel.hype_train.progress": "progress",
  "channel.hype_train.end": "end",
} as const

export default function onHypeTrain(
  eventsub: TwitchEventSub,
  onUpdate: (
    hypeTrain: HypeTrain,
    trigger: "begin" | "progress" | "end",
  ) => void,
): void {
  const hypeTrain: HypeTrain = {
    level: 0,
    total: 0,
    progress: 0,
    goal: 0,
  }

  eventsub.subscribe(
    [
      "channel.hype_train.begin",
      "channel.hype_train.progress",
      "channel.hype_train.end",
    ],
    (payload) => {
      hypeTrain.level = payload.event.level
      hypeTrain.total = payload.event.total

      if (
        payload.type === "channel.hype_train.begin" ||
        payload.type === "channel.hype_train.progress"
      ) {
        hypeTrain.progress = payload.event.progress
        hypeTrain.goal = payload.event.goal
      }

      onUpdate(hypeTrain, mapTypeToTrigger[payload.type])
    },
  )
}
