import { onAlert } from "@overlaysymphony/twitch/helpers/alerts"

import { browser } from "#shared/services/obs"
import { chat, eventsub } from "#shared/services/twitch"

document.body.style.margin = "0"

browser.on(
  [
    "streaming.starting",
    "streaming.started",
    "streaming.stopping",
    "streaming.stopped",
  ],
  ({ event: { status } }) => {
    console.log(`streaming is ${status}.`)
  },
)

chat.onCommand("hi", (event) => {
  chat.send(`Welcome in, @${event.tags?.displayName}!`)
})

onAlert(eventsub, (payload) => {
  if (payload.type === "channel.follow") {
    // chat.send(`Welcome aboard, @${payload.event.user_login}!`)
    chat.send(`Welcome aboard, ${payload.event.user_name}!`)
    return
  }

  if (payload.type === "channel.cheer") {
    return
  }

  if (payload.type === "channel.subscribe") {
    return
  }

  if (payload.type === "channel.subscription.message") {
    return
  }

  if (payload.type === "channel.subscription.gift") {
    return
  }

  if (payload.type === "channel.raid") {
    return
  }
})
