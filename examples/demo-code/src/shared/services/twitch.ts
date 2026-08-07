import { getAuthentication } from "@overlaysymphony/twitch/authentication"
import createEventSub, {
  createSocketTransport,
} from "@overlaysymphony/twitch/eventsub"
import createHelixConnection from "@overlaysymphony/twitch/helix"
import createChat from "@overlaysymphony/twitch/helpers/chat"

const authentication = await getAuthentication()
if (!authentication) {
  throw new Error("Missing Twitch authentication.")
}

const connection = createHelixConnection(authentication)
const transport = await createSocketTransport(connection)

export const eventsub = await createEventSub(transport)
export const chat = createChat(eventsub)
