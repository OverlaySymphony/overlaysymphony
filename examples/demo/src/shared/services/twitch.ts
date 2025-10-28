import { getAuthentication } from "@overlaysymphony/twitch/authentication"
import createChat from "@overlaysymphony/twitch/chat"
import createEventSub from "@overlaysymphony/twitch/eventsub"

const authentication = await getAuthentication()
if (!authentication) {
  // TODO: show error modal
  throw new Error("Missing Twitch authentication.")
}

export const [eventsub, chat] = await Promise.all([
  createEventSub(authentication),
  createChat(authentication),
])
