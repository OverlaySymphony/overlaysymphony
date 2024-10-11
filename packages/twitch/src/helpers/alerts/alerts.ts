import createQueue, { Queue } from "@overlaysymphony/core/libs/queue"

import { TwitchEventSub } from "../../eventsub"
import { TwitchNotificationMessage } from "../../eventsub/events"

type Alert = TwitchNotificationMessage<
  | "channel.cheer"
  | "channel.follow"
  | "channel.raid"
  | "channel.subscribe"
  | "channel.subscription.gift"
  | "channel.subscription.message"
>["payload"]

const mapTypeToPriority = {
  "channel.follow": 0,
  "channel.cheer": 1,
  "channel.subscribe": 2,
  "channel.subscription.message": 3,
  "channel.subscription.gift": 4,
  "channel.raid": 5,
}

export default function createAlertQueue(
  eventsub: TwitchEventSub,
  onAlert: (alert: Alert) => void,
): Queue<Alert>["dismiss"] {
  const queue = createQueue<Alert>()
  queue.listen((data) => {
    // Don't spam alerts when gifted many subs
    if (data.type === "channel.subscribe" && data.event.is_gift) {
      return
    }

    onAlert(data)
  })

  eventsub.subscribe(
    [
      "channel.cheer",
      "channel.follow",
      "channel.raid",
      "channel.subscribe",
      "channel.subscription.gift",
      "channel.subscription.message",
    ],
    (payload) => {
      queue.enqueue(mapTypeToPriority[payload.type], payload)
    },
  )

  return queue.dismiss
}
