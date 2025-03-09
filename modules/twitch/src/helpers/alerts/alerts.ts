import createQueue, { type Queue } from "@overlaysymphony/core/libs/queue"

import { type TwitchNotificationMessage } from "../../eventsub/events/index.js"
import { type TwitchEventSub } from "../../eventsub/index.js"

export type Alert = TwitchNotificationMessage<
  | "channel.cheer"
  | "channel.follow"
  | "channel.raid"
  | "channel.subscribe"
  | "channel.subscription.gift"
  | "channel.subscription.message"
>["payload"]

export const mapTypeToPriority = {
  "channel.follow": 0,
  "channel.cheer": 1,
  "channel.subscribe": 2,
  "channel.subscription.message": 3,
  "channel.subscription.gift": 4,
  "channel.raid": 5,
}

export function onAlert(
  eventsub: TwitchEventSub,
  handleAlert: (alert: Alert) => void,
): void {
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
      // Don't spam alerts when gifted many subs
      if (payload.type === "channel.subscribe" && payload.event.is_gift) {
        return
      }

      handleAlert(payload)
    },
  )
}

export default function createAlertQueue(
  eventsub: TwitchEventSub,
  handleAlert: (alert: Alert) => void,
): Queue<Alert>["dismiss"] {
  const queue = createQueue<Alert>()
  queue.listen(handleAlert)

  onAlert(eventsub, (payload) => {
    queue.enqueue(mapTypeToPriority[payload.type], payload)
  })

  return queue.dismiss
}
