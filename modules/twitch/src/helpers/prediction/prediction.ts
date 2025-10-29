import { type TwitchEventSub } from "../../eventsub/index.ts"

export interface Prediction {
  title: string
  outcomes: Array<{
    id: string
    title: string
    color: string
    users: number
    points: number
  }>
  locksAt?: Date
}

const mapTypeToTrigger = {
  "channel.prediction.begin": "begin",
  "channel.prediction.progress": "progress",
  "channel.prediction.lock": "lock",
  "channel.prediction.end": "end",
} as const

export function onPrediction(
  eventsub: TwitchEventSub,
  handlePrediction: (
    prediction: Prediction,
    trigger: "begin" | "progress" | "lock" | "end",
  ) => void,
): void {
  const prediction: Prediction = {
    title: "",
    outcomes: [],
    locksAt: new Date(""),
  }

  eventsub.on(
    [
      "channel.prediction.begin",
      "channel.prediction.progress",
      "channel.prediction.lock",
      "channel.prediction.end",
    ],
    (payload) => {
      prediction.title = payload.event.title
      prediction.outcomes = payload.event.outcomes.map(
        ({ id, title, color, users, channel_points }) => ({
          id,
          title,
          color,
          users,
          points: channel_points,
        }),
      )

      if (
        payload.type === "channel.prediction.begin" ||
        payload.type === "channel.prediction.progress"
      ) {
        prediction.locksAt = new Date(payload.event.locks_at)
      } else {
        prediction.locksAt = undefined
      }

      handlePrediction(prediction, mapTypeToTrigger[payload.type])
    },
  )
}
