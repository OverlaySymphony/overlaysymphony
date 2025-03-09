import "@overlaysymphony/overlays/ui/scene"

import * as obs from "@overlaysymphony/obs/events"
import { createEventSub } from "@overlaysymphony/twitch/eventsub"
import { onRedemption } from "@overlaysymphony/twitch/helpers/redemption"

import { chat, eventsub } from "#shared/twitch"

// eslint-disable-next-line no-console
console.log("ready", obs, createEventSub)

onRedemption(eventsub, "", async () => {
  //
})

chat.onCommand("celebrate", async (event) => {
  //
})
