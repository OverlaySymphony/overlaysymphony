import { TwitchEventSub } from "../../eventsub"

export interface Status {
  online: boolean
  type?: string
  startedAt?: Date
  shieldMode: boolean
  title: string
  category: string
  labels: string[]
}

export default function onStatus(
  eventsub: TwitchEventSub,
  onUpdate: (status: Status) => void,
): void {
  const status: Status = {
    online: false,
    shieldMode: false,
    title: "",
    category: "",
    labels: [],
  }

  eventsub.subscribe(
    [
      "channel.update",
      "stream.online",
      "stream.offline",
      "channel.shield_mode.begin",
      "channel.shield_mode.end",
    ],
    (payload) => {
      if (payload.type === "stream.online") {
        status.online = true
        status.type = payload.event.type
        status.startedAt = new Date(payload.event.started_at)
      }

      if (payload.type === "stream.offline") {
        status.online = false
      }

      if (payload.type === "channel.shield_mode.begin") {
        status.shieldMode = true
      }

      if (payload.type === "channel.shield_mode.end") {
        status.shieldMode = false
      }

      if (payload.type === "channel.update") {
        status.title = payload.event.title
        status.category = payload.event.category_name
        status.labels = payload.event.content_classification_labels
      }

      onUpdate(status)
    },
  )
}
